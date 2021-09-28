import React from 'react';
import Image from 'next/image';
import { TextInput, Button, ActionIcon } from '@mantine/core';
import { FacebookCircle, LinkedinCircle, TwitterCircle } from '../../../../shared/icons-jsx';



export default function EarnPoints() {
    return (
        <div className='max-w-sm w-full rounded-md shadow-sh-1-12-08 bg-white'>
            <div className='w-full'>
                <div className='flex flex-row items-center px-4 pt-4 mt-4 rounded-t-md align-middle'>
                    <div className='ml-2 font-bold text-gray-700 text-lg pointer-events-none select-none'>Refer friends and earn points</div>
                </div>
                <div className='px-4 py-3'>
                    <div className='text-sm px-2 font-normal text-gray-500 text-justify'> Get your friends to use your URL to sign up to Findadmission and earn point for visa counselling, scholarship consultation and more.</div>
                </div>
                <div className='px-4 py-5 w-full flex'>
                    <Image src='/student-dashboard-icons/point.svg' width={32} height={32} />
                    <div className='flex flex-row items-center ml-3'>
                        <div className='font-bold text-xl text-gray-600'>12</div>
                        <div className='font-bold text-base ml-2 text-gray-400'>Points</div>
                    </div>
                </div>
                <div className='px-4 py-3'>
                    <TextInput
                        placeholder="Link to refer"
                        size='md'
                    />
                    <div className='flex flex-row items-center flex-wrap justify-between mt-3'>
                        <Button
                            size='md'
                            variant="gradient"
                            gradient={{ from: 'indigo', to: 'cyan' }}
                            style={{ marginTop: 8 }}
                        >Copy link</Button>
                        <div className='grid grid-flow-col auto-cols-max gap-2 items-center justify-around mt-2'>
                            <ActionIcon radius='xl' size='lg'><FacebookCircle/></ActionIcon>
                            <ActionIcon radius='xl' size='lg'><LinkedinCircle/></ActionIcon>
                            <ActionIcon radius='xl' size='lg'><TwitterCircle/></ActionIcon>
                        </div>
                    </div>
                </div>
                <div className='px-4 py-3'>
                    <Button 
                        fullWidth size='md' variant="gradient"
                        gradient={{ from: 'teal', to: 'lime', deg: 105 }}
                    >Click here to refer</Button>
                    <Button 
                        fullWidth size='md' variant="gradient"
                        variant="outline" color='teal'
                        style={{ marginTop: 12 }}
                    >Use your points for booking</Button> 

                </div>
            </div>
        </div>
    )
}
