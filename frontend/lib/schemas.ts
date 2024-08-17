import { z } from "zod";

// Sign In
export const SignInSchema = z.object({
  email: z.string(),
  password: z.string(),
})
export type SignInSchemaType = z.infer<typeof SignInSchema>

// Sign Up
enum userRole {
  User = 'User',
  Instructor = 'Instructor'
}

export const SignUpSchema = z.object({
  name: z.string(),
  email: z.string(),
  role: z.enum(['User', 'Instructor']),
  password: z.string(),
  passwordConfirm: z.string(),
})
export type SignUpSchemaType = z.infer<typeof SignUpSchema>

// Course
export const CourseSchema = z.object({
  name: z.string(),
  description: z.string(),
  category: z.string(),
  level: z.enum(['easy', 'medium', 'hard']),
  price: z.coerce.number(),
})
export type CourseSchemaType = z.infer<typeof CourseSchema>

// Topic
export const TopicSchema = z.object({
  courseId: z.number(),
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

// export type CourseDetailDataType = {
//   course: {
//     id: number
//     name: string
//     description: string
//     category: category
//     level: courseLevel
//     price: number
//     avgRating: number
//     userId: number // instrcutor id
//     createdAt: string
//     updateAt: string
//     views: number
//   }
//   topic: {
    
//   }
// }

// Data Type

// Assignment
export type AssignmentDataType = {
  id: number
  name: string
  description: string
}

// Material
export type MaterialDataType = {
  id: number
  name: string
  type: string
  link: string
}

// Submission
export type SubmissionDataType = {
  id: number
  score: number
  isGraded: boolean
  content: string
}

// Review
export type ReviewDataType = {
  id: number
  comment: string
  rating: number
  userId: number
  courseId: number
  createdAt: string
  updatedAt: string
}

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
// GET /api/topic/
export type TopicDataType = {
  id: number
  title: string
  description: string
  courseId: number
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

