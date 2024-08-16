import { Registry, collectDefaultMetrics, Counter } from 'prom-client'
import express from 'express'
import axios from 'axios'
import https from 'https'
// import route from "./test.js"


// const  Skill  = require('prom-client');

// create a registry to hold metrics
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

// create an express app
const app = express()
app.use(express.json());
// app.use(route)
// define a route to increment the request counter
const agent = new https.Agent({  
  rejectUnauthorized: false
});
const instance = axios.create({
  httpsAgent: agent,
  headers: {
    'Authorization': `Bearer asdfgs`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});
app.get('/hello',async (req, res) => {
  res.send("sadf")

  // ads
  instance.get('https://kubernetes.default/hell')
  .then(response => {
    console.log(response.data);
    res.send(response.data)
  })
  .catch(error => {
    console.error('Errorr Response Data:', error.response.data);
    console.error('Error Response Status:', error.response.status);
    console.error('Error Response Headers:', error.response.headers);
  });
  // requestCounter.labels(req.method, req.path, res.statusCode.toString()).inc()
  
})

// expose the metrics for Prometheus to scrape
app.get('/metrics', async (req, res) => {
  const result = await registry.metrics()

  res.send(result)
})

// start the server
app.listen(3000, () => {
  // eslint-disable-next-line no-console
  // @ts-ignore
  console.log('Server listening on port 3000')
})