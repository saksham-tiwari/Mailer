import React from 'react'
import styles from "./groups.module.css"
import VisibilityIcon from '@mui/icons-material/Visibility';
// import { useSelector } from 'react-redux';

const Capsule = (props) => {
    return (
        <div className={styles.capsule}>
            <h2 className={styles.grpTitle}>{props.name}</h2>
            <p className={styles.members}>Total Members: {props.count}</p>
            <button className={styles.viewBtn}><VisibilityIcon fontSize='small'/> View</button>
            <div className={styles.sideline}></div>
        </div>
    )
}

export default Capsule
