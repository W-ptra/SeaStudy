"use client"

import React, { useState } from 'react'

// Dialog Import
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

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
import { CourseSchema, CourseSchemaType } from '@/lib/schemas'
import { zodResolver } from '@hookform/resolvers/zod'

// Select Import
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Textarea Import
import { Textarea } from '../ui/textarea'

// Toaster Import
import { toast } from 'sonner'

// Category
const category = [
  'programming',
  'design',
  'business',
  'marketing',
  'music',
  'cooking',
  'photography',
  'health',
  'fitness',
  'lifestyle',
  'personal development',
  'academics',
  'language',
  'test prep',
  'teaching',
  'other',
];


const CreateCourse = () => {
  const [IsOpen, setIsOpen] = useState(false)

  const form = useForm<CourseSchemaType>({
    resolver: zodResolver(CourseSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      level: 'easy',
    }
  })

  async function onSubmit(values: CourseSchemaType) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/course`, {
         method: 'POST',
         credentials: 'include',
         headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json'
         },
         body: JSON.stringify(values),
      })

      const data = await response.json()
      
      if (response.ok) {
        setIsOpen(false)
        location.reload()
        toast("Course Created Successfully");
      } else {
        toast.error("Failed to create course");
      }
    } catch (error) {
      toast.error("An error occured")
    }
  }

  return (
    <Dialog open={IsOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className='bg-white hover:bg-white shadow-custom text-black rounded-full'>Create Course</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Course</DialogTitle>
          <DialogDescription>Create a new course for your students!</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <div className='space-y-2'>
              <FormField 
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Name</FormLabel>
                    <FormControl>
                      <Input type='text' placeholder='Course Name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField 
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder='Course Description' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField 
                control={form.control}
                name='category'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select 
                        onValueChange={(value) => {
                          field.onChange(value)
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select Category' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {category.map((item, index) => {
                            return (
                              <SelectItem key={index} value={item}>{item}</SelectItem>
                            )
                          })}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField 
                control={form.control}
                name='level'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Level</FormLabel>
                    <FormControl>
                      <Select 
                        onValueChange={(value) => {
                          field.onChange(value)
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select Level' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='easy'>Easy</SelectItem>
                          <SelectItem value='medium'>Medium</SelectItem>
                          <SelectItem value='hard'>Hard</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField 
                control={form.control}
                name='price'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder='Course Price' 
                        type='number' 
                        {...field} 
                        onChange={event => field.onChange(+event.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type='submit' className='w-full'>
              Create Course
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateCourse