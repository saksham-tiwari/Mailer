import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import styles from "./navbar.module.css"
import MenuIcon from '@mui/icons-material/Menu';
import logo from "../../../assets/logo.png"
// import { Collapse } from "reactstrap";


const NavbarLogout = () => {
    useEffect(()=>{
        document.getElementById("collapse-menu").style.opacity="0";
    document.getElementById("collapse-menu").style.visibility="hidden";
    },[])
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
                            <NavLink to="/login" className={({ isActive }) => (isActive ? "activeNav" : styles.menuLinks)} >Login</NavLink>
                        </li>
                        <li>
                            <NavLink to="/signup" className={({ isActive }) => (isActive ? "activeNav" : styles.menuLinks)} >Signup</NavLink>
                        </li>
                    </ul>
                </div>
                {/* Ham Menu */}
                <div className={styles.menuHamLogout} id="collapse-menu">
                    <div className={styles.menu2}>
                        <ul>
                            <li>
                                <NavLink to="/login" onClick={toggle} className={({ isActive }) => (isActive ? "activeNav" : styles.menuLinks2)}>Login</NavLink>
                            </li>
                            <li>
                                <NavLink to="/signup" onClick={toggle} className={({ isActive }) => (isActive ? "activeNav" : styles.menuLinks2)}>Signup</NavLink>
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
