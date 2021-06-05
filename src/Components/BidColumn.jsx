
import React, { useEffect, useState } from 'react';

const BidColumn = ({values}) => {
    let maxbid=values.length!==0?Math.max.apply(Math, values.map(function(bid) { return bid.amount; })):0;
    let minbid=values.length!==0?Math.min.apply(Math,values.map(function(bid){return bid.amount;})):0;
    const[bidAmount,setbidAmount]=useState(maxbid);
    const [toggle, setToggle] = useState(false);
    const triggerToggle = () => {
        if(toggle)
            setbidAmount(maxbid);
        else
           setbidAmount(minbid);
        setToggle( !toggle )
        console.log(bidAmount);
    }
        return (
            <>
                    <span>
                        {bidAmount} <i className={`fas ${toggle ? 'fa-angle-up' : 'fa-angle-down'}`} onClick={triggerToggle}></i>
                    </span>
            </>
          );
}

export default BidColumn;
