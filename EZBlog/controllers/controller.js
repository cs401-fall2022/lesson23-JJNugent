const blogModel = require('../schema/Blog');

//Return all blogs in JSON form
module.exports.getBlog = async (req, res) => {
    const blog = await blogModel.find();
    console.log(blog);
    res.json(blog);
};

//Receive blog title, content from host, save in the DB
module.exports.saveBlog = async (req, res) => {
    blogModel.create({blogTitle: req.body.blogTitle, blogContent: req.body.blogContent})
    .then((data) => {
        res.send(data);
        console.log(data);
    });
};

module.exports.editBlog = async (req, res) => {
    blogModel.findByIdAndUpdate(req.body._id, 
    {blogTitle: req.body.blogTitle, blogContent: req.body.blogContent})
    .then(()=> res.send("Edit saved"))
    .catch((err) => console.log(err));
}

module.exports.deleteBlog = async (req, res) => {
    blogModel.findByIdAndDelete(req.body._id)
    .then(()=> res.send("Deleted"))
    .catch((err) => console.log(err));
}