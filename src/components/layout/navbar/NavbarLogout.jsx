import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from "./navbar.module.css"
import userImg from "../../../assets/userImg.png"
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch } from 'react-redux';
import logo from "../../../assets/logo.png"
import { logout } from '../../../redux/actions/auth';
// import { Collapse } from "reactstrap";


const NavbarLogout = () => {
    // const dispatch = useDispatch()
    // const [isCollapse, setIsCollapse]= useState(false)
    const toggle = ()=>{
        var elem = document.getElementById("collapse-menu");
        if(elem.style.opacity==="0"){
            elem.style.opacity="100%"
            elem.style.visibility="visible"
        }
        else {
            elem.style.opacity="0"
            setTimeout(()=>{
                elem.style.visibility="hidden"
            },500)
        }
    }
    return (
        <>
            <div className={styles.navbarMain}>
                <Link to="/" className={styles.navLogo}><img src={logo} alt="logo" className={styles.logo}/></Link>
                <div className={styles.menu}>
                    <ul>
                        <li>
                            <Link to="/login" className={styles.menuLinks}>Login</Link>
                        </li>
                        <li>
                            <Link to="/signup" className={styles.menuLinks}>Signup</Link>
                        </li>
                    </ul>
                </div>
                {/* Ham Menu */}
                <div className={styles.menuHamLogout} id="collapse-menu">
                    <div className={styles.menu2}>
                        <ul>
                            <li>
                                <Link to="/login" className={styles.menuLinks2}>Login</Link>
                            </li>
                            <li>
                                <Link to="/signup" className={styles.menuLinks2}>Signup</Link>
                            </li>
                        </ul>
                    </div>

                </div>
                <button className={styles.hamburger} onClick={toggle}><MenuIcon fontSize='large'/></button>
            </div>
            <div className={styles.fixingDiv}/>
        </>
        
    )
}

export default NavbarLogout
