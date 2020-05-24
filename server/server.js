const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./config/config.json');
const comments = require('./models/comment');

const app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);


app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());
app.use(require('./routes/product'));
app.use(require('./routes/auth'));
app.use(require('./routes/order'));
app.use(require('./routes/comment'));

io.on('connection', (socket) => {
  socket.on("comment", (comment) => {
    comments(comment).save()
    io.emit("comment", comment)
  })
});

mongoose.Promise = global.Promise
mongoose.connect(config.mongoose.uri, config.mongoose.dbOptions)

mongoose.connection
  .once('open', () => {
    console.log(`Mongoose - successful connection ...`)
    http.listen(process.env.PORT || config.port,
      () => console.log(`Server start on port http://localhost:${config.port}/ ...`))
  })
  .on('error', error => console.warn(error))
