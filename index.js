var express = require('express');
var app = express();
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');
var guard = require('express-jwt-permissions')();

var port = process.env.PORT || 8080;

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://dev-dbuui-26.us.auth0.com/.well-known/jwks.json',
  }),
  audience: 'https://www.tempguard-api.com',
  issuer: 'https://dev-dbuui-26.us.auth0.com/',
  algorithms: ['RS256'],
});

app.use(jwtCheck);

app.get('/sensors', guard.check(['read:sensors']), function (req, res) {
  res.json({
    sensor1: 'this is the first sensor',
    sensor2: 'this is the second challenge.',
  });
});

app.listen(port);
