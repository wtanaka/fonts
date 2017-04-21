const express = require('express');
const cors = require('cors');

const app = express();
const corsOptions = {
  origin: /minted.com$|mntd.net$|localhost:\d+$/,
};

app.use(cors(corsOptions));
app.use('/healthcheck', (req, res) => res.end(JSON.stringify({ ack: 'ok' })));
app.use('/', express.static('fonts'));

app.listen(process.env.PORT || 3101, () => {
  console.log('listening on', process.env.PORT || 3101);
});
