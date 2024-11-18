import React, { useContext } from 'react';
import theaterImg from '../assets/360_F_640683251_qQDBJZLrQbUNBgEPyDCfo9oCYywVkwon.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFan } from '@fortawesome/free-solid-svg-icons';
import { ContextData } from './ContextProvider';
import { useNavigate } from 'react-router-dom';

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import app from '../firebase/firebase.init';
const SignIn = () => {

    // Navigation Set Up
    const navigate = useNavigate();

    //Context data
    const { setLoading } = useContext(ContextData);

    // Google Sign In With Popup
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);

    const handleSignUp = () => {
        setLoading(true);
        signInWithPopup(auth, provider)
            .then((result) => {
                const loggedUser = result.user;
                navigate("/");
                console.log("Login Successfully");

            }).catch((error) => {
                console.log(error);
            });

    }

    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col">
                    <img
                        src={theaterImg}
                        className="max-w-sm rounded-lg shadow-2xl" />
                    <div className='flex flex-col items-center justify-center'>
                        <h1 className="text-5xl font-bold text-[#800000]">𝕿𝖍𝖊𝖆𝖙𝖊𝖗 𝕯𝖆𝖙𝖊 <FontAwesomeIcon icon={faFan} className='animate-spin text-white' style={{ animationDuration: '3s' }} /></h1>
                        <p className="py-6 lg:flex lg:flex-col font-serif">
                            <span>
                                Red wine kisses you white on a strange night.
                                A mysterious  murder, A blood line.
                            </span>
                            <span>
                                That blooming flower is mine.
                                My dear flower
                                My blooming flower
                                Good Days are coming.
                            </span>
                            <span>
                                No worries,
                                You were mine.
                                You are mine~
                            </span>
                        </p>
                        <button onClick={handleSignUp} className="btn btn-outline bg-[#800000] font-serif font-semibold">Get Started</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;