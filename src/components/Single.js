import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Accordion from 'react-bootstrap/Accordion'
import Element from './Element'
import axios from "axios"
import Swal from 'sweetalert2'
import Modele2d from './modals/Modele2dTete'

export default class Single extends Component {
    state={
        animal:[],
        loadingSingle:true,
        modele:null,
        description:null,
        poster:null,
        json:null,
    }

    componentDidMount(){
        this.setState({animal:this.props.animal, loadingSingle:false})
    }

    
    contentClickHandler = (e) => {
        /**
         * Fonction double :
         * 1.Quand on clique dans l'accordéon, si c'est un lien, plutôt que de l'ouvrir bêtement on prevent default
         * on fait une requête GET sur le href (+?mobile=true)
         * Si le retour est un <p> alors on affiche
         */
        const targetLink = e.target.closest('a');
          if(!targetLink) return;
          e.preventDefault();
          axios.get(targetLink.href + "?mobile=true")
            .then((res)=>{
                // console.log(res.data)
                if (res.data.indexOf("<div class='MOBILE'>") >= 0){
                    Swal.fire({
                        width:window.innerWidth,
                        background:'#292b2c',
                        html:res.data
                    })
                }else{
                    window.open(targetLink.href,'_blank');
                }
                
            })
            .catch((err)=>{
                console.log(err)
                window.open(targetLink.href,'_blank');
            })
        //   window.open(targetLink.href,'_blank');
        //   console.log(targetLink.href); // this.props.history.push(e.target.href)
    };

