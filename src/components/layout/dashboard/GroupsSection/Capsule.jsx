import React from 'react'
import styles from "./groups.module.css"
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router';
// import { useSelector } from 'react-redux';

const Capsule = (props) => {
    var navigate = useNavigate();
    const viewClick = ()=>{
        navigate("/view-group/"+props.group.name+"/"+props.group.id)
    }
    return (
        <div className={styles.capsule}>
            <h2 className={styles.grpTitle}>{props.group.name}</h2>
            <p className={styles.members}>Total Members: {props.group.count}</p>
            <button className={styles.viewBtn} onClick={viewClick}><VisibilityIcon fontSize='small'/> View</button>
            <div className={styles.sideline}></div>
        </div>
    )
}

export default Capsule
