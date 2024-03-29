import React, { useState } from "react";

import InterviewerList from "../InterviewerList";
import "../InterviewerList.scss"
import Button from "../Button";


export default function Form (props) {

  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");
  
  const reset = function () {
    setStudent("");
    setInterviewer(null);

  }

  const cancel =  function (){
     reset();
     props.onCancel(student, interviewer)    
  }

  //function to not submit if no name is entered
  function validate() {
    
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }


    setError("")
    props.onSave(student, interviewer);    
  }

  return(
    <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form autoComplete="off" onSubmit={event => event.preventDefault()}>
        <input
          className="appointment__create-input text--semi-bold"
          name="name"
          type="text"
          //controlled component
          value={student}
          onChange={(event) => setStudent(event.target.value)}
          placeholder="Enter Student Name"
          data-testid="student-name-input"
        />

        <section className="appointment__validation">{error}</section>

        <InterviewerList         
          interviewers={props.interviewers}            
          value={interviewer}   
          onChange={setInterviewer} 
        />
       </form>
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button danger onClick={cancel}  >Cancel</Button>
      <Button confirm onClick={validate} disabled= {interviewer? false:true} >Save</Button>
      </section>
    </section>
  </main>
  )
}