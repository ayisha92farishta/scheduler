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

    history.pop();

    if (history.length < 1) return;
        
    setMode(history[history.length-1])
  }

  return {mode, transition,back }
};