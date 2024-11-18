import React from 'react';

const Layout = () => {
    return (
        <div className='grid lg:grid-cols-[1fr_2fr] grid-cols-1 gap-3 lg:ml-20 lg:mr-20 lg:mt-10 ml-10 mr-10 mt-5'>
            <div className="">
                <button className="btn" onClick={() => document.getElementById('my_modal_3').showModal()}>open modal</button>
                <dialog id="my_modal_3" className="modal">
                    <div className="modal-box">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <h3 className="font-bold text-lg">Hello!</h3>
                        <p className="py-4">Press ESC key or click on ✕ button to close</p>
                    </div>
                </dialog>
            </div>
            <div className="">
                <h1>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero est dolor totam, odit assumenda quod repellendus similique, eligendi qui amet sequi sapiente dolorem et. Reprehenderit nostrum in voluptas maxime provident?Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid consequatur dignissimos hic necessitatibus! Dignissimos exercitationem, mollitia minus tenetur suscipit sint? Vero mollitia cupiditate corporis, tenetur laboriosam eveniet ad ipsa placeat.</h1>
            </div>
        </div>
    );
};

export default Layout;