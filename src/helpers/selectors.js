export function getAppointmentsForDay(state, day) {  
  const found = state.days.find(d => day === d.name);  
  if (state.days.length === 0 || found === undefined) return [];
  return found.appointments.map(id => state.appointments[id]);
  
}

export function getInterview(state, interview) {   
  // returns null if no interview is booked   
  if (!interview) return null;
  return {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer],
  }; 
}