import React, { useState } from 'react'
import MailGIF from "./MailGIF"
import styles from './authstyles.module.css'
import { Alert, Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
// import { Link } from 'react-router-dom'
// import google from "../../assets/google.svg"
import { useDispatch, useSelector } from 'react-redux'
import { createPassword } from '../../redux/actions/auth'
import Loader from "react-loader-spinner";
import { clearMessage } from '../../redux/actions/message'

const CreatePassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [password, setPassword] = useState("");
    const [confPass, setConfPass] = useState("");
    const [passMatch, setPassMatch] = useState(false);
    const [loading, setLoading ] = useState(false);
    var state = useSelector((state)=>state.message)
    var email = useSelector((state)=>state.email)

    const formSubmit = (e)=>{
        e.preventDefault();
        setLoading(true);
        if(confPass!==password){
            setPassMatch(true);
            setTimeout(()=>setPassMatch(false),2000);
        setLoading(false);

        }
        else{
            dispatch(createPassword(email.mail,password))
            .then(()=>{
                navigate("/")
            })
            .catch(()=>{
                setLoading(false);
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
                {passMatch?<Alert variant='danger' onClose={()=>setPassMatch(false)} className={styles.dismissAlert} dismissible>Passwords do not match.</Alert>:<></>}
                {loading?<Loader type="TailSpin" color="#00BFFF" height={40} width={40} className={styles.loader}/>:<></>}
                <Form className={styles.formAuth} onSubmit={(e)=>formSubmit(e)}>
                    <Form.Group>
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                        className={styles.inputAuth}
                        placeholder='Enter your Password'
                        type="password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                        className={styles.inputAuth}
                        placeholder='Confirm Password'
                        type="password"
                        value={confPass}
                        onChange={(e)=>setConfPass(e.target.value)}
                        />
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
