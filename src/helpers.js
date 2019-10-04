const axios = require("axios");
const API_KEY = require("../config.js").API_KEY;
const url = "https://www.dictionaryapi.com/api/v3/references/collegiate/json/";

// helper function to randomly choose next card, taking into account frequencies
module.exports.nextCard = cards => {
  let ids = [];
  cards.forEach(card => {
    for (let i = 0; i < card.frequency; i++) {
      ids.push(card._id);
    }
  });
  let chosenCardId = ids[Math.floor(Math.random() * ids.length)];
  for (let i = 0; i < cards.length; i++) {
    if (cards[i]._id === chosenCardId) return cards[i];
  }
};

// helper function to send request to Merriam-Webster API
module.exports.getDefinition = word => {
  return axios.get(url + word + "?key=" + API_KEY);
};

module.exports.arrayToDefinition = array => {
  let stringDef = "";
  array.forEach((def, idx) => {
    stringDef += idx + 1 + ". " + def + "; ";
  });
  return stringDef;
};
