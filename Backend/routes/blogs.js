const {Router} = require('express')
const router = Router()


const {AddBlog,ShowBlogs,UpdateBlog,GetBlog,GetBlogByTitle,DeleteBlog,showResult} = require('../controllers/blogs')



router.route('/').post(AddBlog).get(ShowBlogs)
router.route('/:id').patch(UpdateBlog).get(GetBlog).delete(DeleteBlog)
router.route('/title/:title').get(GetBlogByTitle)
router.route('/results/search').get(showResult)




module.exports = router