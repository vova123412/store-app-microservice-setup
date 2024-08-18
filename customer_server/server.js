import { Registry, collectDefaultMetrics, Histogram } from 'prom-client'
import express from 'express'
import connectToMongoDB from './config/db.js'
import userrouter from './routes/userRoute.js'
import productrouter from './routes/productsRoute.js'
import dotenv from 'dotenv';
import purchaserouter from './routes/purchesesRoute.js'
dotenv.config();
import {consumeMessages} from './services/kafka/consumer.js'
import cors from 'cors'

const app = express()
app.use(cors()); 

app.use(express.json());
app.use(purchaserouter)
app.use(userrouter)
app.use(productrouter)
await connectToMongoDB(process.env.MONGODB_USER,process.env.MONGODB_PASSWORD)
await consumeMessages()



const registry = new Registry()

// enable default metrics like CPU usage, memory usage, etc.
collectDefaultMetrics({ register: registry })

// create a counter to track the number of requests
const requestDurationHistogram = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'Histogram of HTTP request duration in seconds',
  registers: [registry],
  labelNames: ['method', 'path'],
  buckets: [0.1, 0.5, 1, 2.5, 5, 10], // Define your own buckets
});

const metricsMiddleware = (req, res, next) => {
  // Start the timer for the request
  const end = requestDurationHistogram.startTimer({ method: req.method, path: req.path });

  // Stop the timer when the response finishes
  res.on('finish', () => {
    end(); // End the histogram timer
  });

  next(); // Continue to the next middleware or route handler
};

// Apply the metrics middleware
app.use(metricsMiddleware);

// expose the metrics for Prometheus to scrape
app.get('/metrics', async (req, res) => {
  const result = await registry.metrics()
  res.send(result)
})

// start the server
app.listen(3001,'0.0.0.0', () => {
  // eslint-disable-next-line no-console
  // @ts-ignore
  console.log('Server listening on port 3001')
})