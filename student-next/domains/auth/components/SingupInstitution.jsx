import React from 'react';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as yup from 'yup';
import _ from 'lodash';
import { motion } from 'framer-motion';
import { Input, PasswordInput, Checkbox, Grid, Col, Select, InputWrapper, RadioGroup, Radio, Title } from '@mantine/core';
import Button from '../../../shared/components/Button';
import { fetcher } from '../../../network/fetcher';


const initialValues = {
    name: "",
    country: "",
    phone_indicatif: "",
    institution_phone: "",
    firstname: "",
    lastname: "",
    gender: "",
    email: "",
    job_title: "",
    creator_phone_indicatif: "",
    creator_phone: "",
    creator_phone_ext: "",
    password: "",
    confirm_password: "",
}
const validationSchema = yup.object({
    fistname: yup.string().required(),
    lastname: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).max(14).required(),
    confirm_password: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required(),
    country: yup.string().required(),
    region_state: yup.string().required(),
    birthday_day: yup.string().required(),
    birthday_month: yup.string().required(),
    birthday_year: yup.string().required(),
    phone_indicatif: yup.string().required(),
    phone: yup.string().required(),
    whatsup_number_indicatif: yup.string().required(),
    whatsup_number: yup.string().notRequired().nullable(),
})

export default function SignupInstitution() {
    const { handleSubmit, values, errors, handleBlur, handleChange, setFieldValue, setFieldTouched } = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        validateOnChange: true,
        validateOnBlur: true,
    });
    const { data: dataCountries } = fetcher('/common/mulisious/get-countries');
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
                    <InputWrapper label="Institution/Organisation name" >
                        <Input size='md' id="name" placeholder="name" value={values.name} onChange={handleChange} onBlur={handleBlur} />
                    </InputWrapper>
                </Col>
                <Col span={12} md={4}>
                    <InputWrapper label="Country" >
                        <Select
                            placeholder="Pick one"
                            data={dataCountries?.countries?.map(item => ({ value: item._id, label: item.name })) || []}
                            size='md'
                            clearable
                            searchable
                            name='country'
                            value={values.country}
                            onChange={(e) => setFieldValue('country', e) }
                            onBlur={(e) => setFieldTouched('country', true)}
                            nothingFound="No options"
                        />
                    </InputWrapper>
                </Col>
                <Col span={12} md={8}>
                    <InputWrapper label='Entity phone'>
                        <Grid>
                            <Col span={4} md={4}>
                                <Select
                                    placeholder="Ind"
                                    data={dataCountries?.countries?.map(item => ({ value: item._id, label: item.dial_code })) || []}
                                    size='md'
                                    name='phone_indicatif'
                                    clearable
                                    searchable
                                    value={values.phone_indicatif}
                                    onChange={(e) => setFieldValue('phone_indicatif', e) }
                                    onBlur={(e) => setFieldTouched('phone_indicatif', true)}
                                />
                            </Col>
                            <Col span={8} md={8}>
                                <Input size='md' placeholder="Number" name='institution_phone' value={values.institution_phone} onChange={handleChange} onBlur={handleBlur} />
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
                        <Input size='md' id="first-name" placeholder="Your first name" name='firstname' value={values.firstname} onChange={handleChange} onBlur={handleBlur} />
                    </InputWrapper>
                </Col>
                <Col span={12} md={4}>
                    <InputWrapper label="Last name" >
                        <Input size='md' id="last-name" placeholder="Your last name" name='lastname' value={values.lastname} onChange={handleChange} onBlur={handleBlur}/>
                    </InputWrapper>
                </Col>
                <Col span={12} md={4}>
                    <InputWrapper label="Gender" >
                        <Select
                            placeholder="Pick one"
                            data={[
                                { value: 'male', label: 'male' },
                                { value: 'female', label: 'female' },
                            ]}
                            size='md'
                            clearable
                            value={values.gender}
                            onChange={(e) => setFieldValue('gender', e) }
                            onBlur={(e) => setFieldTouched('gender', true)}
                        />
                    </InputWrapper>
                </Col>
                <Col span={12} md={6}>
                    <InputWrapper label="Email" >
                        <Input size='md' id="email" name='email' placeholder="Your email" onChange={handleChange} onBlur={handleBlur}/>
                    </InputWrapper>
                </Col>
                <Col span={12} md={6}>
                    <InputWrapper label="Job title" >
                        <Input size='md' id="job-title" name='job_title' placeholder="Job title" onChange={handleChange} onBlur={handleBlur} />
                    </InputWrapper>
                </Col>
                <Col span={12}>
                    <InputWrapper label='Entity phone'>
                        <Grid>
                            <Col span={3}>
                                <Select
                                    placeholder="Ind"
                                    data={dataCountries?.countries?.map(item => ({ value: item._id, label: item.dial_code })) || []}
                                    size='md'
                                    clearable
                                    name='phone_indicatif'
                                    clearable
                                    searchable
                                    value={values.creator_phone_indicatif}
                                    onChange={(e) => setFieldValue('phone_indicatif', e) }
                                    onBlur={(e) => setFieldTouched('phone_indicatif', true)}
                                />
                            </Col>
                            <Col span={7}>
                                <Input size='md' placeholder="Number" value={values.creator_phone} onChange={handleChange} onBlur={handleBlur} />
                            </Col>
                            <Col span={2}>
                                <Input size='md' placeholder="Ext" value={values.creator_phone_ext} onChange={handleChange} onBlur={handleBlur} />
                            </Col>
                        </Grid>
                    </InputWrapper>
                </Col>
                <Col span={12} md={6}>
                    <InputWrapper label="Password" >
                        <PasswordInput size='md' name='password' placeholder='password' value={values.password} onChange={handleChange} onBlur={handleBlur}/>
                    </InputWrapper>
                </Col>
                <Col span={12} md={6}>
                    <InputWrapper label="Confirm password" >
                        <PasswordInput size='md' name='confirm_password' placeholder='password confirmation' value={values.confirm_password} onChange={handleChange} onBlur={handleBlur}/>
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
