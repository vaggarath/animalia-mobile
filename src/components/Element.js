import axios from 'axios'
import React, { Component } from 'react'
import Swal from 'sweetalert2'

export default class Element extends Component {

  state={
    loadingModel:false,
    showPoi:false,
    firstLoad:false,
  }
  
  componentDidMount = () =>{
    // console.log(this.props)
  }

  componentDidUpdate(prevPros, prevState){
    if(prevState.loadingModel !== this.state.loadingModel){
      if(document.getElementById('player')){
        document.getElementById('player').addEventListener('load', (e)=>{
          console.log("repéré et chargé")
          const player = e.target
          const windowWidth = (window.innerWidth * 0.0002645833).toFixed(2)
          
          if(!document.getElementById('repaint')){
            const repaint = document.createElement('i')
            repaint.id = "repaint"
            repaint.classList.add('bi', 'bi-brush', 'cursor', 'h1', 'mr-5')
            repaint.onclick = e =>{
              // console.log(e)
              const parts = document.getElementById('player').model.materials;
              parts.map(part=>{
                  part.pbrMetallicRoughness.setBaseColorFactor([Math.random(), Math.random(), Math.random()])
              })
            }
            document.getElementById('player').append(repaint)
          }

          
          if(this.props.json && !document.getElementById('showPoi')){

            const showPoi = document.createElement('i')
            showPoi.classList.add('bi', 'bi-geo-alt', 'h1', 'cursor')
            showPoi.id = "showPoi"
            showPoi.onclick = (e) =>{
              this.setState({showPoi:!this.state.showPoi})
              if(!this.state.showPoi){
                
                console.log(e.target)
                axios.get(this.props.json)
                  .then((res)=>{
                    // console.log(res.data.hotspots)
                    const hotspots = res.data.hotspots
                    if(hotspots.length > 0){
                      // console.log(hotspots)
                      for(let i=0; i<hotspots.length; i++){
                        console.log(hotspots[i])
                        const button = document.createElement('button')
                        button.classList.add('hotspot')
                        button.setAttribute('slot', hotspots[i].slot)
                        button.setAttribute('data-position', hotspots[i]["data-position"])
                        button.setAttribute('data-normal', hotspots[i]["data-normal"])
                        button.setAttribute('data-visibility-attribute', hotspots[i]["data-visibility-attribute"])
                        button.innerText = i+1
                        button.onclick = () =>{
                          Swal.fire(hotspots[i].text)
                        }
                        document.getElementById('player').append(button)
                        // button
                        // console.log(button)
                      }
                    }
                  })

                  if(e.target.classList.contains('bi-geo-alt')){
                    e.target.classList.remove('bi-geo-alt')
                    e.target.classList.add('bi-dash-circle')
                  }
              }else{
                const elements = document.getElementsByClassName('hotspot');
                while(elements.length > 0){
                  elements[0].parentNode.removeChild(elements[0]);
                }
                if(e.target.classList.contains('bi-dash-circle')){
                  e.target.classList.remove('bi-dash-circle')
                  e.target.classList.add('bi-geo-alt')
                }
              }
            }
            document.getElementById('player').append(showPoi)
          }
        })
      }
      
      document.querySelector("#player").addEventListener('ar-status', (event) => {
        if(event.detail.status === 'failed'){
          const error = document.querySelector("#error");
          error.classList.remove('hide');
          error.addEventListener('transitionend',(event) => {
            error.classList.add('hide');
          });
        }
      });

      this.setState({firstLoad:true})
    }
  }

  listenToModel = (e) =>{
    this.setState({loadingModel:true})
  }

  render() {
    return (
      <>
      {/* <button onClick={(e)=>{
        console.log(this.props)
      }}>blah</button> */}
      {
        this.props.modele 
        ?<>
        
          <model-viewer 
            className="mx-auto w-100 mt-5" 
            alt="modèle 3D d'un squelle ou crane d'animal"
            id="player"
            src={this.props.modele} 
            ar 
            ar-scale="auto"
            ar-modes="webxr scene-viewer quick-look" 
            environment-image="./pillars_1k.hdr" 
            poster={this.props.poster ? this.props.poster : ""}
            seamless-poster 
            shadow-intensity="2" 
            exposure="0.85" 
            bounds="tight" 
            enable-pan 
            camera-controls
            autoplay
            reveal="interaction"
            onClick={this.listenToModel}
            >
            <div id="lazy-load-poster" slot="poster" style={{backgroundImage:this.props.poster ? this.props.poster : ""}}></div>
            <div id="button-load" slot="poster">Charger le modèle 3D</div>
          </model-viewer></>
        :""
      }
          </>          
    )
  }
}
