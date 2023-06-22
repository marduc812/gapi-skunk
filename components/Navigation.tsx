import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Navigation = () => {
  return (
    <div className='flex flex-row items-center justify-between m-5'>
      <div>
        <Link href='/'>
          <Image src='/logo-gapi.webp' alt='gapiskunk logo' width={100} height={100} />
        </Link>
        
      </div>
      <div className='flex flex-row font-bold text-lg items-center'>
        <Link className='mx-5' href='/gapis'>G-APIs</Link>
        <Link className='mx-5' href='https://github.com/marduc812/gapi-skunk' target='_blank'>Github</Link>
      </div>
    </div>
  )
}

export default Navigation