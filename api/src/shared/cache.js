
import Redis from 'ioredis';

export const config =
  process.env.NODE_ENV === 'production'
    ? {
        port: process.env.REDIS_CACHE_PORT,
        host: process.env.REDIS_CACHE_URL,
        password: process.env.REDIS_CACHE_PASSWORD,
      }
    : {
        port: 6379,
        host: localhost,
    };

export default new Redis(config);
