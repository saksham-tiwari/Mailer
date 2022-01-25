import React from 'react';
import styles from "../CreateGroup/creategrp.module.css"


const ListComponent = (props) => {
  return (
      <>
            <div className={styles.listBlock}>
                {props.mails.length===0?<div>No members entered yet.</div>:<></>}
                {props.mails.map((mail,index)=>{
                    return(
                        <>
                        
                            <div className={styles.listElem}>
                            {mail.length===2?<>{mail[0]},
                                {mail[1]}</>:<>{mail}</>}
                                
                                <button className={styles.delBtn} onClick={()=>props.delMail(index)}>&times;</button>
                            </div>

                        </>
                    )
                })}
            </div>
      </>
  );
};

export default ListComponent;
