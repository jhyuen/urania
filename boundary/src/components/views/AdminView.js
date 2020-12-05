import React, { Component } from 'react';
import AdminTable from '../elements/AdminTable.js';
import Button from 'react-bootstrap/Button';
import Delete from '@material-ui/icons/DeleteForeverOutlined';
import Form from 'react-bootstrap/Form';
import Swal from "sweetalert2";

class AdminView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data			: [],
      dataSource	: [],
      filter    	: '',
      loading		: true,
      pageCount		: 0,
      fetchIdRef	: 0,
    }
    this.handleDelete = this.handleDelete.bind(this);
  }

	componentDidMount() { this.fetchAllSnippets() }

	fetchAllSnippets = async () => {
		var get_snippets_url = "https://e061bpd3ph.execute-api.us-east-2.amazonaws.com/beta/snippetList"; 
		var data = await fetch(get_snippets_url)
		var snippetData = await data.json()
		this.setState({ data: snippetData.list,
                    dataSource: snippetData.list.filter(snippet =>
                                snippet.snippetID.includes(this.state.filter)),
                    			//dataSource: snippetData.list,
                    loading: false  })
	}
	
	deleteStaleSnippets = async() => {
		Swal.fire({
		        title: 'Days Old',
		        input: 'text',
				inputPlaceholder: 'Enter a number >= 0',
		        padding: '3em',
		        background: '#fff url(https://sweetalert2.github.io/images/trees.png)',
		        inputAttributes: {
		           autocapitalize: 'off'
		        },
		        showCancelButton: true,
		        confirmButtonText: 'Delete',
		        showLoaderOnConfirm: true,	
		        preConfirm: async (daysOld) => {
		          		daysOld = parseFloat(daysOld)
						if(daysOld >= 0 ) {
							var base_url = "https://e061bpd3ph.execute-api.us-east-2.amazonaws.com/beta/";
							var update_url = base_url + "/delete_stale_snippets";
			    			await fetch(update_url, {
							  method: 'POST',
							  body: JSON.stringify({daysOld: daysOld}),
							  headers: {
								  'Accept': 'application/json',
								  'Content-Type': 'application/json'
							  }
							
						}).catch(error => {
						    console.log("error", error);
						    alert("An error occured, please try again later.");
						});
						this.fetchAllSnippets();
						} else {
							Swal.showValidationMessage(`Incorrect input`)
						}
		        },
		        allowOutsideClick: () => !Swal.isLoading()
		    })
	}

  handleDelete = async (snippetID) => {
	var base_url = "https://e061bpd3ph.execute-api.us-east-2.amazonaws.com/beta/";
	var update_url = base_url + snippetID + "/delete_snippet";
	await fetch(update_url, {
		  method: 'POST',
		  //body: JSON.stringify({enable: val}),
		  //headers: {
			  //'Accept': 'application/json',
			  //'Content-Type': 'application/json'
		  //}
	  }).catch(error => {
	      console.log("error", error);
	      alert("An error occured, please try again later.");
	  });
    this.setState({ loading: true })
    this.fetchAllSnippets()
  }
	
	render() {
		const columns = [
					{
						Header	: 'Snippet ID',
						accessor: 'snippetID',
            			disableSortBy: true
					},
					{
						Header	: 'Snippet Info',
						accessor: 'snippetInfo',
						disableSortBy: true
					},
					
					{
						Header	: 'Date Created',
						accessor: (values) => {
			            	var tempSecond = values.timeStamp.epochSecond
			              	var d = new Date(0)
			              	d.setUTCSeconds(tempSecond)
							var options = { hour12: false };
			              	return d.toLocaleString('en-US', options)
			            },		
					},
					{
						Header	: 'Delete',
			            accessor: 'delete',
			            disableSortBy: true,
			            Cell: ({cell}) => (
							<Button className="deleteAdminButton" variant="danger" value={cell.row.values.name}
								onClick={() => {this.handleDelete(cell.row.values.snippetID)}}>
								<Delete/>
							</Button>
            			)
					}
		    ]
		
		return (
			<div>
				<h1>Administrator View</h1> 
		        <Form className='searchSnippetIdBar'>
		          <Form.Group>
		            <Form.Control
		              type='text'
		              onChange={(e) => {
		                this.setState( { filter: e.target.value,
		                                 dataSource: this.state.data.filter(snippet =>
		                                   snippet.snippetID.includes(e.target.value)) } )
		              }}
		              placeholder={'Search for Snippet ID...'}
		            />
		          </Form.Group>
		        </Form>
				<AdminTable
				    deleteStaleSnippets = {this.deleteStaleSnippets}
					columns				= { columns }
				    data				= { this.state.dataSource }
				    loading				= { this.state.loading }
				    pageCount			= { this.state.pageCount }
				/>
			</div>
		)
	}
}

export default AdminView;
