const redis = require("redis");
require("dotenv").config()

const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
});
redisClient.on('error',(err)=>{console.log(`redis error: ${err}`)});

async function getCache(key){
    await redisClient.connect();
    const cacheData = await redisClient.get(key);
    await redisClient.disconnect()
    if(cacheData){
        const cacheDataJson = JSON.parse(cacheData);
        return cacheDataJson;
    }
    return null
}

async function createCache(key,cache){
    await redisClient.connect();
    const cacheDataString = JSON.stringify(cache);
    await redisClient.setEx(key,300,cacheDataString)
    await redisClient.disconnect()
}

module.exports = {getCache,createCache}