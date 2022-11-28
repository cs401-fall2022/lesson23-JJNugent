const express = require('express');
const app = express();
const port = 3000;


const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017', 
   { useNewUrlParser: true });



const blogSchema = new mongoose.Schema({
    Object: {
        title: {type: String, required: true},
        username: {type: String, required: true},
        content: {type: String, required: true}, 
    }
});

const Blog = mongoose.model("Blog", blogSchema);

app.use(express.static("public"));

app.get('/', (request, response) => {
  response.send('Hello from Express!');
});

app.post('/viewBlogs', (request, response) => {
    const blogs = Blog.find(function(err, blogs){
        console.log(blogs);
    });
    response.send();
});

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }

  console.log(`server is listening on ${port}`);
});