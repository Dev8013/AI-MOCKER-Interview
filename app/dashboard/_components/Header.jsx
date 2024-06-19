"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

function Header() {

    //To show active tab
    const path=usePathname();

    useEffect(()=>{
        console.log(path)
    },[])

  return (
    <div className='flex p-4 items-center justify-between bg-secondary shadow-sm'>
        <Image src={'/logo.svg'} 
        width={160}
        height={100}
        alt='logo'
        />
        <ul className='hidden md:flex gap-6'>
            <li className= {`hover:font-bold hover:text-primary transition-all cursor-pointer 
            ${path== '/dashboard'&&'text-primary font-bold'}
            `}
            >Dashboard</li>
            <li className={`hover:font-bold hover:text-primary transition-all cursor-pointer 
            ${path=='/questions'&&'text-primary font-bold'}`
            }>Questions</li>
            <li className={`hover:font-bold cursor-pointer hover:text-primary transition-all
            ${path=='/upgrade'&&'text-primary font-bold'}`
            }>Upgrade</li>
            <li className={`hover:font-bold hover:text-primary transition-all cursor-pointer 
            ${path=='/how'&&'text-primary font-bold'}`
            }>How it Worls?</li>
        </ul>

        <UserButton />
    
      
    </div>
  )
}

export default Header
