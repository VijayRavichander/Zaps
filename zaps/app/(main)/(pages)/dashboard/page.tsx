import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import React from 'react'

const DashboardPage = async () => {
    const session = await auth();


    return <div className='flex flex-col gap-4 relative'>
        <h1 className='text-4xl sticky top-0 z-[10] p-6 bg-background/50 
        backdrop-blur-lg flex items-center border-b min-w-full'>
            Dashboard
        </h1>
        <div>
            {JSON.stringify(session)}
        </div>
    </div>
}

export default DashboardPage;