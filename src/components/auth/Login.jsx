import React from 'react'
import MailGIF from "./MailGIF"
import styles from './authstyles.module.css'
import { Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import google from "../../assets/google.svg"
const Login = () => {
    const formSubmit = (e)=>{
        e.preventDefault();

    }
    return (
        <div>
            <MailGIF/>
            <div className={styles.rightBox}>
                <h1 className={styles.heading}>Welcome Back</h1>
                <h2 className={styles.subHeading}>Log In to your account!</h2>
                <Form className={styles.formAuth} onSubmit={(e)=>formSubmit(e)}>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                        className={styles.inputAuth}
                        placeholder='Enter your Email Address'
                        type="email"/>
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                        className={styles.inputAuth}
                        placeholder='Enter your Email Address'
                        type="password"/>
                    </Form.Group>
                    <br/>
                    <br/>
                    <Button type="submit" className={styles.authSubmitBtn}>
                        Log In
                    </Button>
                    <br/>
                    <br/>
                    <div className={styles.center}>
                        <Link to='forgot' className={styles.secondaryLink}>Forgot Password?</Link>
                    </div>
                    <table>
                        <tr>
                            <td style={{width:"49%"}}><hr/></td>
                            <td style={{verticalAlign:"middle", textAlign: "center", color:"#00000075"}}> Or </td>
                            <td style={{width:"49%"}}><hr/></td>
                        </tr>
                    </table>
                    <div className={styles.center}>
                        <Link to="/" className={styles.socialAuthLink}>
                            <img src={google} alt="google" style={{marginRight:"10px"}}/> 
                            Sign In using Google
                        </Link>
                    </div>
                    <br/>
                    <br/>
                    <div className={styles.center} style={{fontSize:"20px"}}>
                        Don't have an account? 
                        <Link to="signup" className={styles.dontHaveLink}>
                            Sign Up
                        </Link>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default Login
