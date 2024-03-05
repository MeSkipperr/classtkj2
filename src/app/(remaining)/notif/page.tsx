"use client"
import CheckLogin from "@/function/checkLogin"
import NoUser from "@/components/noUser";
import { useState } from "react";
import { FaCheck } from "react-icons/fa6";


const Notifikasi = ()=>{
    const {login} = CheckLogin();

    const data =[
        {
            judul : 'Membuat Website',
            checked : false,
            tanggal : '01-20-2020'
        },
        {
            judul : 'Membuat Kopi',
            checked : true,
            tanggal : '02-20-2020'
        },
        {
            judul : 'Membuat Kopi',
            checked : false,
            tanggal : '03-20-2020'
        },
        {
            judul : 'Masak Air',
            checked : true,
            tanggal : '04-20-2020'
        },
    ]

    const sortedData = data.sort((a, b) => (a.checked === b.checked ? 0 : a.checked ? 1 : -1));

    return(
            <>  
                {login?
                <div className="w-full h-dvh dark:bg-darkBg mt-28 px-4 ">
                    <p className="text-third text-lg pb-6">Notifikasi</p>
                    <ul className="gap-4 flex flex-col">
                    {sortedData.map((notif, index) => (
                        <NotifikasiContent key={index} content={notif} />
                        ))}
                    </ul>
                </div>
                :
                <NoUser/>}
            </>
        
    )
}

export default Notifikasi

interface NotifikasiItem {
    judul: string;
    checked: boolean;
    tanggal:string;
}

const NotifikasiContent = ({ content }: { content: NotifikasiItem}) => {
    const [checkIcon,setCheckIcon] = useState(content.checked)
    const clickCheckBox =()=>{
        setCheckIcon(!checkIcon)
        //TODO 
        // send data to database
    }


    return(
        <li className={`flex border-b pb-2 ${checkIcon && 'opacity-30'}`}>
            <div className="pr-4 pt-2">
                <div className="w-6 sm:w-10 aspect-square border rounded-sm flex  justify-center items-center cursor-pointer" onClick={clickCheckBox}>
                    {
                        checkIcon && <FaCheck className=" dark:fill-white sm:h-8 sm:w-8"/>
                    }
                    
                </div>
            </div>
            <div className={`w-full dark:text-white ${checkIcon && 'line-through'} `}>
                <div className="flex w-full justify-between sm:text-xl">
                    <p className="dark:text-white font-semibold">{content.judul}</p>
                    <span className=" text-gray-500">{content.tanggal}</span>
                </div>
                <p className="text-sm sm:text-lg">Tugas membuat website dengan react js untuk perjualan kopi</p>
                <p className="mt-2 text-sm sm:text-lg">Dikumpul pada kamis, 21-10-1010</p>
            </div>
        </li>
    )
}
