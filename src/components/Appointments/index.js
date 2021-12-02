import React from "react";
import './styles.scss'
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";


export default function Appointment(props){
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const {mode, transition, back } =useVisualMode(
    props.interview ? SHOW : EMPTY
  )
 //add save function
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id,interview)
  }

  return (

    <article className="appointment">
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE) } />}
      {mode === SHOW && (
       <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
       />
      )}
      {mode === CREATE && (
        <Form 
        student={props.student}
        interviewer={props.interviewer}
        interviewers = {props.interviewers}
        onCancel={back}
        onSave={save}        
        />
      )}
      


    </article>
  )
}