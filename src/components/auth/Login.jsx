import React, { useEffect, useState } from 'react'
import MailGIF from "./MailGIF"
import styles from './authstyles.module.css'
import { Alert, Button, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { validEmail, validPassword } from './Regex.jsx';
import google from "../../assets/google.svg"
import { useDispatch, useSelector } from 'react-redux'
import {login} from "../../redux/actions/auth"
import Loader from "react-loader-spinner";
import { clearMessage } from '../../redux/actions/message'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { SET_MESSAGE, SET_PERMISSION } from '../../redux/actions/types'
// import message from '../../redux/reducers/message'
// import { useGoogleOneTapLogin } from "react-google-one-tap-login"
import GoogleOneTapLogin from 'react-google-one-tap-login';
import axios from 'axios'
import googleOneTap from 'google-one-tap';


const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();  
    const [visible, setVisible] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");
    const [emailErr, setEmailErr]= useState(false);
    const [passErr, setPassErr]= useState(false);


    var state = useSelector((state)=>state.message)
    const dispatch = useDispatch();
    const auth = useSelector((state)=>state.auth)

    
    const options = {
        client_id: '852195797172-d0qq3vi9erb2ep1ill5eilc65mdvmah9.apps.googleusercontent.com', // required
        auto_select: false, // optional
        cancel_on_tap_outside: false, // optional
        context: 'signin', // optional
    };

    googleOneTap(options, (response) => {
        // Send response to server
        console.log(response);
    });
    // useGoogleOneTapLogin({
    //     onSuccess:(res)=>console.log(res),
    //     onError:(err)=>console.log(err),
    //     googleAccountConfigs: {
    //         client_id:"852195797172-d0qq3vi9erb2ep1ill5eilc65mdvmah9.apps.googleusercontent.com"
    //     }
    // })

    useEffect(()=>{
        if(auth.isLoggedIn){
            navigate("/")
        }
    })
    const formSubmit = (e)=>{
        e.preventDefault();
        setLoading(true);
        if(email===""&&password===""){
            setEmailErr(true)
            setPassErr(true)
            setLoading(false)
            setAlertMsg("Both fields are required. Cannot be empty!")
            setTimeout(()=>{
                setEmailErr(false)
                setPassErr(false)
                setAlertMsg("")
            },3000)
        }
        else if(email===""){
            setEmailErr(true)
            setLoading(false)
            setAlertMsg("Email field cannot be empty!")
            setTimeout(()=>{
                setEmailErr(false)
                setAlertMsg("")
            },3000)
        } else if(password===""){
            setPassErr(true)
            setLoading(false)
            setAlertMsg("Password field cannot be empty!")
            setTimeout(()=>{
                setPassErr(false)
                setAlertMsg("")
            },3000)
        }
        else if(!validEmail.test(email)){
            setLoading(false)
            setEmailErr(true)
            setAlertMsg("Pls enter valid email");
            setTimeout(()=>{
                setEmailErr(false)
                setAlertMsg("");
            },3000)

            // document.getElementsByName("email")[0].style.borderColor="red"
        } else if(!validPassword.test(password)){
            setLoading(false);
            setPassErr(true)
            setAlertMsg("Enter valid Password. Must contain 1 Upper case, 1 Lower case, 1 Numeric and 1 Special Character.")
            setTimeout(()=>{
                setPassErr(false)
                setAlertMsg("")
            },3000)
        }
        else{
            setPassErr(false);
            setEmailErr(false);
            setAlertMsg("");
            dispatch(login(email, password))
            .then(()=>{
                // else{
                    navigate("/");
                // }
            })
            .catch((err) => {
                setLoading(false);
                // console.log(err)
                if(err.code===403){
                    dispatch({
                        type: SET_PERMISSION,
                        payload: true,
                    })
                    navigate("/otp")
                    dispatch({
                        type: SET_MESSAGE,
                        payload: "Verification needed",
                      });
                }
                setTimeout(()=>dismiss(),3000)
            });
        }
        
    }
    const dismiss = ()=>{
        dispatch(clearMessage());
    }
    const togglePassword =()=>{
        setVisible(prev=>!prev)
    }
    return (
        <div>
            <MailGIF/>
            <div className={styles.rightBox}>
                <h1 className={styles.heading}>Welcome Back</h1>
                <h2 className={styles.subHeading}>Log In to your account!</h2>
                {state.message?<Alert variant='danger' onClose={dismiss} className={styles.dismissAlert} dismissible>{state.message}</Alert>:<></>}
                {alertMsg!==""?<Alert variant='danger' 
                    onClose={
                        ()=>{
                            setAlertMsg("")
                            setEmailErr(false)
                            setPassErr(false)
                            }} 
                    className={styles.dismissAlert} dismissible>{alertMsg}</Alert>:<></>}
                {loading?<Loader type="TailSpin" color="#00BFFF" height={40} width={40} className={styles.loader}/>:<></>}
                {/* <GoogleOneTapLogin onError={(error) => console.log(error)} 
                onSuccess={async (token) => {

                    console.log(token)
                    setLoading(true);
                    var obj = {
                        name: token.given_name,
                        email: token.email
                    }
                    console.log(obj);
                    // let stringToken = JSON.stringify(token)
                    await axios.post("https://bulk-mailer-app.herokuapp.com/signup/google", obj)
                    .then((resp)=>{
                        setLoading(false);
                        console.log(resp)
                    })
                    .catch((err)=>{
                        setLoading(false);
                        console.log(err)
                    })
                    }} googleAccountConfigs={{ client_id: "852195797172-d0qq3vi9erb2ep1ill5eilc65mdvmah9.apps.googleusercontent.com" }} className={styles.oneTap} /> */}
                <Form className={styles.formAuth} onSubmit={(e)=>formSubmit(e)}>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                        className={styles.inputAuth}
                        placeholder='Enter your Email Address'
                        type="email"
                        value={email}
                        style={emailErr?{borderColor:"red", borderWidth:"4px"}:{borderColor:"#253E7E"}}
                        onChange={(e)=>{setEmail(e.target.value)}}
                        />
                    
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                        className={styles.inputAuth}
                        placeholder='Enter your Password'
                        type={visible?"text":"password"}
                        value={password}
                        style={passErr?{borderColor:"red", borderWidth:"4px"}:{borderColor:"#253E7E"}}
                        onChange={(e)=>{setPassword(e.target.value)}}
                        />
                        {/* <VisibilityIcon className={styles.eyePass}/>  */}
                        {visible?<VisibilityIcon onClick={togglePassword} className={styles.eyePass}/>:<VisibilityOffIcon onClick={togglePassword} className={styles.eyePass}/>}

                    </Form.Group>
                    
                    <br/>
                    <br/>
                    <Button type="submit" className={styles.authSubmitBtn}>
                        Log In
                    </Button>
                    <br/>
                    <br/>
                    <div className={styles.center}>
                        <Link to='/forgot-pass' className={styles.secondaryLink}>Forgot Password?</Link>
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
