import React, { useEffect, useState } from 'react';
import dashboardStyles from "../dashboard/dashboard.module.css"
import { uploadTemplate, getTemplates, sendMailWithTemplate, deleteTemplate, attachPdf } from '../../../redux/actions/templates';
import { logout, refresh } from '../../../redux/actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import styles from "./templates.module.css"
import dashStyles from "../dashboard/dashboard.module.css"
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { attachFile, sendMail } from '../../../redux/actions/mails';
import Loader from "react-loader-spinner";
import FullPageLoader from '../Loaders/FullPageLoader';
import { useNavigate } from 'react-router';
import Modal, { closeModal, openModal } from '../Modal/Modal';
import success from "../../../assets/success.png"
import { getGroups } from '../../../redux/actions/groups';
import { source } from '../../../services/source';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import failed from "../../../assets/failed.png"
import styles2 from "../CreateGroup/creategrp.module.css"
import noGroup from "../../../assets/noData.gif"
import { SET_TEMPLATE } from '../../../redux/actions/types';



const Templates = () => {
  var date = new Date();
  const dispatch = useDispatch();
  const templates = useSelector(state=>state.templates).templates;
  const [show,setShow] = useState(true)
  const [to,setTo] = useState("");
  const [from,setFrom] = useState("");
  const [templateName,setTemplateName] = useState("");
  const [templateId, setTemplateId] = useState();
  const [mailId, setMailId] = useState();
  const [subject,setSubject] = useState("");
  const groups = useSelector((state)=>state.groups).groups
  const [loader,setLoader] = useState(false)
  const [loading, setLoading] = useState(false);
  const [attachments,setAttachments] = useState([]);
  const [attachFiles,setAttachFiles] = useState([]);
  const [pointer, setPointer] = useState("Insert Logo (optional)")
  const [pointer2, setPointer2] = useState("Insert Customized PDF template (optional), must be HTML will all closed tags")
  const [logo,setLogo] = useState(null);
  const [pdf,setPdf] = useState(null);
  const auth = useSelector((state)=>state.auth)
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false)
  const [delId, setDelId] = useState(null)
  const [formDisabled, setFormDisabled] = useState(false)
  const [fromAlert, setFromAlert] = useState(false);
  const [toAlert, setToAlert] = useState(false);
  const [templateAlert, setTemplateAlert] = useState(false);
  const [check, setCheck] = useState(true);
  const [sentence, setSentence] = useState([]);

  const isTemplate = useSelector((state)=>state.groups).isTemplate;
  const navigate = useNavigate();

  // const groups = useSelector((state)=>state.groups)

  useEffect(()=>{
    if(groups.length===0){
        setCheck(false)
    } else{
        let count=0
        groups.forEach(grp=>{
            console.log(grp.hasName);
          if(grp.hasName===true){
              count++;
              setCheck(true)
          }
        })
        if(count===0){
            setCheck(false)
        }
    }

  },[groups])
  useEffect(()=>{
    if(isTemplate.isTemplate===true){
        setTo(isTemplate.name)
        showMailBox()
        getGrpId(isTemplate.name)

    }
    dispatch({
        type:SET_TEMPLATE,
        payload:{isTemplate:false,name:null}
    })
  },[])

  const templateUpload = (e)=>{
    e.preventDefault();
    // setLoading(true)
    let fileName = e.target.files[0].name.split(".")[0].concat(JSON.stringify(date).replace(/"/g, ""));
    console.log(e.target.files[0].name.split(".").pop());
    var blob = e.target.files[0];
    let newFile = new File([blob],fileName+".ftl",{type:"file"});
    console.log(newFile);

    
    
    var fd = new FormData();
    fd.append("file",newFile)
    fd.append("fileName",fileName)
    setLoader(true)
    dispatch(uploadTemplate(fd))
    .then((res)=>{
      console.log("uploaded");
      setLoader(false)
      
    })
    .catch((err)=>{
        if(err.msg==='Refresh'){
            dispatch(refresh())
            .then(()=>{
                dispatch(uploadTemplate(fd))
                .then((res)=>{
                  console.log("uploaded")
                  setLoader(false)

                })
            })
            .catch((err)=>{
                if(err.msg==="Refresh Fail"){
                    dispatch(logout())
                    setLoader(false)

                }
            })
        } else{
          console.log(err);
          setLoader(false)

        }
    
    

})
}

  useEffect(()=>{
      setLoader(true)
    if(!auth.isLoggedIn){
      navigate("/")
  } 
  window.scrollTo(1, 1);
  setPdf(null)
    dispatch(getTemplates())
    .then(()=>{
      console.log(templates)
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
                    .then((res)=>{
                        setLoader(false)
                    })
                })
                .catch((err)=>{
                    if(err.msg==="Refresh Fail"){
                        dispatch(logout())
                        setLoader(false)
                    }
                })
            }
        })
    })
    .catch((err)=>{
      if(err.msg==='Refresh'){
        dispatch(refresh())
        .then(()=>{
            dispatch(getTemplates())
            .then((res)=>{
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
                            .then((res)=>{
                                setLoader(false)
                            })
                        })
                        .catch((err)=>{
                            if(err.msg==="Refresh Fail"){
                                dispatch(logout())
                                setLoader(false)
                            }
                        })
                    }
                })
            })
        })
        .catch((err)=>{
            if(err.msg==="Refresh Fail"){
                dispatch(logout())
            }
        })
    } else{
      console.log(err);
      setLoader(false)
    }
    })
    return () => {
        source.cancel()
    };
  },[auth.isLoggedIn])
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
  const showMailBox = ()=>{
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
    } else if(templateName===""){
        setTemplateAlert(true)
        setTimeout(() => {
            setTemplateAlert(false)
        }, 3000);
    } else {
        document.querySelector(".mailPopup").classList.add("close");
    document.querySelector(".mailPopup").style.height="0px"

    // var mailId;
    setLoader(true)
    // groups.forEach((grp)=>{
    //     if(to===grp.name){
    //         mailId= grp.id;
    //     }
    // })
    // var templateId;
    // templates.forEach((template)=>{
    //   if(templateName===template.name){
    //     templateId=template.id;
    //   }
    // })
    console.log(from,subject,attachments,logo,templateId,mailId);
    setSentence(["This might take a while!","Pls be patient!","All mails will be sent soon"])
    dispatch(sendMailWithTemplate(from,subject,attachments,logo,templateId,mailId,pdf))
    .then(()=>{
        setLoader(false)
        setModalCond("Success")
        openModal()
        setTimeout(()=>{
          closeModal()
        },2000)
        setSentence([])

    })
    .catch((err)=>{
        if(err.code===410){
            dispatch(refresh())
            .then(()=>{
                dispatch(sendMailWithTemplate(from,subject,attachments,logo,templateId,mailId,pdf))
                .then(()=>{
                setModalCond("Success")
                openModal()
                  setTimeout(()=>{
                    closeModal()
                  },2000)
                  setLoader(false)
                  setSentence([])

                })
                .catch(()=>{
                    setLoader(false)
                    setModalCond("Failed")
                    openModal();
                    setTimeout(()=>{
                        closeModal(); 
                     },2000)
                    setSentence([])

                })
            })
            .catch((err)=>{
                if(err.msg==="Refresh Fail"){
                    dispatch(logout())
                    setLoader(false)
                    setSentence([])
                }
            })
        }
        else{
            setLoader(false)
            setModalCond("Failed")
            setSentence([])
            openModal();
            setTimeout(()=>{
                closeModal(); 
             },2000)
        }
    })
    setFrom("");
    setSubject("");
    setAttachments([]);
    setTemplateName("");
    setLogo(null);
    setTo("");
    document.getElementById("logoInput").value="";
    setPointer("Insert Logo (optional)")
    setPdf(null);
    setPointer2("Insert Customized PDF template (optional), must be HTML will all closed tags")
    document.getElementById("pdfInput").value="";

    // deletePdf();

    // setTimeout(()=>{
    //     setLoader(false)
    // },10000)
    }
}

