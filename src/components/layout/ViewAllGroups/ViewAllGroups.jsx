import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { logout, refresh } from '../../../redux/actions/auth';
import { getGroups } from '../../../redux/actions/groups';
import { source } from '../../../services/source';
import styles from "../dashboard/dashboard.module.css"
import Capsule from '../dashboard/GroupsSection/Capsule';
import FullPageLoader from '../Loaders/FullPageLoader';
import noGroup from "../../../assets/noData.gif"
import Modal, { openModal, closeModal } from '../Modal/Modal';
import { attachFile, sendMail } from '../../../redux/actions/mails';
import success from "../../../assets/success.png"
import failed from "../../../assets/failed.png"
import Loader from 'react-loader-spinner';
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';


const ViewAllGroups = () => {
    const auth = useSelector((state)=>state.auth)
    const [loader, setLoader] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [ modalCond, setModalCond ] = useState("")
    const [isMobile, setIsMobile] = useState(false)
    const [show,setShow] = useState(true)
    const [to,setTo] = useState("");
    const [body,setBody] = useState("");
    const [subject,setSubject] = useState("");
    const [loading, setLoading] = useState(false);
    const [attachments,setAttachments] = useState([]);
    const [attachFiles,setAttachFiles] = useState([]);
    const [from,setFrom] = useState("");
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [formDisabled, setFormDisabled] = useState(false)
    const [fromAlert, setFromAlert] = useState(false);
    const [check, setCheck] = useState(true);
    const [toAlert, setToAlert] = useState(false);
    const groups = useSelector((state)=>state.groups).groups
    var date = new Date();

    const switchModal = ()=>{
        switch(modalCond){
            case "Startup":
                return(
                    <>
                    <h4 style={{textAlign:"center", marginTop:"60px", marginBottom:"12px"}}>Choose an option to create group:</h4>
                    <button className={styles.modalButtons} onClick={()=>{
                       navigate("/create-group/withemails")
                    }}>With emails only</button>
                    <button className={styles.modalButtons} onClick={()=>{
                      navigate("/create-group/withnames")
                    }}>With names and emails both</button>
                    </>
                )
            case "Success":
                return(
                    <>
                        <img src={success} alt="success" style={{width:"30%",marginLeft:"35%", marginTop:"30px"}}/>

                        <h2 style={{textAlign:"center"}}>Mail sent successfully</h2>

                    </>
                )
            case "Failed":
                return(
                    <>
                        <img src={failed} alt="success" style={{width:"20%",marginLeft:"40%", marginTop:"30px"}}/>

                        <h3 style={{textAlign:"center",padding:"10px"}}>Mail cannot be sent! Please check everything and try sending again.</h3>

                    </>
                )
            default :
            return <></>
        }
    }
    useEffect(() => {
        console.log("called");
        function handleResize() {
          if(window.innerWidth<565){
              setIsMobile(true)
          }
          else setIsMobile(false)
        }
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
      }, []); 

    useEffect(()=>{
        setLoader(true)
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
    const showMailBox = ()=>{
        console.log("called");
        if(!isMobile){
            document.querySelector(".mailPopup").classList.remove("close");
            document.querySelector(".mailPopup").classList.remove("fullScreen");
            document.querySelector(".mailPopup").style.height="480px"
            document.querySelector(".mailPopup").style.width="500px"
            setShow(true)
        }
        else{
            document.querySelector(".mailPopup").classList.remove("close");
            document.querySelector(".mailPopup").classList.add("fullScreen");
            document.querySelector(".mailPopup").style.height = "85vh";
            document.querySelector(".mailPopup").style.width = "90vw";
            document.querySelector(".mailPopup").style.transform="translate(-5vw,-5vh)"

            setShow(true)
        }
        
    }   

    const send = ()=>{

        if(from===""){
            setFromAlert(true)
            setTimeout(()=>{
                setFromAlert(false)
            },3000)
        } else if(to===""){
            setToAlert(true)
            setTimeout(()=>{
                setToAlert(false)
            },3000)
        } else{
            document.querySelector(".mailPopup").classList.add("close");
        document.querySelector(".mailPopup").style.height="0px"
        document.querySelector(".mailPopup").style.transform="translate(0vw,0vh)"


        var mailId;
        setLoader(true)
        groups.forEach((grp)=>{
            if(to===grp.name){
                mailId= grp.id;
            }
        })
        setAttachments([])
        setSubject("")
        setBody("")
        setTo("")
        dispatch(sendMail(from,mailId,subject,body,attachments))
        .then(()=>{
            setLoader(false)
            setModalCond("Success")
            openModal();
            setTimeout(()=>{
               closeModal(); 
            },2000)
        })
        .catch((err)=>{
            if(err.code===410){
                dispatch(refresh())
                .then(()=>{
                    dispatch(sendMail(from,mailId,subject,body,attachments))
                    .then(()=>{
                        setLoader(false)
                        setModalCond("Success")
                        openModal();
                        setTimeout(()=>{
                           closeModal(); 
                        },2000)
                    })
                    .catch(()=>{
                        setLoader(false)
                        setModalCond("Failed")
                        openModal();
                        setTimeout(()=>{
                            closeModal(); 
                         },2000)
                    })
                })
                .catch((err)=>{
                    if(err.msg==="Refresh Fail"){
                        dispatch(logout())
                        setLoader(false)
                    }
                })
            }
            else{
                setLoader(false)
                setModalCond("Failed")
                openModal();
                setTimeout(()=>{
                    closeModal(); 
                 },2000)
            }
        })
        }

        
    }
    

    const fileUpload = (e)=>{
        if(e.target.files.length===0){
            return 0
        }
        setFormDisabled(true)
        e.preventDefault();
        setLoading(true)
        let fileName = e.target.files[0].name.split(".")[0].concat(JSON.stringify(date).replace(/"/g, ""));
        var fd = new FormData();
        fd.append("file",e.target.files[0])
        fd.append("fileName",fileName)
        dispatch(attachFile(fd))
        .then((res)=>{
            setAttachments(prev=>[...prev,res.file.fileName])
            setAttachFiles(prev=>[...prev,res.file])
            setLoading(false)
            setFormDisabled(false)
        })
        .catch((err)=>{
            if(err.refresh==='required'){
                dispatch(refresh())
                .then(()=>{
                    dispatch(attachFile(fd))
                    .then((res)=>{
                        setAttachments(prev=>[...prev,res.file.fileName])
                        setAttachFiles(prev=>[...prev,res.file])
                        console.log(attachments,attachFiles);
                        setLoading(false)
                        setFormDisabled(false)
                    })
                })
                .catch((err)=>{
                    if(err.msg==="Refresh Fail"){
                        dispatch(logout())
                        setLoading(false)
                        setFormDisabled(false)
                    }
                })
            }
        

    })
}
    
    const deleteAttachment= (index)=> {
        console.log(attachments);
        setAttachFiles(prevFiles=>prevFiles.filter(file=>prevFiles.indexOf(file)!==index))
        setAttachments(prevFiles=>prevFiles.filter(file=>prevFiles.indexOf(file)!==index))
        console.log(attachments);

    }
    // const groups = useSelector((state)=>state.groups)
    const grpArr = groups
  return (
      <div style={formDisabled?{pointerEvents:"none"}:{}}>
            <FullPageLoader condition={loader}/>
            <Modal>
                {switchModal()}
            </Modal>
            <h1 className={styles.dashHeading}>Groups</h1>
            <div className={styles.btnPrimaryDiv}><button className={styles.btnPrimary} onClick={()=>{
                setModalCond("Startup")
                openModal()
            }} >+ Create New Group</button></div>
            {grpArr.length===0?<div className={styles.noGroup}>
                    <h3>No groups created.</h3>
                    <img src={noGroup} alt="gif"/>
                </div>:<></>}
            <div style={{display:"flex", alignItems:"center", justifyContent:"space-evenly", flexWrap:"wrap", marginTop:"20px"}}>
                {grpArr.map((grp, i)=>{
                    return(<Capsule group={grp} key={i} showMailBox={showMailBox} setTo={setTo}/>)
                })}           
            </div>
            <button className={styles.compose} onClick={showMailBox} id="compose"> <AddIcon fontSize="large"/> <span className={styles.composeSpan} id="composeSpan"></span></button>
            <div className="mailPopup close" id="mailPopup">
            {loading?<Loader type="TailSpin" color="#00BFFF" height={40} width={40} className={styles.mailPopupLoader}/>:<></>}

                <div className={styles.headingPopup}>Compose Email <button onClick={()=>{
                    document.querySelector(".mailPopup").classList.remove("fullScreen")
                    setIsFullScreen(false)
                    document.querySelector(".mailPopup").classList.add("close")
                    document.querySelector(".mailPopup").style.height="0"
                    document.querySelector(".mailPopup").style.transform="translate(0vw,0vh)"
                    setShow(true)
                    if(isMobile){
                        document.querySelector(".mailPopup").style.width="90vw"
                    } else document.querySelector(".mailPopup").style.width="500px";



                }}>&times;</button> {show?<button onClick={()=>{
                    setShow(false)
                    document.querySelector(".mailPopup").style.height="35px"
                    document.querySelector(".mailPopup").style.width="300px";
                    document.querySelector(".mailPopup").classList.remove("fullScreen")
                    document.querySelector(".mailPopup").style.transform="translate(0,0)"
                    setIsFullScreen(false)



                }}><ExpandMoreIcon/></button>:<button onClick={()=>{
                    setShow(true)
                    if(!isMobile){
                        document.querySelector(".mailPopup").style.height="480px";
                    document.querySelector(".mailPopup").style.width="500px";
                    document.querySelector(".mailPopup").classList.remove("fullScreen")
                    } else {
                        document.querySelector(".mailPopup").style.height="85vh";
                    document.querySelector(".mailPopup").style.width="90vw";
                    document.querySelector(".mailPopup").classList.add("fullScreen")
                    }
                    if(isMobile){
                        document.querySelector(".mailPopup").style.transform="translate(-5vw,-5vh)"
                    }
                    setIsFullScreen(false)

                }}><ExpandLessIcon/></button> }
                {isFullScreen?<button onClick={()=>{
                    setIsFullScreen(false)
                    document.querySelector(".mailPopup").style.height="480px";
                    document.querySelector(".mailPopup").style.width="500px";
                    document.querySelector(".mailPopup").classList.remove("fullScreen");
                    document.querySelector(".mailPopup").style.transform="translate(0vw,0vh)"

                    

                }} style={isMobile?{visibility:"collapse"}:{visibility:"visible"}}><UnfoldLessIcon style={{transform:"rotate(-45deg)"}}/></button>:
                <button onClick={()=>{
                    setIsFullScreen(true)
                    document.querySelector(".mailPopup").style.height = "85vh";
                    document.querySelector(".mailPopup").style.width = "90vw";
                    document.querySelector(".mailPopup").classList.add("fullScreen");
                    document.querySelector(".mailPopup").style.transform="translate(-5vw,-5vh)"

                    setShow(true)
                    

                }} style={isMobile?{visibility:"collapse"}:{visibility:"visible"}}><UnfoldMoreIcon style={{transform:"rotate(-45deg)"}}/></button>}
                </div>
                <div className={styles.popupTopBtns}>
                    <label className={styles.attachFile}> <AttachFileIcon/>
                    <input
                        type="file" 
                        className={styles.input}
                        name="file"
                        onChange={e=>fileUpload(e)}
                    />
                    </label>

                    {/* <button style={{transform: "rotate(45deg)"}}><AttachFileIcon/></button> */}
                    <button  onClick={send}><SendIcon/></button>

                </div>
                <input className={styles.fromto} type="text" placeholder='From' value={from} onChange={e=>setFrom(e.target.value)} style={fromAlert?{borderColor:"red"}:{}} ></input>
                <p className={styles.alertsMail}>{fromAlert?"Required!":""}</p>
                <input value={to} list="groups" autoComplete="off" name="group" className={styles.fromto} placeholder={check?"To":"Create a group with emails only before sending mail"} onChange={e=>setTo(e.target.value)} style={toAlert?{borderColor:"red"}:{}} disabled={check?false:true}/>
                <datalist id="groups">
                {groups.map((grp, i)=>{
                        if(!grp.hasName){
                            return(<option value={grp.name} key={i}/>)
                        }
                        else{
                            return <></>
                        }
                    })}
                </datalist>
                <p className={styles.alertsMail}>{toAlert?"Required!":""}</p>

                <input className={styles.fromto} type="text" placeholder='Subject' value={subject} onChange={e=>setSubject(e.target.value)}></input>
                <textarea value={body} placeholder='Body' className={styles.emailtextarea} onChange={e=>setBody(e.target.value)}>
                </textarea>
                <span style={{marginLeft:"2.5%"}}>Attachments:</span>
                {attachFiles.map((file,index)=>{
                    return (
                        <>
                            <span className={styles.attachSpan} key={index}>{file.fileName.substring(0,5)+"..."+file.fileName.split(".")[file.fileName.split(".").length-1]} <button onClick={()=>{deleteAttachment(index)}}>&times;</button></span>,
                        </>)
                })}

            </div>


      </div>
  );
};

export default ViewAllGroups;
