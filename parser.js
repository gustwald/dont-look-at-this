const fetch = require('node-fetch');
const parseString = require('xml2js').parseString;
const fs = require('fs');

const feed =
  'https://www.kondomvaruhuset.se/media/export/kondomstorlek_test.xml';

fetch(feed)
  .then(res => res.text())
  .then(body =>
    parseString(body, function(err, result) {
      fs.writeFileSync('src/condoms.json', JSON.stringify(result));
    }),
  );
