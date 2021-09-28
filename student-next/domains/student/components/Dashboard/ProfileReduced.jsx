import React from 'react';
import Image from 'next/image';
import { Button, Group, Divider } from '@mantine/core';



export default function ProfileReduced() {
    return (
        <div className='max-w-sm w-full rounded-md shadow-sh-1-12-08 bg-white'>
            <div className='w-full'>
                <div className='py-4 px-3 text-center mb-3 font-bold bg-fa-primary-pattern rounded-t-md align-middle flex flex-row items-center justify-center text-white pointer-events-none select-none'>Welcome to findadmission</div>
                <div className='px-3 py-2'>
                    <div className='font-bold text-gray-700 text-lg text-center pointer-events-none select-none'>Good Evening, Bilal MEDDAH</div>
                    <div className='my-3 ml-3'>
                        <div className='font-light text-sm pointer-events-none select-none'>Account ID: <span className='font-bold text-sm text-gray-500'>333 122</span></div>
                        <div className='flex flex-row items-center text-sm font-light mt-1'>
                            <div className='mr-3 pointer-events-none select-none'>Basic Account </div>
                            <Button size='xs' radius={6} compact>Upgrade</Button>
                        </div>
                    </div>
                </div>
                <div className='py-5 px-5'>
                    <Group position='center'>
                        <div id='profile-reduced-wichlist' className='flex flex-col items-center justify-center'>
                            <div className='relative'>
                                <Image src='/student-dashboard-icons/whishlist.svg' width={48} height={48}/>
                                <div className='absolute -top-1 -right-2 bg-white text-primary shadow-sh-1-12-08 flex flex-col items-center justify-center rounded-full p-2 text-xs h-6 w-6'>4</div>
                            </div>
                            <div className='font-extralight text-sm mt-2'>Wichlist</div>
                        </div>
                        <Divider orientation='vertical' margins='sm'/>
                        <div id='profile-reduced-wichlist' className='flex flex-col items-center justify-center'>
                            <div className='relative'>
                                <Image src='/student-dashboard-icons/following.svg' width={48} height={48}/>
                                <div className='absolute -top-1 -right-2 bg-white text-primary shadow-sh-1-12-08 flex flex-col items-center justify-center rounded-full p-2 text-xs h-6 w-6'>12</div>
                            </div>
                            <div className='font-extralight text-sm mt-2'>Following</div>
                        </div>
                        <Divider orientation='vertical' margins='sm'/>
                        <div id='profile-reduced-wichlist' className='flex flex-col items-center justify-center'>
                            <div className='relative'>
                                <Image src='/student-dashboard-icons/news.svg' width={48} height={48}/>
                            </div>
                            <div className='font-extralight text-sm mt-2'>Feeds</div>
                        </div>

                    </Group>
                </div>
            </div>
        </div>
    )
}
