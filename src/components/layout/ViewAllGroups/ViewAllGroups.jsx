import React from 'react';
import { useSelector } from 'react-redux';
import styles from "../dashboard/dashboard.module.css"
import Capsule from '../dashboard/GroupsSection/Capsule';


const ViewAllGroups = () => {
    const groups = useSelector((state)=>state.groups)
    const grpArr = groups.groups
  return (
      <>
            <h1 className={styles.dashHeading}>Groups</h1>
            <div style={{display:"flex", alignItems:"center", justifyContent:"space-evenly", flexWrap:"wrap"}}>
                {grpArr.map((grp)=>{
                    return(<Capsule group={grp}/>)
                })}           
            </div>

      </>
  );
};

export default ViewAllGroups;
