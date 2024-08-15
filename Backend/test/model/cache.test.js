const { createCache,getCache } = require("../../model/cache");

test("Test create and retrive cache",async ()=>{
    const testId = 2;
    const cacheKey = `test cache with test id ${testId}`;
    const testPayload = {
        message:    "test message"
    }

    const getUnStoreCache = await getCache(cacheKey);
    expect(getUnStoreCache).toBe(null);

    await createCache(cacheKey,testPayload);

    const getStoreCache = await getCache(cacheKey);
    expect(getStoreCache).not.toBe(null);
})