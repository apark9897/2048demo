const express = require('express');
const path = require('path');
const port = 2048;
const redisClient = require('./redis');

const app = express();

app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')))
app.use(express.json());
app.use('/stats', require('./routes/stats'));
app.use('/', express.static(path.join(__dirname, 'public')));

app.listen(port, () => console.info(`Listening on port ${port}`));