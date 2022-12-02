const express = require('express');
const mongoose = require('mongoose');
const path = require("path");

const routes = require('./routes/routes');

require('dotenv').config();

const app = express();
const PORT = process.env.port || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log(err));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/static', express.static(path.resolve(__dirname, 'public', 'static'),
{ extensions: ['js'] }));


express.static(path.resolve(__dirname, 'public', 'static'));

app.use(routes);

app.get("/*", (req, res) => {
    res.sendFile(path.resolve("public", "index.html"));
});

app.listen(PORT, () => console.log(`Listening on: ${PORT}`));

