import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getGroups } from '../../../redux/actions/groups';
import { logout, refresh } from '../../../redux/actions/auth';
import GroupsSection from './GroupsSection/GroupsSection';
import styles from "./dashboard.module.css"
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { attachFile, sendMail } from '../../../redux/actions/mails';
import FullPageLoader from '../Loaders/FullPageLoader';
import Loader from "react-loader-spinner";
import Modal, { openModal, closeModal } from '../Modal/Modal';
import success from "../../../assets/success.png"
import { useNavigate } from 'react-router';
import { source } from '../../../services/source';
// import {  } from 'bootstrap';


const Dashboard = () => {
    const dispatch = useDispatch();
    const [show,setShow] = useState(true)
    const [to,setTo] = useState("");
    const [body,setBody] = useState("");
    const [subject,setSubject] = useState("");
    const groups = useSelector((state)=>state.groups).groups
    const [loader,setLoader] = useState(false)
    const [loading, setLoading] = useState(false);
    const [attachments,setAttachments] = useState([]);
    const [attachFiles,setAttachFiles] = useState([]);
    const [from,setFrom] = useState("");

    var date = new Date();
    const auth = useSelector((state)=>state.auth)
    const navigate = useNavigate();


    useEffect(()=>{
        if(!auth.isLoggedIn){
            navigate("/")
        } 
        setLoader(true)
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
    // let btnMail = document.querySelector("#compose");
    // btnMail.addEventListener("mouseover",()=>{
    //     document.getElementById("composeSpan").innerHTML="Compose Email";
    // })
    // btnMail.addEventListener("mouseout",()=>{
    //     document.getElementById("composeSpan").innerHTML="";
    // })

    // function Upload() {
    //     var fileUpload = document.getElementById("fileUpload");
    //     var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
    //     if (regex.test(fileUpload.value.toLowerCase())) {
    //         if (typeof (FileReader) != "undefined") {
    //             var reader = new FileReader();
    //             reader.onload = function (e) {
    //                 var table = document.createElement("table");
    //                 var rows = e.target.result.split("\n");
    //                 for (var i = 0; i < rows.length; i++) {
    //                     var row = table.insertRow(-1);
    //                     var cells = rows[i].split(",");
    //                     for (var j = 0; j < cells.length; j++) {
    //                         var cell = row.insertCell(-1);
    //                         cell.innerHTML = cells[j];
    //                     }
    //                 }
    //                 var dvCSV = document.getElementById("dvCSV");
    //                 dvCSV.innerHTML = "";
    //                 dvCSV.appendChild(table);
    //             }
    //             reader.readAsText(fileUpload.files[0]);
    //         } else {
    //             alert("This browser does not support HTML5.");
    //         }
    //     } else {
    //         alert("Please upload a valid CSV file.");
    //     }
    // }


    const showMailBox = ()=>{
        document.querySelector(".mailPopup").classList.remove("close");
        document.querySelector(".mailPopup").style.height="480px"
        document.querySelector(".mailPopup").style.width="500px"
        setShow(true)
    }   

    const send = ()=>{
        document.querySelector(".mailPopup").classList.add("close");
        document.querySelector(".mailPopup").style.height="0px"

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
            openModal();
            setTimeout(()=>{
               closeModal(); 
            },2000)
        })
        .catch((err)=>{
            if(err.refresh==='required'){
                dispatch(refresh())
                .then(()=>{
                    dispatch(sendMail(from,mailId,subject,body,attachments))
                    .then(()=>{
                        setLoader(false)
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
        })
    }

    const fileUpload = (e)=>{
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
                    })
                })
                .catch((err)=>{
                    if(err.msg==="Refresh Fail"){
                        dispatch(logout())
                        setLoading(false)
                    }
                })
            }
        

    })
}
    
    return(
        <>
            {/* <Navbar/> */}
            <GroupsSection/>
            <FullPageLoader condition={loader}/>
            <Modal>
            <img src={success} alt="success" style={{width:"30%",marginLeft:"35%", marginTop:"30px"}}/>

                <h2 style={{textAlign:"center"}}>Mail sent successfully</h2>
            </Modal>

            <button className={styles.compose} onClick={showMailBox} id="compose"> <AddIcon fontSize="large"/> <span className={styles.composeSpan} id="composeSpan"></span></button>
            <div className="mailPopup close" id="mailPopup">
            {loading?<Loader type="TailSpin" color="#00BFFF" height={40} width={40} className={styles.mailPopupLoader}/>:<></>}

                <div className={styles.headingPopup}>Compose Email <button onClick={()=>{
                    document.querySelector(".mailPopup").classList.add("close")
                    document.querySelector(".mailPopup").style.height="0px"
                    document.querySelector(".mailPopup").style.width="500px";
                    setShow(true)


                }}>&times;</button> {show?<button onClick={()=>{
                    setShow(false)
                    document.querySelector(".mailPopup").style.height="35px"
                    document.querySelector(".mailPopup").style.width="300px";


                }}><ExpandMoreIcon/></button>:<button onClick={()=>{
                    setShow(true)
                    document.querySelector(".mailPopup").style.height="480px";
                    document.querySelector(".mailPopup").style.width="500px";

                }}><ExpandLessIcon/></button> }</div>
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
                <input className={styles.fromto} type="text" placeholder='From' value={from} onChange={e=>setFrom(e.target.value)}></input>
                <input value={to} list="groups" name="group" className={styles.fromto} placeholder='To' onChange={e=>setTo(e.target.value)}/>
                <datalist id="groups">
                    {groups.map((grp)=>{
                        return(<option value={grp.name}/>)
                    })}
                </datalist>
                <input className={styles.fromto} type="text" placeholder='Subject' value={subject} onChange={e=>setSubject(e.target.value)}></input>
                <textarea value={body} placeholder='Body' className={styles.emailtextarea} onChange={e=>setBody(e.target.value)}>

                </textarea>
                <span>Attachments:</span>
                {attachFiles.map(file=>{
                    return (
                        <>
                            <span className={styles.attachSpan}>{file.fileName.substring(0,5)+"..."+file.fileName.split(".")[file.fileName.split(".").length-1]}, </span>
                        </>)
                })}

            </div>

            {/* <input id="fileSelect" type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />  */}
            {/* <input type="file" id="fileUpload" />
            <input type="button" id="upload" value="Upload" onClick={Upload} />
            <hr />
            <div id="dvCSV">
            </div> */}
        </>
    )
}

export default Dashboard
