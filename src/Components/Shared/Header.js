import React, { useContext } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { BiLogIn } from "react-icons/bi";
import { Context } from '../../Contexts/ContextProvider';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const { logOut, isSign } = useContext(Context)
    const location = useLocation()
    console.log(location)
    const opponent = location.pathname === "/opponent"
    console.log(opponent)
    return (
        <div className={!opponent === true ? 'flex justify-between' : 'flex justify-end'}>
            {!opponent &&

                <Link to="/">

                    <IoIosArrowBack className='h-6 w-6 mb-9  ml-4'></IoIosArrowBack>
                </Link>
            }
            {
                isSign &&

                <BiLogIn className='h-6 w-6 mb-9  mr-4' onClick={logOut}></BiLogIn>
            }
        </div>
    );
};

export default Header;