const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrement = require("mongoose-auto-increment");
const connection = mongoose.createConnection("mongodb://localhost/mvp");
const MONGO_URL = require("./config");

if (process.env.MONGO_URL === undefined) {
  mongoose.connect("mongodb://localhost/mvp");
  console.log("connected to db");
  autoIncrement.initialize(connection);
} else {
  mongoose.connect(process.env.MONGO_URL);
}

autoIncrement.initialize(connection);

const flashCardSchema = new Schema({
  set: String,
  front: String,
  back: String,
  frequency: Number
});

flashCardSchema.plugin(autoIncrement.plugin, "FlashCard");

const FlashCard = mongoose.model("FlashCard", flashCardSchema);

module.exports.addCard = (setName, front, back) => {
  const card = new FlashCard({
    set: setName,
    front: front,
    back: back,
    frequency: 3
  });
  return card.save();
};

module.exports.getCards = setName => {
  return FlashCard.find({ set: setName });
};

module.exports.changeFrequency = (card, frequency) => {
  return FlashCard.findOneAndUpdate({ _id: card }, { frequency: frequency });
};

module.exports.getSets = () => {
  return FlashCard.distinct("set");
};
