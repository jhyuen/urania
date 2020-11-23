import React, { Component } from 'react';
import AdminTable from '../elements/AdminTable.js';
import Button from 'react-bootstrap/Button';
import Delete from '@material-ui/icons/DeleteForeverOutlined';
import Form from 'react-bootstrap/Form';

class AdminView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data			: [],
      dataSource: [],
      filter    : '',
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
		//console.log(snippetData.viewerPasswordStatus)
		console.log(snippetData.list)
    console.log(this.state.filter)
		this.setState({ data: snippetData.list,
                    dataSource: snippetData.list.filter(snippet =>
                                snippet.snippetID.includes(this.state.filter)),
                    //dataSource: snippetData.list,
                    loading: false  })
	}
  
  handleDelete = async (snippetID) => {
	  var base_url = "https://e061bpd3ph.execute-api.us-east-2.amazonaws.com/beta/";
	  var update_url = base_url + snippetID + "/delete_snippet";
    console.log(snippetID)
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
    console.log('delete')
    this.setState({ loading: true })
    this.fetchAllSnippets()
  }
	
	render() {
		const columns = [
					{
						Header	: 'SnippetID',
						accessor: 'snippetID',
            disableSortBy: true,
					},
					{
						Header	: 'Date Created',
						accessor: (values) => {
			            	var tempSecond = values.timeStamp.epochSecond
			              	var d = new Date(0)
			              	d.setUTCSeconds(tempSecond)
			              	return d.toLocaleString()
			            },		
					},
					{
						Header	: 'Days Old',
						accessor: 'daysold',
					},
					{
						Header	: 'Delete',
            accessor: 'delete',
            disableSortBy: true,
            Cell: ({cell}) => (
							<Button className="deleteButton" variant="danger" value={cell.row.values.name}
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
				    columns		= { columns }
				    data		= { this.state.dataSource }
				    loading		= { this.state.loading }
				    pageCount	= { this.state.pageCount }
				/>
			</div>
		)
	}
}

export default AdminView;
