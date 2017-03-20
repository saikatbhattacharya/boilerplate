/* eslint no-console:0 */
const path = require('path');
require(path.join(process.cwd(), 'env'));
process.env.NODE_CONFIG_DIR = path.join(__dirname, 'config');

const nodeEnv = process.env.NODE_ENV;
const _ = require('lodash');
const config = require('config');
const redisConfig = _.merge({
  host: 'localhost',
  port: 6379,
  ttl: 260,
  prefix: `revizor-${nodeEnv}-`,
}, config.get('redis'));

const express = require('express');
const compression = require('compression');
const app = express();
const flash = require('connect-flash');
const logger = require('./helpers/logger');
const routes = require('./routes');
const healthCheck = require('./routes/healthCheck');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const redis = require('redis');
const client = redis.createClient(redisConfig);
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const auth = require('saavi');
const PORT = (process.env.PORT || 3100);
const requestId = require('request-id/express');

app.use(session({
  secret: "won't tell because it's secret",
  store: new RedisStore({ client }),
  resave: false,
  saveUninitialized: false,
}));
app.use(auth.initialize());
app.use(auth.session());
healthCheck.bind(app, client);
app.use(requestId({ paramName: 'requestId' }));
app.use(logger.winston);
app.use(logger.express);
app.use(flash());
app.use(cookieParser());
app.use(bodyParser.json({ limit: '256kb' }));
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '256kb',
}));
app.set('view engine', 'jade');
app.use('/assets', express.static('assets', { redirect: false }));

app.use(compression());
routes.bind(app);

app.get('*', (req, res) => {
  res.render(path.join(__dirname, 'index.jade'));
});

app.listen(PORT, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', PORT, PORT);
  }
});
