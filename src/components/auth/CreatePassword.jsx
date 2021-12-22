import React from 'react'
import MailGIF from "./MailGIF"
import styles from './authstyles.module.css'
import { Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import google from "../../assets/google.svg"

const CreatePassword = () => {
    const formSubmit = (e)=>{
        e.preventDefault();

    }
    return (
        <div>
            <MailGIF/>
            <div className={styles.rightBox} style={{top:"20%"}}>
                <h1 className={styles.heading}>Create Your Password</h1>
                <Form className={styles.formAuth} onSubmit={(e)=>formSubmit(e)}>
                    <Form.Group>
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                        className={styles.inputAuth}
                        placeholder='Enter your Password'
                        type="Password"/>
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                        className={styles.inputAuth}
                        placeholder='Confirm Password'
                        type="password"/>
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
