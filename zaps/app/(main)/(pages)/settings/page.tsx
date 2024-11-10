import { ProfileForm } from '@/components/forms/profile-form';
import React from 'react'

const SettingsPage = () => {
    return <div className='flex flex-col gap-4 relative'>
        <h1 className='text-4xl sticky top-0 z-[10] p-6 bg-background/50 
        backdrop-blur-lg flex items-center border-b min-w-full'>
            Settings
        </h1>
        
        <div className='p-6'>
            <ProfileForm />
        </div>
    </div>
}

export default SettingsPage;