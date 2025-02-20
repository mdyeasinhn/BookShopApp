import { z } from 'zod'

const createBlogValidationSchema = z.object({
  title: z
    .string({
      required_error: 'Please provide a title for the blog',
    })
    .min(5)
    .max(100),
  content: z
    .string({
      required_error: 'Please provide content for the blog',
    })
    .min(10),

  author: z.string({
    required_error: 'Please provide an author for the blog',
  }).optional(),

  isPublished: z.boolean().default(true),
})

export const BlogValidation = {
  createBlogValidationSchema,
}