import React, { useState } from 'react';
import logo from './logo.jpg'
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox
}
from 'mdb-react-ui-kit';

function Login() {
  const [err, setErr] = useState();
    function rg(event){
        event.preventDefault();
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        axios
        .post("/login", {
            email,password
        })
        .then((response) => {
          console.log(response.data);
          localStorage.setItem('authToken', response.data.token);
          localStorage.setItem('authemail', response.data.email);
          window.location.href = '/';
        })
        .catch((error) => {
          console.log(error.response.status);
          setErr(error.response.status)
        });
    }
  return (
    <div className='App mt-4'>
    <MDBContainer fluid>

      <MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
            <form onSubmit={rg}>
              <p classNAme="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login</p>

              {/* <div className="d-flex flex-row align-items-center mb-4 ">
                <MDBIcon fas icon="user me-3" size='lg'/>
                <MDBInput label='Your Name' id='form1' type='text' className='w-100'/>
              </div> */}

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="envelope me-3" size='lg'/>
                <MDBInput label='Your Email' id='email' type='email' required/>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="lock me-3" size='lg'/>
                <MDBInput label='Password' id='password' type='password' required/>
              </div>

              <div className='mb-4'>
                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Please Select to Login' required />
              </div>

              <MDBBtn type="submit" className='mb-4' size='lg'>Login</MDBBtn>
              </form>
              {err === 404 && <Alert variant='danger'> Incorrect Email</Alert>}
              {err === 400 && <Alert variant='danger'> Incorrect Password</Alert>}
            </MDBCol>

            <MDBCol md='10' lg='5' className='order-1 order-lg-2 d-flex align-items-center'>
              <MDBCardImage src={logo} fluid/>
            </MDBCol>

          </MDBRow>
        </MDBCardBody>
      </MDBCard>

    </MDBContainer>

    </div>
  );
}

export default Login;
