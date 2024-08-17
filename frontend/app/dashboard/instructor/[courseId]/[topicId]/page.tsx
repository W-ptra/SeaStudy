"use client"

import React, { useEffect } from 'react'
import { usePathname } from 'next/navigation';

// Dummy Data Import
import { course } from '../../data';
import { getLastPathSegment } from '@/lib/utils';

// Components Import
import { Button } from '@/components/ui/button';

// Icons Import
import { Trash } from 'lucide-react';
import { PictureInPicture2 } from 'lucide-react';

// Alert Dialog Import
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

// Toast Import
import { toast } from 'sonner';

const TopicDetailPage = () => {
  const pathname = usePathname()
  const lastPathname = getLastPathSegment(pathname)
  const topicId = parseInt(lastPathname)

  useEffect(() => {
    async function getAllTopicMaterials() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/topic/${topicId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
          'Content-Type' : 'application/json'
        }
      })

      if (response.ok) {
        const data = await response.json()
        console.log(data.data)
      } else {
        toast.error('Error fetching materials')
      }
    }

    getAllTopicMaterials()
  }, [])

  function handleDeleteCourse() {
    console.log("Course Deleted")
  }

  return (
    <div className='space-y-8'> 

      {/* Header */}
      {/* <div className='w-full flex items-start justify-between'>
        <div className='space-y-2'>
          <h3 className='text-3xl font-bold'>{title}</h3>
          <p className='text-black/75'>{description}</p>
        </div>
        <div className='flex gap-x-4'>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant={'destructive'}>
                Delete Topic
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the topic
                  and remove the data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className='bg-red-500 hover:bg-red-400' onClick={handleDeleteCourse}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div> */}

      {/* Materials */}
      {/* <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-8'>
        <div className='border rounded-[6px] w-full min-h-[400px] px-6 py-4 space-y-4'>
          <h5 className='text-xl font-semibold'>Materials</h5>
          <div className='flex flex-col gap-y-2'>
            {topicData?.materials.map((item, index) => (
              <div key={index} className='border rounded-md px-4 py-2 flex items-center justify-between'>
                <p>{item.name} - {item.materialType}</p>
                <div className='flex gap-x-4'>
                  <PictureInPicture2 className='h-5 w-5 text-black/75' /> <Trash className='h-5 w-5 text-black/75' />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='border w-full rounded-[6px] min-h-[400px] px-6 py-4 space-y-4'>
          <h5 className='text-xl font-semibold'>Assigment</h5>
        </div>
      </div> */}
    </div>
  )
}

export default TopicDetailPage