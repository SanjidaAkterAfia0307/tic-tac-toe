import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
const HomeWithoutData = () => {
    return (
        <div className='h-screen'>
            <h3 className='text-3xl font-bold ml-6'>Your Games</h3>
            <div className='flex justify-center items-center'>
                <h2 className='font text-6xl mt-44 mb-6 text-center line'>No Games <br /> Found</h2>
            </div>
            <div>
            <div className='flex justify-center items-center'>
                <Link to='/opponent' className={ `bg-[#F2C94C] flex justify-center items-center rounded-lg mb-4 mt-6 auth-btn `}>
                    <button className='text-white font-bold'>Start a new game</button>
                </Link>
            </div>
            </div>
        </div>
    );
};

export default HomeWithoutData;