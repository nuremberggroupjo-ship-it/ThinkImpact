import React from 'react'
import { AppName } from '@/lib/constants'
export default function Footer() {
    const CurrentDate=new Date().getFullYear();
  return (
    <footer className='flex justify-center px-4 border-t border-b-slate-200 p-5'>{CurrentDate} {AppName}. All Rights Reaserved</footer>
  )
}
