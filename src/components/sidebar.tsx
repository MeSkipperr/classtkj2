"use client";

import userPic from '@/assets/icons/1.png'
import Image from 'next/image';
import { ReactNode, useContext, useState,createContext, useEffect } from 'react';
import { SlArrowLeft ,SlArrowRight } from "react-icons/sl";

import { GoHome } from "react-icons/go";
import { CiImageOn } from "react-icons/ci";
import { IoMdNotificationsOutline } from "react-icons/io";
import { LuUser2 } from "react-icons/lu";
import { FiMenu } from "react-icons/fi";

import {CheckMode} from '@/function/globalState'
import Link from 'next/link';

import { usePathname } from 'next/navigation'
import { getSessionLogin } from '@/lib';

const SideBarCom = ()=>{
  const { mode } = CheckMode();

  const [isLgScreen, setIsLgScreen] = useState(false);

  useEffect(() => {
    function checkScreenSize() {
      if (window.innerWidth >= 992) {
        setIsLgScreen(true); // If screen size is large (lg)
      } else {
        setIsLgScreen(false); // If screen size is small (sm) or default
      }
    }

    checkScreenSize();

    // Add event listener to monitor screen size changes
    window.addEventListener('resize', checkScreenSize);

    // Cleanup: remove event listener when component is unmounted
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  const pathname = usePathname()

  return(
    isLgScreen&&(
      <Sidebar>
        <SidebarItem
          url="/"
          icon={<GoHome size={28} color={mode ? 'white' : 'black'} />}
          text="Beranda"
          active={pathname === '/'}
        />
        <SidebarItem
          url="/album"
          icon={<CiImageOn size={28} color={mode ? 'white' : 'black'} />}
          text="Album"
          active={pathname === '/album'}
        />
        <SidebarItem
          url="/notif"
          icon={<IoMdNotificationsOutline size={28} color={mode ? 'white' : 'black'} />}
          text="Notifikasi"
          alert
          active={pathname === '/notif'}
        />
        <SidebarItem
          url="/user"
          icon={<LuUser2 size={28} color={mode ? 'white' : 'black'} />}
          text="User"
          active={pathname === '/user'}
        />
        <SidebarItem
          url="/lainnya"
          icon={<FiMenu size={28} color={mode ? 'white' : 'black'} />}
          text="Lainnya"
          active={pathname === '/lainnya'}
        />
    </Sidebar>
      )
  )
}

export default SideBarCom;

interface SidebarProps {
    children: ReactNode;
}

const SidebarContext = createContext<any>(true);

const getDataSession = () => {
  return getSessionLogin().then((session) => {
    if (session && session.user) {
      const userData = {
        userName: session.user.userName || '',
        email: session.user.email || '',
      };
      return userData;
    } else {
      return {
        userName: '',
        email: '',
      };
    }
  });
};

const Sidebar = ({ children }: SidebarProps) => {
    const[expanded,setExpanded] = useState(true);
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");

    useEffect(() => {
      getDataSession().then((name) => {
        setUserName(name.userName);
        setUserEmail(name.email);
      });
    }, []);

    getSessionLogin
    return(
        <aside className="h-dvh pt-1 bg-white dark:bg-darkBg ">
            <nav className="h-full flex flex-col  shadow-sm">
                <div className="p-4 pb-4 flex justify-between items-center ">
                  <button onClick={()=>{setExpanded(curr=> !curr)}} className='p-1.5 rounded-lg hover:dark:bg-[#101012]'>
                      {expanded ?<SlArrowLeft size={25} className='dark:fill-white' /> : <SlArrowRight size={25} className='dark:fill-white'/>}
                  </button>
                </div>
                <SidebarContext.Provider value={{ expanded }}>
                  <ul className="flex-1 px-3">{children}</ul>
                </SidebarContext.Provider>
                <div className="flex p-3 cursor-pointer">
                  <Image
                  src={userPic}
                  alt="user profil"
                  className='w-14 h-14 rounded-md'
                  />
                  <div className={`flex justify-between items-center 
                  overflow-hidden transition-all
                  ${expanded?'w-64 ml-3': 'w-0'}
                  `}>
                      <div className="leading-4">
                          <h4 className='font-semibold text-xl dark:text-white'>{userName}</h4>
                          <span className=' text-base text-gray-600 dark:text-white'>{userEmail}</span>
                      </div>
                  </div>
                </div>
            </nav>
        </aside>
    )
}

function SidebarItem({ icon, text, active, alert,url }: { icon?: any; text?: any; active?: any ; alert?:boolean; url : string; }) {
  const { expanded } = useContext(SidebarContext)
  
  return (
    <Link href={url}>
    <li
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? "dark:bg-[#101012] bg-[#d6d6d6]"
            : "hover:bg-[#d6d6d6cc] hover:dark:bg-[#101012cc]"
        }
    `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all dark:text-white ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-[red] ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-white text-black dark:bg-darkBg dark:text-white text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </li>
    </Link>
  )
}
