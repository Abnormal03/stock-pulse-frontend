import React, { useState } from 'react'
import { useAuthContext } from './useAuthContext';

const useLogout = () => {
    const [loggingout, setLogginout] = useState(null);
    const [logoutError, setLogoutError] = useState(null);

    const {dispatch} = useAuthContext();


    const logout = ()=>{
        setLogginout(true);
        setLogoutError(null);
        try {
            localStorage.removeItem('user');
            dispatch({type:'LOGOUT-USER'});
        } catch (error) {
            setLogoutError(error.message);
        }finally{
            setLogginout(false);
        }
    }
  return {logout, loggingout, logoutError};
}

export default useLogout