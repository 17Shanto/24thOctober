import { faDove } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import ChatApp from './ChatApp';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';


const ChitChat = () => {
    return (
        <div>
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <button className="btn btn-success font-serif" onClick={() => document.getElementById('my_modal_3').showModal()}><FontAwesomeIcon className='text-white text-xl' icon={faDove} />ChitChat</button>
            <dialog id="my_modal_3" className="modal display ">

                <div className="modal-box artboard artboard-demo phone-1 ">
                    <div className="">
                        <h1 className='font-serif font-semibold text-xl text-center'>Tweety Birds <FontAwesomeIcon className='text-success' icon={faTwitter} /></h1>
                    </div>
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>

                    <ChatApp></ChatApp>


                    {/* <div className="display">
                        <div className="artboard artboard-demo phone-1">
                            <ChatApp></ChatApp>
                        </div>
                    </div> */}

                </div>
            </dialog>
        </div>
    );
};

export default ChitChat;