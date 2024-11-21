const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');

const app = express();
const results = [];

app.get('/data', (req, res) => {
  fs.createReadStream("\cdata.csv")
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      res.status(200).json(results)
    });
});

app.listen(3000, () => console.log('Server running on port 3000'));
