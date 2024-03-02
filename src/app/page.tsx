"use client";
import Navbar from '../components/navbar';
import { Sidebar, SidebarItem } from '../components/sidebar';
import HeroSection from '../components/hero';
import Member from '../components/member';
import Footer from '../components/footer';

import { useState,useEffect  } from 'react';

import { GoHome } from "react-icons/go";
import { CiImageOn } from "react-icons/ci";
import { IoMdNotificationsOutline } from "react-icons/io";
import { LuUser2 } from "react-icons/lu";
import { FiMenu } from "react-icons/fi";

export default function Home() {
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


  const [mode, setMode] = useState<boolean>(false); // State for managing mode (not clear what mode represents)
  const [modeCheck, setModeCheck] = useState<boolean>(false);  



  useEffect (()=>{
      const sessionTheme = sessionStorage.getItem('theme');
      if(sessionTheme == 'dark'){
          setMode(true)
      }else if(sessionTheme === null){
          if(!modeCheck){
              const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
              sessionStorage.setItem('theme', !isDarkMode ? 'light':'dark');
              setModeCheck((true))
          }
      }else{
        setMode(false)
      }
  },[setMode,setModeCheck,modeCheck])

  useEffect(() => {
      if (mode) {
          document.body.classList.add("dark");
      } else {
          document.body.classList.remove("dark");
      }
  });



  return (
    <main className="">
      <Navbar/>
      <div className="flex w-full">
        {isLgScreen&&(
          <Sidebar>
          <SidebarItem icon={<GoHome size={28} color={mode?'white':'black'}/>} text="Beranda" active/>
          <SidebarItem icon={<CiImageOn size={28} color={mode?'white':'black'}/>} text="Album"/>
          <SidebarItem icon={<IoMdNotificationsOutline size={28} color={mode?'white':'black'}/>} text="Notifikasi" alert/>
          <SidebarItem icon={<LuUser2 size={28} color={mode?'white':'black'}/>} text="User"/>
          <SidebarItem icon={<FiMenu size={28} color={mode?'white':'black'}/>} text="Lainnya"/>
        </Sidebar>
          )}
        <div className=" flex-grow h-dvh overflow-y-auto dark:bg-darkBg">
          <HeroSection mode={mode}/>
          <Member/>
          <Footer mode={mode}/>
        </div>
      </div>
    </main>
  );
}
