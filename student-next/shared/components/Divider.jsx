import React from 'react'

export default function Divider({ horizantal = false }) {
    return (
        <div className={`${horizantal ? 'w-full h-px' : 'w-px h-full'} bg-background`}/>
    )
}
