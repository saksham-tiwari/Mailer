import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from "./navbar.module.css"
import userImg from "../../../assets/userImg.png"
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch, useSelector } from 'react-redux';
import logo from "../../../assets/logo.png"
import { logout } from '../../../redux/actions/auth';
// import { Collapse } from "reactstrap";


const Navbar = () => {
    const dispatch = useDispatch()
    const name = useSelector(state=>state.auth).info.name
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
                            <Link to="/view-all-groups" className={styles.menuLinks}>View Groups</Link>
                        </li>
                        <li>
                            <Link to="/templates" className={styles.menuLinks}>Templates</Link>
                        </li>
                        <li>
                            <Link to="/view-record" className={styles.menuLinks}>View Record</Link>
                        </li>
                    </ul>
                </div>
                <img src={userImg} className={styles.userImg} alt="user"/>
                <div className={styles.dropdown}>
                    <div className={styles.dropbtn}>
                        <p>{name}</p>
                    </div>
                    <div className={styles.dropdownContent}>
                        <button onClick={()=>{dispatch(logout())}} className={styles.logoutbtn}>Logout</button>
                    </div>
                </div>
                {/* Ham Menu */}
                <div className={styles.menuHam} id="collapse-menu">
                    <div className={styles.menu2}>
                        <ul>
                            <li>
                                <Link to="/view-all-groups" className={styles.menuLinks2}>View Groups</Link>
                            </li>
                            <li>
                                <Link to="/templates" className={styles.menuLinks2}>Templates</Link>
                            </li>
                            <li>
                                <Link to="/view-record" className={styles.menuLinks2}>View Record</Link>
                            </li>
                            <hr className={styles.hrHam}></hr>
                            <li>
                            <img src={userImg} className={styles.userImg2} alt="user"/>
                            <span className={styles.userName2}>Name</span>
                            <div className={styles.logoutDiv} onClick={()=>{dispatch(logout())}}>Logout</div>
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
