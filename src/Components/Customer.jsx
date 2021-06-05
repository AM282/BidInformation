import React, { useEffect, useState } from 'react';
import DisplayCustomers from './DisplayCustomers';

const Customer = () => {
    let [customers, setcustomers] = useState([]);
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
    return (
        <div className="container">
            <div className="row">
                <table className="table table-bordered">
                    <caption style={{captionSide: "top"}}>Customers List</caption>
                    
                    <thead>
                        <tr>

                            <th scope="col">
                                Customer Name
                            </th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Premium</th>
                            <th scope="col">
                                Max/Min Bid
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer) => (
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
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Customer;
