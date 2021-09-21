import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { footerColumns } from '../constants';
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from '../icons-jsx';
import styles from './components.module.scss';


export default function Footer() {
    return (
        <footer id='findadmission-footer' className='w-full px-2 py-16 mt-auto bg-primary'>
            <div className='max-w-6xl mx-auto p-1'>
                <Logo/>
                <div className={`grid gap-4 ${styles.footer_wrapper}`}>
                    <div>
                        <FooterRow/>
                        <FooterSocialMedia/>
                    </div>
                    <div className='w-full mx-auto h-px md:w-px md:h-full md:mx-0 bg-background'/>
                    <div>
                        <FooterLocation/>
                    </div>
                </div>
            </div>
        </footer>
    )
}


const Logo = () => {
    return(
        <div className='relative mb-4 flex flex-col items-center justify-center'>
            <div className='w-full h-px md:w-full md:h-full'>
                <Image  src='/logo/findadmission-logo.png' width='143px' height='44px' alt='logo'/>
            </div>
        </div>
    )
}
const FooterColumn = ({ title, items = [] }) => {
    return(
        <div className='flex flex-col items-start justify-start text-white'>
            <div className='font-bold text-base mb-2'>{title}</div>
            <div className='flex flex-col items-start justify-start'>
                {items.map((item, index) => <Link key={`title-${index}`} href={item.url}>
                    <a className='py-1 text-sm font-medium'>{item.title}</a>
                </Link>)}
            </div>
        </div>
    )
}
const FooterRow = () => {
    return(
        <section className='grid grid-cols-2 grid-rows-2 gap-3 md:grid-cols-4 md:grid-rows-1 p-5'>
            {
                footerColumns.map((column, index) =>
                    <FooterColumn key={`footer-column-${index}`} title={column.title} items={column.rows} />)
            }
        </section>
    )
}
const FooterSocialMedia =() => {
    return(
        <section className='grid grid-flow-col gap-3 mt-4 p-5' style={{ gridAutoColumns: '28px'}}>
            <Linkedin width="1.3em" height="1.3em" className='fill-current text-gray-400 hover:text-white cursor-pointer'/>
            <Instagram width="1.3em" height="1.3em" className='fill-current text-gray-400 hover:text-white cursor-pointer'/>
            <Youtube width="1.3em" height="1.3em" className='fill-current text-gray-400 hover:text-white cursor-pointer'/>
            <Twitter width="1.3em" height="1.3em" className='fill-current text-gray-400 hover:text-white cursor-pointer'/>
            <Facebook width="1.3em" height="1.3em" className='fill-current text-gray-400 hover:text-white cursor-pointer'/>
        </section>
    )
}
const FooterLocation = () => {
    return(
        <section className='flex flex-col items-start justify-start text-white p-5'>
            <div className='font-bold mb-2'>Location</div>
            <div className='mb-3'>
                <div className='mb-1 font-medium'>USA Office</div>
                <div className='font-light text-sm'>
                    <div>Address: The Bank of America Plaza, 800 5th Avenue, Suite 4100 Seattle, WA 98104 </div>
                    <div>Tel: +1 206 620 2305</div>
                </div>
            </div>
            <div>
                <div className='mb-1 font-medium'>UK Office</div>
                <div className='font-light text-sm'>
                    <div>Address: 219 Gooshays Drive, Romford, Essex, United Kingdom, RM3 8YJ </div>
                    <div>Tel: +44 203 371 7903</div>
                </div>
            </div>
        </section>
    )
}

