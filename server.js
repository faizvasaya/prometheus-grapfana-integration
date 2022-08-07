const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello! I worked.");
});

app.get("/flip-coins", (req, res) => {
  const times = Number(req.query.times);

  if (times && times > 0) {
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
    res.json({
      heads: heads,
      tails: tails,
    });
  } else {
    res.send("Please specify number of times");
  }
});

app.listen(6000, () => {
  console.log("I am listening on 8080");
});
