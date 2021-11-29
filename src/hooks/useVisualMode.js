import { useState } from "react";


export default function useVisualMode(initial){
  //Removed the mode and set mode states and saving the initial directly inside the history state
   //const [mode, setMode] = useState(initial);
   //adding history to store previous states 
   const [history, setHistory] = useState([initial])
   //transition function
   function transition(newMode, replace = false) {
    
     //add new mode to the history array if replace is true, else replace the last mode in the history array
     setHistory((prev)=> replace ? [...prev.slice(0,-1),newMode]:[...prev,newMode]
     );
   }
   //Back function
   function back() {
     //if history length is mode than 1 then delete a mode from the history array, else return the current state of the mode
     setHistory((prev) => (prev.length>1) ? prev.slice(0,-1): prev)
   }
 
   return {mode:history[history.length-1], transition,back }
 };




// export default function useVisualMode(initial){
//   const [mode, setMode] = useState(initial);
//   //adding history to store previous states 
//   const [history, setHistory] = useState([initial])
//   //transition function
//   function transition(newMode, replace = false) {
//     setMode(newMode)
//     //add new mode to the history array
//     setHistory((prev)=> replace ? [...prev.slice(0,-1),newMode]:[...prev,newMode]
//      //history.push(newMode);
//      //return history
//     );
//   }
//   //Back function
//   function back() {
//     //removes last mode from the history array
//     history.pop();
//     //checks if the array is empty
//     if (history.length < 1) return;
//     //if not, sets the mode to the previous mode from the history array
//     setMode(history[history.length-1])
//   }

//   return {mode, transition,back }
// };