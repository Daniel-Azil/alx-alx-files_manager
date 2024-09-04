// Import MongoClient from the mongodb package
import { MongoClient } from 'mongodb';

// Define constants for MongoDB connection parameters using environment variables or default values
const HOST = process.env.DB_HOST || 'localhost';
const PORT = process.env.DB_PORT || 27017;
const DATABASE = process.env.DB_DATABASE || 'files_manager';
const connectionUrl = `mongodb://${HOST}:${PORT}`;

// Define the DBClient class to handle database operations
class DBClient {
  constructor() {
    // Initialize a MongoDB client with the specified URL and options
    this.client = new MongoClient(connectionUrl, { useUnifiedTopology: true, useNewUrlParser: true });
    
    // Attempt to connect to the MongoDB server and set the database if successful
    this.client.connect().then(() => {
      this.database = this.client.db(DATABASE);
    }).catch((err) => {
      // Log any connection errors to the console
      console.log(err);
    });
  }

  // Check if the MongoDB client is connected
  isAlive() {
    return this.client.isConnected();
  }

  // Asynchronously get the number of documents in the 'users' collection
  async nbUsers() {
    const userCollection = this.database.collection('users');
    const userCount = await userCollection.countDocuments();
    return userCount;
  }

  // Asynchronously get the number of documents in the 'files' collection
  async nbFiles() {
    const fileCollection = this.database.collection('files');
    const fileCount = await fileCollection.countDocuments();
    return fileCount;
  }
}

// Create an instance of the DBClient class and export it for use in other parts of the application
const dbClient = new DBClient();
export default dbClient;
