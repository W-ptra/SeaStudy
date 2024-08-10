import { testimonialsData } from '@/lib/constants'
import React from 'react'

const Testimonials = () => {
  return (
    <div className='wrapper space-y-8'>
      <h3 className='text-3xl font-bold text-center'>Testimonials</h3>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {testimonialsData.map((item, index) => {
          return (
            <div key={index} className='text-center border-black p-4 border-2 rounded-lg flex flex-col justify-between gap-y-4'>
              <p>"{item.testimonial}"</p>
              <div>
                <p>- {item.name}</p>
                <p className='text-[14px] text-black/70'>{item.position}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Testimonials