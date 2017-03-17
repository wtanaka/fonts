const express = require('express');
const cors = require('cors');

const app = express();
const corsOptions = {
  origin(origin, callback) {
    const allowed = /minted.com$|mntd.net$|localhost:\d+$/.test(origin);
    callback(allowed ? null : 'Access not allowed from this domain');
  },
};

app.use(cors(corsOptions));
app.use('/', express.static('fonts'));

app.listen(process.env.PORT || 3101, () => {});
