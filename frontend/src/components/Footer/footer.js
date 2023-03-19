import React from 'react';

const Footer = () => {
	return (
		<div id='footer'>
			<p className="text-uppercase link">© <a 
				className="text-dark"
				href='https://github.com/pixelRena/Clarifai-Model-Detection'
				style={{'textDecoration':'none'}}>
				pixelRena/@github</a> 
			<script>document.write(new Date().getFullYear())</script>
			</p>
		</div>
		);
}

export default Footer;
