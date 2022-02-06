import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import FullPageLoader from '../../Loaders/FullPageLoader';
import Modal, { openModal } from '../../Modal/Modal';
import stylesDash from "../../dashboard/dashboard.module.css"
import styles from "../creategrpmethods.module.css"
import ReadCsv from '../../dashboard/readCsv';
import ListComponent from '../../ListComponent/ListComponent';
import { createGroup, getGroups } from '../../../../redux/actions/groups';
import { logout, refresh } from '../../../../redux/actions/auth';
import { source } from '../../../../services/source';
import { validEmail } from '../../../auth/Regex';


const WithEmails = () => {
    const auth = useSelector((state)=>state.auth)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [modalCond, setModalCond] = useState("")
    const [loader, setLoader] = useState(false)
    const [grpName, setGrpName] = useState("")
    const [mails,setMails] = useState([]);
    const [email, setEmail] = useState("")  
    const groups = useSelector((state)=>state.groups).groups
    const [emailErr, setEmailErr]= useState(false);
    const [nameErr, setNameErr]= useState(false);
    const [alertMsg, setAlertMsg] = useState("");
    const [noMailsErr, setNoMailsErr] = useState(false)


    useEffect(()=>{
        if(!auth.isLoggedIn){
            navigate("/")
        }
        window.scrollTo(1, 1);
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

    const switchModal = ()=>{
        switch(modalCond){
            case "GrpNotForm":
                return(
                    <>
                    <h1 style={{textAlign:"center", marginTop:"60px"}}>Error!!!</h1>
                    <p style={{textAlign:"center"}}>Group cannot be formed. Pls try again.</p>
                    </>
                )
            default :
            return <></>
        }
    }


    const createGrpFormSubmit = (e)=>{
        setLoader(true);
        e.preventDefault();
        console.log(grpName)
        console.log(mails);
        // var finalArr = finalArray(mails)

        if(grpName===""){
            setNameErr(true)
            setAlertMsg("Name Required!")
            setLoader(false)
            setTimeout(()=>{
                setNameErr(false)
                setAlertMsg("")
            },2000)
        }
        else if(mails.length===0){
            setLoader(false)
            setNoMailsErr(true);
            setAlertMsg("Groups must have atleast 1 member!");
            setTimeout(()=>{
                setNoMailsErr(false)
                setAlertMsg("")
            },3000)
        }
        else if(checkName()){
            setNameErr(true)
            setAlertMsg("Group name should be unique.")
            setLoader(false)
            setTimeout(()=>{
                setNameErr(false)
                setAlertMsg("")
            },2000)
        }
        
        else{
            dispatch(createGroup(grpName,mails,mails.length))
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
                            dispatch(createGroup(grpName,mails,mails.length))
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
                        setModalCond("GrpNotForm")
                        openModal();
                    }
                })
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
    const singleAdd = (e)=>{
        e.preventDefault();
        if(email===""||!validEmail.test(email)){
            setEmailErr(true)
            setAlertMsg("Enter a valid email!")
            setLoader(false)
            setTimeout(()=>{
                setEmailErr(false)
                setAlertMsg("")
            },2000)
        }
        else{
            setMails(prev=>[...prev, email])

        }
        setEmail("")
    }
    const delMail = (index)=>{
        let tempMails = mails;
        // let id = mails.indexOf(mail)
        tempMails.splice(index,0)
        // console.log(tempMails)
        // setMails(tempMails)

        setMails(mails.filter(item=>mails.indexOf(item)!==index))
    }

    useEffect(()=>{
        console.log(mails);
    },[mails])
  return (
      <>
        <FullPageLoader condition={loader}/>

        <Modal>
            {switchModal()}
        </Modal>
        <h1 className={stylesDash.dashHeading}>Create New Group</h1>
        <form className={styles.formCreate} onSubmit={createGrpFormSubmit}>
            <label>Group Name:</label>
            <input placeholder='Enter the name of group (should be unique)' type="name" value={grpName} onChange={e=>setGrpName(e.target.value)} className={styles.input} style={nameErr?{borderColor:"red"}:{borderColor:"#253E7E"}}></input>
            <p className={styles.alert}>{nameErr?alertMsg:""}</p>
            <label style={{marginTop:"10px"}}>Email</label>
            <div style={{display:"flex"}}>
                <input placeholder='Enter email one by one' type="email" value={email} onChange={e=>setEmail(e.target.value)} className={styles.input} style={emailErr?{borderRadius:"4px 0px 0px 4px",borderColor:"red"}:{borderRadius:"4px 0px 0px 4px",borderColor:"#253E7E"}}></input>
                <button className={styles.add} style={{borderRadius:"0px 4px 4px 0px", width:"120px"}} onClick={singleAdd} >+ ADD</button>
            </div>
            <p className={styles.alert}>{emailErr?alertMsg:""}</p>
            <table>
                <tbody>
                        <tr>
                            <td style={{width:"49%"}}><hr/></td>
                            <td style={{verticalAlign:"middle", textAlign: "center", color:"#000000",fontSize:"14px"}}> OR</td>
                            <td style={{width:"49%"}}><hr/></td>
                        </tr>
                </tbody>
            </table>
            <ReadCsv setMails={setMails} active={true}/>
            <button type="submit" className={styles.submitBtn}>Submit</button>
        </form>

        <br></br>
        <h1 className={stylesDash.dashHeading}>Members Added:</h1>
        <ListComponent mails={mails} delMail={delMail} styles={noMailsErr?{border:"2px red solid"}:{}} msg={noMailsErr?alertMsg:""}/>
      </>
  )
};

export default WithEmails;
