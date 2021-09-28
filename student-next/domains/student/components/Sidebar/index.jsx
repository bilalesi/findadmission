import React from 'react'
import Image from 'next/image';
import Link from 'next/link';

import styles from './sidebar.module.scss';


const LinkItem = ({ href, title, icon, shrink }) => {
    return(
        <Link href={href}>
            <a className='py-3 px-5 w-full flex flex-row items-center group rounded-lg'>
                <Image width={32} height={32} src={icon} className={` group-hover:transform group-hover:scale-110 ${shrink ? '' : 'mr-2'}`} />
                <div className='font-medium text-gray-300'>{title}</div>
            </a>
        </Link>
    )
}
export default function SideBarContainer({ itemsTop=[], itemsBottom=[] }) {
    return (
        <nav id='sidebar' className={`bg-primary inset-0 h-screen py-7 px-3 w-64 text-white flex flex-col sticky ${styles.navbar_container}`}>
            <div id='sidebar-top' className='relative flex items-center'>
                <span id='sidebar-shrink-button' className='absolute top-1/2 h-7 py-0 px-2 bg-primary -right-14 transform -translate-y-1/2 -translate-x-3 z-40 cursor-pointer shadow-sh-1-12-08 transition'>
                    <svg width="1em" height="1em" viewBox="0 0 24 24"><path d="M11.67 3.87L9.9 2.1L0 12l9.9 9.9l1.77-1.77L3.54 12z" fill="currentColor"></path></svg>
                </span>
                <div id='sidebar-logo' className='w-9 my-0 mx-1'>
                    <Image src='/logo/findadmission-logo.png' width='143px' height='44px'/>
                </div>
            </div>
            <div id='sidebar-body' className='relative'>
                <div id='level-1'>
                    { itemsTop.map((item, index) => ( <LinkItem key={item.id}  { ...item } shrink={false} />)) }
                </div>
                <div className='w-11/12 mx-auto h-px bg-white'/>
                <div id='level-2'>
                    { itemsBottom.map((item, index) => ( <LinkItem key={item.id}  { ...item } shrink={false} />)) }
                </div>
            </div>
            <div id='sidebar-footer' className='relative mt-auto'>
                <Image src='https://images.unsplash.com/photo-1632687223381-bdf64fb975d8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80' width={56} height={56}/>
            </div>
        </nav>
    )
}
