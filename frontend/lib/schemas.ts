import { z } from "zod";

// Sign In
export const SignInSchema = z.object({
  email: z.string(),
  password: z.string(),
})
export type SignInSchemaType = z.infer<typeof SignInSchema>

// Sign Up
export const SignUpSchema = z.object({
  email: z.string(),
  password: z.string(),
  passwordConfirm: z.string(),
})
export type SignUpSchemaType = z.infer<typeof SignUpSchema>

// Course
export const CourseSchema = z.object({
  name: z.string(),
  description: z.string(),
  category: z.string(),
  level: z.enum(['Easy', 'Medium', 'Hard']),
  price: z.number(),
})
export type CourseSchemaType = z.infer<typeof CourseSchema>
