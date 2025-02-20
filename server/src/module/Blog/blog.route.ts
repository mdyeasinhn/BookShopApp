import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { BlogControllers } from './blog.controller'
import { BlogValidation } from './blog.validation'
import auth from '../auth/auth'


const blogRouter = express.Router()

blogRouter.post(
  '/',
  auth("user"),
  validateRequest(BlogValidation.createBlogValidationSchema),
  BlogControllers.createBlog
)

blogRouter.get('/', auth("user"), BlogControllers.getBlogs)
blogRouter.get('/:id', auth("user"), BlogControllers.getSingleBlog)
blogRouter.patch('/:id', auth("user"), BlogControllers.updateBlog)
blogRouter.delete('/:id', auth("user", "admin"), BlogControllers.deleteBlog)

export default blogRouter