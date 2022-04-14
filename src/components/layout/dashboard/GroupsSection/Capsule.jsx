import React from 'react'
import styles from "./groups.module.css"
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { SET_TEMPLATE } from '../../../../redux/actions/types';
// import { useSelector } from 'react-redux';

const Capsule = (props) => {
    console.log(props)
    var navigate = useNavigate();
    const viewClick = ()=>{
        navigate("/view-group/"+props.group.name+"/"+props.group.id)
    }
    let dispatch = useDispatch();
    return (
        <div className={styles.capsule}>
            <h2 className={styles.grpTitle}>{props.group.name}</h2>
            <p className={styles.members}>Total Members: {props.group.count}</p>
            <button className={styles.useBtn} onClick={()=>{
                if(props.group.hasName){
                    dispatch({
                        type:SET_TEMPLATE,
                        payload:{isTemplate:true,name:props.group.name}
                    })
                    navigate("/templates")
                } else{
                    props.setTo(props.group.name)
                    props.showMailBox()

                }
                // {props.group.hasName?navigate("/templates"):props.setTo(props.group.name)}
                }}><VisibilityIcon fontSize='small'/> Use</button>
            <button className={styles.viewBtn} onClick={viewClick}><VisibilityIcon fontSize='small'/> View</button>
            <div className={styles.sideline}></div>
        </div>
    )
}

export default Capsule
