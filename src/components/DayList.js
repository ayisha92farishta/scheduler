import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const day = props.days.map(d => {
    return (    
      <ul key={d.id}> 
      <DayListItem        
        name={d.name} 
        spots={d.spots} 
        selected={d.name === props.value}
        setDay={props.onChange}
      />      
      </ul>     
    );
  });
  return day;
};