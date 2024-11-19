import { faDove } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import ChatApp from './ChatApp';


const ChitChat = () => {
    return (
        <div>
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <button className="btn btn-success font-serif" onClick={() => document.getElementById('my_modal_3').showModal()}><FontAwesomeIcon className='text-white text-xl' icon={faDove} />ChitChat</button>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    {/* <ChatApp></ChatApp> */}
                    <ChatApp></ChatApp>
                </div>
            </dialog>
        </div>
    );
};

export default ChitChat;