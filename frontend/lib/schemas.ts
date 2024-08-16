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
  price: z.coerce.number(),
})
export type CourseSchemaType = z.infer<typeof CourseSchema>

// Topic
export const TopicSchema = z.object({
  title: z.string(),
  description: z.string()
})
export type TopicSchemaType = z.infer<typeof TopicSchema>

// Level Enum
enum courseLevel {
  easy = 'easy',
  medium = 'medium',
  hard = 'hard'
}

// Category Enum
export enum category {
  programming = 'programming',
  design = 'design',
  business = 'business',
  marketing = 'marketing',
  music = 'music',
  cooking = 'cooking',
  photography = 'photography',
  health = 'health',
  fitness = 'fitness',
  lifestyle = 'lifestyle',
  personalDevelopment = 'personal development',
  academics = 'academics',
  language = 'language',
  testPrep = 'test prep',
  teaching = 'teaching',
  other = 'other',
}

export type CourseDetailDataType = {
  course: {
    id: number
    name: string
    description: string
    category: category
    level: courseLevel
    price: number
    avgRating: number
    userId: number // instrcutor id
    createdAt: string
    updateAt: string
    views: number
  }
  topic: {
    
  }
}

// Response data type

// GET /api/course/
export type CourseDataType = {
  id: number
  name: string
  description: string
  category: category
  level: courseLevel
  price: number
  avgRating: number
  views: number
  userId: number
  createdAt: string
  updatedAt: string
}
// GET /api/user
export type UserDataType = {
  id: number
  email: string
  name: string
  role: string
  credit: number
}

