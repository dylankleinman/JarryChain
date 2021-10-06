import React from 'react'
import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/TabContainer'
import jerry from '../../img/IMG_1575.png'

let alertArray = ["Invalid Address Ya Goof!", "C'mon You Know That Isn't A Valid Address", "Ehh...Yea...That Address Isn't Valid", "Hey! That Ain't No Valid Address", "Mmmm Yea That Isn't A Valid Address"]

const InvalidAddressToast = (props) => {
    return (
        <div style={{position: "absolute", bottom: 10, right: 10, color:"black"}}>
        <ToastContainer className="p-3" position="top-end">
          <Toast show={props.show} animation="true">
            <Toast.Header closeButton={false}>
              <img
                style={{width:"30px", height: "30px"}}
                src={jerry}
                alt="alt"
              />
              <strong className="me-auto">Jarry Says: </strong>
            </Toast.Header>
            <Toast.Body>{alertArray[props.messageArrayVal]}</Toast.Body>
          </Toast>
        </ToastContainer>
      </div>
    );
}

export default InvalidAddressToast