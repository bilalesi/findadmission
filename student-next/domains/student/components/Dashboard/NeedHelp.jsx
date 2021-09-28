import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button, Group, Divider, ActionIcon } from '@mantine/core';
import { IoAddSharp } from 'react-icons/io5'


export default function NeedHelp() {
    return (
        <div className='max-w-sm w-full rounded-md shadow-sh-1-12-08 bg-fa-primary-dark-pattern text-white'>
            <div className='w-full px-4 py-6'>
                <div className='font-bold text-xl text-center'>Need Help?</div>
                <div className='py-8 text-sm font-light mx-4'>Contact the Findadmission Team for assistance!</div>
                <Button variant='outline' size='md' fullWidth style={{ color: 'white', borderColor: 'white'}}> Contact us</Button>
            </div>
        </div>
    )
}
