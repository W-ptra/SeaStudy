import React from 'react'
import { Button } from '../ui/button'
import { Sparkles } from 'lucide-react';

const CTA = () => {
  return (
    <div className='wrapper text-center space-y-8 flex flex-col items-center'>
      <div className='space-y-2'>
        <h3 className='text-3xl font-bold'>Start Your Learning Journey Today!</h3>
        <p className='text-black/70'>Transform your career, gain new skills, and achieve your goals with Sea Study.</p>
      </div>
      <Button className='rounded-full w-[200px] flex items-center gap-4'>
        Join Now <Sparkles className='h-5 w-5' />
      </Button>
    </div>
  )
}

export default CTA