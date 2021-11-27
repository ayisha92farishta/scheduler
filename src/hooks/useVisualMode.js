import { useState } from "react";


export default function useVisualMode(initial){
  const [mode, setMode] = useState(initial);
  //adding history to store previous states 
  const [history, setHistory] = useState([initial])
  //transition function
  function transition(newMode) {
    setMode(newMode)
    //add new mode to the history array
    setHistory(()=> {

     history.push(newMode);
     return history
    });
  }
  //Back function
  function back() {
    //removes last mode from the history array
    history.pop();
    //checks if the array is empty
    if (history.length < 1) return;
    //if not, sets the mode to the previous mode from the history array
    setMode(history[history.length-1])
  }

  return {mode, transition,back }
};