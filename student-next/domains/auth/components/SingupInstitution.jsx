import React, { useState } from 'react';
import router from 'next/router';
import { useFormik } from 'formik';
import * as yup from 'yup';
import _ from 'lodash';
import validatePhone from 'phone';
import { motion } from 'framer-motion';
import { Input, PasswordInput, Checkbox, Grid, Col, Select, InputWrapper, RadioGroup, Radio, Title, Button } from '@mantine/core';
import { useNotifications } from '@mantine/notifications';

import { fetcher } from '../../../network/fetcher';
import { signupInstitution } from '../requests'


const initialValues = {
    entity_name: "",
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
    phone_ext: "",
    password: "",
    confirm_password: "",
}
const validationSchema = yup.object({
    entity_name: yup.string().required("Name of the entity is Required"),
    country: yup.string().required("Country is Required"),
    phone_indicatif: yup.string("Phone code must be valid").required("Phone code is Required"),
    institution_phone: yup.string().required("Phone is Required"),

    firstname: yup.string().required("First name is Required"),
    lastname: yup.string().required("Last name is Required"),
    gender: yup.string().oneOf(["male", "female"]).required("Gender is required"),
    email: yup.string().email("Email must be valid").required("Email name is Required"),
    job_title: yup.string().required("Job title is Required"),
    password: yup.string().min(8, "Password must be at least eight characters long").required("Password is Required"),
    confirm_password: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required("Confirm password is Required"),

    creator_phone_indicatif: yup.string("Phone code must be valid").required("Phone code is Required"),
    creator_phone: yup.string().required("Phone is Required"),
    phone_ext: yup.string().notRequired().nullable(),
})

