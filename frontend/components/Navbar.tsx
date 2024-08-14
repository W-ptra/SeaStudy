"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { cn } from '@/lib/utils';

// Component Import
import { Button } from './ui/button';

// Icon Import
import { LogIn } from 'lucide-react';
import { GraduationCap } from 'lucide-react';

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
    <div className={cn(
     'fixed top-0 left-0 w-full bg-white z-20', isScrolled ? "border-b-2 border-black" : "border-none"
    )}>
      <header className='wrapper flex items-center justify-between'>
        {/* App Logo */}
        <h1 className='text-xl font-bold flex items-center gap-x-4'>
          <GraduationCap className='w-8 h-8' /> SeaStudy
        </h1>

        {/* Navigation */}
        <nav className='flex items-center justify-center gap-x-4'>
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
          <Button className='w-[120px] hidden md:flex items-center justify-center rounded-full gap-2 hover:gap-4 transition-all'>
            Sign In <LogIn className='w-5 h-5' />
          </Button>
        </Link>
      </header>
    </div>
  )
}

export default Navbar