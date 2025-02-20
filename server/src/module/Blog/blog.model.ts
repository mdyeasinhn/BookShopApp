import { model, Schema } from 'mongoose'
import { IBlog } from './blog.interface'

const blogSchema = new Schema<IBlog>(
    {
        title: {
            type: String,
            required: [true, 'A blog title is required. Please provide one.'],
        },
        content: {
            type: String,
            required: [true, 'Blog content cannot be empty. Please add some text.'],
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'An author must be assigned to the blog.'],
        },
        isPublished: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
)

const Blog = model<IBlog>('Blog', blogSchema)

export default Blog