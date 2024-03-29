"use client"
import { useState,useEffect } from "react";
import { FaCheck } from "react-icons/fa6";
import axios from "axios";
import { getSessionLogin } from "@/lib";
import Link from "next/link";
import { userAgent } from "next/server";

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
    const [userName, setUserName] = useState("");

    const [admin, setAdmin] = useState(false);
    const [usersAdmin, setUsersAdmin] = useState(['admin']);
    useEffect(() => {
        if(usersAdmin.includes(userName)){
            setAdmin(true)
        }
    }, [userName,usersAdmin]);
    useEffect(() => {
        getDataCooc().then((name) => {
            setUserName(name);
        });
    }, []);
    useEffect(() => {
        if(userName.length !== 0){
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
        }   
        
    }, [serverUrl,userName]);

    return(
        <div className="w-full h-dvh dark:bg-darkBg mt-28 px-4">
            <div className="w-full flex justify-between pb-3 items-center">
                <p className="text-third text-lg">Notifikasi</p>
                {admin ? 
                <Link href='/notifForm'>
                    <div className="text-white text-sm  bg-second px-2 py-1.5 rounded-sm sm:text-lg">Tambahkan Tugas</div>
                </Link>
                :
                ''
                }
            </div>
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
    homeworkTitle: string;
    homeworkSub:string;
    notifID:number;
    dateline:string;
    mataPelajaran:string;
    tanggal:Date
}


const NotifikasiContent =  ({ content,checked }: { content: NotifikasiItem,checked:boolean}) => {
    const serverUrl = process.env.NEXT_PUBLIC_API_SERVER_URL;
    const [checkIcon,setCheckIcon] = useState(checked)
    const givenDate = new Date(content.tanggal);
    const dataID = content.notifID;
    const time = convertSecondsToTime(givenDate);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        getDataCooc().then((name) => {
            setUserName(name);
        });
    }, []);

    const clickCheckBox =()=>{
        const notificationData ={
            homeworkDone:checkIcon,
            username:userName,
            notifId:dataID
        }

        const fetchData = async () => {
            try {
                const res = await axios.post(serverUrl+`api/update/homework`,notificationData); 
                console.log(res.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }   
        };
        fetchData();
        setCheckIcon(!checkIcon)
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
                    <p className="dark:text-white font-semibold">{content.homeworkTitle}</p>
                    <span className=" text-gray-500">{time}</span>
                </div>
                <p className="opacity-80 text-sm sm:text-lg">Mata Pelajaran : {content.mataPelajaran}</p>
                <p className="opacity-80 text-sm sm:text-lg">{content.homeworkSub}</p>
                <p className="mt-2 text-sm sm:text-lg">Dikumpul pada {content.dateline}</p>
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

function convertSecondsToTime(date:any) {
    const time = new Date();
    const perbedaan = Math.abs(time.getTime() - date.getTime()) / 1000; // perbedaan dalam detik

    const days = Math.floor(perbedaan / (3600 * 24)); // Calculate days
    const remainingSeconds1 = perbedaan % (3600 * 24); // Calculate remaining seconds after converting to days
    const hours = Math.floor(remainingSeconds1 / 3600); // Calculate hours from remaining seconds
    const remainingSeconds2 = remainingSeconds1 % 3600; // Calculate remaining seconds after converting to hours
    const minutes = Math.floor(remainingSeconds2 / 60); // Calculate minutes from remaining seconds

    if (days > 0) {
    if (days >= 30) return "30hari";
    return `${days}hari`;
    } else if (hours > 0) {
    return `${hours}j`;
    } else {
    if (minutes < 30) {
        return "Baru";
    }
    return "30m";
    }
}