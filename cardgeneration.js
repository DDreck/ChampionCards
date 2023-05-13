function generateRandomCard() {
    const card = [];
    card.push({ category: 'champion', value: Math.floor(Math.random() * 163) + 1 });
    card.push({ category: 'skillTier', value: Math.floor(Math.random() * 9) + 1 });
    card.push({ category: 'ID', value: 111 });
    card.push({ category: 'printNumber', value: 111 });
    return card;
  }
  
  module.exports = {
    generateRandomCards: function() {
      const card1 = generateRandomCard();
      const card2 = generateRandomCard();
      return {
        card1: card1,
        card2: card2
      };
    }
  };
  