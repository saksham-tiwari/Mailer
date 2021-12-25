import React, { useState } from 'react'
import MailGIF from "./MailGIF"
import styles from './authstyles.module.css'
import { Alert, Button, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import google from "../../assets/google.svg"
import { useDispatch, useSelector } from 'react-redux'
import {login} from "../../redux/actions/auth"
import Loader from "react-loader-spinner";
import { clearMessage } from '../../redux/actions/message'
// import message from '../../redux/reducers/message'

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();  

    var state = useSelector((state)=>state.message)
    const dispatch = useDispatch();
    const formSubmit = (e)=>{
        e.preventDefault();
        setLoading(true);
        
        dispatch(login(email, password))
        .then(()=>{

            navigate("/");
        })
        .catch(() => {
            setLoading(false);
        });
    }
    const dismiss = ()=>{
        dispatch(clearMessage());
    }
    return (
        <div>
            <MailGIF/>
            <div className={styles.rightBox}>
                <h1 className={styles.heading}>Welcome Back</h1>
                <h2 className={styles.subHeading}>Log In to your account!</h2>
                {state.message?<Alert variant='danger' onClose={dismiss} className={styles.dismissAlert} dismissible>{state.message}</Alert>:<></>}
                {loading?<Loader type="TailSpin" color="#00BFFF" height={40} width={40} className={styles.loader}/>:<></>}
                <Form className={styles.formAuth} onSubmit={(e)=>formSubmit(e)}>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                        className={styles.inputAuth}
                        placeholder='Enter your Email Address'
                        type="email"
                        value={email}
                        onChange={(e)=>{setEmail(e.target.value)}}
                        />
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                        className={styles.inputAuth}
                        placeholder='Enter your Email Address'
                        type="password"
                        value={password}
                        onChange={(e)=>{setPassword(e.target.value)}}
                        />
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
                    <div className={styles.dontHave}>
                        Don't have an account? 
                        <Link to="/signup" className={styles.dontHaveLink}>
                            Sign Up
                        </Link>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default Login
