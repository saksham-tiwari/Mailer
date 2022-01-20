import React from 'react';
import styles from "../CreateGroup/creategrp.module.css"


const ListComponent = (props) => {
  return (
      <>
          <div className={styles.listBlock}>
                {props.mails.length===0?<div>No members entered yet.</div>:<></>}
                {props.mails.map((mail)=>{
                    return(
                        <>
                        
                            <div className={styles.listElem}>
                                {mail}
                                <button className={styles.delBtn} onClick={()=>props.delMail(mail)}>X</button>
                            </div>

                        </>
                    )
                })}
                </div>
      </>
  );
};

export default ListComponent;
