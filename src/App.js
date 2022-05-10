import React, { Component } from 'react'
import Footer from './components/Footer'
import Header from './components/Header'
import Liste from './components/Liste'
import './App.css';
import { toHaveDisplayValue } from '@testing-library/jest-dom/dist/matchers';

export default class App extends Component {
  state={
    night:false,
  }

  componentDidMount = () =>{
    if(localStorage.getItem('night')){
      this.setState({night:true})
    }

    if(this.state.night){
      document.body.classList.add('night')
    }else{
      if(document.body.classList.contains('night')){
        document.body.classList.remove('night')
      }
    }
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.night !== this.state.night){
      if(this.state.night){
        document.body.classList.add('night')
      }else{
        if(document.body.classList.contains('night')){
          document.body.classList.remove('night')
        }
      }
    }
  }

  render() {
    const {night} = this.state
    const darkMode = () => {
      this.setState({night:!this.state.night})
      if(localStorage.getItem('night')){
        localStorage.removeItem('night')
      }else{
        localStorage.setItem('night', true)
      }
    }
    return (
      <>
        <Header night={night} onclick={darkMode} />
          <Liste night={night} />
        <Footer />
      </>
    )
  }
}

