const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const db = require("./database");

app.use("/", express.static(path.join(__dirname, "dist")));
app.use(bodyParser.json());

app.get("/cards/:setName", (req, res) => {
  db.getCards();
  res.send(req.params.setName);
});

app.post("/cards/:setName", (req, res) => {
  db.addCard(req.params.setName, req.body.front, req.body.back);
  res.send(req.params.setName);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
