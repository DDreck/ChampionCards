const { ranks, championNames, skillTierDistribution } = require('./card_index.js');
const { Client } = require('cassandra-driver');
const { types } = require('cassandra-driver');

const client = new Client({
  contactPoints: ['20.65.97.18'],
  localDataCenter: 'datacenter1',
  keyspace: 'championcards'
});

async function getAndUpdatePrintNumber(championValue) {
  let lastPrintNumber;
  while (true) {
   
    const query = 'SELECT lastPrintNumber FROM printnumbers WHERE championValue = ?';
    const params = [championValue];  // Ensure championValue is an integer
    
    const result = await client.execute(query, params, { prepare: true }); // Use the prepare flag
    
    if (result.rows.length === 0) {  // Use rows.length to get the number of rows
      // No row for this championValue yet, start at 1
      lastPrintNumber = 1;
      // Try to insert a new row for this championValue with lastPrintNumber = 1
      const insertQuery = 'INSERT INTO printnumbers (championValue, lastPrintNumber) VALUES (?, ?) IF NOT EXISTS';
      const insertParams = [ championValue, lastPrintNumber ];
      const insertResult = await client.execute(insertQuery, insertParams, { prepare: true }); // Use the prepare flag
      if (insertResult.rows[0]['[applied]']) {
        // Insert succeeded, exit the loop
        break;
      }
      // Else, some other instance has just inserted a row for this championValue, go to the next iteration
    } else {
      // Increment the existing number
      lastPrintNumber = result.rows[0].lastprintnumber + 1;
      // Try to update the print number in the database
      const updateQuery = 'UPDATE printnumbers SET lastPrintNumber = ? WHERE championValue = ? IF lastPrintNumber = ?';
      const updateParams = [ lastPrintNumber, championValue, lastPrintNumber - 1 ];
      const updateResult = await client.execute(updateQuery, updateParams, { prepare: true }); // Use the prepare flag
      if (updateResult.rows[0]['[applied]']) {
        // Update succeeded, exit the loop
        break;
      }
      // Else, some other instance has just updated the print number, go to the next iteration
    }
  }
  return lastPrintNumber;
}




async function generateRandomCard() {
  const card = [];
  const championValue = Math.floor(Math.random() * 163) + 1;
  const skillTierValue = Math.floor(Math.random() * skillTierDistribution.length); 
  const championName = championNames[championValue];
  const championRank = skillTierDistribution[skillTierValue]; // Use the distribution array here
  const printNumber = await getAndUpdatePrintNumber(championValue);
  const cardId = `${(championName + '__').slice(0, 4).toUpperCase()}${printNumber}`;
  card.push({ category: 'champion', value: championValue, championName: championName, splashArt: `${championName}.png` });
  card.push({ category: 'skillTier', value: skillTierValue, rank: championRank, thumbnail: `${championRank}_frame.png`});
  card.push({ category: 'ID', value: cardId });
  card.push({ category: 'printNumber', value: printNumber });

  return card;
}
  
  module.exports = {
    generateRandomCards: async function() {
      const card1 = await generateRandomCard();
      const card2 = await generateRandomCard();
      const card3 = await generateRandomCard();
      return {
        card1: card1,
        card2: card2,
        card3: card3
      };
    }
  };
  
