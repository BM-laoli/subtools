const express = require('express');
const { doJob } = require('./job/aoPen.js');

const app = new express();

app.get('/api/check', async (req, res) => {
  const APIValue = await doJob();
  res.json({
    message: APIValue,
    status: 'success',
  });
});

const APIStart = () => {
  app.listen(3333);
};

module.exports = {
  APIStart,
};
