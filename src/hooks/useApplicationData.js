import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(){


  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });

 console.log("day---", state.day)
 console.log("days---", state.days)
  const setDay = function(selectedDay){
    setState({...state, day: selectedDay});
  }
    
  
  //useEffect
  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers'),
    ]).then((all) => {
      console.log("Spots------", all[0].data[0].spots);
      setState(prev => ({...prev, days:all[0].data, appointments: all[1].data, interviewers: all[2].data }))
    })

  }, [])


     //bookInterview function
     function bookInterview(id, interview) {
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
      const newDays = [];
      for(let day of state.days){
        if(day.name === state.day){
          newDays.push({...day, spots:day.spots-1});
        }else{
          newDays.push({...day});
        }
      }

      //PUT request to update the server with the new data    
      return axios.put(`http://localhost:8001/api/appointments/${id}`, {interview})
      .then(() => setState({...state, appointments, days:newDays }));
    }

    //Cancel interview function

    function cancelInterview(id){
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
    
    const newDays = [];
    for(let day of state.days){
      if(day.name === state.day){
        newDays.push({...day, spots:day.spots+1});
      }else{
        newDays.push({...day});
      }
    }

    //Delete request to update the server with the new data
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
    .then(() => setState({...state, appointments, days:newDays}));
    }

  return {state, setDay, bookInterview, cancelInterview}
}