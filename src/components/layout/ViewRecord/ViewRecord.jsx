import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, refresh } from '../../../redux/actions/auth';
import { previousMails } from '../../../redux/actions/mails';
import dashboardStyles from "../dashboard/dashboard.module.css"
import FullPageLoader from '../Loaders/FullPageLoader';

const ViewRecord = () => {
    let dispatch = useDispatch();
    const [loader,setLoader] = useState(false)
    const prevMails = useSelector(state=>state.mails).prevMails
    useEffect(()=>{
        setLoader(true)
        dispatch(previousMails())
        .then((res)=>{
            setLoader(false)
            console.log(res.data);
        })
        .catch((res)=>{
            // console.log(res.msg);
            if(res.refresh==="required"){
                dispatch(refresh())
                .then(()=>{
                    dispatch(previousMails())
                    .then(()=>{
                        setLoader(false)
                    })
                })
                .catch((err)=>{
                    if(err.msg==="Refresh Fail"){
                        dispatch(logout())
                    }
                })
            }
        })
    },[])
    useEffect(()=>{
        console.log(prevMails);

    },[prevMails])
    const mailClick = ()=>{
        console.log("click")
    }
  return (
      <>
            <FullPageLoader condition={loader}/>
            <h1 className={dashboardStyles.dashHeading}>Previously Sent Mails:</h1>
            <table>
                <tbody>
                <tr>
                    <th>Subject</th>
                    <th>Group Name</th>
                    <th>Date</th>
                    <th>Time</th>
                </tr>

                {prevMails.map((mail)=>{
                    return(
                        <tr onClick={mailClick} className="hoverMail">
                            <td>{mail.subject}</td>
                            <td>{mail.groupName}</td>
                            <td>{mail.date}</td>
                            <td>{mail.time}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
            {prevMails.length===0?<p style={{textAlign:"center",width:"100%"}}>No mails sent yet.</p>:<></>}

        </>
  );
};

export default ViewRecord;
