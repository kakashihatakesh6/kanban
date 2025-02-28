'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function NotFound() {
  const router = useRouter();
  useEffect(() => {
    router.push('/404')
  }, [router])
  
  return (
    <div className="flex w-full items-center justify-center min-h-screen bg-gradient-to-r from-gray-400 via-zinc-500 to-zinc-850">
      
    </div>
  )
}