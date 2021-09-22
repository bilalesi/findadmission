import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useClickOutside } from '@mantine/hooks';
import { mainHeaderColumns } from '../constants';
import styles from './components.module.scss';
import { ButtonLink } from './Button';



function Header() {
    return (
        <header id='findadmission-header' className='w-full shadow-sh-1-12-08 h-20'>
            <div className='max-w-6xl mx-auto px-2 py-5'>
                <div className={`grid items-center gap-4 ${styles.header_wrapper}`}>
                    <div id='header-left' className=''>
                        <Link href='/'> 
                            <a className='hidden md:flex'>
                                <Image src='/logo/findadmission-logo.png' width='143px' height='44px'/>
                            </a>
                        </Link>
                    </div>
                    <div id='header-center' className=''>
                        <Link href='/'>
                            <a className='flex md:hidden'>
                                <Image src='/logo/findadmission-logo.png' width='143px' height='44px'/>
                            </a>
                        </Link>
                        <div id='header-main-menu' className={`h-full ${styles.header_main_menu}`}>
                            {
                                mainHeaderColumns.map((column, index) => {
                                    if(column.rows.length === 0){
                                        return(
                                            <Link href={column.url} key={`${column.title}-${index}`}>
                                                <button className={`${styles.menu_item} relative text-left`}>
                                                    {column.title}
                                                </button>
                                            </Link>
                                        )
                                    }
                                    if(column.rows.length > 0){
                                        return(
                                            <MenuItem title={column.title} items={column.rows}/>
                                        )
                                    }
                                })
                            }
                        </div>
                    </div>
                    <div id='header-right' className=''>
                        <ButtonLink.Primary title='Login' href='/signin'/>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header

const MenuItem = ({ title, items = [] }) => {
    const [openMenu, setOpenMenu] = useState(false);
    const ref = useClickOutside(() => setOpenMenu(false));
    return (
        <div className='relative'>
            <button onClick={() => setOpenMenu(true)} className={`${styles.menu_item} relative`}>{title}</button>
            { items.length > 0 && openMenu && 
                <div ref={ref} className={`absolute z-30 shadow-sh-6-16-12 top-10 bg-white px-5 py-5 rounded-md flex flex-col items-start justify-start w-full min-w-max`}>
                    { items.map((row, index) =>
                        {
                            if(row.rows?.length > 0){
                                return <div>
                                    <div className='font-bold uppercase text-sm text-gray-400'>{row.title}</div>
                                    <div className='flex flex-col items-start justify-start m-2'>
                                        {
                                            row.rows.map(item => <Link key={`${title}-${item.title}-${index}`} href={item.url}>
                                                <button className='py-2 my-1 px-4 text-left text-sm hover:bg-tretiary rounded-md w-full'>
                                                    {item.title}
                                                </button>
                                            </Link>
                                            )
                                        }
                                    </div>
                                </div>
                            }
                            return(
                                <Link key={`${title}-${row.title}-${index}`} href={row.url}>
                                    <button className='py-2 my-1 px-4 text-left text-sm hover:bg-tretiary rounded-md w-full'>
                                        {row.title}
                                    </button>
                                </Link>
                            )
                        })
                    }
                </div>
            }
        </div>
    )
}