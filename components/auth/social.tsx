'use client'

import React from 'react'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { Button } from '../ui/button'
import OuterLayoutRouter from 'next/dist/client/components/layout-router'


export function Social() {

  return (
    <div className='flex items-center w-full gap-2'>
        <Button size={'lg'} className='w-full' variant={'outline'} onClick={()=>{}}>
            <FcGoogle/>
        </Button>
        <Button size={'lg'} className='w-full' variant={'outline'} onClick={()=>{}}>
            <FaGithub/>
        </Button>
    </div>
  )
}