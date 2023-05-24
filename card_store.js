const { Client } = require('cassandra-driver');

const connectToDatabase = async () => {
const databaseclient = new Client({
    contactPoints: ['20.65.97.18'],
    localDataCenter: 'datacenter1',
    keyspace: 'championcards'
  });
  await databaseclient.connect()
  .then(() => console.log('Connected to ScyllaDB'))
  .catch(error => console.error('Could not connect to ScyllaDB:', error));

  return databaseclient;
}



const storeCard = async (selectedCard, userId) => {

    const client = await connectToDatabase();
    console.log(selectedCard);

    const query = 'INSERT INTO championcards.cards (ID, championValue, championName, splashArt, skillTierValue, rank, thumbnail, printNumber, userID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  
    const params = [
        selectedCard.find(item => item.category === 'ID')?.value,
        selectedCard.find(item => item.category === 'champion')?.value,
        selectedCard.find(item => item.category === 'champion')?.championName,
        selectedCard.find(item => item.category === 'champion')?.splashArt,
        selectedCard.find(item => item.category === 'skillTier')?.value,
        selectedCard.find(item => item.category === 'skillTier')?.rank,
        selectedCard.find(item => item.category === 'skillTier')?.thumbnail,
        selectedCard.find(item => item.category === 'printNumber')?.value,
        userId
      ];
  
    await client.execute(query, params, { prepare: true });
  
    console.log(`card stored for user ${userId}`);
  
    await client.shutdown();
  };
  
  module.exports = {
    storeCard
  };