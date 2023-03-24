
import {FaStar} from "react-icons/fa";
import React,{useState} from "react";

const Star = ({ selected = false, onSelect = f => f }) => {
    return (
      <FaStar
        color={selected ? "red" : "gray"}
        onClick={onSelect}
      />
    );
  };
  

export default function StarRating({totalStars=5}){
    const [selectedStars,setSelectedStar] = useState(0);
    return (
        <>
            {[...Array(totalStars)].map((n,i)=> (
                <Star
                    key={i}
                    selected={selectedStars>i}
                    onSelect={()=>setSelectedStar(i+1)}
                />
            ))}
            <p>
                {selectedStars}of{totalStars}stars
            </p>
        </>
    );
}

