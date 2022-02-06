import React, { useEffect, useState } from 'react'
import MailGIF from "./MailGIF"
import styles from './authstyles.module.css'
import { Alert, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { verifyOtp } from "../../redux/actions/auth"
import { resendOtp } from '../../redux/actions/auth'
import Loader from "react-loader-spinner";
import { clearMessage } from '../../redux/actions/message'
import { useNavigate } from 'react-router'
import { SET_PERMISSION } from '../../redux/actions/types'
// import MyTimer from "./Timer"
// import { Link } from 'react-router-dom'
// import { Link } from 'react-router-dom'
// import google from "../../assets/google.svg"

const Otp = () => {
    // let time= new Date();

    var state = useSelector((state)=>state.message)
    var email = useSelector((state)=>state.email)
    var permission = useSelector((state)=>state.permission)
    // const seconds = 30;
    // const [timerBtn, setTimerBtn] = useState(true);
    const [loading, setLoading ] = useState(false);
    const dispatch = useDispatch();
    const [otp, setOtp] = useState("");
    const [resendAlert, setResendAlert]= useState(false);
    const navigate = useNavigate();  
    const [otpErr, setOtpErr]= useState(false);
    const [alertMsg, setAlertMsg] = useState("");

    const auth = useSelector((state)=>state.auth)

    useEffect(()=>{
        console.log(permission);
        if(auth.isLoggedIn){
            navigate("/")
        } 
        window.scrollTo(1, 1);

        if(permission.permission===true){
            dispatch({
                type: SET_PERMISSION,
                payload: false,
            })
            console.log("run")
        } else{
            navigate("/")
        }
        // if(permission===false)
    },[])
    // console.log(email.mail);
    const formSubmit = (e)=>{
        e.preventDefault();
        setLoading(true)
        if(otp===""){
            setLoading(false)
            setOtpErr(true)
            setAlertMsg("Otp cannot be empty")
            setTimeout(() => {
                setOtpErr(false)
                setAlertMsg("")
            }, 3000);
        }
        else{
            dispatch(verifyOtp(email.mail, otp))
            .then(()=>{
                dispatch({
                    type: SET_PERMISSION,
                    payload: true,
                })
                navigate("/create-password")
            })
            .catch(()=>{
                setLoading(false)
            })
        }
        
    } 
    const dismiss = ()=>{
        dispatch(clearMessage());
    }
    const [counter, setCounter] = useState(30);
    useEffect(()=>{
        const timer = counter>0 && setInterval(() => setCounter(counter - 1), 1000);
        return () => clearInterval(timer);
    },[counter]);  
    // const resetTimer=()=>{
    //     // setSeconds(30)
    //     setTimerBtn(false)
    // }
    const resendOTP = ()=>{
        setCounter(30)
        setLoading(true)
        dispatch(resendOtp(email.mail))
        .then(()=>{
            // alert("resend")
            setResendAlert(true)
            setLoading(false)

        })
        .catch(()=>{
            setLoading(false)
            setTimeout(()=>dismiss(),3000)

        });
    }
    return (
        <div>
            <MailGIF/>
            <div className={styles.rightBox} style={{top:"25%"}}>
                <h1 className={styles.heading}>Enter Your OTP</h1>
                {state.message?<Alert variant='danger' onClose={dismiss} className={styles.dismissAlert} dismissible>{state.message}</Alert>:<></>}
                {resendAlert?<Alert variant='success' onClose={()=>{setResendAlert(false)}} className={styles.dismissAlert} dismissible>Otp Resent Successfully</Alert>:<></>}
                {alertMsg!==""?<Alert variant='danger' 
                    onClose={
                        ()=>{
                            setAlertMsg("")
                            setOtpErr(false)
                            }} 
                    className={styles.dismissAlert} dismissible>{alertMsg}</Alert>:<></>}
                
                {loading?<Loader type="TailSpin" color="#00BFFF" height={40} width={40} className={styles.loader}/>:<></>}
                <Form className={styles.formAuth} onSubmit={(e)=>formSubmit(e)}>
                    <Form.Group>
                        <Form.Label>OTP</Form.Label>
                        <Form.Control
                        className={styles.inputAuth}
                        placeholder='Enter your OTP'
                        type="text"
                        value={otp}
                        style={otpErr?{borderColor:"red", borderWidth:"4px"}:{borderColor:"#253E7E"}}
                        onChange={(e)=>setOtp(e.target.value)}
                        />
                    </Form.Group>
                    <br/>
                    <br/>
                    <Button type="submit" className={styles.authSubmitBtn} >
                        Verify OTP
                    </Button>
                    <br/>
                    <br/>
                    <p className={styles.otpTimer}> <button onClick={resendOTP} className={styles.resendBtn} disabled={counter>0?true:false}> Resend OTP </button>  after 00:{String(counter).padStart(2, '0')} seconds </p>
                    {/* <MyTimer expiryTimestamp={time.setSeconds(seconds)} onExpire={resetTimer}></MyTimer>  */}
                </Form>
            </div>
        </div>
    )
}

export default Otp
