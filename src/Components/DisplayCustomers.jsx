import React, {useState} from 'react';


const DisplayCustomers = (props) => {
    let fullname=`${props.firstName} ${props.lastName}`
    let hasPremium=`${props.hasPremium}`;
    let bids=props.bid;
    let maxbid=bids.length!==0?Math.max.apply(Math, bids.map(function(bid) { return bid.amount; })):0;
    let minbid=bids.length!==0?Math.min.apply(Math,bids.map(function(bid){return bid.amount;})):0;

    return (
        
            <tr>
                <td>{fullname}<img src={`${props.avatarUrl}`} alt="Avatar"></img></td>
                <td>{props.email}</td>
                <td>{props.phone}</td>
                <td>{hasPremium}</td>
                <td>{maxbid}</td>
                
            </tr>

    );
}

export default DisplayCustomers;
