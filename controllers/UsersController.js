import sha1 from 'sha1';
import { ObjectID } from 'mongodb';
import Queue from 'bull';
import dbClient from '../utils/db';
import redisClient from '../utils/redis';

const userQueue = new Queue('userQueue', 'redis://127.0.0.1:6379');

class UsersController {
  static createUser(request, response) {
    const { emailAddress } = request.body;
    const { userPassword } = request.body;

    if (!emailAddress) {
      response.status(400).json({ error: 'Missing email' });
      return;
    }
    if (!userPassword) {
      response.status(400).json({ error: 'Missing password' });
      return;
    }

    const userCollection = dbClient.db.collection('users');
    userCollection.findOne({ email: emailAddress }, (err, existingUser) => {
      if (existingUser) {
        response.status(400).json({ error: 'Already exist' });
      } else {
        const hashedPassword = sha1(userPassword);
        userCollection.insertOne(
          {
            email: emailAddress,
            password: hashedPassword,
          },
        ).then((insertResult) => {
          response.status(201).json({ id: insertResult.insertedId, email: emailAddress });
          userQueue.add({ userId: insertResult.insertedId });
        }).catch((error) => console.log(error));
      }
    });
  }

  static async getCurrentUser(request, response) {
    const authToken = request.header('X-Token');
    const cacheKey = `auth_${authToken}`;
    const userId = await redisClient.get(cacheKey);
    if (userId) {
      const userCollection = dbClient.db.collection('users');
      const idObject = new ObjectID(userId);
      userCollection.findOne({ _id: idObject }, (err, user) => {
        if (user) {
          response.status(200).json({ id: userId, email: user.email });
        } else {
          response.status(401).json({ error: 'Unauthorized' });
        }
      });
    } else {
      console.log('User not found!');
      response.status(401).json({ error: 'Unauthorized' });
    }
  }
}

module.exports = UsersController;
