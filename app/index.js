const express = require('express');
const client = require('prom-client');

const app = express();
const PORT = 3000;

// Create a counter metric
const requestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests'
});

// Increment counter for every request
app.use((req, res, next) => {
  requestCounter.inc();
  next();
});

// Default route
app.get('/', (req, res) => {
  res.send('Hello Metrics World!');
});

// Metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

// Start server
app.listen(PORT, () => console.log(`App running on port ${PORT}`));
