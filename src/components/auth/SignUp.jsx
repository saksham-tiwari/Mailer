import React, { useEffect, useState } from 'react'
import MailGIF from "./MailGIF"
import styles from './authstyles.module.css'
import { Alert, Button, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import google from "../../assets/google.svg"
import { useDispatch, useSelector } from 'react-redux'
import { register,oneTap } from '../../redux/actions/auth'
import Loader from "react-loader-spinner";
import { clearMessage } from '../../redux/actions/message'
// import { setEmail } from '../../redux/actions/email'
import { SET_EMAIL, SET_PERMISSION } from '../../redux/actions/types'
import { validEmail } from './Regex'
import googleOneTap from 'google-one-tap';
import FullPageLoader from "../layout/Loaders/FullPageLoader"



// import { resendOtp } from '../../redux/actions/auth'

const SignUp = () => {
    const [name, setName] = useState("");
    const [mail, setMail] = useState("");
    const [loading, setLoading ] = useState(false);
    var state = useSelector((state)=>state.message)
    const [alertMsg, setAlertMsg] = useState("");
    const [emailErr, setEmailErr]= useState(false);
    const [nameErr, setNameErr]= useState(false);
    const [loader, setLoader] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector((state)=>state.auth)

    useEffect(()=>{
        if(auth.isLoggedIn){
            navigate("/")
        }
        window.scrollTo(1, 1);

    },[])
    const formSubmit = (e)=>{
        e.preventDefault();
        setLoading(true);
        if(name===""&&mail===""){
            setLoading(false)
            setEmailErr(true)
            setNameErr(true)
            setAlertMsg("Both fields are required. Cannot be empty!")
            setTimeout(()=>{
                setEmailErr(false)
                setNameErr(false)
                setAlertMsg("")
            },3000)
        } else if(name===""){
            setLoading(false);
            setNameErr(true);
            setAlertMsg("Name field cannot be empty!")
            setTimeout(() => {
                setNameErr(false);
                setAlertMsg("")
            }, 3000);
        } else if(mail===""){
            setLoading(false);
            setEmailErr(true);
            setAlertMsg("Email field cannot be empty!");
            setTimeout(() => {
                setEmailErr(false);
                setAlertMsg("");
            }, 3000);
        } else if(!validEmail.test(mail)){
            setLoading(false);
            setEmailErr(true);
            setAlertMsg("Enter a valid email!");
            setTimeout(() => {
                setEmailErr(false);
                setAlertMsg("");
            }, 3000);
        }
        else {
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
                    dispatch({
                        type: SET_PERMISSION,
                        payload: true,
                    })
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
                dispatch({
                    type: SET_PERMISSION,
                    payload: true,
                })

                setLoading(false);
                setTimeout(()=>dismiss(),3000)

            })
        }
    }
    const dismiss = ()=>{
        dispatch(clearMessage());
    }

    useEffect(()=>{
        const options = {
            client_id: '852195797172-d0qq3vi9erb2ep1ill5eilc65mdvmah9.apps.googleusercontent.com', // required
            auto_select: false, // optional
            cancel_on_tap_outside: false, // optional
            context: 'signin', // optional
        };
    
        googleOneTap(options, (response) => {
            setLoader(true);
    
            // Send response to server
            console.log(response.credential);
            // axios.post("https://bulk-mailer-app.herokuapp.com/signup/google", {token:response.credential})
            dispatch(oneTap(response.credential))
            .then((resp)=>{
                setLoader(false);
                setTimeout(()=>{navigate("/")},2000)
            })
            .catch((err)=>{
                setLoader(false);
                setTimeout(()=>dismiss(),3000)
    
            })
        });
    },[])
    
    return (
        <div>
            <FullPageLoader condition={loader}/>

            <MailGIF/>
            
            <div className={styles.rightBox}>
            <br/>
            <br/>
            <br/>
            <br/>
                <h1 className={styles.heading}>Let's Get Started</h1>
                <h2 className={styles.subHeading}>Create your account!</h2>
                {state.message?<Alert variant='danger' onClose={dismiss} className={styles.dismissAlert} dismissible>{state.message}</Alert>:<></>}
                {alertMsg!==""?<Alert variant='danger' 
                    onClose={
                        ()=>{
                            setAlertMsg("")
                            setEmailErr(false)
                            setNameErr(false)
                            }} 
                    className={styles.dismissAlert} dismissible>{alertMsg}</Alert>:<></>}
                {loading?<Loader type="TailSpin" color="#00BFFF" height={40} width={40} className={styles.loader}/>:<></>}
                <Form className={styles.formAuth} onSubmit={(e)=>formSubmit(e)}>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                        className={styles.inputAuth}
                        placeholder='Enter your Name'
                        type="text"
                        value={name}
                        style={nameErr?{borderColor:"red", borderWidth:"4px"}:{borderColor:"#253E7E"}}
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
                        style={emailErr?{borderColor:"red", borderWidth:"4px"}:{borderColor:"#253E7E"}}
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
                    {/* <div className={styles.center}>
                        <Link to="/" className={styles.socialAuthLink}>
                            <img src={google} alt="google" style={{marginRight:"10px"}}/> 
                            Sign Up using Google
                        </Link>
                    </div>
                    <br/>
                    <br/> */}
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
