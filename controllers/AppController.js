import redisClient from '../utils/redis';
import dbClient from '../utils/db';

class AppController {
  static getStatus(request, response) {
    response.status(200).json({ redis: redisClient.isAlive(), db: dbClient.isAlive() });
  }

  static async getStats(request, response) {
    const app_user = await dbClient.nbUsers();
    const app_filename = await dbClient.nbFiles();
    response.status(200).json({ users: app_user, files: app_filename });
  }
}

module.exports = AppController;
