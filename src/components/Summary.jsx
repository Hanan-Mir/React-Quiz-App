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
        <div className="w-[100%] h-[90vh] flex flex-col items-center justify-center">
            <h1 className="text-5xl mb-5 text-white">Result</h1>
        <div className=" rounded-lg flex flex-col justify-between items-center p-6 lg:w-[60%] h-[50vh] bg-black w-[90%]">
           <div className=" transition-all duration-300 hover:bg-violet-600 hover:px-3 hover:rounded-2xl px-3 w-[70%] h-[100%] flex flex-row items-center justify-between">
            <h2 className="text-[1.3rem] text-white">Marks obtained</h2>
            <p className="text-[1.2rem] text-white">{curMarks}</p>
            </div>
            <div className="transition-all duration-300 hover:bg-violet-600 hover:px-3 hover:rounded-2xl px-3 w-[70%] h-[100%] flex flex-row items-center justify-between">
            <h2 className="text-[1.3rem] text-white">Total Marks</h2>
            <p className="text-[1.2rem] text-white">{totalMarks}</p>
            </div>
            <div className="transition-all duration-300 hover:bg-violet-600 hover:px-3 hover:rounded-2xl px-3 w-[70%] h-[100%] flex flex-row items-center justify-between">
            <h2 className="text-[1.3rem] text-white">correct</h2>
            <p className="text-[1.2rem] text-white">{correctQuestions}</p>
            </div>
            <div className="transition-all duration-300 hover:bg-violet-600 hover:px-3 hover:rounded-2xl px-3 w-[70%] h-[100%] flex flex-row items-center justify-between">
            <h2 className="text-[1.3rem] text-white">wrong</h2>
            <p className="text-[1.2rem] text-white">{wrongQuestions}</p>
            </div>
            <div className="transition-all duration-300 hover:bg-violet-600 hover:px-3 hover:rounded-2xl px-3 w-[70%] h-[100%] flex flex-row items-center justify-between">
            <h2 className="text-[1.3rem] text-white">skipped</h2>
            <p className="text-[1.2rem] text-white">{skippedQuestions}</p>
            </div>
        </div>
        <button className="hover:bg-indigo-400 transition-all duration-300  text-[1rem] mt-5 px-3 py-2 rounded-lg bg-indigo-600 text-white" onClick={()=>handleRestart()} >Restart Quiz</button>
        </div>
    )
}

export default Summary
