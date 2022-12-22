import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { Context } from '../../Contexts/ContextProvider';
import "./SignIn.css"

const SignIn = () => {
    const [user, setUser] = useState(null)
    const { setIsSign, isSign,setIsLoading }=useContext(Context)
    
    // console.log(user.name, user.userName, user.email, user.password)
    const cookies = new Cookies()

    const signUp = (e) => {
        axios.post("http://localhost:3001/signup", user).then((res) => {
            const { token, userId, fullName, email, username, hashedPassword } =
                res.data;
            cookies.set("token", token);
            cookies.set("userId", userId);
            cookies.set("username", username);
            cookies.set("fullName", fullName);
            cookies.set("email", email);
            cookies.set("hashedPassword", hashedPassword);
            setIsLoading(false)
            setIsSign(true)

        });
    };
    return (
        <div>
            <div className='px-6 mb-10'>
                <h4 className='font-bold text-sm mb-2'>Create account</h4>
                <h2 className='font-bold text-2xl leading-8'>Let’s get to know <br /> you better!</h2>
            </div>

            <div className='px-6'>
                <label htmlFor="name" className='text-sm font-bold '>Your name</label>
                <input onChange={(e) => { setUser({ ...user, fullName: e.target.value }) }} type="text" name="name" placeholder='Type your name here' className='block w-full ' />
                <label htmlFor="username" className='text-sm font-bold '>Username</label>
                <input onChange={(e) => { setUser({ ...user, username: e.target.value }) }} type="text" name="username" placeholder='Type your username here' className='block w-full ' />
                <label htmlFor="email" className='text-sm font-bold '>Email</label>
                <input onChange={(e) => { setUser({ ...user, email: e.target.value }) }} type="email" name="email" placeholder='Type your email here' className='block w-full ' />
                <label htmlFor="password" className='text-sm font-bold '>Password</label>
                <input onChange={(e) => { setUser({ ...user, password: e.target.value }) }} type="password" name="password" placeholder='Type your password here' className='block w-full mb-0 ' />
                <p className='text-sm my-2'>Already have an account?<Link className='text-[#F2C94C]' to='/login'> Log In!</Link></p>
            </div>

            {
                isSign &&
                <div className='flex justify-center items-center'>
                    <div className={isSign ? `bg-[#6FCF97] flex justify-center items-center rounded-lg sub-btn  ` : ` hidden`}>
                        <button className='text-white font-bold'>Congratulations!!! Account created.</button>
                    </div>
                </div>
            }
            <div className='flex justify-center items-center' >
                <Link to='/opponent' onClick={signUp} className={isSign ? `bg-[#E0E0E0]  flex justify-center items-center rounded-lg dis-sub-btn  text-white` :` bg-[#F2C94C] flex justify-center items-center rounded-lg sub-btn`  } disabled={isSign}>
                    <p className='text-white font-bold'>Register</p>
                </Link>
            </div>

        </div>
    );
};

export default SignIn;