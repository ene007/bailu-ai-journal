import Link from 'next/link'
import { auth } from '@clerk/nextjs/server'


export default async function Home() {
  const { userId } = await auth()
  let href = userId ? '/journal' : '/new-user'

  return (
    <div className='w-screen h-screen bg-black
      flex justify-center items-center text-white'
    >
      <div className='w-full max-w-[600px] mx-auto'>
        <h1 className='text-6xl mb-4'>Bailu AI Journal</h1>
        <p className='text-2xl text-white/60 mb-4'>This app is perfect for keeping track of your emotions over the course of your life. Simply stay truthful to yourself, and let it do the rest</p>
        <div>
          <Link href={href}>
            <button className='bg-blue-600 px-4 py-2 p-4 rounded-lg'> get started</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
