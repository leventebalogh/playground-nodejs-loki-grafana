# Node.js + Prometheus + Grafana

This is a simple playground for exposing metrics from a Node.js service to Prometheus and then querying
Prometheus from Grafana.

```
 Node.JS      (:8080)        Prometheus   (:9090)       Grafana        (:3000)
+-------------------+       +-------------------+      +---------------------+
|                   |       |                   |      |                     |
|                   |       |   Scrape          |      |  Query with         |
|     /metrics      <-------+   every           <------+  PromQL             |
|                   |       |   1s              |      |                     |
|                   |       |                   |      |                     |
+-------------------+       +-------------------+      +---------------------+
```

**Exposed metrics:**
- `metric_gauge` - A gauge type metric. [More info](https://prometheus.io/docs/concepts/metric_types/#gauge)
- `metric_counter` - A counter type metric. [More info](https://prometheus.io/docs/concepts/metric_types/#counter)
- `metric_histogram` - A histogram type metric. [More info](https://prometheus.io/docs/concepts/metric_types/#counter)

---

## Start

```bash
# Starts the following services:
# - Node.js - http://localhost:8080 
# - Prometheus - http://localhost:9090 
# - Grafana - http://localhost:3000 
$ docker-compose up
```

Visit [http://localhost:3000/explore](http://localhost:3000/explore) for playing around with the metrics.
(The service is scraped for random metrics every 1s for more frequent data)

---

## Development

```bash
# Starts the Node.js service and restarts it on changes
$ yarn dev

# Starts Prometheus and Grafana
$ docker-compose up prometheus grafana
```
