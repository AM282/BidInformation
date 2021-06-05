import React, { useEffect, useState } from 'react';
import { usePagination, useSortBy, useTable } from 'react-table';
import BidColumn from './BidColumn';
import CustomerProfile from './CustomerProfile';
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
    let getData=()=>{
        return customers.map(customer=>{
            var temp=Object.assign({},customer);
            temp.bid=0;
            let bids=temp.bids;
            let max=0,min=0;
            console.log(bids);
            bids.map((bid)=>{
                min=Math.min(min,bid.amount);
                max=Math.max(max,bid.amount);
            })
            if(toggler===true)
            {
                temp.bid=max;
            }
            else
                temp.bid=min;
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
            Header:'Unique ID',
            columns:[
                {
                    Header:'ID',
                    accessor:'id',
                    Cell: ({ cell: { value } }) => {
                        return (
                            <a href={`/customer/${value}`}>{`${value}`}</a>
                        );
                    }

                }

            ]
        },
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
                    accessor:'avatarUrl',
                    Cell: ({ cell: { value } }) => {
                        return (
                          <>
                          <img src={`${value}`}/>
                          </>
                        );
                    }
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
                    accessor:'bid',
                    sortType:'alphanumeric'
                }
            ]
        }
    ],[]);
    return (
        <div className="container">
                <DisplayCustomers columns={columns} data={data}/>
        </div>
    );
}

export default Customer;
