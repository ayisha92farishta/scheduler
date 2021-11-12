import React from "react";
import './styles.scss'
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";

export default function Appointment(props){
  return (
    <article className="appointment">
     {props.time ?  props.time : "No Appointments"} 
     {props.interview ? <Show student={props.student} interviewer={props.interviewer} /> : <Empty />}
    </article>
  )
}