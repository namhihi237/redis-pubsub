const redis = require('redis');
const client = redis.createClient();
const subscriber = client.duplicate();

(async () => {
  await subscriber.connect();
  await subscriber.subscribe('article', (message) => {
    console.log(message); // 'message'
  });

  await subscriber.subscribe('blog', (message) => {
    console.log(message); // 'message'
  });
})();