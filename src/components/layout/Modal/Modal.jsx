import React from 'react';

const openModal = ()=>{
    document.querySelector(".modal").classList.add("active");
    document.querySelector(".overlay").classList.add("active");
}

const closeModal = ()=>{
    document.querySelector(".modal").classList.remove("active");
    document.querySelector(".overlay").classList.remove("active");
}

const Modal = (props) => {
    
    
  return (
      <>
            <div className="modal">
                {props.children}
            </div>
            <div className='overlay' onClick={closeModal}></div>

      </>
  );
};

export default Modal;
export { openModal, closeModal}
