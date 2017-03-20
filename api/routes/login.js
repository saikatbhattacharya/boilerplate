const express = require('express');
const router = express.Router();
const config = require('config');
const path = require('path');
const auth = require('saavi');

const strategy = config.get('strategy');

router.post('/login/callback', auth.authenticate(strategy,
  {
    failureRedirect: '/unauthorised',
    failureFlash: true,
  }), (req, res) => {
    res.redirect('/');
  }
);

router.get('/login', auth.authenticate(strategy,
  {
    failureRedirect: '/',
    failureFlash: true,
  }), (req, res) => {
    res.redirect('/');
  }
);

router.get('*', auth.protected, (req, res) => {
  res.cookie('user', res.req.user.nameID);
  const fName = res.req.user.FirstName || '';
  const lName = res.req.user.LastName || '';
  const name = `${fName} ${lName}`;
  res.cookie('name', name);
  res.render(path.join(__dirname, '../index.jade'));
});

module.exports = router;
// api/ecosystem.json
