import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
const GamesCard = ({card}) => {
    console.log(card)
    const {date,Opponent,id,state}=card
    console.log(typeof(id))
    return (
        <div className='card'>
            <h4 className='text-2xl font-bold'>Game with {Opponent}</h4>
            <p className='text-sm my-4'>{state}</p>
            <p className='text-sm mb-4'>{date}</p>
            <div className='flex justify-center items-center' >
                <Link to='/opponent' className={` bg-[#F2C94C] flex justify-center items-center rounded-lg  play-btn`  } >
                    <p className='text-white font-bold'>Play!</p>
                </Link>
            </div>
        </div>
    );
};

export default GamesCard;