import React, { useState, useEffect } from "react";

import axios from 'axios';

import "components/Application.scss";

import DayList from "components/DayList";
import Appointment from "./Appointments";
import { getAppointmentsForDay, getInterview, getInterviewersForDay} from "helpers/selectors";


//Application component

export default function Application(props) {
  // const [day, setDay] = useState('Monday');

  // const [days,setDays] = useState([]);

  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });

  //const dailyAppointments = [];
 
  const setDay = function(selectedDay){
    setState({...state, day: selectedDay});
  }
    
  
//useEffect
  useEffect(() => {

    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {
      //console.log("All------", all);
      setState(prev => ({...prev, days:all[0].data, appointments: all[1].data, interviewers: all[2].data }))
    })

  }, [])
  

  
   const appointments = getAppointmentsForDay(state, state.day)

   //bookInterview function

   function bookInterview(id, interview) {
    //checking if the id and interview are correct
    //console.log("id and interview", id, interview);
    //creating new appointment object
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    //updating new appointment's' object
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
  
    //PUT request to update the server with the new data
    
    return axios.put(`http://localhost:8001/api/appointments/${id}`, {interview})
    .then(() => setState({...state, appointments}));

  }

  //Cancel interview function

    function cancelInterview(id){
      console.log("id and interview for canceling", id);
      //setting the value for interview to null
      const appointment = {
        ...state.appointments[id],
        interview: null
      };
       //updating new appointment's' object
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    //Delete 
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
    .then(() => setState({...state, appointments}));

    }
  
  const schedule = appointments.map((appointment) => {
 
    const interview = getInterview(state,appointment.interview);

    const interviewers = getInterviewersForDay(state, state.day)
    //console.log("interviewers--------", interviewers)
    return (
      <Appointment 
        key={appointment.id} 
        id={appointment.id} 
        time={appointment.time} 
        interview={interview} 
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
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key='last' time='5pm'  />
      
      </section>
    </main>
  );
}