  render() {
    const { loadingSingle, animal } = this.state
    // Si la page est en cours de chargement
    if(loadingSingle && animal.length === 0){return(<p className='h2 text-center my-auto'>Chargement en cours...</p>)}
    // si la page a finit de charger mais que l'API n'a rien retournée
    if(!loadingSingle && animal.length === 0){return(<p className='h2 text-center my-auto'>Aucun résultat</p>)}
    // Si la page a finit de charger et que l'API a retournée quelque chose !
    
    return (
      <div className='mt-5'>
        {/* <button onClick={(e)=>{
            console.log(this.state)
        }}>blah</button> */}
        {
            !loadingSingle
            ? <>
                <h1 className='text-center text-capitalize'>{animal.nom}</h1>
                <div className={this.props.night ? 'night ' + 'alert alert-info d-flex justify-content-between' : 'alert alert-info d-flex justify-content-between'}>
                    <p>Attention, nos modèles 3D pèsent lourds, (environ entre 50 et 200Mo) et peuvent entrainer un cout data supplémentaire pour les réseaux mobiles</p>
                    
                </div>
                <div className='d-flex justify-content-around flex-column'>
                    
                    {
                        animal.media.modele.crane
                        ? <Button 
                            variant="success" 
                            className='' 
                            onClick={(e)=>{
                                window.scrollTo(0, document.body.scrollHeight)
                                this.setState({modele:animal.media.modele.crane, description:null, poster:animal.media.thumbnail, json:animal.media.modele.json_c ? animal.media.modele.json_c : ""})
                                
                            }}>Modèle 3D du crâne (~{animal.media.modele.sizeSkull ? animal.media.modele.sizeSkull : "taille inconnue"} Mo) </Button>
                        : ""
                    }
                    
                    {
                        animal.media.modele.body
                        ? <Button 
                            variant="success"
                            className={animal.media.modele.crane ? "mt-3" : ""}
                            onClick={(e)=>{
                                this.setState({modele:animal.media.modele.body, description:null, poster:animal.media.thumbnail, json:animal.media.modele.json_b ? animal.media.modele.json_b : ""})
                            }}>Modèle 3D complet (~{animal.media.modele.sizeSkeletton ? animal.media.modele.sizeSkeletton : ""} Mo)</Button>
                        : ""
                    }
                    {
                        animal.media.crane.dorsal || animal.media.crane.ventral || animal.media.crane.lateral 
                        ? <div className={animal.media.modele.crane || animal.media.modele.body ? "mt-3" +" d-flex flex-column mx-auto text-center" : "d-flex flex-column mx-auto text-center"}><Modele2d animal={animal.media}/></div>
                        :""
                    }
                </div>
                {/* modele 3D */}
                
                    {/* texte des animaux divisés en accordéons */}
                <Container className='mt-2'>
                {
                    typeof(animal.fosse_temporal) === "object" || typeof(animal.groupe_metazoaires)==="object" || typeof(animal.mastication)==="object" || typeof(animal.moyen_locomotion) === "object"
                    ? ""//<h2 className='text-center'>Taxonomie</h2>
                    : ""
                }
                    
                    {/* <button onClick={(e)=>{
                        console.log(this.props)
                    }}>blah</button> */}
                    <Accordion>
                    {
                        typeof(animal.fosse_temporal) === "object" || typeof(animal.groupe_metazoaires) === "object"
                        ? <Accordion.Item eventKey="0" className='border border-info'>
                            <Accordion.Header>Fosse temporale et groupe métazoaire</Accordion.Header>
                            <Accordion.Body  className={this.props.night ? "night" : ""}>
                                {
                                    animal.fosse_temporal[0] !== 0 
                                    ? <strong>{animal.fosse_temporal[0]}<br /></strong>
                                    : <></>
                                }
                                
                                
                                {
                                    animal.groupe_metazoaires && typeof(animal.groupe_metazoaires) === "object" 
                                    ? <strong className={this.props.night ? "text-dark" : ""}>{animal.groupe_metazoaires[0]}</strong>
                                    :""
                                }
                            </Accordion.Body>
                        </Accordion.Item>
                        : ""
                    }
                    {
                        animal.introduction
                        ? <Accordion.Item eventKey="2" className='border border-info mt-1'>
                            <Accordion.Header>introduction</Accordion.Header>
                            <Accordion.Body  className={this.props.night ? "night" : ""}>
                                <p onClick={this.contentClickHandler} dangerouslySetInnerHTML={{__html: animal.introduction}} className={this.props.night ? "text-dark" : ""}/>
                            </Accordion.Body>
                        </Accordion.Item>
                        :''
                    }
                    {
                        animal.tete_des_insectes
                        ? <Accordion.Item eventKey="3" className='border border-info mt-1'>
                            <Accordion.Header>Tête des insectes</Accordion.Header>
                            <Accordion.Body  className={this.props.night ? "night" : ""}>
                                <p onClick={this.contentClickHandler} className={this.props.night ? "text-dark" : ""} dangerouslySetInnerHTML={{__html: animal.tete_des_insectes}} />
                            </Accordion.Body>
                        </Accordion.Item>
                        :''
                    }
                    {
                        animal.thorax
                        ? <Accordion.Item eventKey="4" className='border border-info mt-1'>
                            <Accordion.Header>Thorax</Accordion.Header>
                            <Accordion.Body  className={this.props.night ? "night" : ""}>
                                <p onClick={this.contentClickHandler} className={this.props.night ? "text-dark" : ""} dangerouslySetInnerHTML={{__html: animal.thorax}} />
                            </Accordion.Body>
                        </Accordion.Item>
                        :''
                    }
                    {
                        animal.abdomen
                        ? <Accordion.Item eventKey="5" className='border border-info mt-1'>
                            <Accordion.Header>Abdomen</Accordion.Header>
                            <Accordion.Body  className={this.props.night ? "night" : ""}>
                                <p onClick={this.contentClickHandler} className={this.props.night ? "text-dark" : ""} dangerouslySetInnerHTML={{__html: animal.abdomen}} />
                            </Accordion.Body>
                        </Accordion.Item>
                        :''
                    }
                    {
                        animal.squelette_cephalique
                        ? <Accordion.Item eventKey="6" className='border border-info mt-1'>
                            <Accordion.Header>Squelette céphalique</Accordion.Header>
                            <Accordion.Body  className={this.props.night ? "night" : ""}>
                                <p onClick={this.contentClickHandler} className={this.props.night ? "text-dark" : ""} dangerouslySetInnerHTML={{__html: animal.squelette_cephalique}} />
                            </Accordion.Body>
                        </Accordion.Item>
                        :''
                    }
                    {
                        animal.squelette_axial
                        ? <Accordion.Item eventKey="7" className='border border-info mt-1'>
                            <Accordion.Header>Squelette axial</Accordion.Header>
                            <Accordion.Body  className={this.props.night ? "night" : ""}>
                                <p onClick={this.contentClickHandler} className={this.props.night ? "text-dark" : ""} dangerouslySetInnerHTML={{__html: animal.squelette_axial}} />
                            </Accordion.Body>
                        </Accordion.Item>
                        :''
                    }
                    {
                        animal.squelette_appendiculaire
                        ? <Accordion.Item eventKey="8" className='border border-info mt-1'>
                            <Accordion.Header>Squelette appendiculaire</Accordion.Header>
                            <Accordion.Body  className={this.props.night ? "night" : ""}>
                                <p onClick={this.contentClickHandler} className={this.props.night ? "text-dark" : ""} dangerouslySetInnerHTML={{__html: animal.squelette_appendiculaire}} />
                            </Accordion.Body>
                        </Accordion.Item>
                        :''
                    }
                    {
                        animal.squelette_zonal
                        ? <Accordion.Item eventKey="9" className='border border-info mt-1'>
                            <Accordion.Header>Squelette zonal</Accordion.Header>
                            <Accordion.Body  className={this.props.night ? "night" : ""}>
                                <p onClick={this.contentClickHandler} className={this.props.night ? "text-dark" : ""} dangerouslySetInnerHTML={{__html: animal.squelette_zonal}} />
                            </Accordion.Body>
                        </Accordion.Item>
                        :''
                    }
                    {
                        animal.prosome_cephalothorax
                        ? <Accordion.Item eventKey="11" className='border border-info mt-1'>
                            <Accordion.Header>Prosome céphalothorax</Accordion.Header>
                            <Accordion.Body  className={this.props.night ? "night" : ""}>
                                <p onClick={this.contentClickHandler} className={this.props.night ? "text-dark" : ""} dangerouslySetInnerHTML={{__html: animal.prosome_cephalothorax}} />
                            </Accordion.Body>
                        </Accordion.Item>
                        :''
                    }
                    {
                        animal.opisthosome_abdomen
                        ? <Accordion.Item eventKey="12" className='border border-info mt-1'>
                            <Accordion.Header>Opisthosome abdomen</Accordion.Header>
                            <Accordion.Body  className={this.props.night ? "night" : ""}>
                                <p onClick={this.contentClickHandler} className={this.props.night ? "text-dark" : ""} dangerouslySetInnerHTML={{__html: animal.opisthosome_abdomen}} />
                            </Accordion.Body>
                        </Accordion.Item>
                        :''
                    }
                    {
                        animal.tete_et_pied
                        ? <Accordion.Item eventKey="13" className='border border-info mt-1'>
                            <Accordion.Header>Tête et pied</Accordion.Header>
                            <Accordion.Body  className={this.props.night ? "night" : ""}>
                                <p onClick={this.contentClickHandler} className={this.props.night ? "text-dark" : ""} dangerouslySetInnerHTML={{__html: animal.tete_et_pied}} />
                            </Accordion.Body>
                        </Accordion.Item>
                        :''
                    }
                    {
                        animal.bras_et_tentacules
                        ? <Accordion.Item eventKey="14" className='border border-info mt-1'>
                            <Accordion.Header>Bras et tentacules</Accordion.Header>
                            <Accordion.Body  className={this.props.night ? "night" : ""}>
                                <p onClick={this.contentClickHandler} className={this.props.night ? "text-dark" : ""} dangerouslySetInnerHTML={{__html: animal.bras_et_tentacules}} />
                            </Accordion.Body>
                        </Accordion.Item>
                        :''
                    }
                    {
                        animal.siphon
                        ? <Accordion.Item eventKey="15" className='border border-info mt-1'>
                            <Accordion.Header>Siphon</Accordion.Header>
                            <Accordion.Body  className={this.props.night ? "night" : ""}>
                                <p onClick={this.contentClickHandler} className={this.props.night ? "text-dark" : ""} dangerouslySetInnerHTML={{__html: animal.siphon}} />
                            </Accordion.Body>
                        </Accordion.Item>
                        :''
                    }
                    {
                        animal.manteau_et_masse_viscerale
                        ? <Accordion.Item eventKey="16" className='border border-info mt-1'>
                            <Accordion.Header>Manteau et masse viscérale</Accordion.Header>
                            <Accordion.Body  className={this.props.night ? "night" : ""}>
                                <p onClick={this.contentClickHandler} className={this.props.night ? "text-dark" : ""} dangerouslySetInnerHTML={{__html: animal.manteau_et_masse_viscerale}} />
                            </Accordion.Body>
                        </Accordion.Item>
                        :''
                    }
                    {
                        animal.mastication && typeof(animal.mastication) === "object"
                        ? <Accordion.Item eventKey="1" className='border border-info mt-1'>
                            <Accordion.Header>Mode de mastication</Accordion.Header>
                            <Accordion.Body  className={this.props.night ? "night" : ""}>
                            {
                                Object.values(animal.mastication).map((mast, id)=>{
                                    return(
                                        mast ? mast.length > 50
                                        ? <p onClick={this.contentClickHandler} className={this.props.night ? "text-dark" : ""} 
                                            key={id}
                                            dangerouslySetInnerHTML={{__html: mast}} 
                                        ></p>
                                        : <strong onClick={this.contentClickHandler} key={id}>{mast}<br /></strong>
                                    : "")
                                })
                            }
                            </Accordion.Body>
                        </Accordion.Item>
                        :''
                    }

                    {
                        animal.moyen_locomotion && typeof(animal.moyen_locomotion) === "object"
                        ? <Accordion.Item eventKey="20" className='border border-info mt-1'>
                            <Accordion.Header>Mode de locomotion</Accordion.Header>
                            <Accordion.Body  className={this.props.night ? "night" : ""}>
                            {
                                Object.values(animal.moyen_locomotion).map((mast, id)=>{
                                    
                                    return(mast ? mast.length > 20
                                    ?
                                            <><p onClick={this.contentClickHandler} className={this.props.night ? "text-dark" : ""} 
                                                key={id} 
                                                dangerouslySetInnerHTML={{__html:mast}}
                                            >
                                        </p><br /></>
                                    : <strong onClick={this.contentClickHandler} className={this.props.night ? "text-dark" : ""} key={id}>{mast}<br /></strong>
                                    :"")
                                })
                            }
                            </Accordion.Body>
                        </Accordion.Item>
                        :''
                    }
                    </Accordion>
                </Container>
                <Container className="mt-3">
                {/* <button onClick={()=>{console.log(this.state)}}>blah</button> */}
                    <Element description={this.state.description} modele={this.state.modele} poster={this.state.poster} json={this.state.json} />
                    
                </Container>
            </>
            : <></>
        }
      </div>
    )
  }
}
