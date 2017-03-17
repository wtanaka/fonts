const express = require('express');
const cors = require('cors');

const app = express();
const corsOptions = {
  origin: /minted.com$|mntd.net$|localhost:\d+$/,
};

app.use(cors(corsOptions));
app.use('/', express.static('fonts'));

app.listen(process.env.PORT || 3101, () => {});
