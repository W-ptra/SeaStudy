import { z } from "zod";

export const SignInSchema = z.object({
  email: z.string(),
  password: z.string(),
})

export type SignInSchemaType = z.infer<typeof SignInSchema>

export const SignUpSchema = z.object({
  email: z.string(),
  password: z.string(),
  passwordConfirm: z.string(),
})

export type SignUpSchemaType = z.infer<typeof SignUpSchema> 