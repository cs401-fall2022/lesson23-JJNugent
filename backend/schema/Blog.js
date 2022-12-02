const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    blogTitle: {
        type: String,
        require: true
    },
    blogContent: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('Blog', blogSchema);