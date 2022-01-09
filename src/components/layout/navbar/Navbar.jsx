import React from 'react'
import { Link } from 'react-router-dom'
import styles from "./navbar.module.css"
import userImg from "../../../assets/userImg.png"

const Navbar = () => {
    return (
        <>
            <div className={styles.navbarMain}>
                <Link to="/" className={styles.navLogo}>LOGO</Link>
                <div className={styles.menu}>
                    <ul>
                        <li>
                            <Link to="/" className={styles.menuLinks}>View Groups</Link>
                        </li>
                        <li>
                            <Link to="/" className={styles.menuLinks}>Templates</Link>
                        </li>
                        <li>
                            <Link to="/" className={styles.menuLinks}>View Record</Link>
                        </li>
                    </ul>
                </div>
                <img src={userImg} className={styles.userImg} alt="user"/>
                <p className={styles.userName}>Name</p>
            </div>
            <div className={styles.fixingDiv}/>
        </>
        
    )
}

export default Navbar
