import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { logout, refresh } from '../../../redux/actions/auth';
import { getGroups } from '../../../redux/actions/groups';
import { source } from '../../../services/source';
import styles from "../dashboard/dashboard.module.css"
import Capsule from '../dashboard/GroupsSection/Capsule';
import FullPageLoader from '../Loaders/FullPageLoader';
import Modal, { openModal } from '../Modal/Modal';


const ViewAllGroups = () => {
    const auth = useSelector((state)=>state.auth)
    const [loader, setLoader] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [ modalCond, setModalCond ] = useState("")
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
            default :
            return <></>
        }
    }

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
    const groups = useSelector((state)=>state.groups)
    const grpArr = groups.groups
  return (
      <>
            <FullPageLoader condition={loader}/>
            <Modal>
                {switchModal()}
            </Modal>
            <h1 className={styles.dashHeading}>Groups</h1>
            <div className={styles.btnPrimaryDiv}><button className={styles.btnPrimary} onClick={()=>{
                setModalCond("Startup")
                openModal()
            }} >+ Create New Group</button></div>
            <div style={{display:"flex", alignItems:"center", justifyContent:"space-evenly", flexWrap:"wrap", marginTop:"20px"}}>
                {grpArr.map((grp, i)=>{
                    return(<Capsule group={grp} key={i}/>)
                })}           
            </div>

      </>
  );
};

export default ViewAllGroups;
