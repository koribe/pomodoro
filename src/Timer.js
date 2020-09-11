import React, { useState, useEffect } from 'react';
import Ring from "./bell.mp3";
import { Helmet } from 'react-helmet';

const Timer = () => {
  const [seconds, setSeconds] = useState(1500);
  const [toggleRunning,setToggleRunning]=useState(false);
  const [isWorkTime,setIsWorkTime]=useState(false);

const toggle=()=>{
setToggleRunning(!toggleRunning);
}

const reset=()=>{
  setSeconds(work25);
  setIsWorkTime(false);
  setToggleRunning(false);
}

const work25=1500;
const rest5=300;

//Hang lejátszása,ha a számláló 0 lesz
const ring = new Audio(Ring);
if(seconds===0){
  ring.play();
  setToggleRunning(false);
  setIsWorkTime(!isWorkTime);
  if(!isWorkTime) setSeconds(rest5);
  else setSeconds(work25);
}

//A másodperceket percekre és másodpercekre alakítjuk.
const timeCalc=(time,place)=>{
  let min=Math.floor(time / 60);
  let sec=time-min*60;

  if(min===0)min="00"
  else if(min<10)min="0"+min;
  if(sec===0)sec="00"
  else if(sec<10)sec="0"+sec;
  
  if(place==="timer") return <div><span>{min}</span>:<span>{sec}</span></div>;
  else if(place==="tab") return `${min}:${sec}`;
}

//Ha áll a számláló a start gomb látszik, ha fut, akkor a pause
let button="Start";
    if(!toggleRunning){
        button="Start";
    }else {button="Pause"}

useEffect(() => {
    if (seconds===0 || toggleRunning===false) return;
    const interval = setInterval(() => {
      setSeconds(seconds =>seconds - 1);
    }, 1000);
    return () => clearInterval(interval);
  },[seconds,toggleRunning]);

  return (
    <div className="timer">
        <Helmet>
        <title>{timeCalc(seconds,"tab")}</title>
        </Helmet>
      <div className="timerplate">
      <header className="timer-header">
        {timeCalc(seconds,"timer")}
        </header>
        <div className="timer-buttons">
        <button onClick={toggle}  type="button">{button}</button>
        {seconds<work25 &&
        <button onClick={reset}  type="button">Reset</button>}
        </div>
        </div>
    </div>
  );
};

export default Timer;