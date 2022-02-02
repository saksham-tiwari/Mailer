import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import Modal, { openModal } from '../Modal/Modal';
import styles from "./creategrpmethods.module.css"

const CreateGroupMethods = () => {
  const [ modalCond, setModalCond ] = useState("")
  const auth = useSelector((state)=>state.auth)
  const navigate = useNavigate();

  useEffect(() => {
    if(!auth.isLoggedIn){
      navigate("/")
    }
    setModalCond("Startup");
    openModal() 
  },[]);
  
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
  return (
      <>
          <Modal strict={true}>{switchModal()}</Modal>
      </>
  );
};

export default CreateGroupMethods;
