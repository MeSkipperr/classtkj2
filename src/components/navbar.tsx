"use client"
import smkIcon from '@/assets/icons/smkn1kutaselatan.png'
import Image from 'next/image';
import { GoHome } from "react-icons/go";
import { CiImageOn } from "react-icons/ci";
import { IoMdNotificationsOutline } from "react-icons/io";
import { LuUser2 } from "react-icons/lu";
import { FiMenu } from "react-icons/fi";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getSessionLogin } from '@/lib';
import axios from 'axios';

const getDataCooc = () => {
    return getSessionLogin().then((session) => {
        const userName = session.user.userName;
        return userName;
    });
  };
  

const Navbar  = () => {
    const [userName, setUserName] = useState("");
    const [notification, setNotification] = useState(false);
    const serverUrl = process.env.NEXT_PUBLIC_API_SERVER_URL;

    useEffect(() => {
        getDataCooc().then((name) => {
            setUserName(name);
        });
    }, []);
    useEffect(() => {
    if(userName !== ""){
        const fetchData = async () => {
        try {
            const res = await axios.get(serverUrl+`api/notifcount/${userName}`,); 
            setNotification(res.data)
        } catch (error) {
            console.log(error)
        }
        }
        fetchData()
    }
    }, [serverUrl,userName]);

    return (
        <>
            <nav className='lg:w-[calc(100%-5rem)] w-full lg:ml-16 h-14 py-9  flex justify-between items-center z-50 fixed bg-white dark:bg-darkBg'>
                <a href='/' className='  md:text-3xl sm:px-8 px-2 text-xl text-second flex  cursor-pointer'style={{ fontFamily: "'Pacifico', cursive" }}>
                    TKJ 2
                </a>
                <Image
                src={smkIcon}
                alt='SMKN 1 Kuta Selatan Icon'
                className='mr-4'
                width={35}
                height={25}
                />
            </nav>
            {/* buttom navbar */}
            <div className="lg:hidden fixed bottom-0 flex justify-around items-center z-50 w-full h-20 bg-white dark:bg-darkBg">
                <Link href="/">
                    <GoHome size={35}                   className=' dark:text-white'/>
                </Link>
                <Link href="/album">
                    <CiImageOn size={35}                className=' dark:text-white'/>
                </Link>
                <Link href="/notif">
                    <div className="relative">
                    {!notification&&
                        <span className='absolute right-2 w-2 h-2 rounded bg-[red]'></span>
                    }
                    <IoMdNotificationsOutline size={35} className=' dark:text-white'/>
                    </div>
                </Link>
                <Link href="/user">
                    <LuUser2 size={35}                  className=' dark:text-white'/>
                </Link>
                <Link href="/lainnya">
                    <FiMenu size={35}                   className=' dark:text-white'/>
                </Link>
            </div>
        </>
    );
};

export default Navbar;
