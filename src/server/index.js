const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = require('./app');

const port = process.env.PORT || 5000;

// const dbUrl = process.env.DB_CONNECT;

// const dbUrl = 'mongodb://35.195.207.222:27018/test';

// DB_CONNECT = "mongodb//7Z0tB7RV4yVuG6fPm7m:7Z0tB7RV4yVuG6fPm7m@cluster0.ddlxp.azure.mongodb.net/nodejsauth"

const dbUrl = 'mongodb://pocUser:poc2020@35.195.207.222:27018/poc_dev';

mongoose
  .connect(dbUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: true,
    // ensureIndex: true,
    // autoReconnect: true,
    })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

require('./models/entity');
require('./models/users');

app.listen(port, () => {
  console.log(`Server running on localhost:${port}`);
});
