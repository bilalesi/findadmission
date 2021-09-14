// @flow
// Log requests with debug
const debug = require('debug')('shared:middlewares:logging');

module.exports = ( req, res, next, ) => {
  if (req.body && req.body.operationName) {
    debug(`requesting ${req.url}: ${req.body.operationName}`);
  } else {
    debug(`requesting ${req.url}`);
  }
  next();
};
