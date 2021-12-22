import React from 'react'
import mail from '../../assets/mail.gif'
import styles from "./authstyles.module.css"

const Login = () => {
    return (
        <div>
            <img src={mail} alt="gif" className={styles.mailGif}/>
        </div>
    )
}

export default Login
