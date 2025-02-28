'use client';

import { AlertCircle, Home } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'


export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex w-full items-center justify-center min-h-screen relative">
      <Image
        loading="lazy"
        src="/new-bg.png"
        alt=""
        layout={"fill"}
        objectFit={"cover"}
        className=' bg-blend-overlay bg-black/10 bg-no-repeat bg-cover '
      />
    {/* <div   style={{ backgroundImage: `url(${'/new-bg.png'})` }} className="flex w-full items-center justify-center min-h-screen bg-gradient-to-r from-gray-400 via-zinc-500 to-zinc-850"> */}
    <div className='dark:bg-black/50 z-10 w-full h-full grid place-items-center'>

      <div className="text-center text-white px-4  ">
        <h1 className="text-6xl md:text-8xl font-bold mb-4">404</h1>
        <p className="text-3xl md:text-4xl font-light mb-8">Page not found</p>
        <div className="mb-8">
          <AlertCircle className="w-24 h-24 md:w-32 md:h-32 mx-auto text-red-500 animate-pulse" />
        </div>
        <p className="text-xl md:text-2xl mb-8">
          We&apos;re sorry, but the page you&apos;re looking for doesn&apos;t exist.
        </p>

        <button onClick={() => {router.push('/dashboard')}}>
          <Home className="w-5 h-5 mr-2" />
          Go back home
        </button>
      </div>
    </div>
    </div>
  )
}