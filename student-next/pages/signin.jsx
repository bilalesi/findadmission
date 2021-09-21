import React from 'react';
import Link from 'next/link';
import { Input, PasswordInput, Checkbox } from '@mantine/core';
import { IoMail, IoLockClosed } from 'react-icons/io5';
import { MainPageLayout } from '../layouts';
import Button from '../shared/components/Button';



export default function Signin() {
    return (
        <MainPageLayout>
            <div className='h-full flex flex-col items-center justify-center flex-1'>
                <div className='max-w-md mx-auto sm:shadow-sh-6-16-12 flex w-full px-10 py-10 rounded-md'>
                    <div className='flex flex-col items-center justify-center w-full'>
                        <div className='w-72 max-w-md my-2'>
                            <label htmlFor="email" className='font-light text-sm text-gray-500'>Email</label>
                            <Input 
                                name="email"
                                icon={<IoMail />}
                                placeholder="Your email"
                                // className='max-w-sm'
                                size='md'
                            />
                        </div>
                        <div className='w-72 max-w-md my-2'>
                            <label htmlFor="email" className='font-light text-sm text-gray-500'>Password</label>
                            <PasswordInput 
                                name="password"
                                icon={<IoLockClosed />}
                                placeholder="Password"
                                size='md'
                            />
                        </div>
                        <div className='w-72 max-w-md my-2'>
                            <Checkbox label="Remember me"/>
                        </div>
                        <div className='w-72 max-w-md my-2'>
                            <Button.Primary title='Sign in'/>
                        </div>
                        <div className='w-72 max-w-md my-2 flex flex-row items-center justify-center'>
                            <Link href='/forget-password'>
                                <a className='text-primary text-center text-sm'>Forgotten your password?</a>
                            </Link>
                        </div>
                        <div className='w-72 max-w-md my-2'><div className='w-full mx-auto my-2 h-px bg-background'/></div>
                        <div className='w-72 max-w-md my-2'><div className='text-left text-sm pointer-events-none select-none'>Don't have an account? </div></div>
                        <div className='w-72 max-w-md my-2'>
                            <Button.PrimaryOutline title='Get Started'/>
                        </div>
                    </div>
                </div>
            </div>
        </MainPageLayout>
    )
}
