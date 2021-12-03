import React from "react";
import './styles.scss'
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";
import Error from "./Error";



export default function Appointment(props){
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";


  const {mode, transition, back } =useVisualMode(
    props.interview ? SHOW : EMPTY
  )
 //add save function
  function save(name, interviewer) {
    //condition to enter name or interviewer
    if(!name || !interviewer) {
      console.log("Name and interviewer required");
      return
    }
    const interview = {
      student: name,
      interviewer
    };
    //showing the saving indicator
    transition(SAVING)

    props.bookInterview(props.id,interview)
    //transition to SHOW
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true))
        
  }
  
  //add delete function
   function deleteInterview (){
    transition(DELETING, true)
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch((error) => transition(ERROR_DELETE, true))   
   }


  return (

    <article className="appointment">
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE) } />}
      {mode === SHOW && (
       <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete={() => transition(CONFIRM) }
        onEdit={() => transition(EDIT)}
       />
      )}
      {mode === CREATE && (
        <Form 
        // student={props.student}
        // interviewer={props.interviewer}
        interviewers = {props.interviewers}
        onCancel={back}
        onSave={save}        
        />
      )}
      
      {mode === SAVING && (
       <Status message="Saving"/>
       )}

       {mode === EDIT && (
          <Form 
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers = {props.interviewers}
          onCancel={() => transition(SHOW)}
          onSave={save}        
          />
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
       {mode === ERROR_DELETE && <Error message="Could not Delete the appointment" onClose={back}/>}
      {mode === ERROR_SAVE && <Error message="Could not add the appointment" onClose={back}/>}
       


    </article>
  )
}