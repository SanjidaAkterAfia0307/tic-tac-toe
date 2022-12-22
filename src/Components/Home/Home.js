import React, { useContext, useEffect, useState } from 'react';
import HomeWithoutAuth from './HomeWithoutAuth';
import './Home.css';
import HomeWithoutData from './HomeWithoutData';
import { Context } from '../../Contexts/ContextProvider';
import HomeWithData from './HomeWithData';
import axios from 'axios';
const Home = () => {
    const { isSign,client } = useContext(Context)
    console.log(client)
    const [cards, setCards] = useState([])
    useEffect(() => {

        axios.get(`https://server-seven-tau.vercel.app/games/${client?.user?.email}`)
            .then(data => setCards(data.data))
    }, [])
    return (
        <div >
            {
                isSign && cards.length!==0 &&
                <HomeWithData></HomeWithData>
                   
            }
            {
                isSign &&  cards.length===0 &&
                <HomeWithoutData></HomeWithoutData>
            }
            {
                !isSign && 

                <HomeWithoutAuth></HomeWithoutAuth>
            }
        </div>
    );
};

export default Home;