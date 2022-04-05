import React, { useState } from 'react'
import styles from "./groups.module.css"
import styles2 from "../dashboard.module.css"
import { Link } from 'react-router-dom'
import Capsule from './Capsule'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import Modal, { openModal } from '../../Modal/Modal'
const GroupsSection = (props) => {
    const groups = useSelector((state)=>state.groups)
    const grpArr = groups.groups
    const navigate = useNavigate();  
    let count=0;
    // const [ modalCond, setModalCond ] = useState("")
    // const switchModal = ()=>{
    //     switch(modalCond){
    //         case "Startup":
    //             return(
    //                 <>
    //                 <h4 style={{textAlign:"center", marginTop:"60px", marginBottom:"12px"}}>Choose an option to create group:</h4>
    //                 <button className={styles.modalButtons} onClick={()=>{
    //                    navigate("/create-group/withemails")
    //                 }}>With emails only</button>
    //                 <button className={styles.modalButtons} onClick={()=>{
    //                   navigate("/create-group/withnames")
    //                 }}>With names and emails both</button>
    //                 </>
    //             )
    //         default :
    //         return <></>
    //     }
    // }

    // console.log(grpArr);
    return (
        <>
            {/* <Modal>
                {switchModal()}
            </Modal> */}
            <h1 className={styles2.dashHeading}>Groups</h1>
            <div className={styles2.btnPrimaryDiv}><button className={styles2.btnPrimary} onClick={()=>{
                props.setModalCond("Startup")
                openModal()
            }} >+ Create New Group</button></div>
            <div className={styles.seeall}><Link to="/view-all-groups">See All...</Link></div>
            <div style={{display:"flex", alignItems:"center", justifyContent:"space-evenly", flexWrap:"wrap"}}>
                {grpArr.map((grp,i)=>{
                    count++;
                    if(count>6){
                        return null;
                    }
                    return(<Capsule group={grp} key={i} {...props}/>)
                })}           
            </div>
        </>
    )
}

export default GroupsSection
