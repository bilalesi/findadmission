require('dotenv').config();
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'production') {
    console.log('🛎 ⛺️ Production Server Running ••• ');
    require('./dist')
} else {
    console.log('🛎 ⛺️ Development Server Running ••• ');
    require('nodemon')({script: 'dev.js'})
}