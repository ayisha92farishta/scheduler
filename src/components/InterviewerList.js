import React from "react";
import InterviewerListItem from "./InterviewerListItem"
import "./InterviewerList.scss"

export default function InterviewerList (props) {
  const oneInterviewer = props.interviewers.map(i => {
    return (
        <InterviewerListItem
          id={i.id}
          name={i.name}
          avatar={i.avatar}
          selected={props.selected}
          setInterviewer={props.setInterviewer}
        />
    )
  });
  return oneInterviewer;
  // return (
  //   <section className="interviewers">
  //     <h4 className="interviewers__header text--light">Interviewer</h4>
  //     <ul className="interviewers__list"></ul>
  //   </section>
  // )
}