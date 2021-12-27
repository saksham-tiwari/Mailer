import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { logout } from '../../redux/actions/auth'

const Home = () => {
    const auth = useSelector((state)=>state.auth)
    // const [main, setMain]=useState("Logged Out")
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // useEffect(()=>{
    //     if(auth.isLoggedIn){
    //         setMain("Logged In")
    //     } else {
    //         setMain("LoggedOut")
    //     }
    // },[])
    const logOut = ()=>{
        dispatch(logout());
    }
    return (
        <div>
            {/* {main} */}
            {auth.isLoggedIn?<button onClick={logOut}>Logout</button>:<button onClick={()=>navigate("/login")}>Login</button>}
        </div>
    )
}

export default Home
