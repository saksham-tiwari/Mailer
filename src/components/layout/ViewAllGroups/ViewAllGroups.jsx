import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { logout, refresh } from '../../../redux/actions/auth';
import { getGroups } from '../../../redux/actions/groups';
import { source } from '../../../services/source';
import styles from "../dashboard/dashboard.module.css"
import Capsule from '../dashboard/GroupsSection/Capsule';
import FullPageLoader from '../Loaders/FullPageLoader';


const ViewAllGroups = () => {
    const auth = useSelector((state)=>state.auth)
    const [loader, setLoader] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        setLoader(true)
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
    const groups = useSelector((state)=>state.groups)
    const grpArr = groups.groups
  return (
      <>
            <FullPageLoader condition={loader}/>

            <h1 className={styles.dashHeading}>Groups</h1>
            <div className={styles.btnPrimaryDiv}><button className={styles.btnPrimary} onClick={()=>navigate("/create-group")} >+ Create New Group</button></div>
            <div style={{display:"flex", alignItems:"center", justifyContent:"space-evenly", flexWrap:"wrap", marginTop:"20px"}}>
                {grpArr.map((grp)=>{
                    return(<Capsule group={grp}/>)
                })}           
            </div>

      </>
  );
};

export default ViewAllGroups;
