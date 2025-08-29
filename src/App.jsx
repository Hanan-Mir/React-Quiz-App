import {  useReducer, useRef, useState } from "react"
import Home from "./components/Home"
import Question from "./components/Question"
import UserName from "./components/UserName"
import Summary from "./components/Summary";
import Loader from "./components/Loader";
const initialState = { question: null, correctAnswer: null, options: [],answers:[] };
function shuffleOptions(optionsArray){
    for (let i=optionsArray.length-1;i>0;i--){
        const j=Math.floor(Math.random()*(i+1));
        [optionsArray[i],optionsArray[j]]=[optionsArray[j],optionsArray[i]]
    }
    return optionsArray;
}
function reducer(state, action) {
  switch (action.type) {
    case "setQuestion":
      return {
        ...state,
        question: action.payLoad?.question,
        correctAnswer: action.payLoad?.correct_answer,
        options:shuffleOptions([
          ...action.payLoad.incorrect_answers,
          action.payLoad?.correct_answer,
         
        ])
      };
     case 'setData':
        return {
            ...state,
            answers:Array.from({length:action.payLoad.length},()=>{
               return {selected:null,
                isCorrect:null}
            })
        } 
    case "checkAnswer":{
        const {answerClicked,curQuestion,correctAnswer}=action.payLoad
        const isCorrect=answerClicked===correctAnswer;
        const newAnswers=[...state.answers];
        newAnswers[curQuestion]={selected:answerClicked,isCorrect:isCorrect,curPoint:isCorrect?action.correctPoint:action.wrongPoint}
       return {...state,answers:newAnswers}
    }
      

  }
}

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
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <>
   {!userName && <Home intervalRef={intervalRef}userName={userName} setUserName={setUserName} time={time} setTime={setTime} />}
    {userName && !isSubmitted && <>
    <UserName userName={userName} />
    <Question correctQuestions={correctQuestions} intervalRef={intervalRef} time={time} setTime={setTime} questions={questions} setQuestions={setQuestions} curMarks={curMarks} setCurMarks={setCurMarks}  setIsSubmitted={setIsSubmitted} setCorrectQuestions={setCorrectQuestions} setSkippedQuestions={setSkippedQuestions} setWrongQuestions={setWrongQuestions} state={state} dispatch={dispatch} />
    </>
    }
    {
      isSubmitted && <Summary intervalRef={intervalRef} time={time} setTime={setTime} setIsSubmitted={setIsSubmitted} setQuestions={setQuestions} userName={userName} setUserName={setUserName} curMarks={curMarks} questions={questions} correctQuestions={correctQuestions} skippedQuestions={skippedQuestions} wrongQuestions={wrongQuestions} setWrongQuestions={setWrongQuestions} setCorrectQuestions={setCorrectQuestions} setSkippedQuestions={setSkippedQuestions} />
    }
  
    </>
  )
}

export default App
