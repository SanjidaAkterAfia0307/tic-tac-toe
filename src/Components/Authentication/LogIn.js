import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie/cjs/Cookies';
import { Context } from '../../Contexts/ContextProvider';

const LogIn = () => {
    const [username,setUserName]=useState("")
    const [password,setPassword]=useState("")
    const [error, setError] = useState("")
    const {setIsSign,isSign,setIsLoading}=useContext(Context)
    const cookies=new Cookies()
   
    const logIn=(e)=>{axios.post("http://localhost:3001/login", {
      username,
      password,
    }).then((res) => {
        if(res.data.message){
          return  setError(res.data.message)
        }
        setError('')
        const { token, userId, fullName, email, username, hashedPassword } =
          res.data;
        cookies.set("token", token);
        cookies.set("userId", userId);
        cookies.set("username", username);
        cookies.set("fullName",fullName);
        cookies.set("email", email);
        cookies.set("hashedPassword", hashedPassword);
        setIsLoading(false)
       setIsSign(true)
      });
    };
    return (
        <div>
            <div className='px-6  mb-10'>
                <h4 className='font-bold text-sm mb-2'>Login</h4>
                <h2 className='font-bold text-2xl leading-8'>Please enter your <br /> details</h2>
            </div>

            <div className='px-6'>
               
                <label htmlFor="username" className='text-sm font-bold '>Username</label>
                <input onChange={e => { setUserName(e.target.value ) }} type="text" name="username" placeholder='Type your username here' className='block w-full ' />
            
                <label htmlFor="password" className='text-sm font-bold '>Password</label>
                <input onChange={e => { 
                    setError("")
                     setPassword(e.target.value ) 
                     }} type="password" name="password" placeholder='Type your password here' className='block w-full mb-0 ' />
                    <p className='text-sm my-2'>Don't have an account?<Link className='text-[#F2C94C]' to='/signin'> Create Now !</Link></p>
            </div>
            {
                isSign &&
                <div className='flex justify-center items-center'>
                    <div className={isSign ? `bg-[#6FCF97] flex justify-center items-center rounded-lg sub-btn  ` : ` hidden`}>
                        <button className='text-white font-bold'>Congratulations!!! Successfully Login</button>
                    </div>
                </div>
            }
            {
                error &&
                <div className='flex justify-center items-center'>
                    <div className={error ? `bg-[#EB5757] flex font-normal justify-center items-center rounded-lg sub-btn  ` : ` hidden`}>
                        <button className='text-white font-bold'>Enter correct details.</button>
                    </div>
                </div>
            }
            <div className='flex justify-center items-center'>
                <Link to='/opponent' onClick={logIn} className={error || isSign ?`bg-[#E0E0E0] flex justify-center items-center rounded-lg dis-sub-btn` : `bg-[#F2C94C] flex justify-center items-center rounded-lg sub-btn`}>
                    <button className='text-white font-bold'>Login</button>
                </Link>
            </div>

        </div>
    )
};

export default LogIn;