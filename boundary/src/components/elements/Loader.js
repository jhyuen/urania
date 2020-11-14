import React, { Component } from 'react';
import '../../App.css';
class Loader extends Component {
	
	render() {
		return (
<div class="primary">
<div class="content">
   <div class="planet">
      <div class="ring"></div>
         <div class="cover-ring"></div>
      <div class="spots">
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
