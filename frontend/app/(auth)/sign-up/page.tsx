"use client"

import React from 'react'
import Link from 'next/link';

// Icon Import
import { LogIn } from 'lucide-react';

// Form Import
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SignUpSchema, SignUpSchemaType } from '@/lib/schemas'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

// Card Import
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// Import Toaster
import { toast } from 'sonner';

const SignUpPage = () => {
  const form = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    }
  })

  function onSubmit(values: SignUpSchemaType) {
    console.log(values)
    toast("Signed Up Successfully")
  }

  return (
    <Card className='bg-white/20 border-white shadow-custom'>
      <CardHeader className='text-center'>
        <CardTitle className='text-white'>Sign Up</CardTitle>
        <CardDescription className='max-w-[500px] text-white/70'>Join SeaStudy and unlock a world of knowledge. Enroll in courses, engage in discussions, and become a part of our learning community today!</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <div className='space-y-2'>
              <FormField 
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-white'>Email</FormLabel>
                    <FormControl>
                      <Input type='email' placeholder='Email' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField 
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-white'>Password</FormLabel>
                    <FormControl>
                      <Input type='password' placeholder='Password' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField 
                control={form.control}
                name='passwordConfirm'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-white'>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type='password' placeholder='Confirm Password' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div />
              <Link href="/sign-in" className='text-sm underline text-white'>
                Already have an account?
              </Link>
            </div>
            <Button type='submit' className='w-full hover:bg-white flex items-center gap-x-2 hover:gap-x-4 transition-all bg-white text-black shadow-custom'>
              Sign Up <LogIn className='w-5 h-5' />
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card> 
  )
}

export default SignUpPage