const getTempId = (e)=>{
    templates.forEach((template)=>{
        if(e===template.name){
          setTemplateId(template.id);
        }
      })
}
const getGrpId = (e)=>{
    groups.forEach((grp)=>{
        if(e===grp.name){
            setMailId(grp.id);
        }
    })
}

const fileUpload = (e)=>{
    console.log("entered", e.target.files);
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
useEffect(()=>{
    if(document.querySelector("#logoInput").value!==""){
        document.querySelector("#delLogo").style.display="inline"
        document.querySelector("#delLogo").classList.add("delLogo")

    } else if(logo===null){
        document.querySelector("#delLogo").style.display="none"

    }
},[logo])
useEffect(()=>{
    if(document.querySelector("#pdfInput").value!==""){
        document.querySelector("#delPdf").style.display="inline"
        document.querySelector("#delPdf").classList.add("delLogo")

    } else if(pdf===null){
        document.querySelector("#delPdf").style.display="none"

    }
},[pdf])

const logoUpload = (e)=>{
    if(e.target.files.length===0){
        return 0
    }
  setLogo(e.target.value)
  e.preventDefault();
  setFormDisabled(true)
  setPointer(e.target.files[0].name);
  let fileName = e.target.files[0].name.split(".")[0].concat(JSON.stringify(date).replace(/"/g, ""));
    var fd = new FormData();
    fd.append("file",e.target.files[0])
    fd.append("fileName",fileName)
  dispatch(attachFile(fd))
    .then((res)=>{
        setLogo(res.file.fileName)
        setLoading(false)
        setFormDisabled(false)
    })
    .catch((err)=>{
        if(err.refresh==='required'){
            dispatch(refresh())
            .then(()=>{
                dispatch(attachFile(fd))
                .then((res)=>{
                    setLogo(fileName)
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

})}

const pdfUpload = (e)=>{
    if(e.target.files.length===0){
        return 0
    }
  setPdf(e.target.value)
  e.preventDefault();
  setFormDisabled(true)
  setPointer2(e.target.files[0].name);
  let fileName = e.target.files[0].name.split(".")[0].concat(JSON.stringify(date).replace(/"/g, ""));
    var fd = new FormData();
    fd.append("file",e.target.files[0])
    fd.append("fileName",fileName)
  dispatch(attachPdf(fd))
    .then((res)=>{
        setPdf(res.file)
        console.log(res.file);
        setLoading(false)
        setFormDisabled(false)
    })
    .catch((err)=>{
        if(err.refresh==='required'){
            dispatch(refresh())
            .then(()=>{
                dispatch(attachPdf(fd))
                .then((res)=>{
                    setPdf(res.file)
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

})}


    const deleteAttachment= (index)=> {
        console.log(attachments);
        setAttachFiles(prevFiles=>prevFiles.filter(file=>prevFiles.indexOf(file)!==index))
        setAttachments(prevFiles=>prevFiles.filter(file=>prevFiles.indexOf(file)!==index))
        console.log(attachments);

    }
    const [ modalCond, setModalCond ] = useState("")

    const switchModal = ()=>{
        switch(modalCond){
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
            case "Delete":
                return(
                    <>
                        <h1 style={{textAlign:"center", marginTop:"60px"}}>Are you sure you want to delete this template?</h1>
                        <div style={{width:"100%", textAlign:"center"}}>
                            <button 
                            style={{border:"1px #253E7E solid", borderRadius:"4px", padding:"4px 10px", backgroundColor:"white", color:"#253E7E", marginRight:"2px"}} 
                            onClick={()=>deleteTemp(delId)}>Yes</button> 
                            <button 
                            style={{border:"1px #253E7E solid", borderRadius:"4px", padding:"4px 10px", backgroundColor:"#253E7E", color: "white"}} 
                            onClick={closeModal}>Cancel</button>
                        </div> 
                    </>
                )
            default :
            return <></>
        }
    }

    const handleDel= (id)=>{
        setDelId(id)
        setModalCond("Delete")
        openModal()
    }
    const deleteTemp = (id)=>{
        closeModal()
        setLoader(true)
        dispatch(deleteTemplate(id))
        .then(res=>{
            setLoader(false)
        })
        .catch((err)=>{
            if(err.refresh==='required'){
                dispatch(refresh())
                .then(()=>{
                    dispatch(deleteTemplate(id))
                    .then((res)=>{
                        // setLogo(fileName)
                        setLoader(false)
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
                alert("Error!")
            }
    
        })
        
    }

    const deleteLogo=()=>{
        document.querySelector("#delLogo").style.display="none"
        document.querySelector("#logoInput").value=""
        setLogo(null)
        setPointer("Insert Logo (optional)")
        
    }
    const deletePdf=()=>{
        document.querySelector("#delPdf").style.display="none"
        document.querySelector("#pdfInput").value=""
        setPdf(null)
        setPointer2("Insert Customized PDF template (optional), must be HTML will all closed tags")
        
    }
  return (
      <div style={formDisabled?{pointerEvents:"none"}:{}}>
            <h1 className={dashboardStyles.dashHeading}>Templates</h1>
            <FullPageLoader condition={loader} sentence={sentence}/>
            <Modal>
                {switchModal()}
            </Modal>
            
          <label> 
            <div className={dashboardStyles.btnPrimaryDiv}>
            <div className={dashboardStyles.btnPrimary} style={{textAlign:"center"}}>+ Upload Template</div>
            </div>
                    <input
                        type="file" 
                        className={dashboardStyles.input}
                        name="file"
                        onChange={e=>templateUpload(e)}
                        accept=".html,.ftl"
                    />
            </label>
            <div className={styles2.listBlock}>
                {templates.length===0?<div className={dashStyles.noGroup}>
                    <h3 style={{paddingTop:"10px"}}>No templates found...</h3>
                    <img src={noGroup} alt="gif"/>
                </div>:<></>}
                {templates.map((template,i)=>{
                    return(
                        <>
                        
                            <div className={styles2.listElem} key={i}>
                                {template.name.split("2022")[0]}
                                <button style={{float:"right", border:"1px solid #253e7e", background:"white", color:"#253e7e", borderRadius:"4px", marginLeft:"10px"}} onClick={()=>{handleDel(template.id)}}>Delete</button>
                                <button style={{float:"right", border:"1px solid #253e7e", background:"#253e7e", color:"white", borderRadius:"4px", marginLeft:"10px"}} onClick={()=>{
                                    setTemplateName(template.name)
                                    getTempId(template.name)
                                    showMailBox()
                                }
                                }>Use</button>

                            </div>

                        </>
                    )
                })}
            </div>

            <button className={dashStyles.compose} onClick={showMailBox} id="compose"> <AddIcon fontSize="large"/> <span className={dashStyles.composeSpan} id="composeSpan"></span></button>
            <div className="mailPopup close" id="mailPopup">
            {loading?<Loader type="TailSpin" color="#00BFFF" height={40} width={40} className={dashStyles.mailPopupLoader}/>:<></>}

                <div className={dashboardStyles.headingPopup}>Send Email with Template <button onClick={()=>{
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
                <div className={dashboardStyles.popupTopBtns}>
                    <label className={dashboardStyles.attachFile}> <AttachFileIcon/>
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
                <input className={dashStyles.fromto} type="text" placeholder='From' value={from} onChange={e=>setFrom(e.target.value)} style={fromAlert?{borderColor:"red"}:{}}></input>
                <p className={dashboardStyles.alertsMail}>{fromAlert?"Required!":""}</p>
                <input value={to} list="groups" name="group" className={dashStyles.fromto} placeholder={check?"To":"Create a group with names before sending mail with templates"} autoComplete="off"
                 onChange={(e)=>{
                    setTo(e.target.value)
                    getGrpId(e.target.value)
                    }} 
                 style={toAlert?{borderColor:"red"}:{}} disabled={check?false:true}/>
                <datalist id="groups">
                    {
                        groups.map((grp,i)=>{
                        if(grp.hasName){
                            return(<option value={grp.name} key={i}/>)
                        }
                        else{
                            return <></>
                        }
                        
                    })}
                </datalist>
                <p className={dashboardStyles.alertsMail}>{toAlert?"Required!":""}</p>

                <input value={templateName} list="templates" name="templates" autoComplete="off" className={dashStyles.fromto} placeholder={templates.length>0?'Select template':"Upload a template before sending mail with template."} 
                onChange={e=>{
                    setTemplateName(e.target.value)
                    getTempId(e.target.value)
                    }} 
                disabled={templates.length>0?false:true} style={templateAlert?{borderColor:"red"}:{}}/>
                <datalist id="templates">
                    {templates.map((template,i)=>{
                        return(<option value={template.name} key={i}/>)
                    })}
                </datalist>
                <p className={dashboardStyles.alertsMail}>{templateAlert?"Required!":""}</p>

                <label className={dashStyles.fromto} style={{borderBottom:"1px #253E7E solid", paddingLeft:"2px", cursor:"pointer"}}> {pointer}
                    <input
                        type="file" 
                        className={dashStyles.input}
                        id="logoInput"
                        name="logo"
                        accept='image/*'
                        // value={logo}
                        onChange={e=>logoUpload(e)}
                    />
                    <button onClick={deleteLogo} style={{display:"none"}} id="delLogo">&times;</button>
                    </label>
                <input className={dashStyles.fromto} style={{marginBottom:"10px"}} type="text" placeholder='Subject' value={subject} onChange={e=>setSubject(e.target.value)}></input>
                <label className={dashStyles.fromto} style={{borderBottom:"1px #253E7E solid", paddingLeft:"2px", cursor:"pointer"}}> {pointer2}
                    <input
                        type="file" 
                        className={dashStyles.input}
                        id="pdfInput"
                        name="pdf"
                        accept=".html,.ftl"
                        // value={logo}
                        onChange={e=>pdfUpload(e)}
                    />
                    <button onClick={deletePdf} style={{display:"none"}} id="delPdf">&times;</button>
                    </label>
                <span style={{marginLeft:"2.5%"}}>Attachments:</span>
                {attachFiles.map((file,index)=>{
                    return (
                        <span key={index} >
                            <span className={dashStyles.attachSpan} key={index}>{file.fileName.substring(0,5)+"..."+file.fileName.split(".")[file.fileName.split(".").length-1]} <button onClick={()=>{deleteAttachment(index)}}>&times;</button></span>,
                        </span>)
                })}
                

            </div>
      </div>
  );
};

export default Templates;