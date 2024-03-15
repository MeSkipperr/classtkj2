"use client"
import {CheckMode,ServerUrl} from '@/function/globalState'
import Image from 'next/image';
import smkIcon from '@/assets/icons/smkn1kutaselatan.png'
import Link from 'next/link';
import { useState,useEffect } from 'react';
import { FaRegEye ,FaRegEyeSlash} from "react-icons/fa";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { login } from '@/lib';

const Login = () => {
    const router = useRouter();
    const { mode } = CheckMode();
    const serverUrl = ServerUrl();

    const [seePassword, setSeePassword] = useState(false);
    const [response, setResponse] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const changeSeePassword = ()=>{
        setSeePassword(!seePassword)
    };

    const [userData, setUserData] = useState({
        userName:'',
        password:''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
        setUserData({ ...userData, [key]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await axios.post(serverUrl+'api/login', userData);
            setResponse(res.data);
            if(res.data){
                login(res.data);
                router.push('/');
                console.log(res.data)
            }
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
    };
    
    useEffect(() => {
        console.log(response);
    }, [response]); 

    return ( 
        <div className="w-full h-dvh dark:bg-darkBg flex justify-center items-center px-2">
            <div className=" bg-[#ecececcc ] dark:bg-[#101012cc]  w-full rounded-sm px-2 py-8 lg:w-2/4 lg:px-8 lg:py-12 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                <div className="flex justify-between ">
                    <p className=' text-second text-xl sm:text-3xl' style={{ fontFamily: "'Pacifico', cursive" }}>TKJ 2</p>
                    <Image
                    src={smkIcon}
                    alt='SMKN 1 Kuta Selatan Icon'
                    width={45}
                    height={35}
                    title='SMKN 1 Kuta Selatan, Badung'
                    />
                </div>
                <p className='dark:text-white text-xl sm:text-2xl text-center'>Masuk ke dalam TKJ 2</p>
                <form className='flex flex-col pt-8 px-3 gap-2 sm:gap-4' onSubmit={handleSubmit}>
                    <label htmlFor="user_nama" className='dark:text-white sm:text-2xl'>Nama</label>
                    <input type="text" name="user_nama" id="user_nama" className=' bg-transparent dark:text-white border-b-2  h-10 outline-none sm:text-2xl sm:h-16' required 
                        value={userData.userName} 
                        onChange={(e) => handleChange(e, 'userName')}
                    />
                    <label htmlFor="user_password" className='dark:text-white sm:text-2xl' >Password</label>
                    <div className="flex">
                        <input type={seePassword ? 'text': 'password'} name="user_password" id="user_password" className='flex-grow bg-transparent dark:text-white border-b-2 h-10 outline-none sm:text-2xl sm:h-16' required 
                            value={userData.password} 
                            onChange={(e) => handleChange(e, 'password')}
                        />
                        <div onClick={changeSeePassword} className='flex justify-center items-center w-14 sm:w-20'>
                            {seePassword? <FaRegEyeSlash className='dark:fill-white h-6 sm:h-8 w-full cursor-pointer'/> : <FaRegEye className=' dark:fill-white h-6 sm:h-8 w-full cursor-pointer'/>}
                        </div>
                    </div>
                    <span className=' text-red-600'>{response === null ? 'Password Salah':''}</span>
                    <Link href='/lupapassword' className='text-third ml-auto sm:text-xl'>
                        Lupa Password ?
                    </Link>
                    <button type="submit" disabled={isLoading} className='w-full py-2 text-white bg-second rounded-sm text-lg sm:text-2xl'>{isLoading? 'Loading':'Masuk'}</button>
                    <Link href="/" className='text-third sm:text-2xl'>Kembali</Link>
                </form>
            </div>
        </div>
    );
}
export default Login;