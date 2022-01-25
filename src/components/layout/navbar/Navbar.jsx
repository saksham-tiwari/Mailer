import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from "./navbar.module.css"
import userImg from "../../../assets/userImg.png"
import MenuIcon from '@mui/icons-material/Menu';
// import { Collapse } from "reactstrap";


const Navbar = () => {
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
                <Link to="/" className={styles.navLogo}>LOGO</Link>
                <div className={styles.menu}>
                    <ul>
                        <li>
                            <Link to="/view-all-groups" className={styles.menuLinks}>View Groups</Link>
                        </li>
                        <li>
                            <Link to="/" className={styles.menuLinks}>Templates</Link>
                        </li>
                        <li>
                            <Link to="/view-record" className={styles.menuLinks}>View Record</Link>
                        </li>
                    </ul>
                </div>
                <img src={userImg} className={styles.userImg} alt="user"/>
                <p className={styles.userName}>Name</p>

                {/* Ham Menu */}
                <div className={styles.menuHam} id="collapse-menu">
                    <div className={styles.menu2}>
                        <ul>
                            <li>
                                <Link to="/view-all-groups" className={styles.menuLinks2}>View Groups</Link>
                            </li>
                            <li>
                                <Link to="/" className={styles.menuLinks2}>Templates</Link>
                            </li>
                            <li>
                                <Link to="/view-record" className={styles.menuLinks2}>View Record</Link>
                            </li>
                            <hr className={styles.hrHam}></hr>
                            <li>
                            <img src={userImg} className={styles.userImg2} alt="user"/>
                            <span className={styles.userName2}>Name</span>
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
