import React from 'react';
import { useTable, usePagination } from 'react-table'

import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

import FirstPage from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPage from '@material-ui/icons/LastPage';

// fetchData - a method to fetch new data when pagination state changes
// we can also add a loading state to let our table know it's loading new data
function AdminTable({ columns, data, fetchData, loading, pageCount: controlledPageCount }) 
{
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize }			// get the state from the instance
  } = useTable ({
      columns,
      data,
      initialState: { pageIndex: 0 },
      manualPagination: true, 				// tell usePagination that we will handle our own data fetching.
      										// this means we'll also have to provide our own pageCount.
      pageCount: controlledPageCount,
    },
    usePagination
  )

  // listen for changes in pagination and use the state to fetch our new data
  React.useEffect(() => { fetchData({ pageIndex, pageSize }) }, [fetchData, pageIndex, pageSize])

  // render the UI for your table
  return (
    <>
		<table {...getTableProps()} className="adminTable">
			<thead className="tableHead">
				{headerGroups.map(headerGroup => (
					<tr {...headerGroup.getHeaderGroupProps()} >
					    {headerGroup.headers.map(column => (
							<th {...column.getHeaderProps()} >
					            {column.render('Header')}
					            <span>{column.isSorted ? column.isSortedDesc ? 'v' : '^' : ''}</span>
							</th>
					    ))}
					</tr>
				))}
	        </thead>

	        <tbody {...getTableBodyProps()} className="tableBody">
				{page.map((row, i) => {
					prepareRow(row)
					return (
						<tr {...row.getRowProps()}>
							{row.cells.map(cell => {
								return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
							})}
						</tr>
					)
				})}
				<tr>
					{loading ? (<td colSpan="10000">Loading...</td>) : 	// use custom loading state to show a loading indicator
					(<td colSpan="10000">Showing {page.length} of {controlledPageCount * pageSize} results</td>)}
				</tr>
	        </tbody>
      </table>

      <div className="pagination">
		<Button className='btnFirstPage' variant="dark" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
			<FirstPage/>
		</Button>
		
		<Button className='btnPrevPage' variant="dark" onClick={() => previousPage()} disabled={!canPreviousPage}>
			<KeyboardArrowLeft/>
		</Button>
		
		<Button className='btnNextPage' variant="dark" onClick={() => nextPage()} disabled={!canNextPage}>
			<KeyboardArrowRight/>
		</Button>
		
		<Button className='btnLastPage' variant="dark" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
			<LastPage/>
		</Button>

		<Badge className='pagesBadge' variant="primary">
			Page{' '}
			{pageIndex + 1} of {pageOptions.length}
		</Badge>

		<Badge className='goToBadge' variant="primary">
          Go to page:{' '}
          <input className='goToInput' type="number" defaultValue={pageIndex + 1}
            onChange={ e => {const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page) }}
          />
		</Badge>

        <select className='recordsPerPage' value={pageSize} onChange={ e => {setPageSize(Number(e.target.value))} }>
			{[10, 20, 30, 40, 50].map(pageSize => (
			<option key={pageSize} value={pageSize}>
			  Show {pageSize}
			</option>
			))}
		</select>
      </div>
    </>
  )
}

export default AdminTable;
