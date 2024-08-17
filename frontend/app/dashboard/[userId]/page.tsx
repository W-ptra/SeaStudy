"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { usePathname, useRouter } from 'next/navigation';
import { getLastPathSegment } from '@/lib/utils';

// Card Import
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// Component Import
import { Button } from '@/components/ui/button'

// Icons Import
import { BookCopy } from 'lucide-react';
import { Wallet } from 'lucide-react';

// Import Utilities
import { toast } from 'sonner';
import CountUp from 'react-countup';
import { CourseDataType, UserDataType } from '@/lib/schemas';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';

// Form Import
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { truncateDescription } from '@/lib/utils';

const UserDashboard = () => {
  const pathname = usePathname()
  const lastPathname = getLastPathSegment(pathname)
  const [courses, setCourses] = useState<CourseDataType[]>([])
  const [userData, setUserData] = useState<UserDataType>()
  const router = useRouter()

  useEffect(() => {
    async function getEnrolledCourses() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/user/course/`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'application/json'
          },
        })

        if (response.ok) {
          const data = await response.json()
          
          setCourses(data)
        } else {
          toast.error('Failed to fetch courses')
        }
      } catch (error: any) {
        toast.error('Error fetching courses:', error)
      }
    }
    async function getUserData() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/user`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'application/json'
          },
        })

        if (response.ok) {
          const data = await response.json()
          setUserData(data.data)
        } else {
          toast.error('Failed to fetch user data')
        }
      } catch (error: any) {
        toast.error('Error fetching user:', error)
      }
    }

    getEnrolledCourses()
    getUserData()
  }, [])

  function handleDeleteCourse() {
    toast("Course Deleted")
  }

  const balanceSchema = z.object({
    amount: z.number()
  })
  type balanceType = z.infer<typeof balanceSchema>

  const form = useForm<balanceType>({
    resolver: zodResolver(balanceSchema),
  })

  async function addCreditAmount(values: balanceType) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/payment/topup`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          amount: values.amount.toString(),
        })
      })

      if (response.ok) {
        toast.success('Credit balance updated successfully')
        location.reload()
      } else {
        toast.error('Error adding credit balance')
      }
    } catch (error:any) {
      toast.error('An error occured when adding balance: ', error)
    }
  }

  return (
    <div className='space-y-8'>

      {/* User Data */}
      <Card className='bg-white/20 border-2 border-white'>
        <CardHeader className='w-full flex'>
          <div className='flex items-center justify-between'>
            <div>
              <h3 className='text-2xl font-bold text-white'>{userData?.name}</h3>
              <div className='text-white'>
                {userData?.email}
              </div>
            </div>
            <div className='flex flex-col items-center w-[180px] '>
              <p className='text-white'>Balance</p>
              <div className='text-2xl font-bold text-white'>
                $ <CountUp end={userData?.credit} />
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Header */}
      <div className='w-full flex items-center justify-between'>
        <h3 className='text-3xl font-bold text-white'>My Courses</h3>
        <div className='flex gap-x-4'>
          <Link href="/courses">
            <Button className='w-[175px] bg-white hover:bg-white text-black rounded-full shadow-custom flex items-center gap-2 hover:gap-4 transition-all justify-center'>
              Buy Courses <BookCopy className='h-5 w-5' />
            </Button>
          </Link>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={"outline"} className='w-[175px] gap-2 hover:gap-4 transition-all bg-white/20 hover:bg-white/40 border-2 text-white font-medium border-white rounded-full hover:text-white'>
                TopUp Credit <Wallet className='h-5 w-5' />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Your Credit</DialogTitle>
                <DialogDescription>Add your credit balance to enroll courses</DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(addCreditAmount)} className='space-y-2'>
                  <FormField 
                    control={form.control}
                    name='amount'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Amount
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder='Amount' 
                            type='number' 
                            {...field} 
                            onChange={event => field.onChange(+event.target.value)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type='submit' className='w-full'>
                    Add Balance
                  </Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Courses */}
      <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {courses && courses.map((item, index) => {
          return (
            <Card key={item.id} className='flex flex-col justify-between bg-white/20 border-2 border-white'>
              <div>
                <CardHeader>
                  <CardTitle className='text-white'>{item.name}</CardTitle>
                  <CardDescription className='text-white'>{truncateDescription(item.description, 30)}</CardDescription>
                </CardHeader>
                <CardContent className='flex w-full flex-col md:flex-row gap-y-4 justify-start gap-x-4'>
                  <p className={cn(
                    'rounded-full py-1 text-white px-4',
                    item.level === 'easy' && 'bg-green-400',
                    item.level === 'medium' && 'bg-orange-400 border',
                    item.level === 'hard' && 'bg-red-400 border'  
                  )}>{item.level}</p>
                  <p className='rounded-full bg-gray-100 shadow-custom border py-1 px-4'>{item.category}</p>
                </CardContent>
              </div>
              <CardFooter className='w-full flex flex-col items-start gap-y-4'>
                <div className='flex items-center gap-x-4'>
                  <Link href={`/dashboard/${lastPathname}/${item.id}`}>
                    <Button size={'sm'} className='bg-white hover:bg-white shadow-custom rounded-full text-black'>
                      Course Detail
                    </Button>
                  </Link>
                </div>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default UserDashboard