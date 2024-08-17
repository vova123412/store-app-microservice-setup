import { Registry, collectDefaultMetrics, Counter } from 'prom-client'
import express from 'express'
import connectToMongoDB from './config/db.js'
import userrouter from './routes/userRoute.js'
import productrouter from './routes/productsRoute.js'
import dotenv from 'dotenv';
import purchaserouter from './routes/purchesesRoute.js'
dotenv.config();
import {consumeMessages} from './services/kafka/consumer.js'


const app = express()
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
const requestCounter = new Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  registers: [registry],
  labelNames: ['method', 'path', 'status'],
})

// expose the metrics for Prometheus to scrape
app.get('/metrics', async (req, res) => {
  const result = await registry.metrics()
  res.send(result)
})

// start the server
app.listen(3000,'0.0.0.0', () => {
  // eslint-disable-next-line no-console
  // @ts-ignore
  console.log('Server listening on port 3000')
})