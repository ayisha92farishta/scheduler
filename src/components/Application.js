import React from "react";

import "components/Application.scss";

import DayList from "components/DayList";
import Appointment from "./Appointments";
import { getAppointmentsForDay, getInterview, getInterviewersForDay} from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";


//Application component

export default function Application(props) {

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();
  
  
  const interviewers = getInterviewersForDay(state, state.day)
  
  const appointments = getAppointmentsForDay(state, state.day).map((appointment) => {
    
    return (
      <Appointment 
        key={appointment.id} 
        id={appointment.id} 
        time={appointment.time} 
        interview={getInterview(state,appointment.interview)} 
        interviewers = {interviewers}
        bookInterview = {bookInterview}
        cancelInterview={cancelInterview}
      />
    )
  })

  return (
    <main className="layout">
      <section className="sidebar">
      <img className='sidebar--centered'src='images/logo.png'alt='Interview Scheduler'/>
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
            spots={state.spots}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
        <section className="schedule">
          <section className="schedule">
            {appointments}
            <Appointment key='last' time='5pm' />      
          </section>
        </section> 
    </main>
  );
}
