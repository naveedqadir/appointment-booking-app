import React, { useState } from 'react';
import logo from './logo.jpg'
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import Badge from 'react-bootstrap/Badge';
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
  MDBCheckbox,
}
from 'mdb-react-ui-kit';

function Register() {
    const [registered, setRegistered] = useState(false);
    function rg(event){
        event.preventDefault();
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        var rpassword = document.getElementById("rpassword").value;
        if (password === rpassword){
        axios
        .post("/register", {
            email,password
        })
        .then((response) => {
          console.log(response.data);
          setRegistered(true)
        })
        .catch((error) => {
          console.log(error);
        });
      }else{
        document.getElementById("alert").innerHTML = `Password's Don't Match`;
      }
    }
  return (
    <div className='App mt-4'>
    <MDBContainer fluid>
        {registered === false &&
      <MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
            <form onSubmit={rg}>
              <p classNAme="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

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

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="key me-3" size='lg'/>
                <MDBInput label='Repeat your password' id='rpassword' type='password' required/>
              </div>
              <Badge id="alert" className="mb-1" bg="danger"></Badge>

              <div className='mb-4'>
                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Please Select to Register' required />
              </div>

              <MDBBtn type="submit" className='mb-4' size='lg'>Register</MDBBtn>
              </form>
            </MDBCol>

            <MDBCol md='10' lg='5' className='order-1 order-lg-2 d-flex align-items-center'>
              <MDBCardImage src={logo} fluid/>
            </MDBCol>

          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    }
    {registered === true && <Alert variant='success'> Registered successfully</Alert>}

    </MDBContainer>
    </div>
  );
}

export default Register;
