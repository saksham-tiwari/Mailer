import React, { useState } from 'react'
import { Button, Form, FormControl, InputGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { logout, refresh } from '../../../redux/actions/auth';
import { createGroup } from '../../../redux/actions/groups';
import stylesDash from "../dashboard/dashboard.module.css"
import ReadCsv from '../dashboard/readCsv';
import ListComponent from '../ListComponent/ListComponent';
import styles from "./creategrp.module.css"

const CreateGroup = () => {
    const [mails,setMails] = useState([]);
    const [mail,setMail] = useState("");
    const [active,setActive] = useState(true);

    const dispatch = useDispatch();

    const [grpName, setGrpName] = useState("");
    const createGrpFormSubmit = (e)=>{
        e.preventDefault();
        console.log(grpName)
        console.log(mails);

        dispatch(createGroup(grpName,mails,mails.length))
        .then((res)=>{
            console.log(res);
        })
        .catch((err)=>{
            console.log(err);
            if(err.refresh==='required'){
                dispatch(refresh())
                .then(()=>{
                    dispatch(createGroup(grpName,mails,mails.length))
                })
                .catch((err)=>{
                    if(err.msg==="Refresh Fail"){
                        dispatch(logout())
                    }
                })
            }
        })
    }
    
    const addMail= (e)=>{
        e.preventDefault();
        if(mails.length===0){setActive(false)}
        setMails(prev=>[...prev, mail])
        setMail("");
    }
    const delMail = (mail)=>{
        let tempMails = mails;
        let id = mails.indexOf(mail)
        tempMails.splice(id,1)
        // console.log(tempMails)
        // setMails(tempMails)

        setMails(mails.filter(item=>mails.indexOf(item)!==id))
    }
    return (
        <div>
            <h1 className={stylesDash.dashHeading}>Create New Group</h1>
            <Form onSubmit={(e)=>createGrpFormSubmit(e)} className={styles.formCreate}>
                <Form.Group>
                    <Form.Label>Group Name</Form.Label>
                    <Form.Control type="Name" placeholder="Enter the name of group" value={grpName} onChange={(e)=>setGrpName(e.target.value)} className={styles.input}/>
                </Form.Group>
                
                <Form.Group>
                    <Form.Label>Enter emails one by one</Form.Label>
                    <InputGroup className="mb-3">

                        <FormControl className={styles.input} value={mail} onChange={e=>setMail(e.target.value)}/>
                        <button className={styles.add} onClick={(e)=>addMail(e)}>
                        + ADD
                        </button>
                    </InputGroup>
                </Form.Group>
                <p> -------OR------- </p>
                <ReadCsv setMails={setMails} active={active}/>
                

                <button type="submit" className={styles.submitBtn}>Submit</button>
                {/* <Button variant="primary">Primary</Button> */}
            </Form>
            <h1 className={stylesDash.dashHeading}>Members Added:</h1>

            {/* <div className={styles.listBlock}>
                {mails.length===0?<div>No members entered yet.</div>:<></>}
                {mails.map((mail)=>{
                    return(
                        <>
                        
                            <div className={styles.listElem}>
                                {mail}
                                <button className={styles.delBtn} onClick={()=>delMail(mail)}>X</button>
                            </div>

                        </>
                    )
                })}
                </div> */}
            <ListComponent mails={mails} delMail={delMail}/>
        </div>
    )
}

export default CreateGroup
