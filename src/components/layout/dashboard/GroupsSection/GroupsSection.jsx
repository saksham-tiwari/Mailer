import React from 'react'
import styles from "./groups.module.css"
import styles2 from "../dashboard.module.css"
import { Link } from 'react-router-dom'
import Capsule from './Capsule'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
const GroupsSection = () => {
    const groups = useSelector((state)=>state.groups)
    const grpArr = groups.groups
    const navigate = useNavigate();  
    let count=0;
    // console.log(grpArr);
    return (
        <>
            <h1 className={styles2.dashHeading}>Groups</h1>
            <div className={styles2.btnPrimaryDiv}><button className={styles2.btnPrimary} onClick={()=>navigate("/create-group")} >+ Create New Group</button></div>
            <div className={styles.seeall}><Link to="/view-all-groups">See All...</Link></div>
            <div style={{display:"flex", alignItems:"center", justifyContent:"space-evenly", flexWrap:"wrap"}}>
                {grpArr.map((grp)=>{
                    count++;
                    if(count>6){
                        return null;
                    }
                    return(<Capsule group={grp}/>)
                })}           
            </div>
        </>
    )
}

export default GroupsSection
