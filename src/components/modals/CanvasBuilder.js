import axios from 'axios'
import React, { Component } from 'react'

export default class CanvasBuilder extends Component {
    state={
        json:null,
        loading:true,
        poi:[]
    }

    componentDidMount(){
        
            axios.get(this.props.json)
                .then((res)=>{
                    console.log(res.data)
                    this.setState({poi:res.data && res.data.patches ? res.data.patches : []})
                })
                .catch(err=>console.log(err))
        
        this.setState({json: this.props.json ? this.props.json : null, loading:false})
    }

    buildCanvas = () =>{
        console.log(this.state.json)
        const {poi} = this.state

        const canvas = document.createElement('canvas')
        canvas.style.width = "500px"
        canvas.style.height = "500px"
        canvas.id = "canvas"
        document.getElementById('canvasHolder').append(canvas)

        const context = document.getElementById('canvas').getContext('2D')

        console.log(context)
        const img = new Image()

        // img.onload = (e) =>{
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(img, 0, 0, canvas.width, canvas.height);
        
            poi.map((patch, id)=>{
                const poly = patch.polys
                
                poly.map((pol, id)=>{
                    let cRgb = id>0 ? this.hexToRgb(patch.color) : ""
                    if(id > 0){
                        this.drawPoly(pol, cRgb)
                    }
                })
            })

            canvas.onmousemove = (e) =>{
                e.preventDefault()
                let bb = canvas.getBoundingClientRect();
                this.handleMouseMove(e, bb, img, context, canvas);
            }
        // }

        // return img
        console.log('plop')
        
    }

    handleMouseMove = (e, bb, img, context, canvas) =>{
        e.preventDefault();
        e.stopPropagation();

        let offsetX = bb.left
        let offsetY = bb.top
        let mouseX=parseInt(e.clientX-offsetX);
        let mouseY=parseInt(e.clientY-offsetY);
        const {poi} = this.state

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0, canvas.width, canvas.height);

        for(let i = 0; i < poi.length; i++){
            const c = this.hexToRgb(poi[i].color)
            let polys = poi[i].polys

            for(let j = 1; j<polys.length; j++){
                this.drawPoly(polys[j])
                if(context.isPointInPath(mouseX, mouseY)){
                    canvas.style.cursor = "pointer"
                    context.fillStyle = "rgba("+c.r+","+c.g+","+c.b+",0.8)";
                    context.fill();
                }else{
                    context.fillStyle = "rgba("+c.r+","+c.g+","+c.b+",0.25)";
                    context.fill();                                                                     
                }
            }
        }
    }

    drawPoly = (points, c) =>{
        this.context.beginPath();
        this.context.moveTo(points[0][0]*this.scale, points[0][1]*this.scale)

        for(let i = 1; i< points.length; i++){
            this.context.lineTo(points[i][0]*this.scale, points[i][1]*this.scale)
            
        }
        if(c && c!= null){
            this.context.fillStyle = "rgba("+c.r+","+c.g+","+c.b+", 0.25)"
            this.context.fill();
        }
        this.context.lineWidth = 0.1
        this.context.closePath();
        this.context.stroke();
    }

    hexToRgb=(hex)=>{
        let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function(m, r, g, b) {
            return r + r + g + g + b + b;
        });
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

  render() {
      const {loading, json, poi} = this.state
      if(loading){
          return(
              <>Chargement en cours</>
          )
      }
    return (
      <>
        <div className='mb-5' id="canvasHolder">
          <button onClick={(e)=>this.buildCanvas()} className="mb-5">{this.state.json}</button>

        </div>
      </>
    )
  }
}
