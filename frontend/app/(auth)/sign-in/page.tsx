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
  const form = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  })

  async function onSubmit(values: SignInSchemaType) {
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
      console.log(data);
      
      if (response.ok) {
        toast.success("Signed In Successfully")
        router.push(`/dashboard/${data}`)
      } else {
        toast.error("Failed to sign in")
      }
    } catch (error) {
      toast.error("An error occured during sing-in")
    }
  }

  return (
    <Card>
      <CardHeader className='text-center'>
        <CardTitle>Sign In</CardTitle>
        <CardDescription className='max-w-[500px]'>Welcome back! Continue your learning journey with SeaStudy. Access your courses, participate in forums, and keep growing.</CardDescription>
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
                    <FormLabel>Email</FormLabel>
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type='password' placeholder='Password' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div />
              <Link href="/sign-up" className='text-sm underline'>
                Don't have an account?
              </Link>
            </div>
            <Button type='submit' className='w-full flex items-center gap-x-2 hover:gap-x-4 transition-all'>
              Sign In <LogIn className='w-5 h-5' />
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card> 
  )
}

export default SignInPage