import { useEffect, useReducer, useState } from "react"
import ProgressBar from "./ProgressBar"
const initialState= {question:null,correctAnswer:null,options:[]}

function reducer(state,action){
switch(action.type){
    case 'dataRecieved':
        return {...state,question:action.payLoad[0]?.question,correctAnswer:action.payLoad[0].correct_answer,options:[...action.payLoad[0].incorrect_answers,action.payLoad[0].correct_answer]}
case 'nextQuestion':
return {...state,question:action.payLoad[action.curQuestion]?.question,correctAnswer:action.payLoad[action.curQuestion].correct_answer,options:[...action.payLoad[action.curQuestion].incorrect_answers,action.payLoad[action.curQuestion].correct_answer]}
case 'previousQuestion':
    return {...state,question:action.payLoad[action.curQuestion]?.question,correctAnswer:action.payLoad[action.curQuestion].correct_answer,options:[...action.payLoad[action.curQuestion].incorrect_answers,action.payLoad[action.curQuestion].correct_answer]}
       
}
}
function Question({questions,setQuestions}) {
 const [state,dispatch]=useReducer(reducer,initialState);
 const [isLoading,setIsLoading]=useState(true);
 const [curQuestion,setCurQuestion]=useState(0);   
//fetch data from the API

useEffect(()=>{
async function getData(){
    try{
    const response=await fetch(`https://opentdb.com/api.php?amount=50&category=18&type=multiple`);
    if(!response.ok) return
    const result =await response.json();
    if(result && result.results){
    setQuestions(result.results);
    dispatch({type:'dataRecieved',payLoad:result.results})
    }
    
    }
    catch(error){
        throw new Error(error);
    }finally{
        setIsLoading(false)
    }
}
getData();
},[setQuestions])
console.log(questions);



if(isLoading){
    return(
        <p>Loading...</p>
    )
}
//function for loading the nextquestion
function handleNextQuestion(questionArr){
    if(curQuestion===questionArr.length){
        return;
    }
    setCurQuestion((cur)=>cur+1);
    dispatch({type:'nextQuestion',payLoad:questionArr,curQuestion:curQuestion})
    
}
//function for loading the previousquestion
function handlePreviousQuestion(questionArr){
    if(curQuestion===0){
        return
    }
    setCurQuestion((cur)=>cur-1);
    dispatch({type:'previousQuestion',payLoad:questionArr,curQuestion:curQuestion})
}




    return (
<div className=" h-[70vh] flex flex-col items-center justify-center" >
    
    <div className="w-[60%]">
<div>
    <ProgressBar currentQuestionIndex={curQuestion+1} totalQuestion={questions?.length} />
    <div className="flex items-center justify-between mt-6">
      
    <h2 className="text-1xl text-amber-50">Question {curQuestion+1} of {questions?.length}</h2>
    <span className="bg-blue-600 px-3 py-1 rounded-full">5:00</span>
    </div>
    <h2 className="text-3xl mb-4">{state.question}</h2>
</div>
<ul>
    {state.options.map((el)=>{
        console.log(el);
return <li className="w-full bg-violet-500 py-3 px-3 rounded-lg text-2xl mb-1 hover:bg-violet-400">{el}</li>
    })}

</ul>
 <div className="flex justify-between mt-[1rem]">
    {curQuestion>0 && <button className="border-1 px-2 py-1 rounded-full hover:bg-white" onClick={()=>handlePreviousQuestion(questions)}>Previous</button>}
        <button  className="border-1 px-5 py-1 rounded-full hover:bg-white" onClick={()=>handleNextQuestion(questions)}>{curQuestion+1===questions?.length?'Submit':'Next'}</button>
    </div>


    </div>
   

</div>
    )
}

export default Question
