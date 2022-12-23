// Description: This file is the entry point of the application
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
        connect();

        const app = express();

        // middleware to parse request body

        // Log all requests to the console
        // "combined" outputs the Apache style LOGs
        app.use(morgan("combined"));

        // Enable CORS for all routes
        // CORS is a mechanism that allows restricted resources on a web page to be requested from another domain outside the domain from which the first resource was served.
        app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header(
                "Access-Control-Allow-Headers",
                "Authorization, Content-Type"
            );
            next();
        });

        // Use the body-parser middleware to parse request bodies
        // This middleware will parse all bodies and make them available on req.body
        app.use(bodyParser.json());

        // Use the routes defined in the routes/index.js file
        app.use(routes);

        const port = PORT || 3232;

        // Start the server
        app.listen(port, () => {
            console.log(`Server listening on port ${port} 🚀🚀🚀`);
        });
        module.exports = app;
    } catch (error) {
        console.error(error);
    }
};

// Start the server
main();
