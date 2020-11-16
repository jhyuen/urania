import React, { Component } from 'react';
import '../../App.css';
class Loader extends Component {
	
	render() {
		return (
<div className="primary">
<div className="content">
   <div className="planet">
      <div className="ring"></div>
         <div className="cover-ring"></div>
      <div className="spots">
         <span></span>
         <span></span>
         <span></span>
         <span></span>
         <span></span>
         <span></span>
         <span></span>

      </div>
   </div>
   <p id='lText'>Loading...</p>
</div>
</div>
		);
	}
}

export default Loader;
