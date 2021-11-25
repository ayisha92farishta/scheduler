import { useState } from "react";


export default function useVisualMode(initial){
  const [mode, setMode] = useState(initial);
  //adding history to store previous states 
  const [history, setHistory] = useState([initial])
  //transition function
  function transition(newMode) {
    setMode(newMode)
    
    setHistory([...prev, newMode])     
  }
  
  //Back function
  function back(currentMode) {

    const newArr = history.find((mode) => mode === currentMode);

    setHistory(newArr)

    setMode(history)
  }

  return {mode, transition,back }
}