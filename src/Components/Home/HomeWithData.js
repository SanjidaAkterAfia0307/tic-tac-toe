import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../Contexts/ContextProvider';
import GamesCard from './GamesCard';
import { AiOutlinePlus } from "react-icons/ai";
import './Home.css';
import { Link } from 'react-router-dom';
const HomeWithData = () => {
    const { client } = useContext(Context)
    console.log(client.user.email)
    const [cards, setCards] = useState([])
    useEffect(() => {

        axios.get(`https://server-seven-tau.vercel.app/games/${client.user.email}`)
            .then(data => setCards(data.data))
    }, [])
    return (
        <div className=''>
            <h3 className='text-3xl font-bold ml-6'>Your Games</h3>
            <div className='grid gap-4 grid-rows-1 px-2 justify-center mt-6'>
                {
                    cards.map(card => <GamesCard card={card} key={card._id}></GamesCard>)
                }
            </div>
            <Link to='/opponent' className='w-32 h-10 new  bg-[#270F36] rounded-lg text-white p-2 absolute bottom-6 right-6 flex items-center justify-evenly'>
                <AiOutlinePlus className='w-4 h-4'></AiOutlinePlus>
                <p>New Game</p>
            </Link>
        </div>
    );
};

export default HomeWithData;