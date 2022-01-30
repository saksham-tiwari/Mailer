import React, { useEffect, useState } from 'react'
import { Button, Form, FormControl, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logout, refresh } from '../../../redux/actions/auth';
import { createGroup, createGroupWithName, getGroups } from '../../../redux/actions/groups';
import stylesDash from "../dashboard/dashboard.module.css"
import ReadCsv from '../dashboard/readCsv';
import ListComponent from '../ListComponent/ListComponent';
import styles from "./creategrp.module.css"
import { useNavigate } from 'react-router'
import styles3 from "../ViewGroup/viewgrp.module.css"
import FullPageLoader from '../Loaders/FullPageLoader';
import Modal from '../Modal/Modal';
import { openModal } from '../Modal/Modal';
import { validEmail } from '../../auth/Regex.jsx';
import { source } from '../../../services/source';


const CreateGroup = () => {
    const [mails,setMails] = useState([]);
    const [mail,setMail] = useState("");
    const [active,setActive] = useState(true);
    const [loader, setLoader]= useState(false);
    let navigate = useNavigate();
    const auth = useSelector((state)=>state.auth)
    const groups = useSelector((state)=>state.groups).groups

    const dispatch = useDispatch();
    const [modalCond, setModalCond] = useState("");


    const [grpName, setGrpName] = useState("");
    useEffect(()=>{
        if(!auth.isLoggedIn){
            navigate("/")
        }
        dispatch(getGroups())
        .then((res)=>{
            setLoader(false)
        }
        )
        .catch((err)=>{
            if(err.refresh==='required'){
                dispatch(refresh())
                .then(()=>{
                    dispatch(getGroups())
                    setLoader(false)
                })
                .catch((err)=>{
                    if(err.msg==="Refresh Fail"){
                        dispatch(logout())
                        setLoader(false)
                    }
                })
            }
        })
        return () => {
            source.cancel()
        };
    },[auth.isLoggedIn])
    const createGrpFormSubmit = (e)=>{
        setLoader(true);
        e.preventDefault();
        console.log(grpName)
        console.log(mails);
        var finalArr = finalArray(mails)

        if(grpName===""){
            setModalCond("Name")
            openModal()
            setLoader(false)
        }
        else if(mails.length===0){
            setModalCond("Empty")
            openModal()
            setLoader(false)
        }
        else if(checkName()){
            setModalCond("GrpNameSame")
            openModal()
            setLoader(false)
        }
        
        else{
            if (typeof(finalArr[0])==='string'){
                dispatch(createGroup(grpName,finalArr,finalArr.length))
                .then((res)=>{
                    // console.log(res);
                    setLoader(false);
                    navigate("/dashboard");
                    
                })
                .catch((err)=>{
                    console.log(err);
                    if(err.refresh==='required'){
                        dispatch(refresh())
                        .then(()=>{
                            dispatch(createGroup(grpName,finalArr,finalArr.length))
                            .then((res)=>{
                                // console.log(res);
                                setLoader(false);
                                navigate("/dashboard");
                                
                            })
                        })
                        .catch((err)=>{
                            if(err.msg==="Refresh Fail"){
                                dispatch(logout())
                            }
                        })
                    }
                    else{
                        openModal();
                    }
                })
            } else if(typeof(finalArr[0])==="object"){
                dispatch(createGroupWithName(grpName,finalArr,finalArr.length))
                .then((res)=>{
                    setLoader(false);
                    navigate("/dashboard");
                })
                .catch((err)=>{
                    console.log(err);
                    if(err.refresh==='required'){
                        dispatch(refresh())
                        .then(()=>{
                            dispatch(createGroupWithName(grpName,finalArr,finalArr.length))
                            .then((res)=>{
                                // console.log(res);
                                setLoader(false);
                                navigate("/dashboard");
                                
                            })
                        })
                        .catch((err)=>{
                            if(err.msg==="Refresh Fail"){
                                dispatch(logout())
                            }
                        })
                    }
                    else{
                        openModal();
                    }
                })
            }
        }
    }

    const checkName = ()=>{
        let flag = false;
        for(let i=0;i<groups.length;i++){
            if(groups[i].name.toUpperCase()===grpName.toUpperCase()){
                flag = true;
                break;
            }
        }
        if(flag){
            return true
        }
        else return false
    }

    const finalArray = (arr)=>{
        let finalArr = []
        arr.forEach((mail)=>{
            if(mail.length===2){
                finalArr.push({name:mail[0],email:mail[1]})
            }
            else if(mail.length===1){
                finalArr.push(mail[0])
            }
        })

        return finalArr

    }

    useEffect(()=>{
        console.log(mails);
    },[mails])
    const addMail= (e)=>{
        e.preventDefault();
        if(mails.length===0){setActive(false)}
        if(mail===""||!validEmail.test(mail)){
            setModalCond("Email")
            openModal()
        }
        else{
            setMails(prev=>[...prev, [mail]])
        }

        setMail("");
    }
    const delMail = (index)=>{
        let tempMails = mails;
        // let id = mails.indexOf(mail)
        tempMails.splice(index,1)
        // console.log(tempMails)
        // setMails(tempMails)

        setMails(mails.filter(item=>mails.indexOf(item)!==index))
    }

    const switchModal = ()=>{
        switch(modalCond){
            case "Name":
                return(
                    <>
                    <h1 style={{textAlign:"center", marginTop:"60px"}}>Error!!!</h1>
                    <p style={{textAlign:"center"}}>Name of the group cannot be empty.</p>
                    </>
                )
            case "Email":
                return(
                    <>
                    <h1 style={{textAlign:"center", marginTop:"60px"}}>Error!!!</h1>
                    <p style={{textAlign:"center"}}>Please enter a valid email.</p>

                    </>
                )
            case "Empty":
                return(
                    <>
                    <h1 style={{textAlign:"center", marginTop:"60px"}}>Error!!!</h1>
                    <p style={{textAlign:"center"}}>Group must have at least 1 member</p>

                    </>
                )
            case "GrpNameSame":
                return(
                    <>
                    <h1 style={{textAlign:"center", marginTop:"60px"}}>Error!!!</h1>
                    <p style={{textAlign:"center"}}>Two groups cannot have same name.</p>

                    </>
                )
            default :
            return <></>
        }
    }
    return (
        <div>
            <FullPageLoader condition={loader}/>
            <Modal>
            {switchModal()}
            </Modal>
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
                <ReadCsv setMails={setMails} active={(mails.length>0)?false:true}  finalArray={finalArray}/>
                

                <button type="submit" className={styles.submitBtn}>Submit</button>
                {/* <Button variant="primary">Primary</Button> */}
            </Form>
                <Modal>
                <h2 className={styles3.heading}>Error!!</h2>
                {/* <p>Group Name can't be empty</p> */}

                </Modal>
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
