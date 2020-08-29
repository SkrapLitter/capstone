const path = require('path');
const express = require('express');
const chalk = require('chalk');
const cors = require('cors');
const app = require('./index');

const PORT = process.env.PORT || 3000;
const PUBLIC_PATH = path.join(__dirname, '../public');
const DIST_PATH = path.join(__dirname, '../dist');

app.use(express.json());
app.use(cors());
app.use(express.static(PUBLIC_PATH));
app.use(express.static(DIST_PATH));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

const startServer = () =>
  new Promise(() => {
    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(chalk.greenBright(`Server is listening on PORT: ${PORT}`));
    });
  });

module.exports = startServer;
