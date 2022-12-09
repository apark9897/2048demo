const redis = require('redis');

const redisConfig = {
  host: 'localhost',
  port: '6379'
}
const client = redis.createClient(redisConfig);
client.connect(redisConfig);

client.on('error', (err) => console.log('Redis Client Error', err));
client.on('connect', () => console.log('Redis Connection Pending'));
client.on('ready', () => console.log('Redis Connection Established'));
process.on('SIGINT', () => client.quit());

module.exports = client;

