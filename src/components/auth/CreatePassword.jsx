import React, { useEffect, useState } from 'react'
import MailGIF from "./MailGIF"
import styles from './authstyles.module.css'
import { Alert, Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
// import { Link } from 'react-router-dom'
// import google from "../../assets/google.svg"
import { useDispatch, useSelector } from 'react-redux'
import { createPassword, getUserInfo } from '../../redux/actions/auth'
import Loader from "react-loader-spinner";
import { clearMessage } from '../../redux/actions/message'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { validPassword } from './Regex'
import { SET_PERMISSION } from '../../redux/actions/types'

const CreatePassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [password, setPassword] = useState("");
    const [confPass, setConfPass] = useState("");
    const [loading, setLoading ] = useState(false);
    const [visible1, setVisible1] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [pass1Err, setPass1Err]= useState(false);
    const [pass2Err, setPass2Err]= useState(false);
    const [alertMsg, setAlertMsg] = useState("");
    
    
    
    var state = useSelector((state)=>state.message)
    var email = useSelector((state)=>state.email)
    var permission = useSelector((state)=>state.permission)    
    const auth = useSelector((state)=>state.auth)

    useEffect(()=>{
        console.log(permission);
        window.scrollTo(1, 1);
        if(auth.isLoggedIn){
            navigate("/")
        }
        if(permission.permission===true){
            dispatch({
                type: SET_PERMISSION,
                payload: false,
            })
            console.log("run");
        } else{
            navigate("/")
        }
    },[])

    const formSubmit = (e)=>{
        e.preventDefault();
        setLoading(true);
        if(password===""&&confPass===""){
            setPass1Err(true)
            setPass2Err(true)
            setLoading(false)
            setAlertMsg("Both fields are required. Cannot be empty!")
            setTimeout(() => {
                setPass1Err(false)
                setPass2Err(false)
                setAlertMsg("")
            }, 3000);
        } else if(password===""){
            setPass1Err(true)
            setAlertMsg("New Password Field cannot be empty")
            setLoading(false)
            setTimeout(()=>{
                setAlertMsg("")
                setPass1Err(false)
            },3000)
        }else if(confPass===""){
            setPass2Err(true)
            setAlertMsg("Confirm Password Field cannot be empty")
            setLoading(false)
            setTimeout(()=>{
                setAlertMsg("")
                setPass2Err(false)
            },3000)
        }
        else if(confPass!==password){
            setAlertMsg("Passwords do not match!");
            setLoading(false);
            setPass1Err(true);
            setPass2Err(true);
            setTimeout(()=>{
                setAlertMsg("");
                setPass1Err(false);
                setPass2Err(false);
            },3000)

        } else if(!validPassword.test(password)){
            setAlertMsg("Enter valid Password. Must contain 1 Upper case, 1 Lower case, 1 Numeric and 1 Special Character.")
            setLoading(false)
            setPass1Err(true)
            setPass2Err(true)
            setTimeout(()=>{
                setAlertMsg("");
                setPass1Err(false);
                setPass2Err(false);
            },3000)
        }
        else{
            dispatch(createPassword(email.mail,password))
            .then((res)=>{
                console.log(res);
                // dispatch(getUserInfo())
                setTimeout(()=>{navigate("/")},2000)

            })
            .catch(()=>{
                setLoading(false);
                setTimeout(()=>dismiss(),3000)
            })
        }
       

    }
    const dismiss = ()=>{
        dispatch(clearMessage());
    }
    return (
        <div>
            <MailGIF/>
            <div className={styles.rightBox} style={{top:"20%"}}>
                <h1 className={styles.heading}>Create Your Password</h1>
                {state.message?<Alert variant='danger' onClose={dismiss} className={styles.dismissAlert} dismissible>{state.message}</Alert>:<></>}
                {alertMsg!==""?<Alert variant='danger' 
                    onClose={
                        ()=>{
                            setAlertMsg("")
                            setPass1Err(false)
                            setPass2Err(false)
                            }} 
                    className={styles.dismissAlert} dismissible>{alertMsg}</Alert>:<></>}
                                {loading?<Loader type="TailSpin" color="#00BFFF" height={40} width={40} className={styles.loader}/>:<></>}
                <Form className={styles.formAuth} onSubmit={(e)=>formSubmit(e)}>
                    <Form.Group>
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                        className={styles.inputAuth}
                        placeholder='Enter your Password'
                        type={visible1?"text":"password"}
                        value={password}
                        style={pass1Err?{borderColor:"red", borderWidth:"4px"}:{borderColor:"#253E7E"}}
                        onChange={(e)=>setPassword(e.target.value)}
                        />
                        {visible1?<VisibilityIcon onClick={()=>setVisible1(prev=>!prev)} className={styles.eyePass} style={{top:"14%"}}/>:<VisibilityOffIcon onClick={()=>setVisible1(prev=>!prev)} className={styles.eyePass} style={{top:"14%"}}/>}

                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                        className={styles.inputAuth}
                        placeholder='Confirm Password'
                        type={visible2?"text":"password"}
                        value={confPass}
                        style={pass2Err?{borderColor:"red", borderWidth:"4px"}:{borderColor:"#253E7E"}}
                        onChange={(e)=>setConfPass(e.target.value)}
                        />
                        {visible2?<VisibilityIcon onClick={()=>setVisible2(prev=>!prev)} className={styles.eyePass} style={{top:"49%"}}/>:<VisibilityOffIcon onClick={()=>setVisible2(prev=>!prev)} className={styles.eyePass} style={{top:"49%"}}/>}

                    </Form.Group>
                    <br/>
                    <br/>
                    <Button type="submit" className={styles.authSubmitBtn}>
                        Create
                    </Button>
                    <br/>
                    <br/>
                </Form>
            </div>
        </div>
    )
}

export default CreatePassword
