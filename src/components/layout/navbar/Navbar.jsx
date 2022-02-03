import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import styles from "./navbar.module.css"
import userImg from "../../../assets/userImg.png"
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch, useSelector } from 'react-redux';
import logo from "../../../assets/logo.png"
import { logout } from '../../../redux/actions/auth';
// import { Collapse } from "reactstrap";


const Navbar = () => {
    const dispatch = useDispatch()
    const name = JSON.parse(localStorage.getItem("info"))
    useEffect(()=>{
        document.getElementById("collapse-menu").style.opacity="0";
    document.getElementById("collapse-menu").style.visibility="hidden";
    },[])
    // const name ="/name"
    // const [isCollapse, setIsCollapse]= useState(false)
    const toggle = ()=>{
        var elem = document.getElementById("collapse-menu");
        if(elem.style.opacity==="0"){
            elem.style.opacity="1"
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
                            <NavLink to="/view-all-groups" activeStyle={{ color: 'red' }} className={({ isActive }) => (isActive ? "activeNav" : styles.menuLinks)} >View Groups</NavLink>
                        </li>
                        <li>
                            <NavLink to="/templates" activeStyle={{ color: 'red' }} className={({ isActive }) => (isActive ? "activeNav" : styles.menuLinks)}>Templates</NavLink>
                        </li>
                        <li>
                            <NavLink to="/view-record" activeStyle={{ color: 'red' }} className={({ isActive }) => (isActive ? "activeNav" : styles.menuLinks)}>View Record</NavLink>
                        </li>
                    </ul>
                </div>
                <img src={userImg} className={styles.userImg} alt="user"/>
                <div className={styles.dropdown}>
                    <div className={styles.dropbtn}>
                        <p>{name?name.name:"name"}</p>
                    </div>
                    <div className={styles.dropdownContent}>
                        <button onClick={()=>{dispatch(logout())}} className={styles.logoutbtn}>Logout</button>
                    </div>
                </div>
                {/* Ham Menu */}
                <div className={styles.menuHam} id="collapse-menu" styles={{opacity:"0", visibility:"hidden"}}>
                    <div className={styles.menu2}>
                        <ul>
                            <li>
                                <NavLink to="/view-all-groups" onClick={toggle} className={({ isActive }) => (isActive ? "activeNav" : styles.menuLinks2)}>View Groups</NavLink>
                            </li>
                            <li>
                                <NavLink to="/templates" onClick={toggle} className={({ isActive }) => (isActive ? "activeNav" : styles.menuLinks2)}>Templates</NavLink>
                            </li>
                            <li>
                                <NavLink to="/view-record" onClick={toggle} className={({ isActive }) => (isActive ? "activeNav" : styles.menuLinks2)}>View Record</NavLink>
                            </li>
                            <hr className={styles.hrHam}></hr>
                            <li>
                            <img src={userImg} className={styles.userImg2} alt="user"/>
                            <span className={styles.userName2}>{name?name.name:"name"}   </span>
                            <div className={styles.logoutDiv} onClick={()=>{
                                toggle()
                                dispatch(logout())
                                }}>Logout</div>
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

export default Navbar
