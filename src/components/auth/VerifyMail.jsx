import React from 'react'
import MailGIF from "./MailGIF"
import styles from './authstyles.module.css'
import { Button, Form } from 'react-bootstrap'

const VerifyMail = () => {
    const formSubmit = (e)=>{
        e.preventDefault();

    }
    return (
        <div>
            <MailGIF/>
            <div className={styles.rightBox} style={{top:"25%"}}>
                <h1 className={styles.heading}>Verify Your Email</h1>
                <Form className={styles.formAuth} onSubmit={(e)=>formSubmit(e)}>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                        className={styles.inputAuth}
                        placeholder='Enter your Email Address'
                        type="email"/>
                    </Form.Group>
                    <br/>
                    <br/>
                    <Button type="submit" className={styles.authSubmitBtn}>
                        Verify Email
                    </Button>
                    <br/>
                    <br/>
                    {/* <p className={styles.otpTimer}>Resend OTP after 30 seconds</p> */}
                </Form>
            </div>
        </div>
    )
}

export default VerifyMail
