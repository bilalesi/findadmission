import React, { useState } from 'react';
import router from 'next/router';
import { motion } from 'framer-motion';
import { useFormik } from 'formik';
import _ from 'lodash';
import * as yup from 'yup';
import validatePhone from 'phone';
import dayjs from 'dayjs'
import { Input, PasswordInput, Checkbox, Grid, Col, Select, InputWrapper, Button } from '@mantine/core';
import { useNotifications } from '@mantine/notifications';
import { digitify } from '../../../shared/functions';
import { fetcher, conditionalFetcher } from '../../../network/fetcher';
import { signupParentStudent } from '../requests';

import styles from '../auth.module.scss';

const initialValues = {
    // parent
    parent_fullname: "",
    email: "",
    password: "",
    confirm_password: "",
    phone_indicatif: "",
    phone: "",
    whatsup_number_indicatif: "",
    whatsup: "",

    lastname: "",
    firstname: "",
    country: "",
    state: "",
    birthday_day: "",
    birthday_month: "",
    birthday_year: "",
}
const validationSchema = yup.object({
    // parent
    parent_fullname: yup.string().required("Full name is Required"),
    email: yup.string().email("Email must be valid").required("Email name is Required"),
    password: yup.string().min(8, "Password must be at least eight characters long").required("Password is Required"),
    confirm_password: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required("Confirm password is Required"),
    phone_indicatif: yup.string("Phone code must be valid").required("Phone code is Required"),
    phone: yup.string().required("Phone is Required"),
    whatsup_number_indicatif: yup.string('Phone code must be valid').notRequired().nullable(),
    whatsup: yup.string().notRequired().nullable(),
    // student
    firstname: yup.string().required("First name is Required"),
    lastname: yup.string().required("Last name is Required"),
    country: yup.string().required("Country is Required"),
    state: yup.string().required("Region or state is Required"),
    birthday_day: yup.string().required("Day is Required"),
    birthday_month: yup.string().required("Month is Required"),
    birthday_year: yup.string().required("Year is Required"),
})

