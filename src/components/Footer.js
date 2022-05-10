import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

export default class Footer extends Component {
  render() {
    return (
      <>
        <Navbar bg="dark" variant="dark" className='mt-5 d-flex justify-content-between'>
          <Nav.Link href="https://animalia.univ-tours.fr/?mobile=false" className='text-light font-weight-bold text-capitalize'>Site complet</Nav.Link>
          <div className='d-fex flex-column'>
            <div>
               <strong className='text-light copyright'>&copy; {new Date().getFullYear()} Copyright</strong>
            </div>
            <div>
              <strong>
                <a href="https://univ-tours.fr" target="_blank" rel="noreferrer">Université de Tours</a>
              </strong>
            </div>
          </div>
           
        </Navbar>
      </>
    )
  }
}
