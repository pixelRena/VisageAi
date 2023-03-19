// A popup alert
// Used to display errors or messages to user
import React from "react";
import './alertBox.css';

const AlertBox = ({children, displayAlert}) => {
	return(
		<div className='alertBox' style={{display: displayAlert ? "unset": "none"}}>
			<div>
				<span className='alert-text'>{children}</span>
			</div>
		</div>
	)
};

export default AlertBox;