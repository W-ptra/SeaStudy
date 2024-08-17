"use client"

import React, { useEffect, useState } from 'react'
import { getLastPathSegment } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { toast } from 'sonner'

// ScrollArea Import
import { ScrollArea } from '@/components/ui/scroll-area'

// Form Import
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

// Icon Import
import { SendHorizontal, Trash } from 'lucide-react';
import { Trash2 } from 'lucide-react';

type postType = {
	courseId: number
	id: number
	message: string
	userId: number
}

const postSchema = z.object({
	message: z.string()
})

const ForumDetailPage = () => {
	const [posts, setPosts] = useState<postType[]>([])
	const [userId, setUserId] = useState<number>()
	const pathname = usePathname()
	const courseId = getLastPathSegment(pathname)

	useEffect(() => {
		function getUserId() {
			const studentId = localStorage.getItem('userId')
			// @ts-ignore
			setUserId(studentId)
			// console.log(userId)
		}

		getUserId()
	}, [])

	useEffect(() => {
		async function getAllPosts() {
			try {
				const response = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/post/course/${courseId}`, {
					method: 'GET',
					headers: {
						'Authorization': `Bearer ${localStorage.getItem("token")}`,
						'Content-Type': 'application/json'
					},
				})

				const data = await response.json()
				console.log(data.course)

				if (response.ok) {
					setPosts(data.course)
				} else {
					toast.error('Failed to get posts')
				}
			} catch (error) {
				toast.error('Error while get posts data')
			}
		}
		
		getAllPosts()
	}, [])

	const form = useForm<postType>({
		resolver: zodResolver(postSchema),
		defaultValues: {
			message: ""
		}
	})

	async function createPost(values: postType) {
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/post`, {
				method: 'POST',
				headers: {
					'Authorization': `Bearer ${localStorage.getItem("token")}`,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					courseId: courseId,
					message: values.message
				})
			})

			if (response.ok) {
				toast.success("Post created")
				location.reload()
			} else {
				toast.error("Failed to create post")
			}
		} catch (error: any) {
			toast.error("Error while creating post: ", error)
		}
	}

	return (
		<div className='flex flex-col items-center justify-between gap-y-4 '>
			<div className='w-full h-full p-4 border-2 border-white bg-white/25 shadow-custom rounded-xl min-h-[525px]'>
				<ScrollArea>
					{posts.map((item, index) => {
						return (
							<div key={index} className='mb-2 w-full bg-white/10 border-2 border-white rounded-md px-4 py-2 text-black/80 flex items-center justify-between'>
								<p>{item.message}</p>
								{
									item.userId === userId && (
										<Button className='bg-white rounded-full custom-shadow text-black'>
											<Trash />
										</Button>
									)	
								}
							</div>
						)
					})}
				</ScrollArea>
			</div>
			<div className='w-full h-full p-4 border-2 border-white bg-white/25 shadow-custom rounded-xl'>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(createPost)} className='flex items-center justify-between w-full gap-x-4'>
						<FormField 
							control={form.control}
							name='message'
							render={({ field }) => (
								<FormItem className='w-full'>
									<FormControl>
										<Input type="text" placeholder='Your comment about this course' {...field} className='w-full bg-white/10 focus-visible:ring-0 placeholder:text-white' />
									</FormControl>
								</FormItem>
							)}
						/>	
						<Button className='bg-white hover:bg-white text-black shadow-custom'>
							<SendHorizontal className='w-5 h-5' />
						</Button>
					</form>
				</Form>
			</div>
		</div>
	)
}

export default ForumDetailPage