// Description: Import config variables from .env file

const { config } = require("dotenv");

config();

// server connection config
const PORT = process.env.PORT || 8000;
const ENV = process.env.port || "production";

// database connection config variables
const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_PORT = process.env.MONGO_PORT;
const MONGO_DATABASE = process.env.MONGO_DATABASE;
const MONGO_URL = process.env.MONGO_URL;

// jwt config variables
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

module.exports = {
    PORT,
    ENV,
    MONGO_USER,
    MONGO_PASSWORD,
    MONGO_PORT,
    MONGO_DATABASE,
    MONGO_URL,
    JWT_SECRET,
    JWT_EXPIRES_IN,
};
