import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
const HomeWithoutAuth = () => {
    return (
        <div>
            <div className='flex flex-col items-center mt-44'>
                <h3 className='font text-4xl text-center'>async</h3>
                <h2 className='text-8xl font text-center'>tic tac <br />toe</h2>
            </div>
            <div>
            <div className='flex justify-center items-center'>
                <Link to='/login' className={ `bg-[#F2C94C] flex justify-center items-center rounded-lg mt-24 auth-btn`}>
                    <button className='text-white font-bold'>Login</button>
                </Link>
            </div>
            <div className='flex justify-center items-center'>
                <Link to='/signin' className={ `bg-[#2F80ED] flex justify-center items-center rounded-lg mb-4 mt-6 auth-btn `}>
                    <button className='text-white font-bold'>Register</button>
                </Link>
            </div>
            </div>
        </div>
    );
};

export default HomeWithoutAuth;