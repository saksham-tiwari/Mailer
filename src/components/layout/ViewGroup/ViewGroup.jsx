import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import {withRouter} from "react-router"
import { useLocation } from 'react-router-dom';
import { logout, refresh } from '../../../redux/actions/auth';
import { getEmails } from '../../../redux/actions/groups';
import ListComponent from '../ListComponent/ListComponent';
import FullPageLoader from '../Loaders/FullPageLoader';
import styles from "../dashboard/dashboard.module.css"
import styles2 from "../CreateGroup/creategrp.module.css"
import styles3 from "./viewgrp.module.css"



const ViewGroup = (props) => {
    // console.log(props.match.params.id)
    let location = useLocation();
    let dispatch = useDispatch();
    const emails = useSelector((state)=>state.groups).emails;

    const [condition, setCondition] = useState(false);
    const id = location.pathname.split("/")[2];
    console.log(emails);
    useEffect(()=>{
        console.log(id.toUpperCase());
        setCondition(true)
        dispatch(getEmails(id))
        .then(()=>{setCondition(false)})
        .catch((res)=>{
            console.log(res.msg);
            if(res.msg==="Refresh"){
                dispatch(refresh())
                .then(()=>{
                    dispatch(getEmails(id))
                    .then(()=>{
                        setCondition(false)
                    })
                })
                .catch((err)=>{
                    if(err.msg==="Refresh Fail"){
                        dispatch(logout())
                    }
                })
            }
        })
    },[])
    const delMail = (id)=>{
        console.log(id);
    }
    const handleAdd = ()=>{
        
    }
  return (
        <>
            <FullPageLoader condition={condition}/>
            <h1 className={styles.dashHeading}>GRP NAME</h1>
            {/* <ListComponent mails={emails} delMail={delMail}/> */}
            <button onClick={handleAdd} className={styles3.btnAdd}>Add New Member +</button>
            <div className="modal">
                
            </div>
            <div className='overlay'></div>
            <br></br>
            {/* <br></br> */}

            <div className={styles2.listBlock}>
                {emails.length===0?<div>No members entered yet.</div>:<></>}
                {emails.map((mail)=>{
                    return(
                        <>
                        
                            <div className={styles2.listElem}>
                                {mail.email}
                                <button className={styles2.delBtn} onClick={()=>props.delMail(mail.id)}>&times;</button>
                            </div>

                        </>
                    )
                })}
            </div>
        </>
    );
};

export default ViewGroup;
