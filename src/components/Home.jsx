import { useState } from "react";
import { toast, ToastContainer } from "react-toastify"
import useTimer from "../customHooks/useTimer";

function Home({userName,setUserName,time,setTime,intervalRef}) {
    //sets the username and also checks weather userName is present there or not
    const [userInput,setUserInput]=useState();
    const {minutes,seconds,handleTimer}=useTimer(intervalRef,time,setTime);
    function handleUserName(uName){
        
        if(!uName) {
            
            toast.warn('Please enter the username to get started');
        return;
        }
        else{
            setUserName(uName)
            handleTimer()
        }
    }
    return (
        <div className="m-w-40% h-[50vh] flex flex-col items-center justify-evenly">
            <ToastContainer position="top-center" />
            <div >
                
                <h1 className="text-[1.5rem] sm:text-[3rem] text-white lg:text-[4rem]">Welcome, to the Quiz app</h1>
            </div>
            <div className="w-[100%] flex flex-col items-center justify-center">
            <input className="border-[1px] border-white text-white p-[1rem] rounded-lg text-3xl" type="text" placeholder="Enter you name to start quiz" onChange={(e)=>setUserInput(e.target.value)} />
            <button className=" ml-[5px] border-[1px] bg-indigo-600 transition-all duration-300 text-black py-[1.2rem] px-[0.5rem] text-2xl rounded-md hover:bg-black hover:text-white" onClick={()=>handleUserName(userInput)}>Start Quiz</button>
        </div>
        </div>
    )
}

export default Home
