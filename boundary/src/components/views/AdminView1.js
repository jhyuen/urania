import React, { Component } from 'react';
import AdminTable from '../elements/AdminTable.js';
import './AdminView1.css';
//import { SelectColumnFilter } from './filters';

class AdminView1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      pageCount: 0,
      fetchIdRef: 0,
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
		this.setState({ data: snippetData.list,
                    loading: false  })
	}
  
  handleDelete = async (snippetID) => {
	  var base_url = "https://e061bpd3ph.execute-api.us-east-2.amazonaws.com/beta/";
	  var update_url = base_url + snippetID + "/delete_snippet";
    console.log(snippetID)
    fetch(update_url, {
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
            },		// TODO: change to 'timeStamp'
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
              <button value={cell.row.values.name} onClick={() => {this.handleDelete(cell.row.values.snippetID)}}>Delete</button>
            )
					}
		    ]
		
		/*const [data, setData] 			= React.useState([])
		const [loading, setLoading] 	= React.useState(false)
		const [pageCount, setPageCount] = React.useState(0)
		const fetchIdRef 				= React.useRef(0)*/
		
		
		return (
			<div>
				<h1>Admin View</h1> 
				<AdminTable
			        columns		= { columns }
			        data		= { this.state.data }
			        //fetchData	= { fetchData }
			        loading		= { this.state.loading }
			        pageCount	= { this.state.pageCount }
			      />
			</div>
		)
	}
}

export default AdminView1;


