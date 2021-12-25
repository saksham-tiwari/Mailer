import React, { useState } from 'react'
import MailGIF from "./MailGIF"
import styles from './authstyles.module.css'
import { Alert, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { verifyOtp } from "../../redux/actions/auth"
import Loader from "react-loader-spinner";
import { clearMessage } from '../../redux/actions/message'
import { useNavigate } from 'react-router'

// import { Link } from 'react-router-dom'
// import google from "../../assets/google.svg"

const Otp = () => {
    var state = useSelector((state)=>state.message)
    var email = useSelector((state)=>state.email)
    const [loading, setLoading ] = useState(false);
    const dispatch = useDispatch();
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();  

    // console.log(email.mail);
    const formSubmit = (e)=>{
        e.preventDefault();
        setLoading(true)
        dispatch(verifyOtp(email.mail, otp))
        .then(()=>{
            navigate("/create-password")
        })
        .catch(()=>{
            setLoading(false)
        })
    } 
    const dismiss = ()=>{
        dispatch(clearMessage());
    }  
    return (
        <div>
            <MailGIF/>
            <div className={styles.rightBox} style={{top:"25%"}}>
                <h1 className={styles.heading}>Enter Your OTP</h1>
                {state.message?<Alert variant='danger' onClose={dismiss} className={styles.dismissAlert} dismissible>{state.message}</Alert>:<></>}
                {loading?<Loader type="TailSpin" color="#00BFFF" height={40} width={40} className={styles.loader}/>:<></>}
                <Form className={styles.formAuth} onSubmit={(e)=>formSubmit(e)}>
                    <Form.Group>
                        <Form.Label>OTP</Form.Label>
                        <Form.Control
                        className={styles.inputAuth}
                        placeholder='Enter your OTP'
                        type="text"
                        value={otp}
                        onChange={(e)=>setOtp(e.target.value)}
                        />
                    </Form.Group>
                    <br/>
                    <br/>
                    <Button type="submit" className={styles.authSubmitBtn}>
                        Verify OTP
                    </Button>
                    <br/>
                    <br/>
                    <p className={styles.otpTimer}>Resend OTP after 30 seconds</p>
                </Form>
            </div>
        </div>
    )
}

export default Otp
