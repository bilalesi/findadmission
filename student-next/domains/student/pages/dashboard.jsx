import React from 'react'
import { ProfileReduced, Applications, EarnPoints, NeedHelp } from '../components/Dashboard';




export default function Dashboard() {
    return (
        <div className='grid grid-flow-row grid-cols-1 md:grid-flow-col md:auto-cols-fr max-w-6xl mx-auto px-4 gap-6 '>
            <div className='w-full'>
                <ProfileReduced/>
                <Applications/>
                <EarnPoints/>
            </div>
            <div className='w-full'>
                <NeedHelp/>
            </div>
            <div className='w-full'>
                <NeedHelp/>
            </div>
        </div>
    )
}
