const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const jwt = require("./config/jwt");
const routes = require("./routes");
const { PORT } = require("./config");
const { connect } = require("./config/db");

const main = async () => {
    try {
        // connect to database
        await connect();

        const app = express();

        // middleware to parse request body

        // Log all requests to the console
        app.use(morgan("combined"));

        // Enable CORS for all routes
        app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header(
                "Access-Control-Allow-Headers",
                "Authorization, Content-Type"
            );
            next();
        });

        // Use the body-parser middleware to parse request bodies
        app.use(bodyParser.json());

        // Use the routes defined in the routes/index.js file
        app.use(routes);

        const port = PORT || 3232;

        // Start the server
        app.listen(port, () => {
            console.log(`Server listening on port ${port} 🚀🚀🚀`);
        });
    } catch (error) {
        console.error(error);
    }
};

main();
