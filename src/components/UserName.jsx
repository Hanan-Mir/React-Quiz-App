import { FaUserCircle } from "react-icons/fa"

function UserName({userName}) {
    return (
        <div className="text-right mt-[1rem] flex justify-end items-start text-white" >
         <FaUserCircle className="text-4xl " />
            <p className=" inline px-[10px] py-[5px] rounded-md text-2xl mr-[1rem]">
                   
                   <span>{String(userName).toUpperCase()}</span>
                   </p>
        </div>
    )
}

export default UserName
