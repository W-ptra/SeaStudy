"use client"

import React from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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
import { SignInSchema, SignInSchemaType } from '@/lib/schemas';

// Import Toast
import { toast } from 'sonner';

const SignInPage = () => {
  const router = useRouter()
  const session = localStorage.getItem("token")
  const userId = localStorage.getItem("userId")
  const userRole = localStorage.getItem("userRole")

  if (session) {
    if (userRole === "Instructor") {
      router.push('/dashboard/instructor')
    } else {
      router.push(`/dashboard/${userId}`)
    }
  }

  const form = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  })

  async function onSubmit(values: SignInSchemaType) {
    const session = localStorage.getItem("token")
    const userId = localStorage.getItem("userId")
    const userRole = localStorage.getItem("userRole")
    if (session) {
      if (userRole === "Instructor") {
        router.push('/dashboard/instructor')
      } else {
        router.push(`/dashboard/${userId}`)
      }
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/auth/login`, {
         method: 'POST',
         credentials: 'include',
         headers: {
          'Content-Type': 'application/json'
         },
         body: JSON.stringify(values),
      })

      const data = await response.json()
      console.log(data)
      
      if (response.ok) {
        localStorage.setItem("token", data.session)
        localStorage.setItem("userId", data.user.id)
        localStorage.setItem("userRole", data.user.role)

        const token = localStorage.getItem("token")
        console.log(token)

        toast.success("Signed In Successfully")

        if (data.user.role === 'Instructor') {
          router.push(`/dashboard/instructor`)
        } else {
          router.push(`/dashboard/${data.user.id}`)
        }
      } else {
        toast.error("Failed to sign in")
      }
    } catch (error) {
      toast.error("An error occured during sing-in")
    }
  }

  return (
    <Card className='bg-white/20 border-white shadow-custom my-[150px]'>
      <CardHeader className='text-center'>
        <CardTitle className='text-white'>Sign In</CardTitle>
        <CardDescription className='max-w-[500px] text-white'>Welcome back! Continue your learning journey with SeaStudy. Access your courses, participate in forums, and keep growing.</CardDescription>
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
                      <Input type='email' placeholder='Email' className='focus-visible:ring-transparent' {...field} />
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
                      <Input type='password' placeholder='Password' className='focus-visible:ring-transparent' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div />
              <Link href="/sign-up" className='text-sm underline text-white'>
                Don't have an account?
              </Link>
            </div>
            <Button type='submit' className='w-full hover:bg-white flex items-center gap-x-2 hover:gap-x-4 transition-all bg-white text-black shadow-custom'>
              Sign In <LogIn className='w-5 h-5' />
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card> 
  )
}

export default SignInPage