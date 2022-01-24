import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getGroups } from '../../../redux/actions/groups';
import { logout, refresh } from '../../../redux/actions/auth';
import GroupsSection from './GroupsSection/GroupsSection';
import Mails from "../mails/mails"
import styles from "./dashboard.module.css"
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { sendMail } from '../../../redux/actions/mails';
import FullPageLoader from '../Loaders/FullPageLoader';
// import {  } from 'bootstrap';


const Dashboard = () => {
    const dispatch = useDispatch();
    const [show,setShow] = useState(true)
    const [from,setFrom] = useState("");
    const [to,setTo] = useState("");
    const [body,setBody] = useState("");
    const [subject,setSubject] = useState("");
    const groups = useSelector((state)=>state.groups).groups
    const [loader,setLoader] = useState(false)
    const [attachment,setAttachment] = useState([]);

    useEffect(()=>{
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
    },[])
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
        console.log(mailId);
        dispatch(sendMail(mailId,subject,body,attachment))
        .then(()=>{
            setLoader(false)
        })
        .catch((err)=>{
            if(err.refresh==='required'){
                dispatch(refresh())
                .then(()=>{
                    dispatch(sendMail(mailId,subject,body,attachment))
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
    }
    
    return (
        <>
            {/* <Navbar/> */}
            <GroupsSection/>
            <FullPageLoader condition={loader}/>

            <button className={styles.compose} onClick={showMailBox} id="compose"> <AddIcon fontSize="large"/> <span className={styles.composeSpan} id="composeSpan"></span></button>
            <div className="mailPopup close" id="mailPopup">
                <div className={styles.headingPopup}>Compose Email <button onClick={()=>{
                    document.querySelector(".mailPopup").classList.add("close")
                    document.querySelector(".mailPopup").style.height="0px"

                }}>&times;</button> {show?<button onClick={()=>{
                    setShow(false)
                    document.querySelector(".mailPopup").style.height="35px"

                }}><ExpandMoreIcon/></button>:<button onClick={()=>{
                    setShow(true)
                    document.querySelector(".mailPopup").style.height="480px";
                }}><ExpandLessIcon/></button> }</div>
                <div className={styles.popupTopBtns}>
                    <button style={{transform: "rotate(45deg)"}}><AttachFileIcon/></button>
                    <button  onClick={send}><SendIcon/></button>

                </div>
                <input value={from} className={styles.fromto} placeholder='From' onChange={e=>setFrom(e.target.value)}></input>
                <br></br>
                <input value={to} list="groups" name="group" className={styles.fromto} placeholder='To' onChange={e=>setTo(e.target.value)}/>
                <datalist id="groups">
                    {groups.map((grp)=>{
                        return(<option value={grp.name}/>)
                    })}
                </datalist>
                <input value={subject} className={styles.fromto} placeholder='Subject' onChange={e=>setSubject(e.target.value)}></input>
                <textarea value={body} placeholder='Body' className={styles.emailtextarea} onChange={e=>setBody(e.target.value)}>

                </textarea>

            </div>
            <Mails/>

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
