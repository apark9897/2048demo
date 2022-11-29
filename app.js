const express = require('express');
const path = require('path');
const port = 2048;

const app = express();

app.use(express.static(path.join(__dirname, 'public')))

app.listen(port, () => console.info(`Listening on port ${port}`));