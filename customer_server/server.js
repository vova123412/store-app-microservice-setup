import { collectDefaultMetrics} from 'prom-client'
import express from 'express'
import connectToMongoDB from './config/db.js'
import userrouter from './routes/userRoute.js'
import productrouter from './routes/productsRoute.js'
import dotenv from 'dotenv';
import purchaserouter from './routes/purchesesRoute.js'
dotenv.config();
import {consumeMessages} from './services/kafka/consumer.js'
import cors from 'cors'
import {promDurationTimems} from './middleware/durationtimemetricsms.js'
import {requestDurationHistogram,registry} from './utils/promclient/histogramreqduration.js'

// enable default metrics like CPU usage, memory usage, etc.

const app = express()
collectDefaultMetrics({ register: registry,prefix: "customerserver" })
app.use(promDurationTimems(requestDurationHistogram));
app.use(cors()); 
app.use(express.json());
app.use(purchaserouter)
app.use(userrouter)
app.use(productrouter)
await connectToMongoDB(process.env.MONGODB_USER,process.env.MONGODB_PASSWORD)
await consumeMessages()

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