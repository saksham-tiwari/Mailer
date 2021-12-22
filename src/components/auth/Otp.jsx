import React from 'react'
import MailGIF from "./MailGIF"
import styles from './authstyles.module.css'
import { Button, Form } from 'react-bootstrap'
// import { Link } from 'react-router-dom'
// import google from "../../assets/google.svg"

const Otp = () => {
    const formSubmit = (e)=>{
        e.preventDefault();

    }
    return (
        <div>
            <MailGIF/>
            <div className={styles.rightBox} style={{top:"25%"}}>
                <h1 className={styles.heading}>Enter Your OTP</h1>
                <Form className={styles.formAuth} onSubmit={(e)=>formSubmit(e)}>
                    <Form.Group>
                        <Form.Label>OTP</Form.Label>
                        <Form.Control
                        className={styles.inputAuth}
                        placeholder='Enter your OTP'
                        type="text"/>
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
