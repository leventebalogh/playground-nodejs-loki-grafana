# Node.js + Loki + Grafana

This is a simple playground for sending logs from a Node.js service to Loki and then querying
it from Grafana.

```
 Node.JS      (:8080)        Loki         (:9090)       Grafana        (:3000)
+-------------------+       +-------------------+      +---------------------+
|                   |       |                   |      |                     |
|                   |       |   Scrape          |      |  Query with         |
|     /metrics      <-------+   every           <------+  LogQL              |
|                   |       |   1s              |      |                     |
|                   |       |                   |      |                     |
+-------------------+       +-------------------+      +---------------------+
```
