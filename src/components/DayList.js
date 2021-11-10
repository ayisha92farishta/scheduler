import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const day = props.days.map(d => {
    return (    
      <ul> 
      <DayListItem
        key={d.id}
        name={d.name} 
        spots={d.spots} 
        selected={d.name === props.day}
        setDay={props.setDay}
      />
      </ul>     
    );
  });
  return day;
};