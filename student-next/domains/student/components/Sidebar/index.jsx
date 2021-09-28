import React, { useLayoutEffect } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { Avatar } from "@mantine/core";
import { useMediaQuery } from '@mantine/hooks';

import styles from './sidebar.module.scss';

const StudentSideBarTopItems = [
    {
        id: "student-top-item-dashboard",
        href: '/entity/student',
        title: "Dashboard",
        icon: "/sidebar-icons/dashboard-main.svg"
    },
    {
        id: "student-top-item-live-chat",
        href: '/entity/student/live-chat',
        title: "Live chat",
        icon: "/sidebar-icons/chats.svg"
    },
    {
        id: "student-top-item-application",
        href: '/entity/student/applications',
        title: "Application",
        icon: "/sidebar-icons/applications.svg"
    },
    {
        id: "student-top-item-events",
        href: '/entity/student/events',
        title: "Events",
        icon: "/sidebar-icons/events.svg"
    },
    {
        id: "student-top-item-feeds",
        href: '/entity/student/feeds',
        title: "Feeds",
        icon: "/sidebar-icons/feed.svg"
    },
]
const StudentSideBarBottomItems = [
    {
        id: "student-bottom-item-profile",
        href: '/entity/student/my-profile',
        title: "My Profile",
        icon: "/sidebar-icons/profile.svg"
    },
    {
        id: "student-bottom-item-wich-list",
        href: '/entity/student/wich-list',
        title: "Wich list",
        icon: "/sidebar-icons/whitlist.svg"
    },
    {
        id: "student-bottom-item-my-documents",
        href: '/entity/student/my-documents',
        title: "My documents",
        icon: "/sidebar-icons/documents.svg"
    },
    {
        id: "student-bottom-item-services",
        href: '/entity/student/services',
        title: "Services",
        icon: "/sidebar-icons/services.svg"
    },
    {
        id: "student-bottom-item-transaction",
        href: '/entity/student/transactions',
        title: "Transactions",
        icon: "/sidebar-icons/transaction.svg"
    },
    {
        id: "student-bottom-item-account-settings",
        href: '/entity/student/account-settings',
        title: "Account Settings",
        icon: "/sidebar-icons/settings.svg"
    },
]
const LinkItem = ({ href, title, icon, shrink }) => {
    return(
        <Link href={href}>
            <a className={`py-3 px-2 my-0 flex flex-row items-center group hover:bg-fa-primary-dark-pattern rounded-lg ${!shrink ? 'rounded-full w-12 h-12 justify-center': ' w-full' }`}>
                <Image width={24} height={24} src={icon} className={`group-hover:transform group-hover:scale-110 text-white fill-current ${shrink ? '' : 'mr-2'}`} />
                { shrink && <div className='font-medium text-white ml-4'>{title}</div> }
            </a>
        </Link>
    )
}
export default function SideBarContainer() {
    const [isOpen, setIsOpen] = React.useState(false);
    const mediaWindow = useMediaQuery('(min-width: 900px)');
    useLayoutEffect(() => {
        if(mediaWindow){
            setIsOpen(false);
        }
    }, [mediaWindow])
    return (
        <nav id='sidebar' className={`bg-primary inset-0 h-screen py-7 px-3 text-white flex flex-col sticky bg-fa-primary-pattern ${isOpen ? 'w-64' : 'w-24'} ${styles.navbar_container}`}>
            <div id='sidebar-top' className='relative flex items-center justify-between'>
                <div id='sidebar-logo' className='px-2'>
                    { isOpen ? <Image src='/logo/findadmission-logo-trimed-gy.png' width='143px' height='44px'/> :
                    <Image src='/logo/findadmission-logo-small-gy.png' width='60px' height='60px' />}
                </div>
                <button id='sidebar-shrink-button' className='py-0 px-2 cursor-pointer transition' onClick={() => setIsOpen(!isOpen) }>
                    <svg width="1.4em" height="1.4em" viewBox="0 0 24 24"><path d="M8.5 12.8l5.7 5.6c.4.4 1 .4 1.4 0c.4-.4.4-1 0-1.4l-4.9-5l4.9-5c.4-.4.4-1 0-1.4c-.2-.2-.4-.3-.7-.3c-.3 0-.5.1-.7.3l-5.7 5.6c-.4.5-.4 1.1 0 1.6c0-.1 0-.1 0 0z" fill="currentColor"></path></svg>
                </button>
            </div>
            <div className={`flex flex-col w-full px-1 overflow-auto py-3 ${isOpen ? '' :  'items-center justify-center'}`}>
                <div id='sidebar-body' className='relative'>
                    <div id='level-1' >
                        { isOpen ? <div className='uppercase font-bold text-sm text-gray-100 mb-3'>PAGES</div> : <></> }
                        <div className={`flex flex-col w-full${isOpen ? '' :  'items-center justify-center'}`}>
                            { StudentSideBarTopItems.map((item, index) => ( <LinkItem key={item.id}  { ...item } shrink={isOpen} />)) }
                        </div>
                    </div>
                    {/* <div className='w-11/12 mx-auto my-3 h-px bg-white'/> */}
                    <div id='level-2' className='mt-4'>
                        { isOpen ? <div className='uppercase font-bold text-sm text-gray-100 mb-3'>Settings</div> : <></> }
                        <div className={`flex flex-col w-full${isOpen ? '' :  'items-center justify-center'}`}>
                            { StudentSideBarBottomItems.map((item, index) => ( <LinkItem key={item.id}  { ...item } shrink={isOpen} />)) }
                        </div>
                    </div>
                </div>
            </div>
            <div id='sidebar-footer' className='relative mt-auto py-2 px-2'>
                <div className={`flex items-center ${isOpen ? 'flex-row' : 'flex-col justify-center'}`}>
                    <button className='cursor-pointer'>
                        <Avatar radius='xl' size={isOpen ? 42 : 32 }  src="https://images.unsplash.com/photo-1632687223381-bdf64fb975d8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80" alt="it's me" />
                    </button>
                    <div className={`flex-col items-start justify-center ml-2 ${isOpen ? 'flex' : 'hidden'}`}>
                        <div className='font-medium text-sm'>WorldView Folabi</div>
                        <div className='font-light text-xs'>Admin</div>
                    </div>
                    <button className={`rounded-full p-2 hover:shadow-sh-1-12-08 cursor-pointer flex flex-col items-center justify-center ${isOpen ? 'ml-auto' : 'mt-3' }`}>
                        <Image src='/sidebar-icons/logout.svg' width='24px' height='24px' />
                    </button>
                </div>
            </div>
        </nav>
    )
}
