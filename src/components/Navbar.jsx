
import { faFan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import { ContextData } from './ContextProvider';
const Navbar = () => {
    const { handleSignOut, user } = useContext(ContextData);
    console.log(user.photoURL);
    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <h1 className="text-xl font-serif font-bold">24th October <FontAwesomeIcon icon={faFan} className='animate-spin' style={{ animationDuration: '3s' }} /></h1>
                </div>
                <div className="flex-none gap-2">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                {user?.photoURL ? (
                                    <img src={user.photoURL} alt="Profile" />
                                ) : (
                                    <p>No profile picture available</p>
                                )}
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li>
                                <a className="justify-between gap-0">
                                    {user.displayName}
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li><button onClick={handleSignOut} className=''>Logout</button></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;