"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { cn } from '@/lib/utils';

// Component Import
import { Button } from './ui/button';

// Icon Import
import { LogIn } from 'lucide-react';
import { GraduationCap } from 'lucide-react';
import { Menu } from 'lucide-react';

// Sheet Import
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
          <Link href="/dashboard">
            Dashboard
          </Link>
          <Link href="/courses">
            Courses
          </Link>
        </nav>

        {/* Sign In Button (IF THE USER HASN'T LOGGED IN) */}
        <Link href="/sign-in">
          <Button className='w-[120px] bg-white text-black hidden md:flex items-center justify-center rounded-full gap-2 hover:gap-4 transition-all hover:bg-white font-bold'>
            Sign In <LogIn className='w-5 h-5' />
          </Button>
        </Link>

        <Sheet>
          <SheetTrigger className='block md:hidden'>
            <Menu className='w-8 h-8' />
          </SheetTrigger>
          <SheetContent className='bg-gradient-to-b from-purple-400 to-blue-400 shadow-custom flex flex-col h-full items-center justify-center text-white text-xl space-y-8'>
            <Link href="/">
              Home
            </Link>
            <Link href="/dashboard">
              Dashboard
            </Link>
            <Link href="/courses">
              Courses
            </Link>
            <Link href="/sign-in">
              <Button className='w-[120px] bg-white text-black items-center justify-center rounded-full gap-2 hover:gap-4 transition-all hover:bg-white font-bold'>
                Sign In <LogIn className='w-5 h-5' />
              </Button>
            </Link>
          </SheetContent>
        </Sheet>
      </header>
    </div>
  )
}

export default Navbar