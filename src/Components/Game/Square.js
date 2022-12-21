import React from 'react';
import './AllGame.css';
import cross from "../../assests/Property 1=x.png"
import circle from "../../assests/Ellipse 1.png"
const Square = ({ setSquare, val,cls }) => {
    console.log(val)
    return (
        <div className= {`bg-white flex justify-center square items-center ${cls}`} onClick={setSquare}>
            <img className={val ? ` p-5 ` : `hidden`} src={val === "X" ? `${cross}`:`${circle}` } alt="" />
            {/* <h1>{val}</h1> */}
        </div>
    );
};

export default Square;