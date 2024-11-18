import React from 'react';
import ChitChat from './ChitChat';

const Layout = () => {
    return (
        <div className='grid lg:grid-cols-[1fr_2fr] grid-cols-1 gap-3 lg:ml-20 lg:mr-20 lg:mt-10 ml-10 mr-10 mt-5'>
            <div className="">
                <ChitChat></ChitChat>
            </div>
            <div className="">
                <h1>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero est dolor totam, odit assumenda quod repellendus similique, eligendi qui amet sequi sapiente dolorem et. Reprehenderit nostrum in voluptas maxime provident?Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid consequatur dignissimos hic necessitatibus! Dignissimos exercitationem, mollitia minus tenetur suscipit sint? Vero mollitia cupiditate corporis, tenetur laboriosam eveniet ad ipsa placeat.</h1>
            </div>
        </div>
    );
};

export default Layout;