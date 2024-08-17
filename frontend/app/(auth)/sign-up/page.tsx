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
import { SignUpSchema, SignUpSchemaType } from '@/lib/schemas'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

// Select Import
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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
  
  const form = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    }
  })

  async function onSubmit(values: SignUpSchemaType) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/auth/register`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })

      const data = await response.json()

      if (response.ok) {
        toast.success("Signed Up Successfully")
        router.push("/sign-in")
      } else {
        toast.error("Failed to sign in")
      }
    } catch (error) {
      
    }
  }

  return (
    <Card className='my-[125px] bg-white/20 border-white shadow-custom'>
      <CardHeader className='text-center'>
        <CardTitle className='text-white'>Sign Up</CardTitle>
        <CardDescription className='max-w-[500px] text-white'>Join SeaStudy and unlock a world of knowledge. Enroll in courses, engage in discussions, and become a part of our learning community today!</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <div className='space-y-2'>
              <FormField 
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-white'>Name</FormLabel>
                    <FormControl>
                      <Input type='text' placeholder='Name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                name='role'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-white'>Role</FormLabel>
                    <FormControl>
                      <Select 
                        onValueChange={(value) => {
                          field.onChange(value)
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className='focus-visible:ring-transparent'>
                            <SelectValue placeholder='Select Role' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='User'>User</SelectItem>
                          <SelectItem value='Instructor'>Instructor</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
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