import { useEffect, useState } from "react";

function useTimer(intervalRef,time,setTime,setCurQuestion,curQuestion,questions,setIsSubmitted,setSkippedQuestions,correctQuestions,setCorrectQuestions,setWrongQuestions,setCurMarks,setPendingSubmit) {
     const [minutes,setMinutes]=useState(0);
  const [seconds,setSeconds]=useState(0)
  
    useEffect(function(){
      
const remainingMinutes=time%3600000000;
const currentMinutes=Math.floor(remainingMinutes/60000000);
const remainingSeconds=remainingMinutes%60000000;
const currentSeconds=Math.floor(remainingSeconds/1000000);
setMinutes(currentMinutes);
setSeconds(currentSeconds);
//Handling the situation when the time becomes zero and user doesn't click the answer
// if(time===0 && curQuestion <questions.length-1){
//   setCurQuestion(q=>q+1);
//   setTime(30000000)
//   setPendingSubmit(true);
//   }
//   if(time===0 && curQuestion ===questions.length-1 ){
//     console.log('Heo')
// setPendingSubmit(true);
//   }

  },[setPendingSubmit,setCorrectQuestions,correctQuestions,time,setCurQuestion,setTime,curQuestion,questions?.length,setIsSubmitted,setSkippedQuestions,intervalRef,setCurMarks,setWrongQuestions])
  
  //function to handleTime
  function handleTimer(){
    if(intervalRef.current){
      console.log(time);
        clearInterval(intervalRef.current);
        setTime(30000000)
    }
    intervalRef.current=setInterval(()=>{
     
      setTime(t=>t-1000000)},1000);
    if(curQuestion===0){
       console.log(intervalRef.current);
      setTime(30000000)
    }
  }
  return {minutes,seconds,handleTimer}
}

export default useTimer
