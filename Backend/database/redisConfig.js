const { createClient } = require("redis");

const redisClient = createClient({
    password: process.env.REDIS_SECRET,
    socket: {
      host: "redis-19851.c135.eu-central-1-1.ec2.cloud.redislabs.com",
      port: 19851,
    },
  }).on("error", (err) => console.error("Redis Client Error", err));
  redisClient.connect();

  module.exports = redisClient