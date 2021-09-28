import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button, Group, Divider, ActionIcon } from '@mantine/core';
import { IoAddSharp } from 'react-icons/io5'


export default function Applications() {
    return (
        <div className='max-w-sm w-full rounded-md shadow-sh-1-12-08 bg-white'>
            <div className='w-full'>
                <div className='flex flex-row items-center px-4 pt-4 mt-4 rounded-t-md align-middle'>
                    <Image src='/student-dashboard-icons/application_fill.svg' width={28} height={28}/>
                    <div className='ml-2 font-bold text-gray-700 text-lg pointer-events-none select-none '>Applications</div>
                </div>
                <div className='px-4 py-3'>
                    <div className='text-sm font-normal text-gray-500'> You can submit a <Link href='/'><a className='text-secondary text-sm'>maximum of 2 applications</a></Link>, You haven't submitted any yet! </div>
                </div>
                <div className='px-4 py-14 w-full flex items-center justify-center'>
                    <ActionIcon 
                        variant='filled'
                        color='green' size='xl' radius='xl'><IoAddSharp size='22'/></ActionIcon>
                </div>
            </div>
        </div>
    )
}
