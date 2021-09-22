import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { InputWrapper, RadioGroup, Radio } from '@mantine/core';
import { MainPageLayout } from '../../layouts';
import EntitySelector from './components/Entityselector';
import SignupInstitution from './components/SingupInstitution';
import SignupStudent from './components/SignupStudent';
import SignupParent from './components/SignupParent';


const entityEnum = ["student", "institution"]
export default function SignupPage() {
    const router = useRouter();
    const [selectedEntity, setSelectedEntity] = useState(router.query.entity || entityEnum[0]);
    const [studentType, setStudentType] = useState("student");
    console.log('router -->', router)
    return (
        <MainPageLayout>
            <div className='h-full flex flex-col items-center justify-center flex-1 py-24'>
                <div className='max-w-2xl mx-auto sm:shadow-sh-6-16-12 flex w-full px-10 py-10 rounded-md'>
                    <div className='flex flex-col items-center justify-center w-full'>
                        <InputWrapper
                            label='Please select type'
                            description='select type of entity'
                            className='w-full'
                        >
                            <EntitySelector { ... { selectedEntity, setSelectedEntity } } />
                        </InputWrapper>
                        {
                            selectedEntity === "student" && <div>
                                <RadioGroup
                                    value={studentType}
                                    onChange={setStudentType}
                                    label="I am here because:"
                                    description="depends on your needs"
                                    size='md'
                                    className='cursor-pointer'
                                    chec
                                >
                                    <Radio value="student" className='cursor-pointer'>I am planning to study abroad</Radio>
                                    <Radio value="parent" className='cursor-pointer'>I am looking for an institution for my child</Radio>
                                </RadioGroup>
                                <div className='w-11/12 mx-auto h-px bg-gray-300 my-8'></div>
                            </div>
                        }
                        { selectedEntity === "institution" && <SignupInstitution/> }
                        { selectedEntity === "student" && studentType === "student" && <SignupStudent/> }
                        { selectedEntity === "student" && studentType === "parent" && <SignupParent/> }
                        {/* <Grid>
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
                            <Col span={12}>
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
                            <Col span={12}>
                                <div>By clicking ''Create Account ", you are indicating you agree to our <a href='/' className='text-blue-600'>Terms of Service</a> and <a href='/' className='text-blue-600'>Privacy Policy</a> also agree to reciving news and tips via email or push notification</div>
                            </Col>
                            <div className='max-w-sm mx-auto w-full my-4'>
                                <Button.Primary title='Sign in' className='w-full' />
                            </div>
                        </Grid>
                     */}
                    </div>
                </div>
            </div>
        </MainPageLayout>
    )
}
