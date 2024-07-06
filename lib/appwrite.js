import { Client, Account, Storage, Databases } from 'react-native-appwrite';

const client = new Client();

client
  .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
  .setProject('6683ffc0003389ad9824'); // Your project ID

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);
const bucketId = '668429c10001a7768892'; // Your bucket ID
const databaseId = '6683ffe200263fc0e5d2'; // Your database ID
const collectionId = '668956560021cd1e3d4f'; // Your event collection ID

export { client, account, databases, storage, bucketId, databaseId, collectionId };
