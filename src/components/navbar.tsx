import smkIcon from '../icons/smkn1kutaselatan.png'
import Image from 'next/image';
import { GoHome } from "react-icons/go";
import { CiImageOn } from "react-icons/ci";
import { IoMdNotificationsOutline } from "react-icons/io";
import { LuUser2 } from "react-icons/lu";
import { FiMenu } from "react-icons/fi";

const Navbar  = () => {

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
                <a href="">
                    <GoHome size={35}                   className=' dark:text-white'/>
                </a>
                <a href="">
                    <CiImageOn size={35}                className=' dark:text-white'/>
                </a>
                <a href="">
                    <IoMdNotificationsOutline size={35} className=' dark:text-white'/>
                </a>
                <a href="">
                    <LuUser2 size={35}                  className=' dark:text-white'/>
                </a>
                <a href="">
                    <FiMenu size={35}                   className=' dark:text-white'/>
                </a>
            </div>
        </>
    );
};

export default Navbar;
