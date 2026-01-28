import { execSync } from 'child_process';

async function globalTeardown() {
  console.log('Start to clean up test data in MongoDB...');

  try {
    execSync(`
      docker exec -i mongo \
      mongosh naboo --eval "db.Activity.deleteMany({name: "Test activity" }});"
    `, { stdio: 'inherit' });

    console.log('Test data successfully deleted from MongoDB.');
  } catch (err) {
    console.error('Error cleaning up MongoDB:', err);
  }
}

export default globalTeardown;