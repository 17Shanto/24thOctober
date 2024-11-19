
import { faFan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import { ContextData } from './ContextProvider';
const Navbar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    // Use useEffect to update the date every second
    useEffect(() => {
        // Update the date every second
        const intervalId = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000); // 1000 ms = 1 second

        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);

    // Format the current date as "Weekday, Month Day, Year"
    function getOrdinalSuffix(day) {
        if (day >= 11 && day <= 13) return `${day}th`; // Special cases for 11th, 12th, 13th
        switch (day % 10) {
            case 1: return `${day}st`;
            case 2: return `${day}nd`;
            case 3: return `${day}rd`;
            default: return `${day}th`;
        }
    }

    const day = getOrdinalSuffix(currentDate.getDate());
    const month = currentDate.toLocaleDateString('en-US', { month: 'long' });
    const formattedDate = `${day} ${month}`;

    const { handleSignOut, user } = useContext(ContextData);

    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <h1 className="text-3xl font-serif font-bold">{formattedDate} <FontAwesomeIcon icon={faFan} className='animate-spin' style={{ animationDuration: '3s' }} /></h1>
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