const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello! I worked.");
});

app.get("/flip-coins", (req, res) => {
  const randomNumber = Math.random();
  let coinValue = "";
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
    if (randomNumber < 0.5) {
      coinValue = "Heads";
    } else {
      coinValue = "Tails";
    }
    res.send(coinValue);
  }
});

app.listen(8080, () => {
  console.log("I am listening on 8080");
});
