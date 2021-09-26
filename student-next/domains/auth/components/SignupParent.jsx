import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useFormik } from 'formik';
import _ from 'lodash';
import * as yup from 'yup';
import { Input, PasswordInput, Checkbox, Grid, Col, Select, InputWrapper, RadioGroup, Radio } from '@mantine/core';
import Button from '../../../shared/components/Button';
import styles from '../auth.module.scss';
import { fetcher, conditionalFetcher } from '../../../network/fetcher';

const initialValues = {
    // parent
    parent_fullname: "",
    email: "",
    password: "",
    confirm_password: "",
    phone_indicatif: "",
    phone: "",
    whatsup_number_indicatif: "",
    whatsup_number: "",

    lastname: "",
    firstname: "",
    country: "",
    region_state: "",
    birthday_day: "",
    birthday_month: "",
    birthday_year: "",
}
const validationSchema = yup.object({
    parent_fullname: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).max(14).required(),
    confirm_password: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required(),
    phone_indicatif: yup.string().required(),
    phone: yup.string().required(),
    whatsup_number_indicatif: yup.string().required(),
    whatsup_number: yup.string().notRequired().nullable(),

    firstname: yup.string().required(),
    lastname: yup.string().required(),
    country: yup.string().required(),
    region_state: yup.string().required(),
    birthday_day: yup.string().required(),
    birthday_month: yup.string().required(),
    birthday_year: yup.string().required(),
})

