import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { logout, refresh } from '../../../redux/actions/auth';
import { getGroups } from '../../../redux/actions/groups';
import { attachFile, sendMail } from '../../../redux/actions/mails';
import styles from "../dashboard/dashboard.module.css"
import Modal, { closeModal, openModal } from '../Modal/Modal';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import FullPageLoader from '../Loaders/FullPageLoader';
import success from "../../../assets/success.png";
import Loader from 'react-loader-spinner';
import { source } from '../../../services/source';


const SendSimpleMail = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [to,setTo] = useState("");
    const [body,setBody] = useState("");
    const [subject,setSubject] = useState("");
    const [loader,setLoader] = useState(false)
    const [attachments,setAttachments] = useState([]);
    const [attachFiles,setAttachFiles] = useState([]);
    const [from,setFrom] = useState("");
    var date = new Date();
    
    const auth = useSelector((state)=>state.auth)
    const groups = useSelector((state)=>state.groups).groups
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

  return (
      <>
          <FullPageLoader condition={loader}/>
            <Modal>
            <img src={success} alt="success" style={{width:"30%",marginLeft:"35%", marginTop:"30px"}}/>

                <h2 style={{textAlign:"center"}}>Mail sent successfully</h2>
            </Modal>
            {loading?<Loader type="TailSpin" color="#00BFFF" height={40} width={40} className={styles.mailPopupLoader}/>:<></>}

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
                <input value={to} list="groups" autocomplete="off" name="group" className={styles.fromto} placeholder='To' onChange={e=>setTo(e.target.value)}/>
                <datalist id="groups">
                    {groups.map((grp)=>{
                        return(<option value={grp.name}/>)
                    })}
                </datalist>
                <input className={styles.fromto} type="text" placeholder='Subject' value={subject} onChange={e=>setSubject(e.target.value)}></input>
                <textarea value={body} placeholder='Body' className={styles.emailtextarea} onChange={e=>setBody(e.target.value)}>

                </textarea>
                <span style={{marginLeft:"10px"}}>Attachments:</span>
                {attachFiles.map(file=>{
                    return (
                        <>
                            <span className={styles.attachSpan}>{file.fileName.substring(0,5)+"..."+file.fileName.split(".")[file.fileName.split(".").length-1]}, </span>
                        </>)
                })}

            {/* </div> */}
      </>
  );
};

export default SendSimpleMail;
