import useTimer from "../customHooks/useTimer";

function Summary({intervalRef,time,setTime,setIsSubmitted,userName,setUserName,setQuestions,curMarks,questions,correctQuestions,wrongQuestions,skippedQuestions,setSkippedQuestions,setWrongQuestions,setCorrectQuestions}) {
    const totalMarks=questions.length*1;
    const {handleTimer}=useTimer(intervalRef,time,setTime)
    function handleRestart(){
        if(intervalRef.current){
            clearInterval(intervalRef.current);
            setIsSubmitted(false);

setUserName(userName)
setQuestions(questions);
setTime(30000000);
setSkippedQuestions(0);
setWrongQuestions(0);
setCorrectQuestions(0)
        }
        handleTimer();

    }
    return (
        <div className="w-[100%] h-[50vh] flex flex-col items-center justify-center">
            <h1 className="text-5xl mb-5">Result</h1>
        <div className=" rounded-lg flex justify-between items-center p-6 w-[50%] h-[25vh] bg-blue-500">
           <div className="hover:bg-violet-600 rounded-2xl bg-violet-800 w-[15%] h-[100%] border-1 flex flex-col items-center justify-center">
            <h2 className="text-[1.3rem] text-white">Total Marks</h2>
            <p className="text-[1.2rem] text-white">{curMarks}/{totalMarks}</p>
            </div>
         <div className="hover:bg-violet-600 rounded-2xl bg-violet-800 w-[15%] h-[100%] border-1 flex flex-col items-center justify-center">
            <h2 className="text-[1.3rem] text-white">Correct</h2>
            <p className="text-[1.2rem] text-white">{correctQuestions}</p>
            </div>
              <div className="hover:bg-violet-600 rounded-2xl bg-violet-800 w-[15%] h-[100%] border-1 flex flex-col items-center justify-center">
            <h2 className="text-[1.3rem] text-white">wrong</h2>
            <p className="text-[1.2rem] text-white">{wrongQuestions}</p>
            </div>
             <div className="hover:bg-violet-600 rounded-2xl bg-violet-800 w-[15%] h-[100%] border-1 flex flex-col items-center justify-center">
            <h2 className="text-[1.3rem] text-white">Skipped</h2>
            <p className="text-[1.2rem] text-white">{skippedQuestions}</p>
            </div>
        </div>
        <button className="border-2 mt-5 px-2 py-1 rounded-lg text-2xl" onClick={()=>handleRestart()} >Restart Quiz</button>
        </div>
    )
}

export default Summary
