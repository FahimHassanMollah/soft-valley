import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { userLoggedIn } from '../features/auth/authSlice';

const useAuthCheck = () => {
    const dispatch = useDispatch();
    const [authChecked, setAuthChecked] = useState(false)
     
    useEffect(() => {
        const localAuth = localStorage.getItem("auth");
        if(localAuth){
            const {state} = JSON.parse(localAuth);
            if((state?.user?.id) && (state?.accessToken)){
                dispatch(userLoggedIn({state}));
            }
        }
      
        setAuthChecked(true);
      }, [dispatch])
        
      return authChecked;
}

export default useAuthCheck;