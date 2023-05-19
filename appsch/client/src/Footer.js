import {  MDBFooter,MDBIcon } from "mdb-react-ui-kit";
function Footer(){
    return(
        <MDBFooter bgColor='dark' className='text-center text-lg-start text-muted'>
        <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
          <div className='me-5 d-none d-lg-block'>
            <span>Get connected with me on social networks:</span>
          </div>

          <div>
            <a href='mailto:naveedqadir0@gmail.com' className='me-4 text-reset'>
              <MDBIcon fab icon="google" />
            </a>
            <a href='https://www.linkedin.com/in/naveedqadir/' target="blank" className='me-4 text-reset'>
              <MDBIcon fab icon="linkedin" />
            </a>
            <a href='https://github.com/naveedqadir' target="blank" className='me-4 text-reset'>
              <MDBIcon fab icon="github" />
            </a>
          </div>
        </section>
        <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.04)' }}>
          © 2021 Copyright:
          <a className='text-reset fw-bold' href='http://localhost:3000'>
            Appolo
          </a><i className="mx-4">Built By Naveed Qadir</i>
        </div>
      </MDBFooter>
    );
}
export default Footer