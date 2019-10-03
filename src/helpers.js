module.exports.nextCard = cards => {
  let ids = [];
  cards.forEach(card => {
    for (let i = 0; i < card.frequency; i++) {
      ids.push(card._id);
    }
  });
  return ids[Math.floor(Math.random()*ids.length)]
};
