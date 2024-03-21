"use client"
import Image from 'next/image';
import smkIcon from '@/assets/icons/smkn1kutaselatan.png'
import { useState } from 'react';
import Link from 'next/link';
import { CheckMode } from '@/function/globalState';
import axios from 'axios';
import { Toaster, toast } from 'sonner'

interface InputInter{
    userName:string
    userEmail:string
    userWA:any
} 

const LupaPassword = () => {
    const { mode } = CheckMode();
    const serverUrl = process.env.NEXT_PUBLIC_API_SERVER_URL;

    const [isLoading, setIsLoading] = useState(false);

    const [userData,setUserData] = useState<InputInter>({
        userName:'',
        userEmail:'',
        userWA:''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
        setUserData({ ...userData, [key]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await axios.post(serverUrl+'api/get/pw', userData);
            setIsLoading(false);

            if(res.status === 200 )return toast.success('Data sudah dikirim ke Admin, password akan segera dikirim via WhatsApp.')

            return toast.error('Gagal mengirim data ke admin. Coba lagi!')
        } catch (error) {
            console.error(error);
            return toast.error('Gagal mengirim data ke admin. Coba lagi!')
        }
    };

    return ( 
        <div className="w-full h-dvh dark:bg-darkBg flex justify-center items-center px-2">
            <Toaster position="top-right" expand={false} richColors  />
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
                <p className='dark:text-white text-xl sm:text-2xl text-center'>Lupa Password</p>
                <form className='flex flex-col pt-8 px-3 gap-2 sm:gap-4' onSubmit={handleSubmit}>
                    <label htmlFor="user_nama" className='dark:text-white sm:text-2xl'>Nama</label>
                    <input type="text" name="user_nama" id="user_nama" className=' bg-transparent dark:text-white border-b-2  h-10 outline-none sm:text-2xl sm:h-16' required 
                        value={userData.userName} 
                        onChange={(e) => handleChange(e, 'userName')}
                    />
                    <label htmlFor="user_email" className='dark:text-white sm:text-2xl'>Email</label>
                    <input type="email" name="user_email" id="user_email" className=' bg-transparent dark:text-white border-b-2  h-10 outline-none sm:text-2xl sm:h-16' required 
                        value={userData.userEmail} 
                        onChange={(e) => handleChange(e, 'userEmail')}
                    />
                    <label htmlFor="user_nowa" className='dark:text-white sm:text-2xl'>Nomer WhatApp</label>
                    <div className="flex gap-2 w-full items-center">
                        <span className=' dark:text-white sm:text-2xl'>+62</span>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            className=' bg-transparent dark:text-white border-b-2  h-10 w-full outline-none sm:text-2xl sm:h-16'
                            value={userData.userWA} 
                            onChange={(e) => handleChange(e, 'userWA')}
                        />
                    </div>
                    <button type="submit" disabled={isLoading} className='w-full py-2 text-white bg-second rounded-sm text-lg sm:text-2xl'>{isLoading? 'Loading':'Kirim'}</button>
                    <div className="flex gap-2 justify-between">
                        <Link href="/login" className='text-third sm:text-2xl'>Kembali</Link>
                        <Link href="/" className='text-third sm:text-2xl'>Beranda</Link>
                    </div>                
                </form>
            </div>
        </div>
    ); 
}

export default LupaPassword;