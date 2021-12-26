import React, { useState } from 'react'
import MailGIF from "./MailGIF"
import styles from './authstyles.module.css'
import { Alert, Button, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import google from "../../assets/google.svg"
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../redux/actions/auth'
import Loader from "react-loader-spinner";
import { clearMessage } from '../../redux/actions/message'
// import { setEmail } from '../../redux/actions/email'
import { SET_EMAIL } from '../../redux/actions/types'
// import { resendOtp } from '../../redux/actions/auth'

const SignUp = () => {
    const [name, setName] = useState("");
    const [mail, setMail] = useState("");
    const [loading, setLoading ] = useState(false);
    var state = useSelector((state)=>state.message)

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const formSubmit = (e)=>{
        e.preventDefault();
        setLoading(true);
        dispatch(register(name, mail))
        .then(()=>{
            // if(res.status!==208){
                // }
                
                dispatch(
                    {
                        type: SET_EMAIL,
                        payload: mail
                    }
                )
                navigate("/otp")
        })
        .catch(()=>{
            // if(state.message==="User already exist, pls verify."){
            //     // setTimeout(()=>{navigate("/otp")},1000);
            //     dispatch(resendOtp(mail))
            //     .then(()=>{
            //         navigate("/otp")
            //     })
            //     // navigate("/otp")
            // }
            dispatch(
                {
                    type: SET_EMAIL,
                    payload: mail
                }
            )

            setLoading(false);
            setTimeout(()=>dismiss(),3000)

        })
    }
    const dismiss = ()=>{
        dispatch(clearMessage());
    }
    return (
        <div>
            <MailGIF/>
            <div className={styles.rightBox}>
                <h1 className={styles.heading}>Let's Get Started</h1>
                <h2 className={styles.subHeading}>Create your account!</h2>
                {state.message?<Alert variant='danger' onClose={dismiss} className={styles.dismissAlert} dismissible>{state.message}</Alert>:<></>}
                {loading?<Loader type="TailSpin" color="#00BFFF" height={40} width={40} className={styles.loader}/>:<></>}
                <Form className={styles.formAuth} onSubmit={(e)=>formSubmit(e)}>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                        className={styles.inputAuth}
                        placeholder='Enter your Name'
                        type="text"
                        value={name}
                        onChange={(e)=>{setName(e.target.value)}}
                        />
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                        className={styles.inputAuth}
                        placeholder='Enter your Email Address'
                        type="email"
                        value={mail}
                        onChange={(e)=>setMail(e.target.value)}
                        />
                    </Form.Group>
                    <br/>
                    <br/>
                    <Button type="submit" className={styles.authSubmitBtn}>
                        Verify Email
                    </Button>
                    <br/>
                    <br/>
                    
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
                            Sign Up using Google
                        </Link>
                    </div>
                    <br/>
                    <br/>
                    <div className={styles.dontHave}>
                        Already have an account? 
                        <Link to="/login" className={styles.dontHaveLink}>
                            Log In
                        </Link>
                    </div>
                </Form>
            </div>
        </div>
    )

}

export default SignUp
