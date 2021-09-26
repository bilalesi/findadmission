import React, { useState, useEffect } from 'react';
import router, { useRouter } from 'next/router';
import { Button,  } from '@mantine/core';
import { useTimer } from 'react-timer-hook';
import dayjs from 'dayjs';
import { useNotifications } from '@mantine/notifications';
import ReactCodeInput from 'react-code-input';
import dynamic from 'next/dynamic';

import { MainPageLayout } from '../../layouts';
import { digitify } from '../../shared/functions';
import { resendStudentPin, validateStudentSignupPin } from './requests';

export default function ValidatePin() {
    const [ pinCode, setPinCode ] = useState();
    const notifications = useNotifications();
    const [loadingRegeneration, setLoadingRegeneration] = useState(false);
    const { query } = useRouter();
    const [ displayResendPin, setDisplayResendPin ] = useState(false);
    const { seconds, minutes, restart, isRunning } = useTimer({ expiryTimestamp: dayjs().add(5, 'second').toDate(), onExpire: () => setDisplayResendPin(true), });
    const handleResetPinFromBackend = async () => {
        setLoadingRegeneration(true);
        try {
            let response = await resendStudentPin(query.email, query.token);
            console.log('handleResetPinFromBackend --> ', response);
            if(response.code === "InvalidOperation"){
                notifications.showNotification({
                    title: 'Error',
                    message: 'Invalid opertaion, please open the link from your inbox',
                    color: 'red', autoClose: false, position: 'top-right',
                });
            } else if(response.code === "StudentPinRegenerationFailedQuotaExeeded"){
                notifications.showNotification({
                    title: 'Error',
                    message: 'Invalid opertaion, you request 3 times or more, for a new pin, please contact findadmission support team', 
                    color: 'red', position: "top-right", autoClose: false,
                });
            } else if(response.code === "StudentPinRegenerationSuccess"){
                notifications.showNotification({
                    title: 'New PIN arrived',
                    message: router.query.toastMessage,
                    color: 'green', position: "top-right", autoClose: false,
                });
                router.push(response.reply.redirect, undefined, { shallow: true });
                restart(dayjs().add(5, 'second').toDate(), true);
            }
        } catch (error) {
            notifications.showNotification({
                title: 'Error',
                message: "An error occured during pin regeneration, please try again",
                color: 'red', position: "top-right", autoClose: false
            });
        } finally{
            setLoadingRegeneration(false);
        }
    }
    const handleValidatePin = async (value) =>{
        try {
            if(!isNaN(value) && !isNaN(parseInt(value))){
                if(value.length === 6){
                   let response =  await validateStudentSignupPin(Number(value), query.token);
                   console.log('handleValidatePin', response);
                }
            }
        } catch (error) {
            notifications.showNotification({
                title: 'Error',
                message: "An error occured during pin validation, please try again",
                color: 'red', position: "top-right", autoClose: false
            });
        }
    }
    return (
        <MainPageLayout>

            <div className='h-full flex flex-col items-center justify-center flex-1'>
                <div className='max-w-xl mx-auto sm:shadow-sh-6-16-12 flex w-full px-10 py-10 rounded-md'>
                    <div className='flex flex-col items-center justify-center w-full'>
                        <div className='w-full text-center mb-5'>
                            <div className='font-bold text-center text-xl text-gray-700 mb-3'> Check your email! </div>
                            <div className='font-light text-center text-base text-gray-600'>We've sent a 6-digit confirmation code to</div>
                            <div className='font-light text-center text-base text-gray-400'>{query.email}</div>
                            <div className='font-light text-center text-base text-gray-600'>It will expire in three days, so enter it soon. </div>
                        </div>
                        <div className='w-full flex flex-col items-center justify-end'>
                            <ReactCodeInput
                                type='number'
                                autoFocus
                                fields={6}
                                // value={pinCode}
                                pattern='[0-9]+'
                                inputStyle={{
                                    fontFamily: 'Inter',
                                    margin:  '4px',
                                    MozAppearance: 'textfield',
                                    borderRadius: '3px',
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                    width: '42px',
                                    height: '42px',
                                    textAlign: 'center',
                                    border: '1px solid #2D79AD'
                                }}
                                onChange={handleValidatePin}
                            />
                            <div className='text-right'>{digitify(minutes)}:{digitify(seconds)}</div>
                        </div>
                        {
                            !isRunning && <Button 
                                variant="gradient" gradient={{ from: 'red', to: 'red' }}
                                radius="xl" className='mt-6'
                                styles={{
                                    root: {
                                        paddingLeft: 30,
                                        paddingRight: 30,
                                        paddingTop: 15,
                                        paddingBottom: 15,
                                        height: 44
                                    },
                                }}
                                onClick={handleResetPinFromBackend}
                                loading={loadingRegeneration}
                            >
                                Resend PIN
                            </Button>
                        }
                    </div>
                </div>
            </div>
        </MainPageLayout>
    )
}
