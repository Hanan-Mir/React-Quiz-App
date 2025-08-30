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
    <div className=" flex flex-col items-center justify-center h-[70vh] lg:flex lg:flex-col lg:items-center lg:justify-center ">
      <div className="lg:w-[60%] lg:p-10 bg-gray-950 lg:rounded-2xl w-[100%] p-5 rounded-2xl">
        <div>
          <ProgressBar
            currentQuestionIndex={curQuestion + 1}
            totalQuestion={questions?.length}
          />
          <div className="lg:flex lg:items-center lg:justify-between lg:mt-6 flex items-center justify-between mt-3">
            <h2 className="text-1xl text-amber-50">
              Question {curQuestion + 1} of {questions?.length}
            </h2>
            <span className="bg-blue-600 lg:px-3 lg:py-1 lg:rounded-full rounded-full px-1 text-1xl">{String(minutes).padStart(2,'0')}:{String(seconds).padStart(2,'0')}</span>
          </div>
          <h2 className="lg:text-3xl lg:mb-4 text-white mt-2 mb-2">{state.question}</h2>
        </div>
        <ul>
          {state.options.map((el) => {
            return (
              <li
                key={el}
                onClick={() => handleCheckAnswer(el)}
                className={`${hasAttempted?el===state.correctAnswer?'bg-green-800 text-white transition-all duration-200 ease-in translate-x-3 lg:translate-x-5':currentAnswer?.selected===el?'bg-red-600':'bg-violet-500':'bg-gray-700'} w-full  lg:py-3 lg:px-3 rounded-lg lg:text-2xl lg:mb-1 px-2 py-2 mb-2 hover:bg-gray-300 hover:text-black`}
              >
                {el}
              </li>
            );
          })}
        </ul>
        <div className="lg:items-center lg:flex lg:justify-between lg:mt-[1rem] flex items-center justify-between">
          <div></div>
         {!hasAttempted && <button
            className="lg:border-1 bg-indigo-500 lg:transition-all lg:ease-in lg:duration-300 lg:px-5 lg:py-1 lg:rounded-full hover:bg-white mt-3 px-5 py-1 rounded-full "
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
