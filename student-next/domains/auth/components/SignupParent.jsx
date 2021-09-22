import React from 'react';
import { motion } from 'framer-motion';
import { Input, PasswordInput, Checkbox, Grid, Col, Select, InputWrapper, RadioGroup, Radio } from '@mantine/core';
import Button from '../../../shared/components/Button';
import styles from '../auth.module.scss';

export default function SignupParent() {
    return (
        <motion.div 
            className='w-full'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <Grid>
                {/* Parent Part */}
                <Col span={12} md={6}>
                    <InputWrapper label="Full name" >
                        <Input size='md' id="input-demo" placeholder="Your email" />
                    </InputWrapper>
                </Col>
                <Col span={12} md={6}>
                    <InputWrapper label="Email address" >
                        <Input size='md' id="input-demo" placeholder="Your email" />
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
                <Col span={12} className={`${styles.label_form_input}`}>
                    <label>Phone Number</label>
                </Col>
                <Col span={3} className={`${styles.label_form_input_above}`}>
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
                <Col span={9} className={`${styles.label_form_input_above}`}>
                    <Input size='md' />
                </Col>
                <Col span={3} className={`${styles.label_form_input}`}>
                    <label>What's up number</label>
                </Col>
                <Col span={9} className={`${styles.label_form_input}`}>
                    <Checkbox label='Copy from above' className='text-sm' />
                </Col>
                <Col span={3} className={`${styles.label_form_input_above}`}>
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
                <Col span={9} className={`${styles.label_form_input_above}`}>
                    <Input size='md' />
                </Col>
            </Grid>
            <div className='w-11/12 mx-auto h-px bg-gray-300 my-8'></div>
            {/* Student Part */}
            <Grid>
                <Col span={12} md={6}>
                    <InputWrapper label="First name" >
                        <Input size='md' id="input-demo" placeholder="Your email" />
                    </InputWrapper>
                </Col>
                <Col span={12} md={6}>
                    <InputWrapper label="Last name" >
                        <Input size='md' id="input-demo" placeholder="Your email" />
                    </InputWrapper>
                </Col>
                <Col span={12} md={6}>
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
                <Col span={12} md={6}>
                    <InputWrapper label="Region/State" >
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
                <Col span={12} className={`${styles.label_form_input}`}>
                    <label>Date of birth</label>
                </Col>
                <Col span={12} md={4} className={`${styles.label_form_input_above}`}>
                    <Select
                        placeholder="DD"
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
                <Col span={12} md={4} className={`${styles.label_form_input_above}`}>
                    <Select
                        placeholder="MM"
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
                <Col span={12} md={4} className={`${styles.label_form_input_above}`}>
                    <Select
                        placeholder="YYYY"
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
                <Col span={12}>
                    <div>By clicking ''Create Account ", you are indicating you agree to our <a href='/' className='text-blue-600'>Terms of Service</a> and <a href='/' className='text-blue-600'>Privacy Policy</a> also agree to reciving news and tips via email or push notification</div>
                </Col>
                <div className='max-w-sm mx-auto w-full my-4'>
                    <Button.Primary title='Create Account' className='w-full' />
                </div>
            </Grid>
        </motion.div>
    )
}
