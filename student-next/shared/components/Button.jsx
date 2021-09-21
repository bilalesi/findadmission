import Link from 'next/link';


const Button = {
    Primary: ({ title, onClick }) => {
        return(
            <button onClick={onClick} className='flex items-center justify-center px-4 py-2 w-full bg-primary border-white text-white rounded-md h-11 text-center'>
                {title}
            </button>
        )
    },
    Secondary: ({ title, onClick }) => {
        return(
            <button onClick={onClick} className='flex items-center justify-center px-4 py-2 w-full bg-secondary border-white rounded-md h-11 text-center'>
                {title}
            </button>
        )
    },
    PrimaryOutline: ({ title, onClick }) => {
        return(
            <button onClick={onClick} className='flex items-center justify-center px-4 py-2 w-full bg-white border border-primary text-primary rounded-md h-11 text-center'>
                {title}
            </button>
        )
    },
    Secondary: ({ title, onClick }) => {
        return(
            <button onClick={onClick} className='flex items-center justify-center px-4 py-2 w-full bg-white border-secondary text-secondary rounded-md h-11 text-center'>
                {title}
            </button>
        )
    },
}

const ButtonLink = {
    Primary: ({ title, href }) => {
        return(
            <Link href={href} >
                <a className='flex items-center justify-center px-4 py-2 w-full bg-primary border-white text-white rounded-md h-11 text-center'>
                    {title}
                </a>
            </Link>
        )
    },
    Secondary: ({ title, href }) => {
        return(
            <Link href={href} >
                <a className='flex items-center justify-center px-4 py-2 w-full bg-secondary border-white rounded-md h-11 text-center'>
                    {title}
                </a>
            </Link>
        )
    },
    PrimaryOutline: ({ title, href }) => {
        return(
            <Link href={href} >
                <a className='flex items-center justify-center px-4 py-2 w-full bg-white border-primary text-primary rounded-md h-11 text-center'>
                    {title}
                </a>
            </Link>
        )
    },
    Secondary: ({ title, href }) => {
        return(
            <Link href={href} >
                <a className='flex items-center justify-center px-4 py-2 w-full bg-white border-secondary text-secondary rounded-md h-11 text-center'>
                    {title}
                </a>
            </Link>
        )
    },
}

export { ButtonLink };
export default Button;