import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import Layout from './Theater/Layout';

const Root = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Layout></Layout>
        </div>
    );
};

export default Root;