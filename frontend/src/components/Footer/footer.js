import React from 'react';
import "./footer.css";

const Footer = () => {
	return (
		<div id='footer'>
			<p className="text-uppercase link">© <a 
				className="text-dark"
				target="_blank"
				href='https://github.com/pixelRena/Clarifai-Model-Detection'
				style={{'textDecoration':'none'}}>
				pixelRena/@github</a> 
			<script>document.write(new Date().getFullYear())</script>
			</p>
		</div>
		);
}

export default Footer;
