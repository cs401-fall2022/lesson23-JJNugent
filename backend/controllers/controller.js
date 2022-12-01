const blogModel = require('../schema/Blog');

module.exports.getBlog = async (req, res) => {
    const blog = await blogModel.find();
    res.send(blog);
};

module.exports.saveBlog = async (req, res) => {

    const { userName } = req.body;

    blogModel.create({ userName }).then((data) => {
        console.log("Blog added");
        console.log(data);
        res.send(data);
    });

    const blog = await blogModel.find();
    res.send(blog);
};

module.exports.editBlog = async (req, res) => {
    const { _id, username } = req.body;
    blogModel.findByIdAndUpdate(_id, {userName})
    .then(()=> res.send("Edit saved"))
    .catch((err) => console.log(err));
}

module.exports.deleteBlog = async (req, res) => {
    const {_id} = req.body;
    blogModel.findByIdAndDelete(_id)
    .then(()=> res.send("Deleted"))
    .catch((err) => console.log(err));
}