export default function SignupInstitution() {
    const notifications = useNotifications();

    const [loadingSignup, setLoadingSignup] = useState(false);
    const [phoneIndicatif, setPhoneIndicatif] = useState("");
    const [creatorPhoneIndicatif, setCreatorPhoneIndicatif] = useState("");
    const { handleSubmit, values, errors, touched, handleBlur, handleChange, setFieldValue, setFieldTouched, isSubmitting, isValid } = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values) => {
            console.log('isSubmitting -)->', values);
            setLoadingSignup(true);
            try {
                console.log('phie ---> ',phoneIndicatif,values.institution_phone,  _.startsWith(phoneIndicatif + values.institution_phone, '+') ? phoneIndicatif + values.institution_phone : '+' + phoneIndicatif + values.institution_phone)
                let phoneValid = validatePhone(_.startsWith(phoneIndicatif + values.institution_phone, '+') ? phoneIndicatif + values.institution_phone : '+' + phoneIndicatif + values.institution_phone);
                let createPhoneValid= validatePhone(_.startsWith(creatorPhoneIndicatif + values.creator_phone, '+') ? creatorPhoneIndicatif + values.creator_phone : '+' + creatorPhoneIndicatif + values.creator_phone);
                console.log('phoneValid -)->', phoneValid);
                console.log('createPhoneValid -)->', createPhoneValid);
                if(!phoneValid.isValid){ return notifications.showNotification({ title: 'Validation error', message: 'Please verify the entity phone you provide', color: 'red', }) }
                if(!createPhoneValid.isValid){ return notifications.showNotification({ title: 'Validation error', message: "Please verify the user phone you provide", color: 'red', }) }

                const response = await signupInstitution({
                    ...values,
                    institution_phone: phoneValid.phoneNumber,
                    creator_phone: createPhoneValid.phoneNumber,
                })
                if(response.done && response.reply.redirect){
                    notifications.showNotification({ title: 'Registration succeed', message: 'Your entity have successfully registered, an account for you hase been created', color: 'green', })
                    setTimeout(() => { router.push(response.reply.redirect); }, 2000);
                }
            } catch (error) {
                notifications.showNotification({
                        title: 'Registration failed',
                        message: "An error occured during the registration, please try again",
                        color: 'red',
                    })
            } finally{
                setLoadingSignup(false);
            }
        }
    });
    const { data: dataCountries } = fetcher('/common/mulisious/get-countries');
    const [countryDailCodes, setCountryDailCodes] = useState(_.sortBy(dataCountries?.countries?.map(item => ({ value: item._id, label: item.dial_code })), 'label'));
    const [countryDailCreatorCodes, setCountryDailCreatorCodes] = useState(_.sortBy(dataCountries?.countries?.map(item => ({ value: item._id, label: item.dial_code })), 'label'));
    return (
        <motion.div
            className='w-full'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.5, easings: 'easeInOut' } }}
        >
            <div className='mb-4'>
                <Title order={3} className='mb-4'>Entity Information</Title>
            </div>
            <form onSubmit={handleSubmit} name='signup-institution' aria-describedby='sign up findadmission' id='signup-institution' className='w-full' method='POST'>
                <Grid>
                    <Col span={12}>
                        <InputWrapper label="Institution/Organisation name" error={errors.entity_name && touched.entity_name && errors.entity_name}>
                            <Input size='md' id="entity_name" name='entity_name' placeholder="Entity name" value={values.entity_name} onChange={handleChange} onBlur={handleBlur} />
                        </InputWrapper>
                    </Col>
                    <Col span={12} md={4}>
                        <InputWrapper label="Country" error={errors.country && touched.country && errors.country}>
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
                                        placeholder="Code"
                                        data={countryDailCodes}
                                        size='md'
                                        name='phone_indicatif'
                                        clearable
                                        searchable
                                        error={errors.phone_indicatif && touched.phone_indicatif && errors.phone_indicatif}
                                        value={values.phone_indicatif}
                                        onSearchChange={e => {
                                            const result = dataCountries?.countries?.filter(item => item.dial_code.includes(_.toString(e)))
                                            if(e === ''){
                                                setCountryDailCodes(_.sortBy(dataCountries?.countries?.map(item => ({ value: item._id, label: item.dial_code })), 'label'))
                                            } else {
                                                setCountryDailCodes(_.sortBy(result.map(item => ({ value: item._id, label: item.dial_code })), 'label'));
                                            }
                                        }}
                                        onChange={(e) => {
                                            setFieldValue('phone_indicatif', e || "");
                                            setPhoneIndicatif((dataCountries?.countries?.find(item => item._id === e)?.dial_code || ""));
                                        } }
                                        nothingFound="No options"
                                    />
                                </Col>
                                <Col span={8} md={8}>
                                    <Input size='md' placeholder="Number" name='institution_phone' id='institution_phone' value={values.institution_phone} onChange={handleChange} onBlur={handleBlur} />
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
                        <InputWrapper label="First name" error={errors.firstname && touched.firstname && errors.firstname}>
                            <Input size='md' id="first-name" placeholder="Your first name" name='firstname' value={values.firstname} onChange={handleChange} onBlur={handleBlur} />
                        </InputWrapper>
                    </Col>
                    <Col span={12} md={4}>
                        <InputWrapper label="Last name" error={errors.lastname && touched.lastname && errors.lastname}>
                            <Input size='md' id="last-name" placeholder="Your last name" name='lastname' value={values.lastname} onChange={handleChange} onBlur={handleBlur}/>
                        </InputWrapper>
                    </Col>
                    <Col span={12} md={4}>
                        <InputWrapper label="Gender" >
                            <Select
                                placeholder="Pick one"
                                data={[
                                    { value: 'male', label: 'Male' },
                                    { value: 'female', label: 'Female' },
                                ]}
                                size='md'
                                clearable
                                value={values.gender}
                                onChange={(e) => setFieldValue('gender', e) }
                                onBlur={(e) => setFieldTouched('gender', true)}
                                nothingFound="No options"
                            />
                        </InputWrapper>
                    </Col>
                    <Col span={12} md={6}>
                        <InputWrapper label="Email" error={errors.email && touched.email && errors.email}>
                            <Input size='md' id="email" name='email' placeholder="Your email" value={values.email} onChange={handleChange} onBlur={handleBlur}/>
                        </InputWrapper>
                    </Col>
                    <Col span={12} md={6}>
                        <InputWrapper label="Job title" error={errors.job_title && touched.job_title && errors.job_title}>
                            <Input size='md' id="job-title" placeholder="Job title" name='job_title' value={values.job_title} onChange={handleChange} onBlur={handleBlur} />
                        </InputWrapper>
                    </Col>
                    <Col span={12}>
                        <InputWrapper label='Phone' error={errors.creator_phone && touched.creator_phone && errors.creator_phone}>
                            <Grid>
                                <Col span={3}>
                                    <Select
                                        placeholder="Code"
                                        data={countryDailCreatorCodes}
                                        size='md'
                                        name='creator_phone_indicatif'
                                        clearable
                                        searchable
                                        error={errors.creator_phone_indicatif && touched.creator_phone_indicatif && errors.creator_phone_indicatif}
                                        value={values.creator_phone_indicatif}
                                        onSearchChange={e => {
                                            const result = dataCountries?.countries?.filter(item => item.dial_code.includes(_.toString(e)))
                                            if(e === ''){
                                                setCountryDailCreatorCodes(_.sortBy(dataCountries?.countries?.map(item => ({ value: item._id, label: item.dial_code })), 'label'))
                                            } else {
                                                setCountryDailCreatorCodes(_.sortBy(result.map(item => ({ value: item._id, label: item.dial_code })), 'label'));
                                            }
                                        }}
                                        onChange={(e) => {
                                            setFieldValue('creator_phone_indicatif', e || "");
                                            setCreatorPhoneIndicatif(dataCountries?.countries?.find(item => item._id === e)?.dial_code || "");
                                        } }
                                        nothingFound="No options"
                                    />
                                </Col>
                                <Col span={7}>
                                    <Input size='md' placeholder="Number" value={values.creator_phone} name='creator_phone' onChange={handleChange} onBlur={handleBlur} />
                                </Col>
                                <Col span={2}>
                                    <Input size='md' placeholder="Ext" value={values.phone_ext} name='phone_ext' onChange={handleChange} onBlur={handleBlur} />
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
                <div className='max-w-sm mx-auto w-full my-4 flex flex-row items-center justify-center'>
                        {/* <Button.Primary title='Create Account' className='w-full' /> */}
                    <Button
                        size="md" className='mt-6'
                        styles={{
                            root: {
                                backgroundColor: '#2D79AD',
                                paddingLeft: 30,
                                paddingRight: 30,
                                paddingTop: 15,
                                paddingBottom: 15,
                                height: 44
                            },
                        }}
                        type='submit'
                        disabled={ isSubmitting || loadingSignup || !isValid }
                        loading={ isSubmitting || loadingSignup }
                    >Create account</Button>
                </div>
            </form>
        </motion.div>
    )
}
