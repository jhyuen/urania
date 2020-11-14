import React, { Component } from 'react';
import CommentPanel from '../elements/CommentPanel'
import SnippetText from '../elements/SnippetText.js';
import SnippetHeader from '../elements/SnippetHeader';
import CreatorControlPanel from '../elements/CreatorControlPanel';
import Swal from "sweetalert2";

class CreatorView extends Component {

	state = {
		snippet: {
			"snippetId": "loading snippet id...",
		 	"snippetText": "loading snippet text..",
		 	"snippetInfo": "loading snippet info...",
		 	"timeStamp": "loading timestamp...",
		 	"languageSelected": "loading language selected...",
		 	"viewerPassword": "loading viewer password...",
		 	"viewerPasswordStatus": "0",
			"list": "[]"
		},
		dataFetched: false,
		range: {
			start : {
				"row": null,
				"column": null
			},
			end: {
				"row": null,
				"column": null
			}
		},
		status: '',
		text: null
	}
	
	componentDidMount() {
		var patt = /\/[^/]*/i
		var result = window.location.pathname.match(patt)
		this.fetchSnippet(result[0])
	}

	getSelectionCallback = (newRange) => {
		this.setState({range: newRange})
	}
	
	getTextCallback = (newValue) => {
		this.setState({text: newValue})
	}

	updateCommentsCallback = (comments) => {
		this.setState({ snippet: { ...this.state.snippet, list: comments} });
	}

	fetchSnippet = async (path) => {
		var base_url = "https://e061bpd3ph.execute-api.us-east-2.amazonaws.com/beta";
	    var get_snippet_url = base_url + path + "/snippet"; 
		var data = await fetch(get_snippet_url)
		
		var snippetData = await data.json()
		//console.log(snippetData.viewerPasswordStatus)
		console.log(snippetData.viewerPassword)
		this.setState({ snippet: snippetData, dataFetched : true, status: snippetData.httpCode, text: snippetData.snippetText })
		console.log(this.state.snippet.list)
	}
	
	render() {
		if (this.state.dataFetched && this.state.status === 201) {
			return(
					<div className="app">
						<div className="snippetHeader">
							<SnippetHeader id={ this.state.snippet.snippetId } />
						</div>
						<div className="snippetText">
							<SnippetText id={this.state.snippet.snippetId}
										text={this.state.snippet.snippetText}
										comments={this.state.snippet.list}
										selectionCallback={this.getSelectionCallback}
										updTextCallback={this.getTextCallback}/>
						</div>
						<div className="commentPanel">
							<CommentPanel range={this.state.range}
                            			  id={this.state.snippet.snippetId}
										  comments={this.state.snippet.list}
                            			  commentCallback={this.updateCommentsCallback}
                                          text={this.state.text}
							/>
						</div>
						<div className="controlPanel">
							<CreatorControlPanel password_status={this.state.snippet.viewerPasswordEnabled}
                                   password={this.state.snippet.viewerPassword}
                                   id={this.state.snippet.snippetId} 
								   time={ this.state.snippet.timeStamp.epochSecond }
								   info={this.state.snippet.snippetInfo} />
						</div>
					</div>
			)
		} else if(!this.state.dataFetched) {
			return <h1>Loading...</h1>
		} else {
			Swal.fire({
                 title: 'Snippet not found',
                 padding: '3em',
                 icon: 'error',
                 background: '#fff url(https://t3.ftcdn.net/jpg/01/87/78/52/360_F_187785254_C2GnRn7UJDtngaw5LCY5rZRGf6YUZDsc.jpg)',
                 backdrop: ` rgba(0,0,123,0.4)
                             url("https://media1.thehungryjpeg.com/thumbs2/ori_3674132_r92n1p85dw7wvbdno6ihpnhy2kprdtgnlm613jmk_seamless-night-sky-stars-pattern-sketch-moon-space-planets-and-hand.jpg")
                             left top
                             repeat`,
                 showConfirmButton: false,
                 allowOutsideClick: false,
                 allowEscapeKey: false
            })
			return <></>
		}
		
	}
}

export default CreatorView;
