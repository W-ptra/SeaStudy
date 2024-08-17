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
import { TopicSchema, TopicSchemaType } from '@/lib/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Textarea } from '../ui/textarea'

// Toaster Import
import { toast } from 'sonner'
import { usePathname } from 'next/navigation'
import { getLastPathSegment } from '@/lib/utils'

const CreateTopic = () => {
  const pathname = usePathname()
  const lastPathname = getLastPathSegment(pathname)
  const courseId = parseInt(lastPathname)

  const [isOpen, setIsOpen] = useState(false)

  const form = useForm<TopicSchemaType>({
    resolver: zodResolver(TopicSchema),
    defaultValues: {
      courseId: courseId,
      title: "",
      description: "",
    }
  })

  async function onSubmit(values: TopicSchemaType) {
    console.log(values)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/topic/`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })

      const data = await response.json()

      if (response.ok) {
        setIsOpen(false)
        location.reload()
        toast("Topic Created Successfully");
      } else {
        toast.error("Failed to create topic");
      }
    } catch (error) {
      
    }
    toast("Topic Created Successfully")
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className='bg-white hover:bg-white shadow-custom text-black rounded-full'>Create Topic</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Topic</DialogTitle>
          <DialogDescription>
            Create a new topic for this course
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <div className='space-y-2'>
              <FormField 
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Topic Title</FormLabel>
                    <FormControl>
                      <Input type='text' placeholder='Topic Title' {...field} />
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
                    <FormLabel>Topic Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder='Topic Description' {...field}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type='submit' className='w-full'>
              Create Topic
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateTopic