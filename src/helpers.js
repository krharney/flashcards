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
