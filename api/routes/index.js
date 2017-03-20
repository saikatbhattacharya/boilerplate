const login = require('./login');
const auth = require('saavi');

exports.bind = (app) => {
  app.use('/', login);
};
