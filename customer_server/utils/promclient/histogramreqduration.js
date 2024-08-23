import { Histogram,Registry } from 'prom-client'
const registry = new Registry()
const requestDurationHistogram = new Histogram({
    name: 'http_request_duration_seconds',
    help: 'Histogram of HTTP request duration in seconds',
    registers: [registry],
    labelNames: ['method','path', 'status'],
    buckets: [0.001, 0.002, 0.003, 0.01,0.1], // Define your own buckets
  });

export {requestDurationHistogram,registry}