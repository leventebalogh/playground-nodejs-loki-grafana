const Prometheus = require("prom-client");
const express = require("express");
const path = require("path");
const app = express();
const port = 8080;

// Home page
app.get("/", (req, res) => {
  res.sendFile(path.resolve(path.join(__dirname, 'index.html')));
});

// Registering metrics
const metric_histogram = new Prometheus.Histogram({
  name: "metric_histogram",
  help: "Some help message for the HISTOGRAM metric.",
  labelNames: ["route"],
  buckets: [0.1, 5, 15, 50, 100, 200, 300, 400, 500],
});

const metric_counter = new Prometheus.Counter({
  name: "metric_counter",
  help: "Some help message for the COUNTER metric.",
});

const metric_gauge = new Prometheus.Gauge({
  name: "metric_gauge",
  help: "Some help message for the GAUGE metric.",
  collect() {
    this.set(Math.round(Math.random() * 500));
  },
});

// Collecting default metrics about the process
Prometheus.collectDefaultMetrics();

// Exposing metrics
app.get("/metrics", (req, res) => {
  metric_counter.inc();
  metric_gauge.set(Math.round(Math.random() * 500))
  metric_histogram.labels("foo").observe(Math.round(Math.random() * 500));

  res.set("Content-Type", Prometheus.register.contentType);
  res.end(Prometheus.register.metrics());
});

// Start the webserver
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
