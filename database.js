const mongoose = require("mongoose");
const Schema = mongoose.Schema;

if (process.env.MLAB_URL === undefined) {
  mongoose.connect("mongodb://localhost/mvp");
} else {
  mongoose.connect(process.env.MLAB_URL);
}

const flashCardSchema = new Schema({
  set: String,
  front: String,
  back: String,
  frequency: Number
});

module.exports.addCard = () => {
  console.log("added");
};

module.exports.getCards = setName => {
  console.log("gotten");
};
