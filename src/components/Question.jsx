import { useEffect, useReducer, useRef, useState } from "react";
import ProgressBar from "./ProgressBar";
import Loader from "./Loader";
import useTimer from "../customHooks/useTimer";
//function to shuffle the options
function shuffleOptions(optionsArray){
    for (let i=optionsArray.length-1;i>0;i--){
        const j=Math.floor(Math.random()*(i+1));
        [optionsArray[i],optionsArray[j]]=[optionsArray[j],optionsArray[i]]
    }
    return optionsArray;
}

const initialState = { question: null, correctAnswer: null, options: [],answers:[] };

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
function Question({intervalRef,time,setTime, questions, setQuestions,curMarks,setCurMarks,setIsSubmitted,setWrongQuestions,setSkippedQuestions,setCorrectQuestions,correctQuestions }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isLoading, setIsLoading] = useState(true);
  const [curQuestion, setCurQuestion] = useState(0);
  const {minutes,seconds,handleTimer}=useTimer(intervalRef,time,setTime,setCurQuestion,curQuestion,questions,setIsSubmitted,setSkippedQuestions,curMarks,setCurMarks,correctQuestions,setCorrectQuestions,state);
 
  //fetch data from the API

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(
          `https://opentdb.com/api.php?amount=10&category=18&type=multiple`
        );
        if (!response.ok) throw new Error(response);
        const result = await response.json();
        if (result && result.results) {
          setQuestions(result.results);
          dispatch({type:'setData',payLoad:result.results})
        }
      } catch (error) {
        throw new Error(error);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [setQuestions]);
  //effect to set the questions
  useEffect(function(){
    if(questions?.length>0){
        dispatch({type:'setQuestion',payLoad:questions[curQuestion]})
    }
  },[questions?.length,curQuestion,questions])
  
  
//if data is loading
  if (isLoading) {
    return <Loader />
  }
  //function for loading the nextquestion
  function handleNextQuestion() {
    if(curQuestion<questions.length-1){
      
        setCurQuestion((cur)=>cur+1)
    }
     handleTimer();
   console.log(curQuestion,questions.length)
     if(curQuestion===questions.length-1 || time===0){
        console.log(curMarks);
      state.answers.forEach((el)=>{
        if(el.curPoint){
          setCurMarks((curM)=>curM+el.curPoint)
          // setIsSubmitted(true)
        }
        if(el.selected && el.isCorrect){
          setCorrectQuestions(c=>c+1)
        }
        if(el.selected && !el.isCorrect){
          setWrongQuestions(w=>w+1)
        }
        if(!el.selected){
          setSkippedQuestions(s=>Number(s)+1)
        }
      })
      setIsSubmitted(true)
     }
  }
  
  //function for loading the previousquestion
  // function handlePreviousQuestion() {
  //   if(curQuestion>0){
  //       setCurQuestion(cur=>cur-1)
  //   }
  // }
  //function to check answer
  function handleCheckAnswer(answerClicked) {
    if(state.answers[curQuestion]?.selected) return
    dispatch({
      type: "checkAnswer",
      payLoad: {answerClicked,curQuestion,correctAnswer:state.correctAnswer},
      correctPoint:1,
      wrongPoint:-0.25
    });
   setTimeout(()=>{setCurQuestion((cur)=>cur+1)},1000)
    handleTimer();
    console.log(curQuestion,questions.length)
    if(curQuestion===questions.length-1 && time===0){
      console.log(curMarks);
state.answers.forEach((el)=>{
        if(el.curPoint){
          setCurMarks((curM)=>curM+el.curPoint)
          // setIsSubmitted(true)
        }
        if(el.selected && el.isCorrect){
          setCorrectQuestions(c=>c+1)
        }
        if(el.selected && !el.isCorrect){
          setWrongQuestions(w=>w+1)
        }
        if(!el.selected){
          setSkippedQuestions(s=>Number(s)+1)
        }
      })
      setIsSubmitted(true);
    }
  }
const currentAnswer=state.answers[curQuestion];
const hasAttempted=currentAnswer?.selected!==null;

  return (
    <div className=" h-[70vh] flex flex-col items-center justify-center ">
      <div className="w-[60%] p-10 bg-gray-950 rounded-2xl">
        <div>
          <ProgressBar
            currentQuestionIndex={curQuestion + 1}
            totalQuestion={questions?.length}
          />
          <div className="flex items-center justify-between mt-6">
            <h2 className="text-1xl text-amber-50">
              Question {curQuestion + 1} of {questions?.length}
            </h2>
            <span className="bg-blue-600 px-3 py-1 rounded-full">{String(minutes).padStart(2,'0')}:{String(seconds).padStart(2,'0')}</span>
          </div>
          <h2 className="text-3xl mb-4 text-white">{state.question}</h2>
        </div>
        <ul>
          {state.options.map((el) => {
            return (
              <li
                key={el}
                onClick={() => handleCheckAnswer(el)}
                className={`${hasAttempted?el===state.correctAnswer?'bg-green-800 text-white transition-all duration-200 ease-in translate-x-5':currentAnswer?.selected===el?'bg-red-600':'bg-violet-500':'bg-gray-700'} w-full  py-3 px-3 rounded-lg text-2xl mb-1 hover:bg-gray-300 hover:text-black`}
              >
                {el}
              </li>
            );
          })}
        </ul>
        <div className="items-center flex justify-between mt-[1rem]">
          <div></div>
          {/* {curQuestion >= 1 && (
            <button
              className="border-1 px-2 py-1 rounded-full hover:bg-white"
              onClick={() => handlePreviousQuestion()}
            >
              Previous
            </button>
          )} */}
         {!hasAttempted && <button
            className="border-1 bg-indigo-500 transition-all ease-in duration-300 px-5 py-1 rounded-full hover:bg-white"
            onClick={() => handleNextQuestion()}
          >
            {curQuestion === questions?.length - 1 ? "Submit" : "Skip"}
          </button>}
        </div>
      </div>
    </div>
  );
}

export default Question;
