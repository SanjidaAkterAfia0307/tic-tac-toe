import React, { useContext } from 'react';
import { Navigate } from 'react-router';
import { Context } from '../Contexts/ContextProvider';

const PrivateRouter = ({children}) => {
    const{isSign,isLoading}=useContext(Context)
   
    if(isLoading){
        return <div className='flex justify-center items-center h-screen text-[#F2C94C]'> Loading...</div>;
    }
    if(isSign){
        return children;
    }
    return <Navigate to='/login'></Navigate>
};

export default PrivateRouter;