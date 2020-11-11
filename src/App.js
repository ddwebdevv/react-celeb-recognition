import React, { Component } from 'react';
import Clarifai from 'clarifai';
import Logo from './components/Logo/Logo';
import ErrorMess from './components/ErrorMess/ErrorMess';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Particles from 'react-particles-js';
import './App.css';

const app = new Clarifai.App({
    // apiKey: 'YOUR_API_KEY' 
    apiKey: '779905e99d8b4c4a9c724186a7429ce8'
});
    //settings for Particles
const particlesOptions = {
    particles: {
        number: {
            value: 105,
            density: {
                enable: true,
                value_area: 800 
            }
        }
    }
}

class App extends Component {
    constructor() {
        super();
        this.state = {
            input: '',
            imageUrl: '',
            faces: [],
            errMess: ''
        }
    }
        //calculating coordinates for face boxes and extracting names of celebrities
    calculateFaces = (data) => {
        const image = document.getElementById('inputimage');
        const width = Number(image.width);
        const height = Number(image.height);
        const clarifaiFaces = data.outputs[0].data.regions.map(face => {
            const  clarifaiFace = face.region_info.bounding_box;
            console.log(face.region_info.bounding_box.bottom_row, height, face.region_info.bounding_box.bottom_row*height);
            return {
                    leftCol: clarifaiFace.left_col*width,
                    topRow: clarifaiFace.top_row*height,
                    rightCol: width - (clarifaiFace.right_col*width),
                    bottomRow: height - (clarifaiFace.bottom_row*height),
                    name: face.data.concepts[0].name
                }            
        });
        return clarifaiFaces;
    }
        //changing state and passing faces info to render face boxes
    displayFaceBox =(faces) => {
        this.setState({ faces: faces });
    }
        
    onInputChange = (event) => {
        this.setState({ input: event.target.value});
    } 

    errorHandler = (err) => {
        console.log(err);
        this.setState({ errMess: err });
    }
        //fetching data using Clarifai API. 
    onButtonSubmit = () => {
        this.setState({ imageUrl: this.state.input,
                        faces: [],          //set state to init values
                        errMess: ''}); 
        app.models.predict(
                Clarifai.CELEBRITY_MODEL,
                this.state.input)
            .then((response) => this.displayFaceBox(this.calculateFaces(response)))
            .catch(err => this.errorHandler((err)));
    }

    render() {
        return (
        <div className="App">
            <Particles className='particles' params={particlesOptions} />
            <Logo />
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />            
            <ErrorMess errMess={this.state.errMess} />
            <FaceRecognition faces={this.state.faces} imageUrl={this.state.imageUrl} /> 
        </div>
        );
    }
}

export default App;
