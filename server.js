const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const parseString = require('xml2js').parseString;
const schedule = require('node-schedule');
const app = express();
const port = process.env.PORT || 2000;

const feed = 'https://www.kondomvaruhuset.se/media/export/kondomstorlek_test.xml';

app.get('/api/hello', (req, res) => {
  fetch(feed)
  .then(res => res.text())
  .then(body => parseString(body, function (err, result) {
      res.status(200).send({
        data: result
      });
  }));

});

// app.use(express.static(path.join(__dirname, '../public')));

app.listen(port, () => console.log(`Listening on port ${port}`));