
/**
 * The entry point for the server, this is where everything starts
 */
require('dotenv').config();
const compression = require('compression');
const userAgent = require('express-useragent');
const debug = require('debug')('findadmission');
import express, { json } from 'express';
import toobusy from './shared/middlewares/toobusy';
import run_connect_default_persistence_db from './shared/db';
import addSecurityMiddleware from './shared/middlewares/security';
import csrf from './shared/middlewares/csrf';
import cors from './shared/middlewares/cors';
import terminateHandler from './shared/middlewares/terminate-handler';
import errorHandler from './shared/middlewares/error-handler';
import rateLimiter from './shared/middlewares/rate-limiter';
import requestRegisterer from './shared/middlewares/_app';


import commonRoute from './routes/common';
import studentRoute from './routes/student';


const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;


const app = express();
debug('Server created...');
// Trust the now proxy
app.set('trust proxy', true);
app.use(toobusy);
app.use(express.json({ limit: '5mb' }));
app.use(userAgent.express());
app.use(express.urlencoded({ limit: '5mb', extended: true }));

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
// app.use('/', (req, res) => {
//   res.redirect( process.env.NODE_ENV === 'production' ? 'https://findadmission.com' : 'http://localhost:3000' );
// });
app.use(requestRegisterer);
app.use('/api/v1/common', commonRoute());
app.use('/api/v1/student', studentRoute());
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




start();


