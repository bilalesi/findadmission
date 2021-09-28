import React from 'react'
import SideBarContainer from '../domains/student/components/Sidebar'

export default function StudentLayout({ children }) {
    return (
        <div className='flex min-h-screen bg-gray-400'>
            <SideBarContainer />
            <main id='dashboard-container' className='bg-gray-200 relative flex-1 p-8 flex flex-col'>
                { children}
            </main>
        </div>
    )
}
