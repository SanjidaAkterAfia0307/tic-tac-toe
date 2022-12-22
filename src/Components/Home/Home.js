import React, { useContext } from 'react';
import HomeWithoutAuth from './HomeWithoutAuth';
import './Home.css';
import HomeWithoutData from './HomeWithoutData';
import { Context } from '../../Contexts/ContextProvider';
const Home = () => {
    const { isSign } = useContext(Context)
    return (
        <div >
            {
                isSign ?
                    <HomeWithoutData></HomeWithoutData>
                    :

                    <HomeWithoutAuth></HomeWithoutAuth>
            }
        </div>
    );
};

export default Home;