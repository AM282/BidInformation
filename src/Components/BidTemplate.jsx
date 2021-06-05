import React from 'react';

const BidTemplate = (props) => {
    return (
        <tr>
            <td>{props.carTitle}</td>
            <td>{props.amount}</td>
        </tr>
    );
}

export default BidTemplate;