export default function SignupParent() {
    const [ copyPhoneNumber, setCopyPhoneNumber] = useState(false);
    const { handleSubmit, values, errors, handleBlur, handleChange, setFieldValue, setFieldTouched } = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        validateOnChange: true,
        validateOnBlur: true,
    })
    const { data: dataCountries } = fetcher('/common/mulisious/get-countries');
    const { data: dataStates } = conditionalFetcher(`/common/mulisious/country/get-states?countryId=${values.country}`, !_.isEmpty(values.country));
    const handleChangeCopyPhone = (event) =>{
        setCopyPhoneNumber(event.currentTarget.checked);
        setFieldValue('whatsup_number_indicatif', values.phone_indicatif);
        setFieldValue('whatsup_number', values.phone);
    }
    return (
        <motion.div
            className='w-full'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <Grid>
                { console.log('values parent --> ', values)}
                { console.log('errors parent --> ', errors)}
                {/* Parent Part */}
                <Col span={12} md={6}>
                    <InputWrapper label="Full name" >
                        <Input name='parent_fullname' size='md' id="parent_fullname" placeholder="Your Full name" value={values.parent_fullname} onChange={handleChange} onBlur={handleBlur} />
                    </InputWrapper>
                </Col>
                <Col span={12} md={6}>
                    <InputWrapper label="Email address" >
                        <Input name='email' size='md' id="parent-email" placeholder="Your email" value={values.email}  onChange={handleChange} onBlur={handleBlur} />
                    </InputWrapper>
                </Col>
                <Col span={12} md={6}>
                    <InputWrapper label="Password" >
                        <PasswordInput name='password' size='md' placeholder='password' value={values.password}  onChange={handleChange} onBlur={handleBlur} />
                    </InputWrapper>
                </Col>
                <Col span={12} md={6}>
                    <InputWrapper label="Confirm password" >
                        <PasswordInput name='confirm_password' placeholder='password confirmation' size='md' value={values.confirm_password}  onChange={handleChange} onBlur={handleBlur} />
                    </InputWrapper>
                </Col>
                <Col span={12}>
                    <InputWrapper label='Phone Number'>
                        <Grid>
                            <Col span={3}>
                                <Select
                                    placeholder="Ind"
                                    data={dataCountries?.countries?.map(item => ({ value: item._id, label: item.dial_code })) || []}
                                    size='md'
                                    name='phone_indicatif'
                                    searchable
                                    clearable
                                    value={values.phone_indicatif} 
                                    onChange={(e) => setFieldValue('phone_indicatif', e) }
                                    onBlur={(e) => setFieldTouched('phone_indicatif', true)}
                                />
                            </Col>
                            <Col span={9}>
                                <Input name='phone' size='md' placeholder='Your Number' value={values.phone}  onChange={handleChange} onBlur={handleBlur} />
                            </Col>
                        </Grid>
                    </InputWrapper>
                </Col>
                <Col span={3} className={`${styles.label_form_input}`}>
                    <label>What's up number</label>
                </Col>
                <Col span={9} className={`${styles.label_form_input}`}>
                    <Checkbox id='copy_phone' checked={copyPhoneNumber} onChange={handleChangeCopyPhone} inChange label='Copy from above' className='text-sm' />
                </Col>
                <Col span={3} className={`${styles.label_form_input_above}`}>
                    <Select
                        placeholder="Pick one"
                        data={dataCountries?.countries?.map(item => ({ value: item._id, label: item.dial_code })) || []}
                        size='md'
                        name='whatsup_number_indicatif'
                        clearable
                        searchable
                        disabled={copyPhoneNumber} 
                        value={values.whatsup_number_indicatif}  
                        onChange={(e) => setFieldValue('whatsup_number_indicatif', e) }
                        onBlur={(e) => setFieldTouched('whatsup_number_indicatif', true)}
                    />
                </Col>
                <Col span={9} className={`${styles.label_form_input_above}`}>
                    <Input name='whatsup_number' size='md' disabled={copyPhoneNumber}  value={values.whatsup_number} onChange={handleChange} onBlur={handleBlur} />
                </Col>
            </Grid>
            <div className='w-11/12 mx-auto h-px bg-gray-300 my-8'></div>
            {/* Student Part */}
            <Grid>
                <Col span={12} md={6}>
                    <InputWrapper label="First name" >
                        <Input name='firstname' size='md' id="input-demo" placeholder="Child first name" value={values.firstname}  onChange={handleChange} onBlur={handleBlur} />
                    </InputWrapper>
                </Col>
                <Col span={12} md={6}>
                    <InputWrapper label="Last name" >
                        <Input name='lastname' size='md' id="input-demo" placeholder="Child last name" value={values.lastname}  onChange={handleChange} onBlur={handleBlur} />
                    </InputWrapper>
                </Col>
                <Col span={12} md={6}>
                    <InputWrapper label="Country" >
                        <Select
                            placeholder="Pick your country"
                            data={dataCountries?.countries?.map(item => ({ value: item._id, label: item.name })) || []}
                            size='md'
                            name='country'
                            clearable
                            searchable
                            value={values.country}
                            onChange={(e) => setFieldValue('country', e) }
                            onBlur={(e) => setFieldTouched('country', true)}
                            nothingFound="No options"
                        />
                    </InputWrapper>
                </Col>
                <Col span={12} md={6}>
                    <InputWrapper label="Region/State" >
                        <Select
                            placeholder="Pick your state"
                            data={dataStates?.states?.map(item => ({ value: item._id, label: item.name })) || []}
                            size='md'
                            clearable
                            searchable
                            name='region_state'
                            value={values.region_state}  
                            onChange={(e) => setFieldValue('region_state', e) }
                            onBlur={(e) => setFieldTouched('region_state', true)}
                            nothingFound="No options"
                        />
                    </InputWrapper>
                </Col>
                <Col span={12}>
                    <InputWrapper label='Birthday'>
                        <Grid>
                            <Col span={4} md={4}>
                                <Select
                                    placeholder="DD"
                                    data={Array(31).fill("").map((item, index) => ({ value: _.toString(index + 1), label: _.toString(index + 1) }))}
                                    size='md'
                                    clearable
                                    searchable
                                    name='birthday_day'
                                    value={values.birthday_day}
                                    onChange={(e) => {
                                        console.log('birthday_day' , e)
                                        setFieldValue('birthday_day', e)
                                    } }
                                    onBlur={(e) => setFieldTouched('birthday_day', true)}
                                />
                            </Col>
                            <Col span={4} md={4}>
                                <Select
                                    placeholder="MM"
                                    data={Array(12).fill("").map((item, index) => ({ value:  _.toString(index + 1), label:  _.toString(index + 1) }))}
                                    size='md'
                                    clearable
                                    name='birthday_month'
                                    value={values.birthday_month}
                                    onChange={(e) => setFieldValue('birthday_month', e) }
                                    onBlur={(e) => setFieldTouched('birthday_month', true)}
                                />
                            </Col>
                            <Col span={4} md={4}>
                                <Select
                                    placeholder="YYYY"
                                    data={Array(110).fill("").map((item, index) => ({ value: _.toString(index + 1900), label: _.toString(index + 1900) }))}
                                    size='md'
                                    clearable
                                    name='birthday_year'
                                    value={values.birthday_year}
                                    onChange={(e) => setFieldValue('birthday_year', e) }
                                    onBlur={(e) => setFieldTouched('birthday_year', true)}
                                />
                            </Col>
                        </Grid>
                    </InputWrapper>
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
