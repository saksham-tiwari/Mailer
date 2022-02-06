import React from 'react';
import styles from "../CreateGroup/creategrp.module.css"


const ListComponent = (props) => {
  return (
      <>
            <div className={styles.listBlock} style={props.styles}>
                {props.mails.length===0?<div style={{textAlign:"center", paddingTop:"20px"}}>{props.msg!==""?props.msg:"No members entered yet."}</div>:<></>}
                {props.mails.map((mail,index)=>{
                    return(
                        <>
                        
                            <div className={styles.listElem}>
                            {typeof(mail)==="object"?<>{mail.name},
                                {mail.email}</>:<>{mail}</>}
                                
                                <button className={styles.delBtn} onClick={()=>{
                                    console.log("Called me")
                                    props.delMail(index)
                                    }}>&times;</button>
                            </div>

                        </>
                    )
                })}
            </div>
      </>
  );
};

export default ListComponent;
