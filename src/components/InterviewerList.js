import React from "react";
import PropTypes from 'prop-types';
import InterviewerListItem from "./InterviewerListItem";
import "./InterviewerList.scss";

function InterviewerList (props) {
  
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

//Adding prop-types to check if the output is an array
  InterviewerList.propTypes = {
    interviewers: PropTypes.array.isRequired
  };
  
  export default InterviewerList