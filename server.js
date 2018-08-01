const express = require('express');
const cors = require('cors');

const app = express();

const docs = require('./docs')(); // instantiate at runtime

// set cors header to *
app.use(cors());

// refuse requests from non-minted origins
app.use((req, res, next) => {
  const allowedOrigins = /minted.com$|mntd.net$|localhost:\d+$|mintedcdn.net$/;

  if (req.headers.origin && allowedOrigins.test(req.headers.origin)) {
    next();
  } else {
    res.status(403).end('Referring domain not allowed');
  }
});

app.use('/healthcheck', (req, res) => res.end(JSON.stringify({ ack: 'ok' })));
app.use('/docs', docs);
app.use('/', express.static('fonts'));

app.listen(process.env.PORT || 3101, () => {
  console.log('listening on', process.env.PORT || 3101);
});
