import React from 'react';
import { Outlet } from 'react-router';
import Header from '../Components/Shared/Header';

const Main = () => {
    return (
        <div>
            <Header></Header>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;