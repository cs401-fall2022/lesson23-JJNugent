const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('Blog', blogSchema);