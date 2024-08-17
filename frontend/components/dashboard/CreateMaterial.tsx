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
import { MaterialSchema, MaterialSchemaType, TopicSchema, TopicSchemaType } from '@/lib/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Textarea } from '../ui/textarea'

// Toaster Import
import { toast } from 'sonner'
import { usePathname } from 'next/navigation'
import { getLastPathSegment } from '@/lib/utils'
import { Result } from 'postcss'

const CreateMaterial = () => {
  const pathname = usePathname()
  const lastPathname = getLastPathSegment(pathname)
  const topicId = parseInt(lastPathname)

  const [isOpen, setIsOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File>()
  const [materialName, setMaterialName] = useState('')

//   const form = useForm<MaterialSchemaType>({
//     resolver: zodResolver(MaterialSchema),
//     defaultValues: {
//         name: "",
//         type: "",
//         link: "",
//         topicId: topicId
//     }
//   })

//   interface FormSchema {
//     name: string;
//     file: File;
//   }

//   async function onSubmit(formData: FormSchema) {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!selectedFile){
        toast.error("Please upload material file")
    }
    if (!materialName){
        toast.error("Material title must be filled")
    }
    const formData = new FormData()
    formData.append('materials',selectedFile)
    console.log(selectedFile)
    let result

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/material/upload`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            },
            body: formData
        });
        console.log(response)

        result = await response.json();

        if (response.ok) {
          console.log('File uploaded successfully:', result)
        } else {
          console.log('Error uploading file:', result.message)
          return
        }
      } catch (error) {
        console.log('Network error:', error);
        return
      }

    const values = {
        name: materialName,
        type: "document",
        link: result,
        topicId: topicId
    }
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/material/`, {
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
        toast("Material Created Successfully");
      } else {
        toast.error("Failed to create material");
      }
    } catch (error) {
      
    }
    toast("Topic Created Successfully")
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className='bg-white hover:bg-white shadow-custom text-black rounded-full'>Create Material</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Material</DialogTitle>
          <DialogDescription>
            Create a new material for this topic
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
            <input type='text' name='name' placeholder='Material Title'
            onChange={(e) => {
                setMaterialName(e.target.name)
            }}></input>
            <input type='file' name='file'
            onChange={(e) => {
                setSelectedFile(e.target.files?.[0])
            }}></input>
            <Button type='submit' className='w-full'>
              Create Material
            </Button>
        </form>
        {/* <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <div className='space-y-2'>
              <FormField 
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Material Title</FormLabel>
                    <FormControl>
                      <Input type='text' placeholder='Material Title' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField 
                control={form.control}
                name='link'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Material Title</FormLabel>
                    <FormControl>
                      <Input type='file'/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type='submit' className='w-full'>
              Create Material
            </Button>
          </form>
        </Form> */}
      </DialogContent>
    </Dialog>
  )
}

export default CreateMaterial