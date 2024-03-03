"use client"
import { useState } from "react";
import { FaCheck } from "react-icons/fa6";

const CheckBox=({check}:{check:boolean;})=>{
    const [checkIcon,setCheckIcon] = useState(check)
    const clickCheckBox =()=>{
        setCheckIcon(!checkIcon)
    }

    return (
        <div className="w-6 sm:w-10 aspect-square border rounded-sm flex  justify-center items-center cursor-pointer" onClick={clickCheckBox}>
            {
                checkIcon && <FaCheck className=" dark:fill-white sm:h-8 sm:w-8"/>
            }
            
        </div>
    )
}

export default CheckBox