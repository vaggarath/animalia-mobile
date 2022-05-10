import React, { Component } from 'react'
import axios from "axios"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Single from './Single'
import Alert from 'react-bootstrap/Alert'
import Button from "react-bootstrap/Button"

export default class Liste extends Component {

    state={
        loading:true,
        liste:[],
        fullListe:true,
        single:[],
        showAlert:true,
    }

    componentDidMount(){
        //on call l'api des animaux
        //https://animalia.univ-tours.fr //http://localhost/animaliav3
        // 
        axios.get("http://localhost/animaliav3/rest/api/v1/animal")
        .then((res)=>{
            const liste = res.data
            //les cors de l'api ne permettant pas de tester des ressources media du site on va se créer notre propre calamar
            const calam = {id:255, nom:"calamar", link:"#", description:'blah description calam', media:{thumbnail:"Calamar.png", modele:{crane:"./Calamar_head-1.glb", body:"./Mygale.glb"}, crane:{dorsal:"./Calamar_crane_dorsal.png"}, json:{dorsal:"./CALAMAR_Tete_Dorsal_patches_metadata-2.json"}}}
            liste.push(calam)
            this.setState({liste})
            
            // console.log(liste) 
        })
    }

    setAnimal(animal){
        // console.log(animal)
        this.setState({fullListe:false, single:animal})
    }

  render() {
    const { loading, liste, fullListe, single } = this.state
    // Si la page est en cours de chargement
    if(loading && liste.length === 0){return(<p className='h2 text-center my-auto'>Chargement en cours...</p>)}
    // si la page a finit de charger mais que l'API n'a rien retournée
    if(!loading && liste.length === 0){return(<p className='h2 text-center my-auto'>Aucun résultat</p>)}
    // Si la page a finit de charger et que l'API a retournée quelque chose !
    return (
      <>
        <Container className={this.props.night ? "night" : ""+" mb-5"}>
        {
            fullListe && single.length === 0
            ?<>
                <h1 className='text-center mt-5'>Liste des animaux </h1>
                <Alert variant="warning" show={this.state.showAlert}>
                    <Alert.Heading>Avertissement</Alert.Heading>
                    <br />
                    Nos modèles 3D peuvent peser lourd (de 30 à 200Mo) ce qui peut entraîner un coût "data" supplémentaire pour les utilisateurs mobiles.
                    <br />
                    <div className="d-flex justify-content-end">
                    <Button className="float-right" onClick={(e)=>{
                        e.preventDefault()
                        this.setState({showAlert:false})
                    }} variant="danger">Fermer</Button></div>
                </Alert>
                
                {
                    !this.state.showAlert ? <Button variant="info" className="mb-2" onClick={(e)=>{this.setState({showAlert:true})}}>Information</Button> :""
                }
                <Row xs={1} md={2} className="g-4">
                    {
                        liste.map((animal, id)=>{
                            return(
                                <div key={id}>
                                    <Col>
                                        <Card role="button" onClick={(e)=>{
                                            this.setAnimal(animal)
                                        }}>
                                            <Card.Img variant="top" src={animal.media.thumbnail} />
                                            <Card.Body>
                                            <Card.Title className={this.props.night ? "text-dark" : ""}>{animal.nom}</Card.Title>
                                            <Card.Text className={this.props.night ? "text-dark" : ""}>
                                                {/* {
                                                    animal.description ? <p dangerouslySetInnerHTML={{ __html: animal.description.substring(0, 25).replace(/\n/g,'<br />')+"..." }} className={this.props.night ? "text-dark" : ""}></p> : "Aucune description disponible"
                                                } */}
                                            </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>  
                                </div>
                            )
                        })
                    }
                </Row>
            </>
            : <Single animal={single} night={this.props.night}/>
        }
        {/* <button onClick={(e)=>{console.log(this.state.liste)}}>Blah</button> */}
        </Container>
      </>
    )
  }
}
