import React, { useEffect, useState } from 'react';
import { useTable } from 'react-table';
import DisplayCustomers from './DisplayCustomers';

const Customer = () => {
    let [customers, setcustomers] = useState([]);
    let [toggler,settoggler]=useState(true);
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
                    accessor:'bid'
                }
            ]
        }
    ],[]);
    const{
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    }=useTable({columns,data});
    return (
        <div className="container">
            <div className="row">
                <table className="table table-bordered">
                    <caption style={{captionSide: "top"}}>Customers List</caption>
                    
                    <thead>
                        {headerGroups.map(headerGroup=>(
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column=>(
                                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                ))}
                            </tr>
                        ))}
                        {/* <tr>

                            <th scope="col">
                                Customer Name
                            </th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Premium</th>
                            <th scope="col">
                                Max/Min Bid
                            </th>
                        </tr> */}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map(row=>{
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
                        {/* {customers.map((customer) => (
                            <DisplayCustomers
                                key={customer.id}
                                id={customer.id}
                                firstName={customer.firstname}
                                lastName={customer.lastname}
                                avatarUrl={customer.avatarUrl}
                                email={customer.email}
                                phone={customer.phone}
                                hasPremium={customer.hasPremium}
                                bid={customer.bids}
                            />
                        ))} */}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Customer;
