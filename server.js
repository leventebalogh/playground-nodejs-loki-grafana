const { createLogger, transports } = require("winston");
const LokiTransport = require("winston-loki");
const express = require("express");
const path = require("path");
const app = express();
const port = 8080;

// Home page
app.get("/", (req, res) => {
  res.sendFile(path.resolve(path.join(__dirname, 'index.html')));
});

// Logger
const logger = createLogger({
  transports: [
    new LokiTransport({
      host: "http://localhost:3100",
      // Only for development purposes
      interval: 5,
      labels: {
        job: 'nodejs'
      }
    })
  ]
})

// Send random logs repeatedly
setInterval(() => {
  const level = getRandomArrayElement(['debug', 'info', 'warn', 'error']);
  const labels = getRandomArrayElement([{ env: 'dev' }, { env: 'prod' }]);
  const message = getRandomArrayElement(['This is just some log message...', 'Oh snap! Something went wrong.']);
  logger[level]({ message, labels })
}, 2000);

// Start the webserver
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

function getRandomArrayElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}