import React from 'react'
import C from './Modal.module.css'

type Props = {
    children: React.ReactNode;
}

const Modal = ({children}: Props) => {

    const closeModal = (e: React.MouseEvent): void => {
        const modal = document.querySelector("#modal");
        modal!.classList.add("hide");
    }

  return (
    <div id='modal' className='hide'>
        <div className={C.fade} onClick={closeModal}></div>
        <div className={C.modal}>
            <h2>Texto modal</h2>
            {children}
        </div>
    </div>
  )
};

export default Modal;