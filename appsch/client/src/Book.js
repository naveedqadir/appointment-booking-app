import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBCardHeader,
  MDBRipple,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

function Book() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    axios
      .get("https://backend-kfcd.onrender.com/dataload")
      .then((response) => {
        setDoctors(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="App mt-4">
      <div className="container mb-3 text-center">
        <h1>Doctors</h1>
      </div>
      <MDBRow className="row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mx-2">
        {doctors.map((doc) => (
          <MDBCol key={doc._id}>
            <MDBCard background="light" shadow="0" border="dark" className="">
              <MDBCardHeader>
                <h3>{doc.name}</h3>
              </MDBCardHeader>
              <MDBRipple
                rippleColor="light"
                rippleTag="div"
                className="bg-image hover-overlay"
              >
                {/* <MDBCardImage src="" fluid alt="..." />
                <a>
                  <div
                    className="mask"
                    style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                  ></div>
                </a> */}
              </MDBRipple>
              <MDBCardBody>
                <MDBCardTitle>{doc.catagory}</MDBCardTitle>
                <MDBCardText>{doc.degree}</MDBCardText>
                <Link to={`/appbook/${doc.username}`}>
                  <MDBBtn>Book Appointment</MDBBtn>
                </Link>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        ))}
      </MDBRow>
    </div>
  );
}

export default Book;
