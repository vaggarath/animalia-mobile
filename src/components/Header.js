import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'

export default class Header extends Component {
    
  render() {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                <Navbar.Brand href="./">
                    <img
                        alt=""
                        src="./logo_pattes_transparancy_no_brand.png"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    <img
                        alt=""
                        src="./brand_name_transparant.png"
                        width="100"
                        // height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    
                </Navbar.Brand>
                <div className='d-flex justify-content-between w-100'>
                  <Nav className="me-auto mr-5">
                    <Nav.Link href="./" rel='noopener noreferrer'>Accueil</Nav.Link>
                    {/* <Nav.Link href="#features">Animaux</Nav.Link> */}
                    <Nav.Link href="./blog" target="_blank" rel='noopener noreferrer'>Actualités</Nav.Link>
                 </Nav>

                 <Nav className="mr-auto">
                 <Navbar.Text className='d-flex justify-content-between w-100'>
                 <div></div>
                    <i class={this.props.night ? "bi bi-brightness-high-fill cursor ml-5 align-self-end" : "bi bi-moon-fill cursor ml-5 align-self-end"} onClick={()=>{
                        this.props.onclick()
                    }}></i>
                </Navbar.Text>
                 </Nav>
                </div>
                </Container>
            </Navbar>
      </>
    )
  }
}
