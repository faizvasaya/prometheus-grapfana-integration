const express = require("express");
const app = express();
const client = require("prom-client");
const responseTime = require("response-time");

let register = new client.Registry();

const restResponseTime = new client.Histogram({
  name: "rest_response_time_duration_seconds",
  help: "REST API response time in seconds",
  labelNames: ["method", "route", "status_code"],
});

const flipCoinTime = new client.Histogram({
  name: "flip_coin_response_time_duration_seconds",
  help: "Time take to flip coins per API request",
  labelNames: ["operation"],
});

const headsCount = new client.Counter({
  name: "heads_count",
  help: "Number of heads",
});

const tailsCount = new client.Counter({
  name: "tails_count",
  help: "Number of tails",
});

const flipCount = new client.Counter({
  name: "flip_count",
  help: "Number of flips",
});

register.registerMetric(headsCount);
register.registerMetric(tailsCount);
register.registerMetric(flipCount);
register.registerMetric(restResponseTime);
register.registerMetric(flipCoinTime);

register.setDefaultLabels({
  app: "coin-api",
});

client.collectDefaultMetrics({
  register,
});

app.use(
  responseTime((req, res, time) => {
    if (req?.route?.path) {
      restResponseTime.observe(
        {
          method: req.method,
          route: req.route.path,
          status_code: res.statusCode,
        },
        time * 1000
      );
    }
  })
);

app.get("/", (req, res) => {
  res.send("Hello! I worked.");
});

/**
 * This endpoint is used to flip coins n number of times, where n is the
 * value mentioned in the ?times= query parameters.
 * It also increments the flipCount, headsCount and tailsCount metrics in
 * grafana.
 */
app.get("/flip-coins", (req, res) => {
  const times = Number(req.query.times);

  if (times && times > 0) {
    flipCount.inc(times);
    console.log(times);
    let heads = 0;
    let tails = 0;
    const metricsLabels = {
      operation: "flip-coin",
    };
    const timer = flipCoinTime.startTimer();
    for (let index = 0; index < times; index++) {
      const randomNumber = Math.random();
      if (randomNumber < 0.5) {
        heads++;
      } else {
        tails++;
      }
    }
    timer({...metricsLabels});
    headsCount.inc(heads);
    tailsCount.inc(tails);
    res.json({
      heads: heads,
      tails: tails,
    });
  } else {
    res.send("Please specify number of times");
  }
});

/**
 * This endpoint will be used by prometheus to pull the metrics.
 * This will then be applied in grafana charts.
 */
app.get("/metrics", async (req, res) => {
  res.setHeader("Content-type", register.contentType);
  res.end(await register.metrics());
});

app.listen(3001, () => {
  console.log("I am listening on 3001");
});
