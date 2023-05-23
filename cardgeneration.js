const { ranks, championNames, skillTierDistribution } = require('./card_index.js');

function generateRandomCard() {
  const card = [];
  const championValue = Math.floor(Math.random() * 163) + 1;
  const skillTierValue = Math.floor(Math.random() * skillTierDistribution.length); 
  const championName = championNames[championValue];
  const championRank = skillTierDistribution[skillTierValue]; // Use the distribution array here
  card.push({ category: 'champion', value: championValue, championName: championName, splashArt: `${championName}.png` });
  card.push({ category: 'skillTier', value: skillTierValue, rank: championRank, thumbnail: `${championRank}_frame.png`});
  card.push({ category: 'ID', value: 111 });
  card.push({ category: 'printNumber', value: 111 });
  return card;
}
  
  module.exports = {
    generateRandomCards: function() {
      const card1 = generateRandomCard();
      const card2 = generateRandomCard();
      const card3 = generateRandomCard();
      return {
        card1: card1,
        card2: card2,
        card3: card3
      };
    }
  };
  
