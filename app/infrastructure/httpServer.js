const express = require('express');
const config = require('../config');
const bodyParser = require('body-parser');
const userRouter = require('../routes/userRoutes');
const authorRouter = require('../routes/authorRoutes');
const bookTypeRouter = require('../routes/bookTypeRoutes');
const bookRouter = require('../routes/bookRoutes');
const studentRouter = require('../routes/studentRoutes');
const borrowRouter = require('../routes/borrowRoutes');
const session = require('express-session');
const MongoStore = require('connect-mongo');

class HttpServer {
  constructor() {
    this.app = express();
    this.port = config.server_port;
  }

  start() {
    this.register();
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }

  register() {
    this.app.use(bodyParser());

    // REQUEST SESSION SETTINGS
    this.app.set('trust proxy', 1);
    this.app.use(
      session({
        secret: config.session.key,
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({
          mongoUrl: `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`,
          collectionName: 'sessions',
          ttl: 1 * 60 * 60,
        }),
        cookie: {
          secure: true,
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24,
        },
      })
    );
    //

    this.app.get('/', (req, res) => {
      res.send('HTTP server is up ...');
    });
    this.app.use(userRouter);
    this.app.use(authorRouter);
    this.app.use(bookTypeRouter);
    this.app.use(bookRouter);
    this.app.use(studentRouter);
    this.app.use(borrowRouter);
  }
}

module.exports = new HttpServer();
