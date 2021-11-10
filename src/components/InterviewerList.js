import React from "react";
import DayListItem from "./DayListItem";
import '/InterviewerList.scss'

export default function InterviewerList (props) {
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list"></ul>
    </section>
  )
}