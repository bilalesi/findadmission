
/**
 * The entry point for the server, this is where everything starts
 */
require('dotenv').config('../.env');
const compression = require('compression');
const debug = require('debug')('findadmission');
debug('Server starting...');
debug('logging with debug enabled!');
import express from 'express';
import toobusy from './shared/middlewares/toobusy';
import run_connect_default_persistence_db from './shared/db';
import addSecurityMiddleware from './shared/middlewares/security';
import csrf from './shared/middlewares/csrf';
import cors from './shared/middlewares/cors';
import terminateHandler from './shared/middlewares/terminate-handler';
import errorHandler from './shared/middlewares/error-handler';
import rateLimiter from './shared/middlewares/rate-limiter';


const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;


const app = express();

// Trust the now proxy
app.set('trust proxy', true);
app.use(toobusy);

if (!process.env.TEST_DB) {
  // Allow bursts of up to 40 req for initial page loads, but block more than 40 / 10s
  app.use(
    rateLimiter({
      max: 40,
      duration: '10s',
    })
  );
}

// Security middleware.
addSecurityMiddleware(app, { enableNonce: false, enableCSP: false });
if (process.env.NODE_ENV === 'production') {
  app.use(csrf);
}

// All other middlewares
app.use(compression());
app.use(cors);

// Routes
// app.use('/auth', authRoutes);


// Redirect a request to the root path to the main app
app.use('/', (req, res) => {
  res.redirect( process.env.NODE_ENV === 'production' ? 'https://findadmission.com' : 'http://localhost:3000' );
});

// $FlowIssue
app.use(errorHandler);

// We need to create a separate HTTP server to handle GraphQL subscriptions via websockets
async function start() {
  try {
    await run_connect_default_persistence_db();
    const server  = app.listen(PORT, () => {
      debug(`🚀 Server ready at ${PORT}`);
      // console.log(`🚀 Server ready at ${PORT}`);
    })
    terminateHandler(server);
  } catch (error) {
    debug(`
      🚨  Error starting server: ${error.message}
    `)
  }
}
start()
// process.on('unhandledRejection', async err => {
//   console.error('Unhandled rejection', err);
//   try {
//     // await new Promise(resolve => Raven.captureException(err, resolve));
//   } catch (err) {
//     console.error('Raven error', err);
//   } finally {
//     process.exit(1);
//   }
// });

// process.on('uncaughtException', async err => {
//   console.error('Uncaught exception', err);
//   try {
//     // await new Promise(resolve => Raven.captureException(err, resolve));
//   } catch (err) {
//     console.error('Raven error', err);
//   } finally {
//     process.exit(1);
//   }
// });

