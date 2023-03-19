import React, {Component} from 'react';
import './App.css';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/faceRecognition';
import Footer from './components/Footer/footer';
import AlertBox from './components/Alert/alertBox';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navigation from "./components/Navigation/navigation";

const initialState = {
		input: '',
		displayAlert: false,
		alertMessage: '',
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
		fetch('/imageurl', {
			method: 'POST',
			headers: {'Content-Type':'application/json'},
			body: JSON.stringify({input: this.state.input})
		})
		.then(res => {
			if(res.status === 500) {
				throw new Error("Clarifai is down");
			} else if (res.status === 400) {
				return res.json().then(error => {
					throw new Error(error);
				});
			}
			return res.json();
		})
		.then(res => this.displayFaceBox(this.calculateFaceLocation(res)))
		.catch(err => {
			this.setState({displayAlert: true});
			// Displays alert message based on conditions met
			if(!this.state.input.length)  {
				this.setState({
					alertMessage: "Before we can detect faces for you. You must provide a URL to an image"
				});
			} else {
				this.setState({
					alertMessage: err.message
				});
			}

			// Resets alert display and message back to default state
			setTimeout(() => {
				this.setState({
					displayAlert: false,
					alertMessage: ""
				});
			}, 3000);
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
		const { imageUrl, box, displayAlert } = this.state;
		return (
			<Container className="d-flex flex-column justify-content-around align-items-center justify-content-center center text-center min-vh-100"
			>
				<Navigation/>
				<Row className="row-container shadow d-flex bg-white p-5 h-md-75 w-100">
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
				<Footer/>
				<AlertBox displayAlert={displayAlert}>{this.state.alertMessage}</AlertBox>
			</Container>
		);
	}
}

export default App;
