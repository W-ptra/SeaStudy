"use client"

import React from 'react'
import { LogIn } from 'lucide-react';
import { Button } from './ui/button';

const Navbar = () => {
  return (
    <header className='wrapper flex items-center justify-between'>
      <h1 className='text-xl font-bold'>
        SeaStudy
      </h1>
      <nav>
        {/* IF THE USER HASN'T LOGGED IN */}
        <Button className='w-[120px] flex items-center justify-center rounded-full gap-2 hover:gap-4 transition-all'>
          Log In <LogIn className='w-4 h-4' />
        </Button>
      </nav>
    </header>
  )
}

export default Navbar