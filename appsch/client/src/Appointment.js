import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { MDBBtn, MDBBadge } from "mdb-react-ui-kit";
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import Createapp from "./Createapp";
import Alert from 'react-bootstrap/Alert';
import Badge from 'react-bootstrap/Badge';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBListGroup,
  MDBListGroupItem
} from 'mdb-react-ui-kit';

function Appointment() {
  const { username } = useParams();
  const [check,setCheck] = useState();
  const [info,setInfo] = useState([]);
  const [date,setDate] = useState();
  const [start_time,setTime] = useState();
  const cdate =new Date().toISOString().slice(0, 10);
  // const navigate = useNavigate();
function schedule(event){
    event.preventDefault();
    var id = event.target.id
    var usname = {username}
    var date = document.getElementById('date').value
    setDate(date)
    var time = document.getElementById(id).value
    setTime(time)
    console.log(time)
    if (date){
    axios
    .post("https://backend-kfcd.onrender.com/check", {time,date,usname,
    })
    .then((response) => {
      console.log(response.data)
      var check = response.data
      if(check === true ){
        setCheck("false");
      }
    })
    .catch((error) => {
      // console.log(error);
      // navigate("/create_appointment");
      setCheck("true");
    });
  }
  else{
    // alert("Select Date First")
    document.getElementById("alert").innerHTML = `Please Select Date First`
  }
  }

  useEffect(() => {
  const docinfo = async (value) => {
  try {
    const response = await axios.get(`https://backend-kfcd.onrender.com/search?q=${username}`);
    const doctors = response.data;
    const doc = doctors.map((doctor) => ({
      name: doctor.name,
      catagory: doctor.catagory,
      degree: doctor.degree,
      username: doctor.username
    }));
        setInfo(doc[0]);
  } catch (err) {
    console.error(err);
  }
};
docinfo();
}, []);
  return (
    <div className="App mt-4">
          <h3><MDBBadge className='ms-2 mb-4' color="info" light>Doctor Details</MDBBadge></h3> 
<div className="container">
          <MDBCard background="info" shadow="0" border="dark">
      <MDBCardBody >
        <MDBCardTitle>Name: {info.name}</MDBCardTitle>
      </MDBCardBody>
      <MDBListGroup flush>
        <MDBListGroupItem>catagory: {info.catagory}</MDBListGroupItem>
        <MDBListGroupItem>Degree: {info.degree}</MDBListGroupItem>
      </MDBListGroup>
    </MDBCard>
    </div>
        <form onSubmit={schedule}>
      <div className="container mt-4">
      <h4><MDBBadge className='ms-2 mb-4'>Available Time Slots</MDBBadge></h4>
      <div className="container">
        
      <Badge id="alert" className="mb-1" bg="danger"></Badge><br></br>
        <input type="date" classname="form-control" id="date" min={cdate} required ></input>
        </div>
      <br></br>
        <MDBBtn type="submit" onClick={schedule} id="10:00" value={"10:00"} className="mx-2 mx-2 mb-2 mb-2" color="secondary">
          10:00
        </MDBBtn>
        <MDBBtn type="submit" id="10:30" onClick={schedule} value={"10:30"} className="mx-2 mx-2 mb-2 mb-2" color="secondary">
          10:30
        </MDBBtn>        
        <MDBBtn type="submit" id="11:00" onClick={schedule} value={"11:00"} className="mx-2 mb-2 mb-2" color="secondary">
          11:00
        </MDBBtn>        
        <MDBBtn type="submit" id="11:30" onClick={schedule} value={"11:30"} className="mx-2 mb-2 mb-2" color="secondary">
          11:30
        </MDBBtn>        
        <MDBBtn type="submit" id="12:00" onClick={schedule} value={"12:00"} className="mx-2 mb-2 mb-2" color="secondary">
          12:00
        </MDBBtn>        
        <MDBBtn type="submit" id="12:30" onClick={schedule} value={"12:30"} className="mx-2 mb-2 mb-2" color="secondary">
          12:30
        </MDBBtn>        
        <MDBBtn type="submit" id="01:00" onClick={schedule} value={"01:00"} className="mx-2 mb-2 mb-2" color="secondary">
          1:00
        </MDBBtn>        
        <MDBBtn type="submit" id="01:30" onClick={schedule} value={"01:30"} className="mx-2 mb-2 mb-2" color="secondary">
          1:30
        </MDBBtn>        
        <MDBBtn type="submit" id="02:00" onClick={schedule} value={"02:00"} className="mx-2 mb-2 mb-2" color="secondary">
          2:00
        </MDBBtn>        
        <MDBBtn type="submit" id="02:30" onClick={schedule} value={"02:30"} className="mx-2 mb-2 mb-2" color="secondary">
          2:30
        </MDBBtn>        
        <MDBBtn type="submit" id="3:00" onClick={schedule} value={"03:00"} className="mx-2 mb-2 mb-2" color="secondary">
          3:00
        </MDBBtn>
      </div>
      </form>
      <br></br>
      <div className="container">
      {check==="false" && <Alert variant="danger"> This Slot is Already booked. Please Choose another Slot</Alert>}
      </div>
      {check==="true" && <Createapp username={username} check={check} date={date} time={start_time} />}
    </div>
  );
}
export default Appointment;
