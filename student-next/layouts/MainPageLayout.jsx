import React from 'react'
import { Header, Footer } from '../shared/components'


export default function MainPageLayout({ children }) {
    return (
        <>
           <Header/>
           <main id='root' className='min-h-exclude-header h-full flex flex-col w-full'>
                {children}
           </main>
           <Footer/> 
        </>
    )
}
