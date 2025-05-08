const redis = require("redis");

const client = redis.createClient({
    socket: {
        host: "127.0.0.1",
        port: 6379
    }
});

client.on("error", (err) => {
    console.error("Redis connection error:", err);
});

client.connect().catch((err) => {
    console.error("Redis client error:", err);
});

module.exports = client;
