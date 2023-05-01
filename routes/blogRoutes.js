const express = require('express')
const router = express.Router()

const blogController = require('../controllers/blogController')
const {isloggedIn} = require('../utils/functions')

router.post('/create', isloggedIn, blogController.createBlog)
router.patch('/update/:id',isloggedIn, blogController.updateBlog)
router.delete('/delete/:id',isloggedIn, blogController.deleteBlog)
router.get('/:id', blogController.getBlog)
router.get('/', blogController.getAllBlogs)

module.exports  = router;