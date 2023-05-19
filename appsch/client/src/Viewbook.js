import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    MDBCard,
    MDBCardHeader,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn
  } from 'mdb-react-ui-kit';
import Alert from 'react-bootstrap/Alert';  

function Viewbook(){
    const [viewapp,setViewapp] = useState([]);
    useEffect(() => {
      axios
        .get("https://backend-kfcd.onrender.com/view_app",
        {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('authToken')}`
          }
          })
        .then((response) => {
         setViewapp(response.data); 
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);

    return(
     <div className="App mt-4">
        {viewapp.length === 0 && <div className="container"><Alert variant="danger"> No Slots Booked Yet</Alert></div>}
        <div className="container">
        {viewapp.map((slots) => (
            <div key={slots._id}>
    <MDBCard background="light" className="mt-2" shadow="0" border="dark">
      <MDBCardHeader>
        <h3>Appointment Details: </h3><p>Date: {slots.date} , At: {slots.start_time}, Duration: 30 minutes</p>
      </MDBCardHeader>
      <MDBCardBody>
                  <MDBCardTitle>Doctor Name: {slots.doc_name} <br></br>Patient Name: {slots.patient_name}</MDBCardTitle>
                  <MDBCardText><p>Meeting Link: {slots.meeting_url}</p><p>Meeting Password: {slots.meeting_pass}</p></MDBCardText>
                  <MDBBtn href={slots.meeting_url}>Join</MDBBtn>
                </MDBCardBody>
    </MDBCard>
    </div>
        ))}
        </div>
     </div>
    );
}
export default Viewbook
