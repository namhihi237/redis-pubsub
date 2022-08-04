const redis = require('redis');
const express = require('express');

const app = express();

const publisher = redis.createClient();
publisher.connect();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/', async (req, res) => {
  const article = {
    id: '123456',
    name: 'Using Redis Pub/Sub with Node.js',
    blog: 'Logrocket Blog',
  };

  publisher.publish('article', JSON.stringify(article));
  res.send(JSON.stringify(article));
})

app.get('/blog', async (req, res) => {
  const blog = {
    id: '12345',
    title: 'Blog Title',
    slug: 'blog-slug',
  };

  publisher.publish('blog', JSON.stringify(blog));

  res.send(JSON.stringify(blog))
})

app.listen(3000, () => {
  console.log('server run port 3000');
})