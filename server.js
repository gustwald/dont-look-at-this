const express = require('express');
const fetch = require('node-fetch');
const parseString = require('xml2js').parseString;
const schedule = require('node-schedule');
const app = express();
const port = process.env.PORT || 2000;

const feed = 'https://www.kondomvaruhuset.se/media/export/kondomstorlek_test.xml';

const rule = new schedule.RecurrenceRule();
rule.dayOfWeek = 6;

app.get('/api/hello', (req, res) => {
  fetch(feed)
  .then(res => res.text())
  .then(body => parseString(body, function (err, result) {
      res.status(200).send({
        data: result
      });
  }));

});

app.listen(port, () => console.log(`Listening on port ${port}`));