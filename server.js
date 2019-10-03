const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const db = require("./database");

app.use("/", express.static(path.join(__dirname, "dist")));
app.use(bodyParser.json());

// get request to /cards/:setName specify setName in params and recieve array of card objects
app.get("/cards/:setName", (req, res) => {
  db.getCards(req.params.setName)
    .then(data => {
      console.log(data);
      res.send(data);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

// post req to /cards/:setName specify setName in params and font, back in body
// frequency auto set to 3 (medium)
app.post("/cards/:setName", (req, res) => {
  console.log(req.body);
  db.addCard(req.params.setName, req.body.front, req.body.back)
    .then(data => {
      // console.log(data);
      res.sendStatus(200);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

// put request to /cards/:id, give frequency in body
app.put("/cards/:id", (req, res) => {
  db.changeFrequency(req.params.id, req.body.frequency)
    .then(data => {
      res.sendStatus(200);
    })
    .catch(err => {
      res.sendStatus(500);
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
