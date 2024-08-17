"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link';

// Component Import
import { Button } from './ui/button';

// Icon Import
import { LogIn } from 'lucide-react';
import { GraduationCap } from 'lucide-react';
import { LogOut } from 'lucide-react';
import { Menu } from 'lucide-react';

// Sheet Import
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'sonner';

const Navbar = () => {
  const pathname = usePathname()
  const [userRole, setUserRole] = useState("")
  const [userId, setUserId] = useState()
  const [session, setSession] = useState()

  const router = useRouter()

  useEffect(() => {
    function getUserRoleAndId() {
      const role = localStorage.getItem('userRole')
      const studentId = localStorage.getItem('userId')
      const session = localStorage.getItem('token')
      // @ts-ignore
      setSession(session)

      console.log(session)

      if (role === 'Instructor') {
        setUserRole(role)
      } else {
        // @ts-ignore
        setUserId(studentId)
      }
    }

    getUserRoleAndId()
  }, [pathname])

  function logoutHandler() {
    localStorage.setItem('userRole', "")
    localStorage.setItem('userId', "")
    localStorage.setItem('token', "")
    toast.success("Successfully Signed Out")
    router.push("/")
  }

  return (
    <div className='fixed top-2 left-0 w-full px-4'>
      <header className='wrapper flex items-center justify-between text-white z-50 rounded-full border-2 border-white backdrop-blur-sm bg-white/20 shadow-custom'>
        {/* App Logo */}
        <h1 className='text-xl font-bold flex items-center gap-x-4 '>
          <GraduationCap className='w-8 h-8' /> SeaStudy
        </h1>

        {/* Navigation */}
        <nav className='hidden md:flex items-center justify-center gap-x-4'>
          <Link href="/">
            Home
          </Link>
          {session && (
            <Link href={userRole === 'Instructor' ? '/dashboard/instructor' : `/dashboard/${userId}`}>
              Dashboard
            </Link>
          )}
          <Link href="/courses">
            Courses
          </Link>
        </nav>

        {/* Sign In Button */}
        {!session ? (
          <Link href="/sign-in">
            <Button className='w-[140px] bg-white text-black hidden md:flex items-center justify-center rounded-full gap-2 hover:gap-4 transition-all hover:bg-white'>
              Sign In <LogIn className='w-5 h-5' />
            </Button>
          </Link>
        ):(
          <Button className='w-[140px] bg-white text-black hidden md:flex items-center justify-center rounded-full gap-2 hover:gap-4 transition-all hover:bg-white' onClick={logoutHandler}>
            Sign Out <LogOut className='w-5 h-5' />
          </Button>
        )}

        <Sheet>
          <SheetTrigger className='block md:hidden'>
            <Menu className='w-8 h-8' />
          </SheetTrigger>
          <SheetContent className='bg-gradient-to-b from-purple-400 to-blue-400 shadow-custom flex flex-col h-full items-center justify-center text-white text-xl space-y-8'>
            <Link href="/">
              Home
            </Link>
            {session && (
              <Link href={userRole === 'Instructor' ? '/dashboard/instructor' : `/dashboard/${userId}`}>
                Dashboard
              </Link>
            )}
            <Link href="/courses">
              Courses
            </Link>
            {!session ? (
              <Link href="/sign-in">
                <Button className='w-[120px] bg-white text-black hidden md:flex items-center justify-center rounded-full gap-2 hover:gap-4 transition-all hover:bg-white'>
                  Sign In <LogIn className='w-5 h-5' />
                </Button>
              </Link>
            ):(
              <Button className='w-[140px] bg-white text-black hidden md:flex items-center justify-center rounded-full gap-2 hover:gap-4 transition-all hover:bg-white' onClick={logoutHandler}>
                Sign Out <LogOut className='w-5 h-5' />
              </Button>
            )}
          </SheetContent>
        </Sheet>
      </header>
    </div>
  )
}

export default Navbar