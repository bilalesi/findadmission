import React, { useState } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/client';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Input, PasswordInput, Checkbox, Button, InputWrapper } from '@mantine/core';
import { IoMail, IoLockClosed } from 'react-icons/io5';
import { MainPageLayout } from '../../layouts';
import EntitySelector from './components/Entityselector';


const initialValues = {
    email: "",
    password: "",
}
const validationSchema = yup.object({
    email: yup.string().email("Email must be valid").required("Email name is Required"),
    password: yup.string().min(8, "Password must be at least eight characters long").required("Password is Required"),
})

export default function SigninPage() {
    const [ selectedEntity, setSelectedEntity] = useState('student');
    const [ loadingSignin, setLoadingSignin] = useState(false);
    const { handleSubmit, values, errors, touched, handleBlur, handleChange, isSubmitting, isValid } = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values) => {
            setLoadingSignin(true);
            try {
                let response = await signIn('credentials', {
                    callbackUrl: selectedEntity === 'student' ?
                                'http://localhost:3000/entity/student' :
                                selectedEntity === 'institution' ?
                                'http://localhost:3000/entity/institution' : 'http://localhost:3000/',
                    email: values.email,
                    password: values.password,
                    type: selectedEntity
                });
                console.log('signIn(credentials) -->> ',response);
            } catch (error) {
                console.error('error signin -->', error);
            } finally{
                setLoadingSignin(false);
            }
        }
    })
    return (
        <MainPageLayout>
            <div className='h-full flex flex-col items-center justify-center flex-1'>
                <div className='max-w-md mx-auto sm:shadow-sh-6-16-12 flex w-full px-10 py-10 rounded-md'>
                    <form id='sign-in-form' method='POST' name='signin-form' onSubmit={handleSubmit} className='flex flex-col items-center justify-center w-full'>
                        <EntitySelector { ... { selectedEntity, setSelectedEntity } } />
                        <div className='w-full max-w-md my-2'>
                            <InputWrapper label='Email address' error={errors.email && touched.email && errors.email}>
                                <Input 
                                    name="email"
                                    icon={<IoMail />}
                                    placeholder="Your email"
                                    size='md'
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </InputWrapper>
                        </div>
                        <div className='w-full max-w-md my-2'>
                            <InputWrapper label='Password' error={errors.password && touched.password && errors.password}>
                                <PasswordInput 
                                    name="password"
                                    icon={<IoLockClosed />}
                                    placeholder="Password"
                                    size='md'
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </InputWrapper>
                        </div>
                        <div className='w-full max-w-md mt-1 mb-3'>
                            <Checkbox label="Remember me"/>
                        </div>
                        <div className='w-full max-w-md my-2'>
                            <Button
                                type='submit'
                                size='md'
                                fullWidth
                                variant="gradient"
                                gradient={{ from: 'indigo', to: 'cyan' }}
                                disabled={(selectedEntity !== 'institution' && selectedEntity !== 'student' ) || !isValid || loadingSignin || isSubmitting }
                                loading={loadingSignin}
                            >Sign in</Button>
                        </div>
                        <div className='w-full max-w-md mb-3 flex flex-row items-center justify-center'>
                            <Button variant="link">
                                <Link href='/forget-password'>
                                    <a>Forgotten your password?</a>
                                </Link>
                            </Button>
                        </div>
                        <div className='w-full max-w-md my-2'><div className='w-full mx-auto my-2 h-px bg-background'/></div>
                        <div className='w-full max-w-md my-2'><div className='text-left text-sm pointer-events-none select-none'>Don't have an account? </div></div>
                        <div className='w-full max-w-md my-2'>
                            <Button size='md'  variant="outline" fullWidth>
                                <Link href={selectedEntity ? `/auth/signup?entity=${selectedEntity}` : '/auth/signup'}>
                                    <a>Get Started</a>
                                </Link>
                            </Button>
                            {/* <ButtonLink.PrimaryOutline title='Get Started' href={selectedEntity ? `/auth/signup?entity=${selectedEntity}` : '/auth/signup'}/> */}
                        </div>
                    </form>
                </div>
            </div>
        </MainPageLayout>
    )
}
