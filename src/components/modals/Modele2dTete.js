import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel'
import CanvasBuilder from './CanvasBuilder';

export default class Modele2d extends Component {
    state = {
        show : false,
        images:[],
        jsons:[],
    }

    componentDidMount(){
        const animal = this.props.animal ? this.props.animal : null
        this.setState({images: animal.crane ? Object.values(animal.crane) : [], jsons:animal.json ? Object.values(animal.json) : [] })
    }

    //fonction pour gérer ouverture/fermeture de la modale. (Les ex de bootstrap sont pour des composants fonctionnels et non des classes)
    handleClose = () => this.setState({ show: false })
    handleShow = () => this.setState({ show: true })

  render() {

    const jsons = this.state.jsons.filter(Boolean);
    const images = this.state.images.filter(Boolean)
    return (
        <>
        <Button 
            variant="warning" 
            onClick={()=>{
                this.handleShow();
            }}
            className='mx-auto'
        >
            Modèle(s) 2D (tête)
        </Button>

        <Modal 
            className=""
            show={this.state.show} 
            onHide={this.handleClose} 
            // dialogClassName="modal-90w"
            fullscreen={true}
        >
            <Modal.Header closeButton>
            <Modal.Title id="darthTitle"><strong>Modèle(s) 2D</strong></Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {/* <button onClick={(e)=>{
                console.log(images.filter(Boolean))
                console.log(jsons)
            }}>blah</button> */}
            <Carousel showArrows={false} showIndicators={false} showStatus={false}>
                {
                    images.map((img, idx)=><div><img src={img} key={idx} /></div>)
                        
                }
            </Carousel>
            {/* <Carousel showArrows={false} showThumbs={false}>
                {
                    jsons.map((json, idx)=><CanvasBuilder json={ json } />)
                }
            </Carousel> */}

            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
                Fermer
            </Button>
            </Modal.Footer>
        </Modal>
    </>
    )
  }
}
