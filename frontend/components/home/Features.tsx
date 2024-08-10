"use client"

import React from 'react'
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import Image from 'next/image';
import { featureItems } from '@/lib/constants';

const Features = () => {
  return (
    <div className='wrapper space-y-8'>
      <h3 className='text-3xl font-bold text-center md:text-start'>Why Choose SeaStudy?</h3>
      <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {featureItems.map(item => (
          <FeatureCard key={item.label} label={item.label} description={item.description} image={item.image} />
        ))}
      </div>
    </div>
  )
}

export default Features

const FeatureCard = ({
  label,
  description,
  image,
}:{
  label: string,
  description: string,
  image: string,
}) => {
  return (
    <CardContainer>
      <CardBody className="relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black w-auto rounded-lg p-6 border h-full">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-black dark:text-white"
        >
          {label}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-black/70 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          {description}
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <Image
            src={image}
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
      </CardBody>
    </CardContainer>
  )
}