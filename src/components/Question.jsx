import { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import Loader from "./Loader";
import useTimer from "../customHooks/useTimer";




function Question({intervalRef,time,setTime, questions, setQuestions,curMarks,setCurMarks,setIsSubmitted,setWrongQuestions,setSkippedQuestions,setCorrectQuestions,correctQuestions,state,dispatch }) {
  
  const [isLoading, setIsLoading] = useState(true);
  const [pendingSubmit,setPendingSubmit]=useState(false);
  const [curQuestion, setCurQuestion] = useState(0);
  const {minutes,seconds,handleTimer}=useTimer(intervalRef,time,setTime,setCurQuestion,curQuestion,questions,setIsSubmitted,setSkippedQuestions,curMarks,setCurMarks,correctQuestions,setCorrectQuestions,setSkippedQuestions,setPendingSubmit);
 
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
  }, [setQuestions,dispatch]);
  //effect to set the questions
  useEffect(function(){
    if(questions?.length>0){
        dispatch({type:'setQuestion',payLoad:questions[curQuestion]})
    }
  },[questions?.length,curQuestion,questions,dispatch])
  
  //This effect will run when there will be no quesitons and will calculate the final result
  useEffect(function(){
if(pendingSubmit){
  let skipped=0,correct=0,wrong=0,marks=0;
  state.answers.forEach(el=>{
    if(el.curPoint) marks+=el.curPoint;
    if(el.selected !==null && el.isCorrect) correct+=1;
    if(el.selected !==null && !el.isCorrect) wrong+=1;
    if(el.selected===null) skipped +=1;
    setCurMarks(marks);
      setCorrectQuestions(correct);
      setWrongQuestions(wrong);
      setSkippedQuestions(skipped);
      setIsSubmitted(true);
      setPendingSubmit(false)
    
  })
}
  },[pendingSubmit,setCorrectQuestions,setCurMarks,setIsSubmitted,setSkippedQuestions,setWrongQuestions,state.answers])
  useEffect(function(){
if(time===0 && curQuestion<questions.length-1){
  setCurQuestion(q=>q+1)
  setTime(30000000)
}
if(time===0 && curQuestion===questions.length-1){
  setPendingSubmit(true);
}
  },[time,curQuestion,questions?.length,setTime])
  
//if data is loading
  if (isLoading) {
    return <Loader />
  }
  //function for loading the nextquestion
  function handleNextQuestion() {
    if(curQuestion<questions.length-1){
      
        setCurQuestion((cur)=>cur+1);
          handleTimer();

    }else{
      setPendingSubmit(true);
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
    dispatch({
      type: "checkAnswer",
      payLoad: {answerClicked,curQuestion,correctAnswer:state.correctAnswer},
      correctPoint:1,
      wrongPoint:-0.25
    });

   
    if(curQuestion===questions.length-1){
      setTimeout(()=>setPendingSubmit(true),400);
    }else{
       setTimeout(()=>{setCurQuestion((cur)=>cur+1)},1000)
    }
     handleTimer();
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
