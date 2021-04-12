const express = require('express'),
      bodyParser = require('body-parser'),
      morgan = require('morgan'),
      cors = require('cors'),
      mongoose = require('mongoose'),
      config = require('./config/config.json'),
      comments = require('./models/comment'),
      passport = require('passport'),
      passportConfig = require('./config/passport')(passport)

const app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);


app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(cors());
app.use(require('./routes/product'));
app.use(require('./routes/auth'));
app.use(require('./routes/order'));
app.use(require('./routes/comment'));
app.use(require('./routes/user'));
app.use(require('./routes/employee'));

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
