"use client"
import CTA from "@/components/home/CTA";
import Features from "@/components/home/Features";
import Hero from "@/components/home/Hero";
import PopularCoursesCard from "@/components/home/PopularCourses";
import PopularCourses from "@/components/home/PopularCourses";
import Testimonials from "@/components/home/Testimonials";
import SnowfallComponent from "@/components/Snowfall";
import { Button } from "@/components/ui/button";
import { CourseDataType } from "@/lib/schemas";
import { Star } from "lucide-react";
import React, { useEffect, useState } from 'react'
import { toast } from "sonner";

// Snowfall Import

export default function Home() {
  const [courses, setCourses] = useState<CourseDataType[]>([])

  useEffect(() => {
    async function getAllCourses() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/course/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        })

        if (response.ok) {
          const data = await response.json()
          console.log(data)
          setCourses(data.courses.sort((a:CourseDataType, b:CourseDataType) => b.avgRating - a.avgRating).slice(0, 6))
        } else {
          toast.error('Failed to fetch courses')
        }
      } catch (error: any) {
        toast.error('Error fetching courses:', error)
      }
    }

    getAllCourses()
  }, [])
  return (
    <main className="space-y-8 md:space-y-16 lg:space-y-24">
      <SnowfallComponent />
      <Hero />
      <Features />
      <PopularCourses popularCourses={courses} />
      <Testimonials />
      <CTA />
    </main>
  );
}
