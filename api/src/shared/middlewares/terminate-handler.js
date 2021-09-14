import mongoose from 'mongoose';
import logger from 'loglevel';


function terminate (server, options = { coredump: false, timeout: 500 }) {
    // Exit function
    const exit = code => {
      options.coredump ? process.abort() : process.exit(code)
    }
  
    return (code, reason) => (err, promise) => {
      if (err && err instanceof Error) {
        // Log error information, use a proper logging library here :)
        logger.info(err.message, err.stack)
      }
      logger.info('⬇️ Terminating code', code)
      logger.info('⬇️ Terminating reason', reason)
      // Attempt a graceful shutdown
     
      mongoose.disconnect();
      mongoose.connection.close((error) => {
        if(error) console.log('⬇️❌ Disconnecting mongdb', error);
        server.close(exit);
      });
      setTimeout(exit, options.timeout).unref()
    }
  }

function exitHandler(server){
    let run = terminate(server, {
        coredump: false,
        timeout: 500
    });


    process.on('uncaughtException', run(1, 'Unexpected Error'))
    process.on('unhandledRejection', run(1, 'Unhandled Promise'))
    process.on('SIGTERM', run(0, 'SIGTERM'))
    process.on('SIGINT', run(0, 'SIGINT'))
}

export default exitHandler;