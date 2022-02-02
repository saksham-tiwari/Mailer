import React from 'react';

const openModal = ()=>{
    document.querySelector(".modal").classList.add("active");
    document.querySelector(".overlay").classList.add("active");
}

const closeModal = ()=>{
    document.querySelector(".modal").classList.remove("active");
    document.querySelector(".overlay").classList.remove("active");
}

const restrictClose = ()=>{
    document.querySelector(".modal").classList.add("shake");
    document.querySelector(".modal").style.border="2px red solid"
    setTimeout(()=>{
        document.querySelector(".modal").style.border = "none"
        document.querySelector(".modal").classList.remove("shake");
    },500)
}

const Modal = (props) => {
    
    
  return (
      <>
            <div className="modal">
                {props.children}
            </div>
            {!props.strict?<div className='overlay' onClick={closeModal}></div>:<div className='overlay' onClick={restrictClose}></div>}

      </>
  );
};

export default Modal;
export { openModal, closeModal}
