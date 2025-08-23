import {  useState } from "react"
import Home from "./components/Home"
import Question from "./components/Question"
import UserName from "./components/UserName"

function App() {
  const [userName,setUserName]=useState('');
  const [questions,setQuestions]=useState();
  
  return (
    <>
   {!userName && <Home userName={userName} setUserName={setUserName} />}
    {userName && <>
    <UserName userName={userName} />
    <Question questions={questions} setQuestions={setQuestions} />
    </>
    }
    

    </>
  )
}

export default App
