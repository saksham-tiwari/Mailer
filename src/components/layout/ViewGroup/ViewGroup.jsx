import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import {withRouter} from "react-router"
import { useLocation } from 'react-router-dom';
import { logout, refresh } from '../../../redux/actions/auth';
import { addEmail, deleteEmail, getEmails } from '../../../redux/actions/groups';
import ListComponent from '../ListComponent/ListComponent';
import FullPageLoader from '../Loaders/FullPageLoader';
import styles from "../dashboard/dashboard.module.css"
import styles2 from "../CreateGroup/creategrp.module.css"
import styles3 from "./viewgrp.module.css"
import { Alert } from 'react-bootstrap';
import { closeModal, openModal } from '../Modal/Modal';
import { useNavigate } from 'react-router';




const ViewGroup = (props) => {
    // console.log(props.match.params.id)
    let location = useLocation();
    let dispatch = useDispatch();
    const emails = useSelector((state)=>state.groups).emails;
    const [emailErr,setEmailErr] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");
    const [condition, setCondition] = useState(false);
    const [email, setEmail] = useState("");
    const id = location.pathname.split("/")[3];
    var grpName = location.pathname.split("/")[2];
    grpName = grpName.replaceAll("%20", " ")
    console.log(emails);
    const auth = useSelector((state)=>state.auth)
    const navigate = useNavigate();
    useEffect(()=>{
        if(!auth.isLoggedIn){
            navigate("/")
        } 
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
    },[auth.isLoggedIn])
    const delMail = (mailid)=>{
        setCondition(true)
        dispatch(deleteEmail(mailid))
        .then(()=>{setCondition(false)})
        .catch((err)=>{
            // console.log(err,id)
            if(err.msg==="Refresh"){
                dispatch(refresh())
                .then(()=>{
                    dispatch(deleteEmail(mailid))
                    .then(()=>{
                        setCondition(false)
                    })
                    .catch((err)=>{
                        console.log(err);
                        setCondition(false)
                    })
                })
                .catch((err)=>{
                    if(err.msg==="Refresh Fail"){
                        dispatch(logout())
                        setCondition(false)
                    }
                })
            }
            
        })
    }
    const addMail = ()=>{
        setCondition(true);
        if(email===""){
            setAlertMsg("Email required!");
            setEmailErr(true);
            setTimeout(()=>{
                setEmailErr(false)
                setAlertMsg('')
            },2000)
            setCondition(false)
            // return null
        }else{
        closeModal();

        dispatch(addEmail(id,[email]))
        .then(()=>{
            setEmail("")
            setCondition(false)
        })
        .catch((err)=>{
            if(err.msg==="Refresh"){
                dispatch(refresh())
                .then(()=>{
                    dispatch(addEmail(id,[email]))
                    .then(()=>{
                        setEmail("")
                        setCondition(false)
                    })
                    .catch((err)=>{
                        console.log(err);
                        setEmail("");
                    })
                })
                .catch((err)=>{
                    if(err.msg==="Refresh Fail"){
                        dispatch(logout())
                    }
                })
            }
        })}
    }
    return (
        <>
            <FullPageLoader condition={condition}/>
            <h1 className={styles.dashHeading}>{grpName}</h1>
            
            {/* <ListComponent mails={emails} delMail={delMail}/> */}
            <button onClick={openModal} className={styles3.btnAdd}>Add New Member +</button>
            
            <div className="modal">
                <h2 className={styles3.heading}>Add New Member</h2>
                {/* {alertMsg!==""?<Alert variant='danger' 
                        onClose={
                            ()=>{
                                setEmailErr(false)
                                }} 
                        className={styles3.dismissAlert} dismissible>{alertMsg}</Alert>:<></>} */}
                <label className={styles3.label}>Email:</label>
                <br></br>
                <input className={styles3.input} value={email} placeholder='Enter the email of member' onChange={e=>{
                setEmail(e.target.value)
                }}
                style={emailErr?{borderColor:"red", borderWidth:"4px"}:{borderColor:"#253E7E"}}
                ></input>
                <p className={styles3.alert}>{alertMsg}</p>
                <button className={styles3.btn2} onClick={addMail}>Add</button><button className={styles3.btn1} onClick={closeModal}>Cancel</button>
            </div>
            <div className='overlay' onClick={closeModal}></div>
            <br></br>
            {/* <br></br> */}

            <div className={styles2.listBlock}>
                {emails.length===0?<div>No members entered yet.</div>:<></>}
                {emails.map((mail)=>{
                    return(
                        <>
                        
                            <div className={styles2.listElem}>
                                {mail.name!==null?<>{mail.name},
                                {mail.email}</>:<>{mail.email}</>}
                                <button className={styles2.delBtn} onClick={()=>delMail(mail.id)}>&times;</button>
                            </div>

                        </>
                    )
                })}
            </div>
        </>
    );
};

export default ViewGroup;
