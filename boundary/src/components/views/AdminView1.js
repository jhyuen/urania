import React, { Component } from 'react';
import AdminTable from '../elements/AdminTable.js';
import './AdminView1.css';

import makeData from './makeData'

// get data
const serverData = makeData(10000)

/*const serverData = async () => {
	var get_snippets_url = "https://e061bpd3ph.execute-api.us-east-2.amazonaws.com/beta/snippetList"; 
	var data = await fetch(get_snippets_url)
	var snippetData = await data.json()
	//console.log(snippetData.viewerPasswordStatus)
	console.log(snippetData.list)
	return snippetData.list
}*/

/*function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth]
    return range(len).map(d => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      }
    })
  }

  return makeDataLevel()
}*/


function AdminView1() {
  	

	const columns = React.useMemo(
    () => [
			{
				Header	: 'SnippetID',
				accessor: 'snippetID',
			},
			{
				Header	: 'Date Created',
				accessor: 'viewerPassword',		// TODO: change to 'timeStamp'
			},
			{
				Header	: 'Days Old',
				accessor: 'daysold',
			},
			{
				Header	: 'Delete',
				accessor: 'delete',
			}
        ]
  )

	// We'll start our table without any data
	const [data, setData] 			= React.useState([])
	const [loading, setLoading] 	= React.useState(false)
	const [pageCount, setPageCount] = React.useState(0)
	const fetchIdRef 				= React.useRef(0)
  
	// this will get called when the table needs new data
	const fetchData = React.useCallback(({ pageSize, pageIndex }) => {

	    // give this fetch an ID
	    const fetchId = ++fetchIdRef.current
	
	    // set the loading state
	    setLoading(true)
	    
		// Only update the data if this is the latest fetch
		if (fetchId === fetchIdRef.current) {
		  const startRow = pageSize * pageIndex
		  const endRow = startRow + pageSize

		  setData(serverData.slice(startRow, endRow))
		
		  // Your server could send back total page count.
		  // For now we'll just fake it, too
		  setPageCount(Math.ceil(serverData.length / pageSize))
		
		  setLoading(false)
		}
		
  }, [])

  return (
	<div>
		<h1>Admin View</h1> 
		<AdminTable
	        columns		= { columns }
	        data		= { data }
	        fetchData	= { fetchData }
	        loading		= { loading }
	        pageCount	= { pageCount }
	      />
	</div>
  )
}

export default AdminView1;

class AdminView2 extends Component {
	state = {
		data: []
		
	
	}

	componentDidMount() { this.fetchAllSnippets() }

	fetchAllSnippets = async () => {
		var get_snippets_url = "https://e061bpd3ph.execute-api.us-east-2.amazonaws.com/beta/snippetList"; 
		var data = await fetch(get_snippets_url)
		var snippetData = await data.json()
		//console.log(snippetData.viewerPasswordStatus)
		console.log(snippetData.list)
		this.setState({ data: snippetData.list })
	}
	
	render() {
		const columns = React.useMemo(
		    () => [
					{
						Header	: 'SnippetID',
						accessor: 'snippetID',
					},
					{
						Header	: 'Date Created',
						accessor: 'viewerPassword',		// TODO: change to 'timeStamp'
					},
					{
						Header	: 'Days Old',
						accessor: 'daysold',
					},
					{
						Header	: 'Delete',
						accessor: 'delete',
					}
		        ]
		  )
		
		const [data, setData] 			= React.useState([])
		const [loading, setLoading] 	= React.useState(false)
		const [pageCount, setPageCount] = React.useState(0)
		const fetchIdRef 				= React.useRef(0)
		
		
		return (
			<div>
				<h1>Admin View</h1> 
				<AdminTable
			        columns		= { columns }
			        data		= { data }
			        fetchData	= { fetchData }
			        loading		= { loading }
			        pageCount	= { pageCount }
			      />
			</div>
		)
	}
}

export default AdminView2;


