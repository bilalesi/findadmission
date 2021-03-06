const debug = require('debug')('app:api:domains:bigbang');
import test_too_busy from 'shared/middlewares/toobusy';
const http = require('http');


debug(
    `š“ Authentication system ${(process.env.NODE_ENV === 'production' &&
      `at ${process.env.COMPOSE_REDIS_URL}:${process.env.COMPOSE_REDIS_PORT}`) ||
      'locally'}`
);

const PORT = process.env.PORT || 3003;

debug('\nš  Athena, the processing worker, is starting...');
debug('Logging with debug enabled!');
debug('');

const server = http.createServer((req, res) => {
    const defaultResponse = () => test_too_busy(req, res, () => {
        res.setHeader('Content-Type', 'application/json');
    });
    return defaultResponse();
});


server.listen(PORT, 'localhost', () => {
    debug(
      `š Healthcheck server running at ${server.address().address}:${
        server.address().port
      }`
    );
});