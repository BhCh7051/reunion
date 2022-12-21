// imports
const mongoose = require("mongoose");
const {
    MONGO_DATABASE,
    MONGO_PASSWORD,
    MONGO_PORT,
    MONGO_USER,
    MONGO_URL,
    ENV,
} = require("../config");

const username = encodeURIComponent(MONGO_USER);
const password = encodeURIComponent(MONGO_PASSWORD);
const database = encodeURIComponent(MONGO_DATABASE);
const port = encodeURIComponent(MONGO_PORT);
const url = encodeURIComponent(MONGO_URL);
const authSource = encodeURIComponent("admin");

mongoose.set("strictQuery", true);

const dbConnectionStringURI =
    ENV === "production"
        ? `mongodb://${username}:${password}@${url}:${port}/${database}?authSource=${authSource}`
        : `mongodb://${url}:${port}/${database}?authSource=${authSource}`;

mongoose.connect(dbConnectionStringURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

const connect = () => {
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", function () {
        console.log("🚀Connected to MongoDB!🚀");
    });
};

module.exports = {
    connect,
    db,
};
