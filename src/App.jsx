import {  useRef, useState } from "react"
import Home from "./components/Home"
import Question from "./components/Question"
import UserName from "./components/UserName"
import Summary from "./components/Summary";
import Loader from "./components/Loader";

function App() {
  const [userName,setUserName]=useState('');
  const [questions,setQuestions]=useState();
  const [curMarks,setCurMarks]=useState(0);
  const [correctQuestions,setCorrectQuestions]=useState(0);
  const [skippedQuestions,setSkippedQuestions]=useState(0);
  const [wrongQuestions,setWrongQuestions]=useState(0);
  const [isSubmitted,setIsSubmitted]=useState(false);
  const [time,setTime]=useState(30000000)
  const intervalRef=useRef(null);
  
  return (
    <>
   {!userName && <Home intervalRef={intervalRef}userName={userName} setUserName={setUserName} time={time} setTime={setTime} />}
    {userName && !isSubmitted && <>
    <UserName userName={userName} />
    <Question correctQuestions={correctQuestions} intervalRef={intervalRef} time={time} setTime={setTime} questions={questions} setQuestions={setQuestions} curMarks={curMarks} setCurMarks={setCurMarks}  setIsSubmitted={setIsSubmitted} setCorrectQuestions={setCorrectQuestions} setSkippedQuestions={setSkippedQuestions} setWrongQuestions={setWrongQuestions} />
    </>
    }
    {
      isSubmitted && <Summary intervalRef={intervalRef} time={time} setTime={setTime} setIsSubmitted={setIsSubmitted} setQuestions={setQuestions} userName={userName} setUserName={setUserName} curMarks={curMarks} questions={questions} correctQuestions={correctQuestions} skippedQuestions={skippedQuestions} wrongQuestions={wrongQuestions} setWrongQuestions={setWrongQuestions} setCorrectQuestions={setCorrectQuestions} setSkippedQuestions={setSkippedQuestions} />
    }
  
    </>
  )
}

export default App
