import React from 'react';

const Button = {
    primary: ({ onClick, title }) => {
        return(
            <button className='flex flex'>
                { title }
            </button>
        )
    }
}