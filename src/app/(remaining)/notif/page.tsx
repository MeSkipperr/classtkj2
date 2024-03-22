"use client"
import { useState,useEffect } from "react";
import { FaCheck } from "react-icons/fa6";
import axios from "axios";
import { getSessionLogin } from "@/lib";

const getDataCooc = () => {
    return getSessionLogin().then((session) => {
        const userName = session.user.userName;
        return userName;
    });
};

const Notifikasi =  ()=>{
    const [isLoading, setIsLoading] = useState(true);
    const serverUrl = process.env.NEXT_PUBLIC_API_SERVER_URL;
    const [homeWorkCompleted, setHomeWorkCompleted] = useState([]);
    const [homeWorkIncomplete, sethomeWorkIncomplete] = useState([]);


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

    const [userName, setUserName] = useState("");

    useEffect(() => {
        getDataCooc().then((name) => {
            setUserName(name);
        });
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(serverUrl+`api/notif/${userName}`); 
                console.log(res.data)
                setHomeWorkCompleted(res.data.tasksCompleted)
                sethomeWorkIncomplete(res.data.tasksIncomplete)
                setIsLoading(false)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, [serverUrl,userName]);

    return(
        <div className="w-full h-dvh dark:bg-darkBg mt-28 px-4 ">
            <p className="text-third text-lg pb-6">Notifikasi</p>
            <ul className="gap-4 flex flex-col">
            {
                isLoading ? (
                    <>
                    <SkeletonNotifikasi />
                    <SkeletonNotifikasi />
                    <SkeletonNotifikasi />
                    <SkeletonNotifikasi />
                    <SkeletonNotifikasi />
                    </>
                ) : (
                    <>
                    {homeWorkIncomplete.map((notif, index) => (
                        <NotifikasiContent key={index} content={notif} checked={false} />
                    ))}
                    {homeWorkCompleted.map((notif, index) => (
                        <NotifikasiContent key={index} content={notif} checked={true} />
                    ))}
                    </>
                )
            }
            </ul>
        </div>        
    )
}

export default Notifikasi

interface NotifikasiItem {
    judul: string;
    tanggal:string;
}

const NotifikasiContent =  ({ content,checked }: { content: NotifikasiItem,checked:boolean}) => {
    const [checkIcon,setCheckIcon] = useState(checked)
    const clickCheckBox =()=>{
        setCheckIcon(!checkIcon)
        //TODO 
        // send data to database    
    }


    return(
        <li className={`flex pb-2  ${checkIcon && 'opacity-30'}`}>
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

const SkeletonNotifikasi = () => (
    <li className="flex pb-2 ">
    <div className="pr-4 pt-2">
        <div className="w-6 sm:w-10 aspect-square border border-gray-500 opacity-15 rounded-sm flex justify-center items-center loading-skeleton">
        </div>
    </div>
    <div className="w-full dark:text-white flex flex-col gap-2 loading-skeleton">
        <div className="flex w-full justify-between sm:text-xl ">
            <div className=" w-16 h-4 rounded-lg bg-gray-500 opacity-15"></div>
            <div className=" w-16 h-4 rounded-lg bg-gray-500 opacity-15"></div>
        </div>
        <div className=" w-3/4 h-4 rounded-lg bg-gray-500 opacity-15"></div>
        <div className=" w-2/4 h-4 rounded-lg bg-gray-500 opacity-15"></div>
        <div className=" w-1/4 h-4 rounded-lg bg-gray-500 opacity-15"></div>
    </div>
    </li>
);    
