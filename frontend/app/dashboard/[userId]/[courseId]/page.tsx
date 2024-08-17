"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import { cn, getLastPathSegment } from '@/lib/utils';

// Button Import
import { Button } from '@/components/ui/button';

// Card Import
import { 
  Card, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';

// Type Import
import { CourseDataType, TopicDataType } from '@/lib/schemas';

// Component Import
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger, DialogTitle } from '@/components/ui/dialog';

// Icon  Import
import { Star } from 'lucide-react';
import { FaStar } from 'react-icons/fa';

// Form Import
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const CourseDetailPage = () => {
  const pathname = usePathname();
  const lastPathname = getLastPathSegment(pathname)
  const courseId = parseInt(lastPathname)
  const [courseDetail, setCourseDetail] = useState<CourseDataType>()
  const [topics, setTopics] = useState<TopicDataType[]>([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    async function getCourseDetail(courseId: number) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/course/${courseId}`, {
          method: 'GET',
          headers: {
            'Content-Type' : 'application/json'
          }
        })

        if (response.ok) {
          const data = await response.json()
          setCourseDetail(data.course)
          setTopics(data.topics)
        } else {
          toast.error('Failed to fetch course detail')
        }
      } catch (error: any) {
        toast.error('Error fetching course detail:', error)
      } 
    }

    getCourseDetail(courseId)
  }, [])

  const reviewSchema = z.object({
    courseId: z.number(),
    comment: z.string(),
    rating: z.number(),
  })
  type reviewSchemaType = z.infer<typeof reviewSchema>
  const form = useForm<reviewSchemaType>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      courseId: courseId,
      comment: "",
    }
  })

  async function addReview(values: reviewSchemaType) {
    console.log(values)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/review`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          courseId: values.courseId,
          rating: values.rating,
          comment: values.comment
        })
      })

      if (response.ok) {
        toast.success('Successfully added a review')
        setIsOpen(false)
      } else {
        toast.error('Failed to create a review')
      }
    } catch (error) {
      toast.error('Error when creating review')
    }
  }

  return (
    <div className='space-y-8'>

      {/* Header */}
      <div className='w-full flex items-start justify-between'>
        <div className='space-y-2'>
          <h3 className='text-3xl font-bold text-white'>{courseDetail?.name}</h3>
          <p className='text-white'>{courseDetail?.description}</p>
          <div className='flex gap-x-4 items-center'>
            <p className={cn(
              'rounded-full py-1 px-4 text-white',
              courseDetail?.level === 'easy' && 'bg-green-400',
              courseDetail?.level === 'medium' && 'bg-orange-400',
              courseDetail?.level === 'hard' && 'bg-red-400'  
            )}>{courseDetail?.level}</p>
            <p className='rounded-full bg-gray-100 border py-1 px-4 shadow-custom'>{courseDetail?.category}</p>
          </div>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className='bg-white hover:bg-white shadow-custom text-black rounded-full flex items-center gap-x-2'> 
              Add Review <Star className='w-5 h-5' />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Add Your Review to The Course 
              </DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(addReview)} className='space-y-2'>
                <FormField 
                  control={form.control}
                  name="comment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Comment</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Comment" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField 
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-black/70'>Rating</FormLabel>
                      <div className='flex flex-row items-center gap-x-3'>
                        <input type="hidden" {...field} />
                        {[...Array(5)].map((_, index) => (
                          <FaStar
                            key={index}
                            className='w-8 h-8 cursor-pointer'
                            onClick={() => field.onChange(index + 1)}
                            color={index < field.value ? "#EBC58E" : "#1c1c1c"}
                          />
                        ))}
                      </div>
                    </FormItem>
                  )}
                />
                <div className='py-4' />
                <Button type="submit" className='w-full'>
                  Submit Review
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Topics */}
      <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {topics.map((item, index) => {
          return (
            <Card key={item.id} className='flex flex-col justify-between bg-white/10 border-2 border-white'>
              <div>
                <CardHeader>
                  <CardTitle className='text-white'>{item.title}</CardTitle>
                  <CardDescription className='text-white'>{item.description}</CardDescription>
                </CardHeader>
              </div>
              <CardFooter>
                <Link href={`/courses/${lastPathname}/${item.id}`}>
                  <Button size={'sm'} className='bg-white rounded-full text-black shadow-custom hover:bg-white'>
                    See Materials
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default CourseDetailPage