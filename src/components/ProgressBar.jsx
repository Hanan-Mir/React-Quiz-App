function ProgressBar({currentQuestionIndex,totalQuestion}) {
    const progressPercentage=((+currentQuestionIndex)/totalQuestion)*100;
   
    return (
        <div className="w-[100%] bg-gray-200 rounded-full h-2 overflow-hidden">
            <div className="bg-blue-800 h-2 rounded-full transition-all duration-500 ease-out"
            style={{width:`${progressPercentage}%`}}
            aria-valuenow={progressPercentage}
            aria-valuemax='100'
            aria-valuemin='0'
            role="progressbar">

            </div>
        </div>
    )
}

export default ProgressBar
