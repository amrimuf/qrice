const dotenv = require('dotenv');

// get config vars
dotenv.config();

module.exports = {
    jwt: {
        accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
        refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
        accessTokenExpiresIn: '1h',
        refreshTokenExpiresIn: '7d',
    },
};