export default function SignupParent() {
    const [ copyPhoneNumber, setCopyPhoneNumber] = useState(false);
    const [loadingSignup, setLoadingSignup] = useState(false);
    const [phoneIndicatif, setPhoneIndicatif] = useState({ phone: "", whatsup: "" });
    
    const notifications = useNotifications();
    const { handleSubmit, values, errors, touched, handleBlur, handleChange, setFieldValue, setFieldTouched, isSubmitting, isValid } = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values, { setSubmitting }) => {
            console.log('isSubmitting -)->', values);
            setLoadingSignup(true);
            try {
                let birthday = `${values.birthday_day}-${values.birthday_month}-${values.birthday_year}`;
                let phoneValid = validatePhone(_.startsWith(phoneIndicatif.phone + values.phone, '+') ? phoneIndicatif.phone + values.phone : '+' + phoneIndicatif.phone + values.phone);
                let whatsappValid = validatePhone(_.startsWith(phoneIndicatif.whatsup + values.whatsup, '+') ? phoneIndicatif.whatsup + values.whatsup : '+' + phoneIndicatif.whatsup + values.whatsup);
                let birthdayValid = dayjs(birthday, 'DD-MM-YYYY').toISOString();
                if(!phoneValid.isValid){ return notifications.showNotification({ title: 'Validation error', message: 'Please verify the phone you provide', color: 'red', }) }
                if(!whatsappValid.isValid){ return notifications.showNotification({ title: 'Validation error', message: "Please verify what's up phone you provide", color: 'red', }) }
                if(!birthdayValid){ return notifications.showNotification({ title: 'Validation error', message: "Please verify your date of birth", color: 'red', }) }
                const response = await signupParentStudent({
                    ...values,
                    phone: phoneValid.phoneNumber,
                    whatsup: whatsappValid.phoneNumber,
                    birthday: birthdayValid,
                })
                if(response.done && response.reply.redirect){
                    notifications.showNotification({ title: 'Success', message: 'You have successfully registered', color: 'green', })
                    setTimeout(() => {
                        router.push(response.reply.redirect);
                    }, 2000);
                }
                console.log('response after create student', response);
            } catch (error) {
                console.log('signup parent -- error ', error);
                notifications.showNotification({ title: 'Error', message: "An error occured during the registration, please try again", color: 'red', })
            } finally{
                setLoadingSignup(false);
            }
        }
    })
    const { data: dataCountries } = fetcher('/common/mulisious/get-countries');
    const { data: dataStates } = conditionalFetcher(`/common/mulisious/country/get-states?countryId=${values.country}`, !_.isEmpty(values.country));
    const [countryDailCodes, setCountryDailCodes] = useState(_.sortBy(dataCountries?.countries?.map(item => ({ value: item._id, label: item.dial_code })), 'label'));
    const handleChangeCopyPhone = (event) =>{
        setCopyPhoneNumber(event.currentTarget.checked);
        setFieldValue('whatsup_number_indicatif', values.phone_indicatif);
        setFieldValue('whatsup', values.phone);
        setPhoneIndicatif(state => ({ ...state, whatsup: phoneIndicatif.phone }));
    }
    return (
        <motion.div
            className='w-full'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            >
            <form onSubmit={handleSubmit} name='signup-parent' aria-describedby='sign up findadmission' id='signup-parent' className='w-full' method='POST'>
                <Grid>
                    {/* Parent Part */}
                    <Col span={12} md={6}>
                        <InputWrapper label="Full name" error={errors.parent_fullname && touched.parent_fullname && errors.parent_fullname }>
                            <Input name='parent_fullname' size='md' id="parent_fullname" placeholder="Your Full name" value={values.parent_fullname} onChange={handleChange} onBlur={handleBlur} />
                        </InputWrapper>
                    </Col>
                    <Col span={12} md={6}>
                        <InputWrapper label="Email address" error={errors.email && touched.email && errors.email} >
                            <Input name='email' size='md' id="parent-email" placeholder="Your email" value={values.email}  onChange={handleChange} onBlur={handleBlur} />
                        </InputWrapper>
                    </Col>
                    <Col span={12} md={6}>
                        <InputWrapper label="Password" error={errors.password && touched.password && errors.password} >
                            <PasswordInput name='password' size='md' placeholder='password' value={values.password}  onChange={handleChange} onBlur={handleBlur} />
                        </InputWrapper>
                    </Col>
                    <Col span={12} md={6}>
                        <InputWrapper label="Confirm password" error={errors.confirm_password && touched.confirm_password && errors.confirm_password} >
                            <PasswordInput name='confirm_password' placeholder='password confirmation' size='md' value={values.confirm_password}  onChange={handleChange} onBlur={handleBlur} />
                        </InputWrapper>
                    </Col>
                    <Col span={12}>
                        <InputWrapper label='Phone Number' error={errors.phone && touched.phone && errors.phone}>
                            <Grid>
                                <Col span={3}>
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
                                        nothingFound="No options"
                                        onChange={(e) => {
                                            setFieldValue('phone_indicatif', e || "");
                                            setPhoneIndicatif(state => ({ ...state, phone: dataCountries?.countries?.find(item => item._id === e)?.dial_code || "" }))
                                        } }
                                        onBlur={(e) => setFieldTouched('phone_indicatif', true)}
                                    />
                                </Col>
                                <Col span={9}>
                                    <Input name='phone' size='md' placeholder='Number' value={values.phone}  onChange={handleChange} onBlur={handleBlur} />
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
                            placeholder="Code"
                            data={dataCountries?.countries?.map(item => ({ value: item._id, label: item.dial_code })) || []}
                            size='md'
                            name='whatsup_number_indicatif'
                            clearable
                            searchable
                            disabled={copyPhoneNumber}
                            error={errors.whatsup_number_indicatif && touched.whatsup_number_indicatif && errors.whatsup_number_indicatif}
                            value={values.whatsup_number_indicatif}
                            onChange={(e) => {
                                setFieldValue('whatsup_number_indicatif', e || "");
                                setPhoneIndicatif(state => ({ ...state, whatsup: dataCountries?.countries?.find(item => item._id === e).dial_code || "" }))
                            } }
                            onBlur={(e) => setFieldTouched('whatsup_number_indicatif', true)}
                        />
                    </Col>
                    <Col span={9} className={`${styles.label_form_input_above}`}>
                        <Input name='whatsup' size='md' disabled={copyPhoneNumber}  value={values.whatsup} onChange={handleChange} onBlur={handleBlur} />
                    </Col>
                </Grid>
                <div className='w-11/12 mx-auto h-px bg-gray-300 my-8'></div>
                {/* Student Part */}
                <Grid>
                    <Col span={12} md={6}>
                        <InputWrapper label="First name" error={errors.firstname && touched.firstname && errors.firstname}>
                            <Input name='firstname' size='md' id="input-demo" placeholder="Child first name" value={values.firstname}  onChange={handleChange} onBlur={handleBlur} />
                        </InputWrapper>
                    </Col>
                    <Col span={12} md={6}>
                        <InputWrapper label="Last name" error={errors.lastname && touched.lastname && errors.lastname}>
                            <Input name='lastname' size='md' id="input-demo" placeholder="Child last name" value={values.lastname}  onChange={handleChange} onBlur={handleBlur} />
                        </InputWrapper>
                    </Col>
                    <Col span={12} md={6}>
                        <InputWrapper label="Country" error={errors.country && touched.country && errors.country}>
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
                        <InputWrapper label="Region/State" error={errors.state && touched.state && errors.state}>
                            <Select
                                placeholder="Pick one state"
                                data={dataStates?.states?.map(item => ({ value: item._id, label: item.name })) || []}
                                size='md'
                                name='state'
                                clearable
                                searchable
                                value={values.state}
                                onChange={(e) => setFieldValue('state', e) }
                                onBlur={(e) => setFieldTouched('state', true)}
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
                                        data={Array(31).fill("").map((item, index) => ({ value: digitify(_.toString(index + 1)), label: digitify(_.toString(index + 1)) }))}
                                        size='md'
                                        clearable
                                        searchable
                                        name='birthday_day'
                                        value={values.birthday_day}
                                        error={errors.birthday_day && touched.birthday_day && errors.birthday_day}
                                        onChange={(e) => { setFieldValue('birthday_day', e) } }
                                        onBlur={(e) => setFieldTouched('birthday_day', true)}
                                    />
                                </Col>
                                <Col span={4} md={4}>
                                    <Select
                                        placeholder="MM"
                                        data={Array(12).fill("").map((item, index) => ({ value:  digitify(_.toString(index + 1)), label:  digitify(_.toString(index + 1)) }))}
                                        size='md'
                                        clearable
                                        name='birthday_month'
                                        value={values.birthday_month}
                                        error={errors.birthday_month && touched.birthday_month && errors.birthday_month}
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
                                        error={errors.birthday_year && touched.birthday_year && errors.birthday_year}
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
                    <div className='max-w-sm mx-auto w-full my-4 flex flex-row items-center justify-center'>
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
                </Grid>
            </form>
       </motion.div>
    )
}
