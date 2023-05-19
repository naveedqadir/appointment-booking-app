import React, { useState } from "react";
import axios from "axios";
import Autosuggest from 'react-autosuggest';
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBBtn,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBCollapse,
  } from "mdb-react-ui-kit";
import logo from './logo.jpg'
function Navbar({auth,setAuth}){
    function handleLogout() {
        localStorage.removeItem('authToken');
        localStorage.removeItem('authemail')
        window.location.href = '/login';
        setAuth(false)
      }
      // Search Functionality
      const [value, setValue] = useState('');
      const [suggestions, setSuggestions] = useState([]);
    
      const getSuggestions = async (value) => {
        try {
          const response = await axios.get(`/search?q=${value}`);
          const doctors = response.data;
          const suggestions = doctors.map((doctor) => ({
            name: doctor.name,
            catagory: doctor.catagory,
            degree: doctor.degree,
            username: doctor.username
          }));
          setSuggestions(suggestions);
        } catch (err) {
          console.error(err);
        }
      };
    
      const getSuggestionValue = (suggestion) => suggestion.username;
    
      const renderSuggestion = (suggestion) => (
        <div>
          <div className="container">{suggestion.name}</div>
        </div>
      );
    
      const onSuggestionsFetchRequested = ({ value }) => {
        getSuggestions(value);
      };
    
      const onSuggestionsClearRequested = () => {
        setSuggestions([]);
      };
    
      const onSuggestionSelected = (event, { suggestionValue }) => {
        window.location.href=`/appbook/${suggestionValue}`;
    };
    
      const inputProps = {
        placeholder: 'Search for a doctor',
        value,
        onChange: (event, { newValue }) => {
          setValue(newValue);
        },
      };
    const [showBasic, setShowBasic] = useState(false);
    return(
        <MDBNavbar expand="lg" light bgColor="light">
        <MDBContainer fluid>
          <MDBNavbarBrand href="/"><img
            src={logo}
            height='35'
            alt=''
            loading='lazy'
          /></MDBNavbarBrand>

          <MDBNavbarToggler
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setShowBasic(!showBasic)}
          >
            <MDBIcon icon="bars" fas />
          </MDBNavbarToggler>

          <MDBCollapse navbar show={showBasic}>
            <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
              <MDBNavbarItem>
                <MDBNavbarLink active aria-current="page" href="/">
                  Home
                </MDBNavbarLink>
              </MDBNavbarItem>
              {auth === false &&
                <MDBNavbarItem>
                  <MDBNavbarLink href="/login">Login</MDBNavbarLink>
                </MDBNavbarItem>
              }
              {auth === false &&
                <MDBNavbarItem>
                  <MDBNavbarLink href="/register">Register</MDBNavbarLink>
                </MDBNavbarItem>
              }

              <MDBNavbarItem>
                <MDBNavbarLink href="/viewbook">View Appointments</MDBNavbarLink>
              </MDBNavbarItem>

              <MDBNavbarItem>
                <MDBNavbarLink href="/book">Book Appointment</MDBNavbarLink>
              </MDBNavbarItem>

              <MDBNavbarItem>
                <MDBDropdown>
                  <MDBDropdownToggle tag='a' className='nav-link' role='button'>
                    More
                  </MDBDropdownToggle>

                  <MDBDropdownMenu>
                    <MDBDropdownItem>
                      {auth === true &&
                        <MDBBtn color="white" onClick={handleLogout} className="w-100">Logout</MDBBtn>
                      }
                    </MDBDropdownItem>
                  </MDBDropdownMenu>

                </MDBDropdown>
              </MDBNavbarItem>
            </MDBNavbarNav>

            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={onSuggestionsFetchRequested}
              onSuggestionsClearRequested={onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              onSuggestionSelected={onSuggestionSelected}
              inputProps={inputProps}
              theme={ {
              container:            'react-autosuggest__container',
              containerOpen:        'react-autosuggest__container--open',
              input:                'react-autosuggest__input',
              suggestionsContainer: 'react-autosuggest__suggestions-container',
              suggestionsList:      'react-autosuggest__suggestions-list',
              suggestion:           'react-autosuggest__suggestion',
            } }
            />

          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>


    );
}
export default Navbar