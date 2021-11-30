import React from "react";
import InterviewerListItem from "./InterviewerListItem"
import "./InterviewerList.scss"
import classNames from "classnames";

export default function InterviewerList (props) {
  
  return (
   <section className="interviewers">
     <h4 className="interviewers__header">Interviewer</h4>  
     <ul className="interviewers__list"> 
    {props.interviewers.map(interviewer => {
          return (
              <InterviewerListItem
                key={interviewer.id}
                name={interviewer.name}
                avatar={interviewer.avatar}
                selected= {interviewer.id === props.value}
                setInterviewer={() => props.onChange(interviewer.id)}
              />
          )})
    }
    </ul>
   </section>
  )}
 