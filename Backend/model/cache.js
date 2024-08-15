const redis = require("redis");
require("dotenv").config();

const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
});

redisClient.on('error', (err) => {
    console.log(`Redis error: ${err}`);
});

redisClient.connect().catch(console.error);

async function getCache(key) {
    try {
        const cacheData = await redisClient.get(key);
        if (cacheData) {
            return JSON.parse(cacheData);
        }
        return null;
    } catch (err) {
        console.error(`Error getting cache for key ${key}:`, err);
        return null;
    }
}

async function createCache(key, cache) {
    try {
        const cacheDataString = JSON.stringify(cache);
        await redisClient.setEx(key, 300, cacheDataString);
    } catch (err) {
        console.error(`Error creating cache for key ${key}:`, err);
    }
}

process.on('SIGINT', () => {
    redisClient.disconnect().then(() => {
        console.log('Redis client disconnected');
        process.exit(0);
    });
});

module.exports = { getCache, createCache };