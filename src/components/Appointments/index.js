import React from "react";
import './styles.scss'
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";



export default function Appointment(props){
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING"


  const {mode, transition, back } =useVisualMode(
    props.interview ? SHOW : EMPTY
  )
 //add save function
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    //showing the saving indicator
    transition(SAVING)

    props.bookInterview(props.id,interview)
      .then(() => {
      transition(SHOW)
    }).catch(error => {
      console.log("Error while saving", error)
    })
    //transition to SHOW    
  }
  
  //add delete function
   function deleteInterview (){
    transition(DELETING)
    props.cancelInterview(props.id)
    .then(() => {
      transition(EMPTY)
    }).catch((error) => {console.log("Error while deleting", error)} )
   
   }


  return (

    <article className="appointment">
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE) } />}
      {mode === SHOW && (
       <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete={() => transition(CONFIRM) }
        //onEdit
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
      
      {mode === SAVING && (
       <Status message="Saving"/>
       )}
       
       {mode === DELETING && (
       <Status message="Deleting"/>
       )}
       
       {mode === CONFIRM && (
         <Confirm 
         message="Delete the appointment?"
         onConfirm={deleteInterview}
         onCancel={back}
         />
       )}


    </article>
  )
}