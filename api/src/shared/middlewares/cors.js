// @flow
import cors from 'cors';
const corsOptions = {
  origin:
    process.env.NODE_ENV === 'production' ? [
          'https://findadmission.com',
          process.env.HEROKU_URL,
        ].filter(Boolean)
      : [/localhost/],
  credentials: true,
};

export default cors(corsOptions);
