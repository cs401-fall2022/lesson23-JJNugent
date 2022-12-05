const express = require('express');
const mongoose = require('mongoose');
const path = require("path");
const routes = require('./routes/routes');

//Use .env file to configure MONGODB
require('dotenv').config();

//Start express app
const app = express();
const PORT = process.env.port || 3000;

//Allow express to send, receive JSON
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Serve static JS files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/static', express.static(path.resolve(__dirname, 'public', 'static'),
{ extensions: ['js'] }));

//Serve public directory
express.static(path.resolve(__dirname, 'public', 'static'));

//Use routes, always serve index.html on any route
app.use(routes);
app.get("/*", (req, res) => {
    res.sendFile(path.resolve("public", "index.html"));
});

//Connect to mongoDB
mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log(err));

//Setup local server on port 3000
app.listen(PORT, () => console.log(`Listening on: ${PORT}`));

