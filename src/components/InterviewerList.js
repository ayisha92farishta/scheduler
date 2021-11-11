import React from "react";
import InterviewerListItem from "./InterviewerListItem"
import "./InterviewerList.scss"
import classNames from "classnames";

export default function InterviewerList (props) {
  console.log(props)
  console.log(props.interviewers)
  return (
   <section className="interviewers">
     <h4 className="interviewers__header">Interviewer</h4>  
     <ul className="interviewers__list"> 
    {props.interviewers.map(value => {
          return (
              <InterviewerListItem
                key={value.id}
                name={value.name}
                avatar={value.avatar}
                selected= {value.id === props.interviewer}
                setInterviewer={() => props.onChange(value.id)}
              />
          )})
    }
    </ul>
   </section>
  )}
 