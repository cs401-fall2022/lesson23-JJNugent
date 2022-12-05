const {Router} = require('express');
const {getBlog, saveBlog, editBlog, deleteBlog} = require('../controllers/controller');

const router = Router();

//Handle the route - call the function defined in controller.js
router.get('/get', getBlog);
router.post('/save', saveBlog);
router.post('/update', editBlog);
router.post('/delete', deleteBlog);

module.exports = router;