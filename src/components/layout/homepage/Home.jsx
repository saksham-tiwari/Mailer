import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
// import { logout } from '../../../redux/actions/auth'
import styles from "./home.module.css"
import { Button } from "react-bootstrap"
// import googleOneTap from 'google-one-tap';
import gif from "../../../assets/homepage.gif"
import FullPageLoader from "../Loaders/FullPageLoader"
import { oneTap } from '../../../redux/actions/auth'
import { clearMessage } from '../../../redux/actions/message'


const Home = () => {
    const auth = useSelector((state)=>state.auth)
    // const [main, setMain]=useState("Logged Out")
    // const dispatch = useDispatch();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const onOneTapSignedIn = response => {
        dispatch(oneTap(response.credential))
        .then((resp)=>{
            setLoader(false);
            document.getElementById("credential_picker_container").remove();
            // setIsOneTap(true);
            setTimeout(()=>{navigate("/")},2000)
        })
        .catch((err)=>{
            setLoader(false);
            setTimeout(()=>dismiss(),3000)

        })
      }
    

    const initializeGSI = () => {
        window.google.accounts.id.initialize({
          client_id: '852195797172-d0qq3vi9erb2ep1ill5eilc65mdvmah9.apps.googleusercontent.com',
          cancel_on_tap_outside: false,
          callback: onOneTapSignedIn,
          context:"signup"
        });
        window.google.accounts.id.prompt((notification) => {
          if (notification.isNotDisplayed()) {
            console.log(notification.getNotDisplayedReason())
          } else if (notification.isSkippedMoment()) {
            console.log(notification.getSkippedReason())
          } else if(notification.isDismissedMoment()) {
            console.log(notification.getDismissedReason())
          }
        });
      }

    useEffect(()=>{
        if(auth.isLoggedIn){
            navigate("/dashboard")
        } else{
            const el = document.createElement('script')
        el.setAttribute('src', 'https://accounts.google.com/gsi/client')
        el.onload = () => initializeGSI();
        document.querySelector('body').appendChild(el)
        }
        window.scrollTo(1, 1);

    },[auth.isLoggedIn])
    // const logOut = ()=>{
    //     dispatch(logout());
    // }
    const logInBtn = ()=>{
        navigate("/login");
    }
    const signUpBtn = ()=>{
        navigate("/signup")
    }
    // const onetapuser = localStorage.getItem("one-tap")
    // const [isOneTap, setIsOneTap] = useState(localStorage.getItem("one-tap"))
    // useEffect(()=>{
    //     setTimeout(()=>{
    //         setIsOneTap(true)
    //         console.log(isOneTap);
    //     },2000)

    //     if(!isOneTap){
    //         const options = {
    //             client_id: '852195797172-d0qq3vi9erb2ep1ill5eilc65mdvmah9.apps.googleusercontent.com', // required
    //             auto_select: false, // optional
    //             cancel_on_tap_outside: false, // optional
    //             context: 'signup', // optional
    //             isDisplayed: false,
    //         };
        
    //         googleOneTap(options, (response) => {
    //             setLoader(true);
        
    //             // Send response to server
    //             console.log(response.credential);
    //             // axios.post("https://bulk-mailer-app.herokuapp.com/signup/google", {token:response.credential})
    //             dispatch(oneTap(response.credential))
    //             .then((resp)=>{
    //                 setLoader(false);
    //                 setIsOneTap(true);
    //                 setTimeout(()=>{navigate("/")},2000)
    //             })
    //             .catch((err)=>{
    //                 setLoader(false);
    //                 setTimeout(()=>dismiss(),3000)
        
    //             })
    //         });
    //     }
        
    // },[isOneTap])
    const dismiss = ()=>{
        dispatch(clearMessage());
    }

    
    return (
        <div>
            <FullPageLoader condition={loader}/>

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
