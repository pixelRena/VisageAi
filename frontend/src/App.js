import React, {Component} from 'react';
import './App.css';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/faceRecognition';
import SignIn from './components/SignIn/signIn';
import Register from './components/Register/register';
import Profile from './components/Profile/profile';
import Footer from './components/Footer/footer';
import {alertMe} from './components/Alert/alertBox';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const initialState = {
		input: '',
		imageUrl: '',
		box: [],
		route: 'home',
		isSignedIn: false,
		user: {
			id:'',
			email: '',
			name: '',
			entries: 0,
			joined: ''
		}
}

class App extends Component {
	constructor() {
		super();
		this.state = initialState;
	}

	// Load users information when data given
	loadUser = (user) => {
		this.setState({
			user: {
				id: user.id,
				email: user.email,
				name: user.name,
				entries: user.entries,
				joined: user.joined
		}})
	}

	// Calculate faces of picture given
	calculateFaceLocation = (data) => {
	 const clarifaiFaceEach = data.outputs[0].data.regions;
	 const image = document.getElementById('input-image');
	 const width = Number(image.width);
	 const height = Number(image.height);
	 // Based off of how many faces were found is how many times mapped
	 // set the values accordingly to get the measurements
	 const each_box = clarifaiFaceEach.map((area) => {
			 return ({
				leftCol: area.region_info.bounding_box.left_col * width,
				topRow: area.region_info.bounding_box.top_row * height,
				rightCol: width - (area.region_info.bounding_box.right_col * width),
				bottomRow: height - (area.region_info.bounding_box.bottom_row * height),
			})
	 })
	 return each_box;
	}

	// set box measurements from calculateFaceLocation
	displayFaceBox = (box) => {
		this.setState({box: box})
	}

	// listen for URLs typed into the input field
	onInputChange = (event) => {
		this.setState({input: event.target.value});
	}

	onImageSubmit = () => {
		// send the information gathered from the calculation and the input
		this.setState({imageUrl: this.state.input})
		fetch('http://localhost:3001/imageurl', {
			method: 'POST',
			headers: {'Content-Type':'application/json'},
			body: JSON.stringify({input: this.state.input})
		})
		.then(res => res.json())
		.then(res => {
			this.displayFaceBox(this.calculateFaceLocation(res)
		)})
		.catch(err => {
			if(!this.state.input.length)  return alertMe('Before we can detect faces for you. You must provide a URL to an image.')
			console.log(err)
		})
	}

	// Updates route based on loadUser and buttons clicked 
	onRouteChange = (route) => {
		if(route === 'signout') {
			this.setState(initialState)
		} else if(route === 'home') {
			this.setState({isSignedIn: true}) 
		} else if(route === 'profile') {
			this.setState({isSignedIn: true}) 
		} else {
			this.setState({isSignedIn: false}) 
		}

		return this.setState({route: route});
	}

	render() {
		// Return render based on if the user is signed in and/or going to a different route
		const {isSignedIn, imageUrl, route, box } = this.state;
		return (
				<Container className="d-flex align-items-center justify-content-center center text-center"
				style={{height:"100vh"}}>
				<Row className="shadow d-flex bg-white p-5 h-75 w-100">
					<Col className="bg-secondary bg-opacity-25">
						<FaceRecognition box={box} imageUrl={imageUrl}/>
					</Col>
					<Col sm="1">
						<div className="vr h-100"></div>
					</Col>
					<Col>
						<ImageLinkForm onInputChange={this.onInputChange} onImageSubmit={this.onImageSubmit}/>
					</Col>
				</Row>
				<div className='alertBox' style={{display:'none'}}>
					<div>
						<span className='alert-text'></span>
					</div>
				</div>
			</Container>
		);
	}
}

export default App;
