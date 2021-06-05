import React, { useEffect, useState } from 'react';
import { usePagination, useSortBy, useTable } from 'react-table';
import DisplayCustomers from './DisplayCustomers';

const Customer = () => {
    let [customers, setcustomers] = useState([]);
    let [toggler,setToggler]=useState(true);
    const[bidAmount,setbidAmount]=useState(0);
    useEffect(()=>{
        fetch(`https://intense-tor-76305.herokuapp.com/merchants`).then((res) => {
            if (res.status === 200) {
                console.log("customers details fetched");
                return res.json();
            }
        }).then((data) => {
            if (data) {
                console.log("data ", data)
                setcustomers(data)
            }
        })
        .catch((err) => {
            console.log("Error occured" + err)
        });

    },[]);
    let getData = ()=>{
        return customers.map(customer =>{
            let temp=Object.assign({},customer);
            let bids=temp.bids;
            temp.bid=0;
            temp.min=0;
            if(toggler===true)
            {
                bids.map(bidd=>(
                    temp.bid=Math.max(bidd.amount,temp.bid)
                ))
            }
            else
            {
                bids.map(bidd=>(
                    temp.bid=Math.min(bidd.amount,temp.bid)
                ))
            }

            return temp;
        })
    }

    const data=React.useMemo(()=>
    getData(),[customers]);

    const triggerToggle = () => {
        setToggler( !toggler );
    }

    const columns=React.useMemo(()=>[
        {
            Header:'Name',
            columns:[
                {
                    Header:'firstName',
                    accessor:'firstname'
                },
                {
                    Header:'lastName',
                    accessor:'lastname'
                },
                {
                    Header:'Avatar',
                    accessor:'avatarUrl'
                }
            ],
        },
        {    Header:"Customer Info",
            columns:[
                {
                    Header:'Email',
                    accessor:'email'
                },
                {
                    Header:'Phone',
                    accessor:'phone'
                }
            ]
        },
        {
            Header:'Bid Information',
            columns:[
                {
                    Header:'Max/Min Bid',
                    id:'bids',
                    accessor:'bid',
                    sortType:'alphanumeric'
                }
            ]
        }
    ],[]);
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
        <div className="container">
            <div className="row">
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
        </div>
    )
}

export default Customer;
