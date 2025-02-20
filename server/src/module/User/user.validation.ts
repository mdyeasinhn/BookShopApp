import { z } from 'zod'

const userValidationSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required and should be a string',
    })
    .min(3)
    .max(50),

  email: z.string({
    required_error: 'Please provide a valid email address',
  }),

  password: z.string({
    required_error: 'A password is required for account security',
  }),

  role: z
    .enum(['user', 'admin'], {
      required_error: "Please specify a valid role: 'user' or 'admin'",
    })
    .default('user'),

  isBlocked: z.boolean().default(false),
})

export const UserValidation = {
  userValidationSchema,
}
