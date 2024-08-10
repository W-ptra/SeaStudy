"use client"

import React, { useEffect, useState } from 'react'
import { LogIn } from 'lucide-react';
import { Button } from './ui/button';
import { BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

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
        <h1 className='text-xl font-bold flex items-center gap-x-4'>
          <BookOpen className='w-6 h-6' /> SeaStudy
        </h1>
        <nav>
          {/* IF THE USER HASN'T LOGGED IN */}
          <Button className='w-[120px] hidden md:flex items-center justify-center rounded-full gap-2 hover:gap-4 transition-all'>
            Log In <LogIn className='w-4 h-4' />
          </Button>
        </nav>
      </header>
    </div>
  )
}

export default Navbar