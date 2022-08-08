const express = require("express");
const app = express();
const client = require("prom-client");

let register = new client.Registry();

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

register.setDefaultLabels({
  app: "coin-api",
});

client.collectDefaultMetrics({
  register,
});

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
    for (let index = 0; index < times; index++) {
      const randomNumber = Math.random();
      if (randomNumber < 0.5) {
        heads++;
      } else {
        tails++;
      }
    }
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
