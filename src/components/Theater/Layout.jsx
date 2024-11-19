import React from 'react';
import ChitChat from './ChitChat';
import Theater from './Theater';

const Layout = () => {
    return (
        <div className='grid lg:grid-cols-[1fr_2fr] grid-cols-1 gap-3 lg:ml-20 lg:mr-20 lg:mt-10 ml-10 mr-10 mt-5'>
            <div className="">
                <ChitChat></ChitChat>
            </div>
            <div className="">
                <Theater></Theater>
            </div>
        </div>
    );
};

export default Layout;