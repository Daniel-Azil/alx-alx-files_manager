import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('error', this.handleError);
  }

  handleError(error) {
    console.error(`Redis client not connected to server: ${error}`);
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    const redisGet = promisify(this.client.get).bind(this.client);
    return await redisGet(key);
  }

  async set(key, value, duration) {
    const redisSet = promisify(this.client.set).bind(this.client);
    await redisSet(key, value);
    await this.client.expire(key, duration);
  }

  async del(key) {
    const redisDel = promisify(this.client.del).bind(this.client);
    await redisDel(key);
  }
}

const redisClient = new RedisClient();

export default redisClient;
