const debug = require('debug')('app:api:domains:authentication');
import test_too_busy from 'shared/middlewares/toobusy';
const http = require('http');


debug(
    `📴 Authentication system ${(process.env.NODE_ENV === 'production' &&
      `at ${process.env.COMPOSE_REDIS_URL}:${process.env.COMPOSE_REDIS_PORT}`) ||
      'locally'}`
);

const PORT = process.env.PORT || 3003;

debug('\n🛠 Athena, the processing worker, is starting...');
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
      `💉 Healthcheck server running at ${server.address().address}:${
        server.address().port
      }`
    );
});
