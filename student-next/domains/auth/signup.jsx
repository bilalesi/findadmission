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
    console.log('router.query.entity ---> ',router.query.entity);
    const [selectedEntity, setSelectedEntity] = useState(router.query.entity ?? entityEnum[0]);
    const [studentType, setStudentType] = useState("student");

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
                            selectedEntity === "student" && <div className='w-full'>
                                <RadioGroup
                                    value={studentType}
                                    onChange={setStudentType}
                                    label="I am here because:"
                                    description="depends on your needs"
                                    size='md'
                                    className='cursor-pointer'
                                    variant='vertical'
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
                    </div>
                </div>
            </div>
        </MainPageLayout>
    )
}
