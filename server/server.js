const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./config/config.json')

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());
app.use(require('./routes/product'));
app.use(require('./routes/auth'));

mongoose.Promise = global.Promise
mongoose.connect(config.mongoose.uri, config.mongoose.dbOptions)

mongoose.connection
  .once('open', () => {
    console.log(`Mongoose - successful connection ...`)
    app.listen(process.env.PORT || config.port,
      () => console.log(`Server start on port http://localhost:${config.port}/ ...`))
  })
  .on('error', error => console.warn(error))
