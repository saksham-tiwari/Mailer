import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
// import { logout } from '../../../redux/actions/auth'
import styles from "./home.module.css"
import { Button } from "react-bootstrap"
import gif from "../../../assets/homepage.gif"

const Home = () => {
    const auth = useSelector((state)=>state.auth)
    // const [main, setMain]=useState("Logged Out")
    // const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        if(auth.isLoggedIn){
            navigate("/dashboard")
        } 
    },[])
    // const logOut = ()=>{
    //     dispatch(logout());
    // }
    const logInBtn = ()=>{
        navigate("/login");
    }
    const signUpBtn = ()=>{
        navigate("/signup")
    }
    return (
        <div>
            {/* {main} */}
            {/* {auth.isLoggedIn?<button onClick={logOut}>Logout</button>:<button onClick={()=>navigate("/login")}>Login</button>} */}
            <div className={styles.rightBlock}>
                <img src={gif} alt="gif" className={styles.GIF}/>

            </div>
            <div className={styles.leftBlock}>
                <h1 className={styles.mainHead}>
                Grow Your business using Bulk Mailer
                </h1>
                <p className={styles.paraLeft}>
                See how millions of people are using mailer to ease their work.
                </p>
                <div style={{width:"90%", marginLeft:"5%"}}>
                    <Button onClick={logInBtn} variant="outline-primary" className={styles.btnLogIn}>Log In</Button>
                    <Button onClick={signUpBtn} variant="primary" className={styles.btnSignUp}>Sign Up</Button>

                </div>
            </div>
        </div>
    )
}

export default Home
