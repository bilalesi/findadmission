import React, { useState } from 'react';
import Link from 'next/link';
import { Input, PasswordInput, Checkbox, Select, Grid, Col, InputWrapper } from '@mantine/core';
import { IoMail, IoLockClosed } from 'react-icons/io5';
import { MainPageLayout } from '../../layouts';
import Button, { ButtonLink } from '../../shared/components/Button';
import EntitySelector from './components/Entityselector';




export default function SigninPage() {
    const [selectedEntity, setSelectedEntity] = useState('');
    return (
        <MainPageLayout>
            <div className='h-full flex flex-col items-center justify-center flex-1'>
                <div className='max-w-md mx-auto sm:shadow-sh-6-16-12 flex w-full px-10 py-10 rounded-md'>
                    <div className='flex flex-col items-center justify-center w-full'>
                        <EntitySelector { ... { selectedEntity, setSelectedEntity } } />
                        <div className='w-full max-w-md my-2'>
                            <InputWrapper label='Email address'>
                                <Input 
                                    name="email"
                                    icon={<IoMail />}
                                    placeholder="Your email"
                                    size='md'
                                />
                            </InputWrapper>
                        </div>
                        <div className='w-full max-w-md my-2'>
                            <InputWrapper label='Password'>
                                <PasswordInput 
                                    name="password"
                                    icon={<IoLockClosed />}
                                    placeholder="Password"
                                    size='md'
                                />
                            </InputWrapper>
                        </div>
                        <div className='w-full max-w-md mt-1 mb-3'>
                            <Checkbox label="Remember me"/>
                        </div>
                        <div className='w-full max-w-md my-2'>
                            <Button.Primary title='Sign in'/>
                        </div>
                        <div className='w-full max-w-md mb-3 flex flex-row items-center justify-center'>
                            <Link href='/forget-password'>
                                <a className='text-primary text-center text-sm'>Forgotten your password?</a>
                            </Link>
                        </div>
                        <div className='w-full max-w-md my-2'><div className='w-full mx-auto my-2 h-px bg-background'/></div>
                        <div className='w-full max-w-md my-2'><div className='text-left text-sm pointer-events-none select-none'>Don't have an account? </div></div>
                        <div className='w-full max-w-md my-2'>
                            <ButtonLink.PrimaryOutline title='Get Started' href={selectedEntity ? `/signup?entity=${selectedEntity}` : '/signup'}/>
                        </div>
                    </div>
                </div>
            </div>
        </MainPageLayout>
    )
}
