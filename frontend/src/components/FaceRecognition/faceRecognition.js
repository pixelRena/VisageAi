import React from 'react';
import './faceRecognition.css';

const faceRecognition = ({ box, imageUrl }) => {
	return (
			<div id="bounding-container">
				<img id='input-image' src={imageUrl} style={{width: "100%"}} alt=""/>
				{
					// Loops the boxes found and will bind them to a face of the image
					box.map((boxArea,i) => {
						return (
							<div
								className='bounding-box'
								key={i}
								// loop the boxes found and give them their respective values
								// style will then form a box with the values given from clarafai api
								style={{
									top: box[i].topRow,
									right: box[i].rightCol,
									left: box[i].leftCol,
									bottom: box[i].bottomRow}}
							>
							</div>
						);
					})
				}
			</div>
			
		);
}

export default faceRecognition;