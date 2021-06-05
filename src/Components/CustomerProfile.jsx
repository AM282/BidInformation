import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BidTemplate from './BidTemplate';
const CustomerProfile = () => {
    let { id } = useParams();
    let [customer ,setCustomer] = useState({});
    let [bids,setBids]=useState([]);
    useEffect(()=> {
        fetch(`https://intense-tor-76305.herokuapp.com/merchants/${id}`).then((res) => {
            if (res.status === 200) {
                console.log("customer details fetch");
                return res.json();
            }
        }).then((data) => {
            if (data) {
                console.log(data);
                setCustomer({...data});
                setBids(data.bids);

            }
        })
        .catch((err) => {
            console.log("Error occured" + err)
        })
    } , []);
    function getFullName(firstName,lastName)
    {
        return firstName+" "+lastName;
    }
    return (
        <>
        <div class="container">
            <div class="row p-4">
                <div className="d-flex justify-content- align-items-center flex-wrap">
                    <img src={customer.avatarUrl} alt="" width="200" height="200" className="rounded-circle mr-4" />
                    <div>
                        <h2>{getFullName(customer.firstname,customer.lastname)}</h2>
                    </div>
                </div>                        
            </div>
            <br/> 
            
          
            <div class="row mx-lg-2 mx-md-2 mr-2">
                <div class="p-1 table-responsive">
                    <div class="pl-2 pt-3 pb-2 bg-primary text-light">
                        <h5>More Details</h5>
                    </div>
                    <table class="bg-light table-shadow table table-borderless">
                        <tr>
                            <th>Full Name:</th>
                            <td>
                               {getFullName(customer.firstname,customer.lastname)}
                            </td>
                        </tr>
                        <tr>
                            <th>Email:</th>
                            <td>
                                {customer.email}
                            </td>
                        </tr>
                        <tr>
                            <th>Phone:</th>
                            <td>
                                {customer.phone}
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="row mx-lg-2 mx-md-2 mr-2">
                    <div class="p-1 table-responsive">
                        <div class="pl-2 pt-3 pb-2 bg-primary text-light">
                            <h5>Bidding Details</h5>
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Car Title</th>
                                    <th scope="col">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                            {    bids.length>0?
                                bids.map((bid)=>(
                                    <BidTemplate
                                        key={bid.id}
                                        carTitle={bid.carTitle}
                                        amount={bid.amount}
                                    />
                                )):<div><p>No bidding till now....</p></div>
                            }
                            </tbody>

                        </table>
                </div>
            </div>

    </div>
    </>
    );
}

export default CustomerProfile;
