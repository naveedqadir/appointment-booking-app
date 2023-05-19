import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import logo from './logo.jpg'

function Home({authemail}) {
  return (
    <div className="App mt-4">
      <Container>
        <h1>Welcome to Appolo {authemail} </h1>
        <br />
        <Row className='mt-4'>
          <Col sm={12} md={6} className='mt-4'>
            <h5>Features of this Web App:</h5>
            <ul>
              <li>Register User with Proper Authentication</li>
              <li>Login User with Proper Authentication</li>
              <li>Appointment Booking</li>
              <li>Get Mail of the Appointment with meeting details</li>
              <li>View Appointments Booked By you on View Appointments Window</li>
            </ul>
            <br />
            <h5>How to book appointment:</h5>
            <ul>
              <li>Go to Appointment Section or search the doctor using search bar</li>
              <li>Select Doctor</li>
              <li>Select Date and time slot</li>
              <li>If Time Slot is Available. Fill Details</li>
              <li>You will get a Meeting Link for that time slot and you are good to go.</li>
              <li>Meeting Details would Also be shared to mail.</li>
            </ul>
          </Col>
          <Col sm={12} md={6}>
            <img src={logo} className='img-fluid' alt="example" />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;