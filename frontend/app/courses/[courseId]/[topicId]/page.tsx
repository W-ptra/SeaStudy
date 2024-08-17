"use client"

import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AssignmentDataType, MaterialDataType, TopicDataType } from '@/lib/schemas';
import { getLastPathSegment } from '@/lib/utils';
import { Link } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

const TopicDetailPage = () => {

  const [topicDetail, setTopicDetail] = useState<TopicDataType>()
  const [materials, setMaterials] = useState<MaterialDataType[]>([])
  const [assignments, setAssignments] = useState<AssignmentDataType[]>([])
  const [currentDisplayType,setCurrentDisplayType] = useState('Material')
  const [currentMaterial, setCurrentMaterial] = useState<MaterialDataType>()
  const [currentAssignment, setCurrentAssignment] = useState<AssignmentDataType>()

  const pathname = usePathname();
  const lastPathname = getLastPathSegment(pathname)
  const topicId = parseInt(lastPathname)

  useEffect(() => {
    async function getTopicDetail(topicId: number) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/topic/${topicId}`, {
          method: 'GET',
          headers: {
            'Content-Type' : 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          }
        })
        console.log(response)

        if (response.ok) {
          const data = await response.json()
          console.log(data)
          setTopicDetail(data.data)
          setMaterials(data.data.material)
          setAssignments(data.data.assignment)
          setCurrentDisplayType('Material')
          setCurrentMaterial(data.data.material[0])
        } else {
          toast.error('Failed to fetch topic detail')
        }
      } catch (error: any) {
        toast.error('Error fetching topic detail:', error)
      } 
    }

    getTopicDetail(topicId)
  }, [])

  return (
    <div className='space-y-8'>

      {/* Header */}
      <div className='w-full flex items-start justify-between'>
        <div className='space-y-2'>
          <h3 className='text-3xl font-bold text-white flex gap-x-4'>{topicDetail?.title}</h3>
          <p className='text-white/75'>{topicDetail?.description}</p>
        </div>
      </div>

      {/* materials */}
      <div className='flex justify-around w-full'>
        {/* Somewhat navbar buat materials dan assignments */}
        <div className='flex flex-col w-[20%]'>
          {materials.map((item, index) => {
            return (
              <div key={item.id} className='flex justify-between bg-white/20 border-2 shadow-custom'
              onClick={() => {
                setCurrentDisplayType('Material')
                setCurrentMaterial(item)
              }}>
                {item.name}
              </div>
            )
          })}
          {assignments.map((item, index) => {
            return (
              <div key={item.id} className='flex justify-between bg-white/20 border-2 shadow-custom'
              onClick={() => {
                setCurrentDisplayType('Assignment')
                setCurrentAssignment(item)
              }
              }
              >
                [Assignment] {item.name}
              </div>
            )
          })}
        </div>
        <div className='flex justify-center items-start w-[75%] h-[500px]'>
          {
            currentDisplayType === 'Material' && 
            <div>
              <h3>{currentMaterial?.name}</h3>
              <iframe src={currentMaterial?.link} title="PDF Viewer" className='w-full h-full' />
            </div>
          }
          {
            currentDisplayType === 'Assignment' &&
            <div>
              <h3>{currentAssignment?.name}</h3>
              <p>{currentAssignment?.description}</p>
              {/* Upload file submission */}
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default TopicDetailPage