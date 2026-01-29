import { MongoClient } from 'mongodb';

export default async function globalTeardown() {
  console.log('🧹 Global teardown: cleaning up database...');

  const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/naboo';
  let client = null;

  try {
    client = new MongoClient(mongoUri, { serverSelectionTimeoutMS: 5000 });
    await client.connect();

    const db = client.db('naboo');
    const activitiesCollection = db.collection('activities');

    await activitiesCollection.deleteMany({ name: 'Test activity' });
    console.log('✅ Cleanup completed');
  } catch (error) {
    console.error('❌ Error during cleanup:', error);
  } finally {
    if (client) {
      await client.close();
    }
  }
}
