import React, {useState} from 'react';
import { usePagination, useSortBy, useTable } from 'react-table';


const DisplayCustomers = ({ columns, data }) => {
 
    const{
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        getRowProps,
        page,
        pageOptions,
        state:{pageIndex,pageSize},
        previousPage,
        nextPage,
        canPreviousPage,
        canNextPage
    }=useTable(
        {
            columns,
            data,
            initialState:{pageSize:5},
        },
        useSortBy,
        usePagination
        );
    return (
                <div className='row'>
                        <table className="table table-bordered">
                    <caption style={{captionSide: "top"}}>Customers List</caption>
                    
                    <thead>
                        {headerGroups.map(headerGroup=>(
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column=>(
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        {column.render('Header')}
                                        <span>
                                            {column.isSorted?(column.isSortedDesc?'d':'a'):''}
                                        </span>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                            {page.map(row=>{
                                prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell=>{
                                        return <td {...cell.getCellProps()}>
                                            {cell.render('Cell')}
                                        </td>
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <div>
                    <button onClick={()=>previousPage()} disabled={!canPreviousPage}>Previous Page</button>
                    <button onClick={()=>nextPage()} disabled={!canNextPage}>Next Page</button>
                    <div>
                        Page{' '}
                        <em>
                            {pageIndex+1} of {pageOptions.length}
                        </em>
                    </div>
                </div>
            </div>

    );
}

export default DisplayCustomers;
