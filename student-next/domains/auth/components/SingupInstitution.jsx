import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Input, PasswordInput, Checkbox, Grid, Col, Select, InputWrapper, RadioGroup, Radio, Title } from '@mantine/core';
import Button from '../../../shared/components/Button';
import styles from '../auth.module.scss';

export default function SignupInstitution() {
    return (
        <motion.div
            className='w-full'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <div className='mb-4'>
                <Title order={3} className='mb-4'>Entity Information</Title>
            </div>
            <Grid>
                <Col span={12}>
                    <InputWrapper label="Institution/Organisation title" >
                        <Input size='md' id="input-demo" placeholder="Your email" />
                    </InputWrapper>
                </Col>
                <Col span={12} md={4}>
                    <InputWrapper label="Country" >
                        <Select
                            placeholder="Pick one"
                            data={[
                                { value: 'react', label: 'React' },
                                { value: 'ng', label: 'Angular' },
                                { value: 'svelte', label: 'Svelte' },
                                { value: 'vue', label: 'Vue' },
                            ]}
                            size='md'
                            clearable
                        />
                    </InputWrapper>
                </Col>
                <Col span={12} md={8}>
                    <InputWrapper label='Entity phone'>
                        <Grid>
                            <Col span={4} md={4}>
                                <Select
                                    placeholder="Pick one"
                                    data={[
                                        { value: 'react', label: 'React' },
                                        { value: 'ng', label: 'Angular' },
                                        { value: 'svelte', label: 'Svelte' },
                                        { value: 'vue', label: 'Vue' },
                                    ]}
                                    size='md'
                                    clearable
                                />
                            </Col>
                            <Col span={8} md={8}>
                                <Input size='md' placeholder="Number" />
                            </Col>
                        </Grid>

                    </InputWrapper>
                </Col>
            </Grid>
            <div className='w-11/12 mx-auto h-px bg-gray-300 my-8'></div>
            <div className='mb-4'>
                <Title order={3}>Personal Information</Title>
            </div>
            <Grid>
                <Col span={12} md={4}>
                    <InputWrapper label="First name" >
                        <Input size='md' id="input-demo" placeholder="Your email" />
                    </InputWrapper>
                </Col>
                <Col span={12} md={4}>
                    <InputWrapper label="Last name" >
                        <Input size='md' id="input-demo" placeholder="Your email" />
                    </InputWrapper>
                </Col>
                <Col span={12} md={4}>
                    <InputWrapper label="Gender" >
                        <Select
                            placeholder="Pick one"
                            data={[
                                { value: 'react', label: 'React' },
                                { value: 'ng', label: 'Angular' },
                                { value: 'svelte', label: 'Svelte' },
                                { value: 'vue', label: 'Vue' },
                            ]}
                            size='md'
                            clearable
                        />
                    </InputWrapper>
                </Col>
                <Col span={12} md={6}>
                    <InputWrapper label="Email" >
                        <Input size='md' id="input-demo" placeholder="Your email" />
                    </InputWrapper>
                </Col>
                <Col span={12} md={6}>
                    <InputWrapper label="Job title" >
                        <Input size='md' id="input-demo" placeholder="Your email" />
                    </InputWrapper>
                </Col>
                <Col span={12}>
                    <InputWrapper label='Entity phone'>
                        <Grid>
                            <Col span={3}>
                                <Select
                                    placeholder="Ind"
                                    data={[
                                        { value: 'react', label: 'React' },
                                        { value: 'ng', label: 'Angular' },
                                        { value: 'svelte', label: 'Svelte' },
                                        { value: 'vue', label: 'Vue' },
                                    ]}
                                    size='md'
                                    clearable
                                />
                            </Col>
                            <Col span={7}>
                                <Input size='md' placeholder="Number" />
                            </Col>
                            <Col span={2}>
                                <Input size='md' placeholder="Ext" />
                            </Col>
                        </Grid>
                    </InputWrapper>
                </Col>
                <Col span={12} md={6}>
                    <InputWrapper label="Password" >
                        <PasswordInput size='md' />
                    </InputWrapper>
                </Col>
                <Col span={12} md={6}>
                    <InputWrapper label="Confirm password" >
                        <PasswordInput size='md' />
                    </InputWrapper>
                </Col>
            </Grid>

            <Col span={12} className='my-4'>
                <div>By clicking ''Create Account ", you are indicating you agree to our <a href='/' className='text-blue-600'>Terms of Service</a> and <a href='/' className='text-blue-600'>Privacy Policy</a> also agree to reciving news and tips via email or push notification.</div>
            </Col>
            <div className='max-w-sm mx-auto w-full my-4'>
                <Button.Primary title='Join us' className='w-full' />
                <div className='font-normal text-gray-600 text-sm mt-3 text-center'>Already have an account ? <Link href='/signin'><a className='font-normal text-blue-600 underline'>Sign in</a></Link></div>
            </div>
        </motion.div>
    )
}
