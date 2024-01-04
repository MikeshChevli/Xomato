// Importing necessary modules
import React from 'react'
import ReactDom from 'react-dom'

// Styles for the modal
const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  backgroundColor: 'rgb(34,34,34)',
  transform: 'translate(-50%, -50%)',
  zIndex: 1000,
  height: '90%',
  width: '90%'
}

// Styles for the overlay
const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 1000
}

// Modal component
// This component is used to display a modal window
// It takes two props: children and onClose
// children: the content to be displayed in the modal
// onClose: a function to close the modal
const Modal = ({ children, onClose })=> {

  // The component uses ReactDom.createPortal to render the modal
  // It creates a portal to the 'cart-root' element in the DOM
  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <button className='btn bg-danger fs-4' style={{ marginLeft: "90%", marginTop: "-35px" }} onClick={onClose}> X </button>
        {children}
      </div>
    </>,
    document.getElementById('cart-root')
  )
}

// Exporting the Modal component
export default Modal