import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { MDBInput, MDBCheckbox, MDBBtn } from "mdb-react-ui-kit";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardHeader,
  MDBRipple,
} from "mdb-react-ui-kit";

function Createapp({ username, check, time, date }) {
  const [Post, setPosted] = useState("false");
  const [details, setDetails] = useState([]);
  function patient_data(event) {
    event.preventDefault();
    var patient_email = document.getElementById("patient_email").value;
    var patient_name = document.getElementById("patient_name").value;
    axios
      .post("https://backend-kfcd.onrender.com/bookslot", {
        time,
        date,
        username,
        check,
        patient_email,
        patient_name,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
      })
      .then((response) => {
        // console.log(response.data);
        setDetails(response.data);
        setPosted("true");
      })
      .catch((error) => {
        console.log(error);
        setPosted("false");
      });
  }
  return (
    <div className="App">
      <div className="container">
        {Post === "false" && (
          <Alert variant="success">
            Time-Slot {time} is Available. You can now Book the Slot
          </Alert>
        )}
        {Post === "false" && (
          <form onSubmit={patient_data}>
            <MDBInput
              className="mb-4"
              id="patient_name"
              label="Name"
              required
            />
            <MDBInput
              className="mb-4"
              type="email"
              id="patient_email"
              label="Email address"
              required
            />

            <MDBCheckbox
              wrapperClass="d-flex justify-content-center mb-4"
              id="form5Example3"
              label="I have read and agree to the terms"
              required
            />

            <MDBBtn type="submit" block>
              Submit
            </MDBBtn>
          </form>
        )}
        {Post === "true" && <Alert variant="success">Slot Booked</Alert>}
        {Post === "true" && 
              <MDBCard background='light' shadow='0' border='dark' className="">
                <MDBCardHeader><h3>Appointment Details: </h3><p>Date: {date} , At: {time}, Duration: 30 minutes</p>
                </MDBCardHeader>
                <MDBRipple
                  rippleColor="light"
                  rippleTag="div"
                  className="bg-image hover-overlay"
                >
                </MDBRipple>
                <MDBCardBody>
                  <MDBCardTitle><p>Meeting Link: {details.url}</p></MDBCardTitle>
                  <MDBCardText><p>Meeting Password: {details.pass}</p></MDBCardText>
                  <MDBBtn href={details.url}>Join</MDBBtn>
                </MDBCardBody>
              </MDBCard>
        }
      </div>
    </div>
  );
}
export default Createapp;
