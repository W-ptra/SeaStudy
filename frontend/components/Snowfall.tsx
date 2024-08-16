"use client"

import React from 'react'
import { Snowfall } from 'react-snowfall'

const SnowfallComponent = () => {
  return (
    <div className=''>
      <Snowfall
        color="white" // Color of the snowflakes
        snowflakeCount={200} // Number of snowflakes
      />
    </div>
  )
}

export default SnowfallComponent