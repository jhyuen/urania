import React, { Component } from 'react';
import { useTable, usePagination } from 'react-table';
    

class AdminView extends Component {
	state = {data: []}

	componentDidMount() {
		this.fetchAllSnippets()
	}

	fetchAllSnippets = async () => {
		var get_snippets_url = "https://e061bpd3ph.execute-api.us-east-2.amazonaws.com/beta/snippetList"; 
		var data = await fetch(get_snippets_url)
		
		var snippetData = await data.json()
		//console.log(snippetData.viewerPasswordStatus)
		console.log(snippetData.list)
		this.setState({ data: snippetData.list })
	}

	render() {
    const columns = [
      {
        Header: "SnippetID",
        accessor: "snippetID"
      },
      // Current made to be viewerPassword but need to change to 'timeStamp'
      {
        Header: "Date Created",
        accessor: "viewerPassword"
      },
      //{
        //Header: "Days Old",
        //accessor: "daysold"
      //},
      //{
        //Header: "Delete Button",
        //accessor: "delete"
      //}
    ];

    const Table = ({ columns, data }) => {
      const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        getRowProps,
        prepareRow,
        page,
        pageOptions,
        state: { pageIndex, pageSize },
        previousPage,
        nextPage,
        canPreviousPage,
        canNextPage,
      } = useTable (
        {
          columns,
          data,
          initialState: { pageSize: 20 },
        },
        usePagination,
      )
      return (
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      )
    }

		return(
      <div>
        <h1>Admin View</h1>
        <Table
          columns={columns}
          data={this.state.data}
        />
      {/** Not sure how to get these props from the table
        <div>
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            Previous Page
          </button>
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            Next Page
          </button>
          <div>
            Page{' '}
            <em>
              {pageIndex + 1} of {pageOptions.length}
            </em>
          </div>
        </div>**/}
      </div>
		)
	}
}

export default AdminView;
