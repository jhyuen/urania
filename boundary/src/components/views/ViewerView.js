import React, { Component } from 'react';
import CommentPanel from '../elements/CommentPanel'
import SnippetText from '../elements/SnippetText.js';
import SnippetHeader from '../elements/SnippetHeader';
import ViewerControlPanel from '../elements/ViewerControlPanel';
import Swal from "sweetalert2";

class ViewerView extends Component {
	
	state = {
		snippet: {
			"snippetId": "loading snippet id...",
	 		"snippetText": "loading snippet text..",		 		
	 		"snippetInfo": "loading snippet info...",
		 	"timeStamp": "loading timestamp...",
		 	"languageSelected": "loading language selected...",
		 	"viewerPassword": "loading viewer password...",
		 	"viewerPasswordStatus": "0",
			"list": [],
		},
		dataFetched: false,
		status: '',
		passwordStatus: '',
		password: '',
		checked: false
	}
	
	updSnippetIdCallback = (id) => {
		this.setState({snippetId : id});
	}
	
  getSelectionCallback = (newRange) => {
    this.setState({range: newRange})
    console.log(this.state.range)
  }

	componentDidMount() {
		var patt = /\/[^/]*/i
		var result = window.location.pathname.match(patt)
		this.fetchSnippet(result[0])
	}
	
	fetchSnippet = async (path) => {
		var base_url = "https://e061bpd3ph.execute-api.us-east-2.amazonaws.com/beta";
	    var get_snippet_url = base_url + path + "/snippet"; 
		var data = await fetch(get_snippet_url)
		
		var snippetData = await data.json()
		console.log(snippetData.viewerPasswordEnabled)
		console.log(snippetData)
		this.setState({ snippet: snippetData, dataFetched : true, status: snippetData.httpCode, passwordStatus: snippetData.viewerPasswordEnabled, password: snippetData.viewerPassword  })
	}

	render() {
		const contents = <div className="app">
							<div className="snippetHeader">
								<SnippetHeader time={ this.state.snippet.timeStamp.epochSecond } id={ this.state.snippet.snippetId } />
							</div>
							<div className="snippetText">
								<SnippetText id={this.state.snippet.snippetId}
				                             text={this.state.snippet.snippetText}
				                             comments={this.state.snippet.list}
				                             selectionCallback={this.getSelectionCallback}/>
							</div>
							<div className="commentPanel">
								<CommentPanel id={ this.state.snippet.snippetId }
												comments={this.state.snippet.list}/>
								}
							</div>
							<div className="controlPanel">
								<ViewerControlPanel 
									updSnippetIdCallback={ this.updSnippetIdCallback }
									time={ this.state.snippet.timeStamp.epochSecond }
									info={ this.state.snippet.snippetInfo }/>
							</div>
				         </div>
		if (this.state.dataFetched && this.state.status == 201 && (!this.state.passwordStatus || this.state.checked)) {
			return <div>{contents}</div>
		} else if(!this.state.dataFetched){
			return <h1>Loading...</h1>
		} else if(this.state.dataFetched && this.state.status == 201 && this.state.passwordStatus && !this.state.checked){
			Swal.fire({
                 title: 'Submit Password',
                 icon: 'info',
                 input: 'text',
                 background: '#fff url(https://sweetalert2.github.io/images/trees.png)',
                 backdrop: ` rgba(0,0,123,0.4)
                             url("https://media1.thehungryjpeg.com/thumbs2/ori_3674132_r92n1p85dw7wvbdno6ihpnhy2kprdtgnlm613jmk_seamless-night-sky-stars-pattern-sketch-moon-space-planets-and-hand.jpg")
                             left top
                             repeat`,
                 html: 'This snippet is <i>password protected.</i>',
                 inputAttributes: {
                     autocapitalize: 'off'
                 },
                 confirmButtonText: 'Enter Snippet',
                 showLoaderOnConfirm: true,
                 preConfirm: (password) => {
	                 if(password !== this.state.password) {
		                 Swal.showValidationMessage(
                             `Incorrect Password. Try Again.`
                         )
	                 } else {
		                 this.setState({ checked: true })                                                 	                 
	                 }          
                 },
                 allowOutsideClick: false,
                 allowEscapeKey: false
            })
            return <h1></h1>
		} else {
			Swal.fire({
                 title: 'Snippet not found',
                 icon: 'error',
                 padding: '3em',
                 background: '#fff url(https://t3.ftcdn.net/jpg/01/87/78/52/360_F_187785254_C2GnRn7UJDtngaw5LCY5rZRGf6YUZDsc.jpg)',
                 backdrop: ` rgba(0,0,123,0.4)
                             url("https://media1.thehungryjpeg.com/thumbs2/ori_3674132_r92n1p85dw7wvbdno6ihpnhy2kprdtgnlm613jmk_seamless-night-sky-stars-pattern-sketch-moon-space-planets-and-hand.jpg")
                             left top
                             repeat`,
                 showConfirmButton: false,
                 allowOutsideClick: false,
                 allowEscapeKey: false
            })
		    return <h1></h1>
		}
	}
}

export default ViewerView;
