"use client"
import React, { useState, ChangeEvent } from "react";
import axios from "axios";
import { Toaster, toast } from 'sonner'

type SelectChangeEvent = ChangeEvent<HTMLSelectElement>;

const NotifForm = () => {
    const serverUrl = process.env.NEXT_PUBLIC_API_SERVER_URL;
    const [isLoading, setIsLoading] = useState(false);
    const [notifData, setNotifData] = useState({
        homeworkTitle: '',
        homeworkSub: '',
        mataPelajaran: '',
        dateline: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: string) => {
        setNotifData({ ...notifData, [key]: e.target.value });
    };

    const handleMataPelajaranChange = (e: SelectChangeEvent) => {
        setNotifData({ ...notifData, mataPelajaran: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await axios.post(serverUrl+'api/add/homework', notifData);
            setIsLoading(false);

            if(res.status === 200) {
                toast.success('Data berhasil ditambahkan ke DataBase');
                setNotifData({
                    homeworkTitle: '',
                    homeworkSub: '',
                    mataPelajaran: '',
                    dateline: ''
                });
            }

        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
    };
    

    return (
        <div className="dark:bg-darkBg w-full h-dvh flex flex-col justify-center items-center p-2">
            <Toaster position="top-right" expand={false} richColors  />
            <div className="bg-[#ecececcc] dark:bg-[#101012cc] w-full rounded-sm px-2 py-8 lg:w-2/4 lg:px-8 lg:py-12 shadow-[0_3px_10px_rgb(0,0,0,0.2)] ">
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                    <label htmlFor="homework_title" className="dark:text-white sm:text-2xl">
                        Judul Tugas
                    </label>
                    <input
                        type="text"
                        name="homework_title"
                        id="homework_title"
                        className="bg-transparent dark:text-white border-b-2 h-10 outline-none sm:text-2xl sm:h-16"
                        required
                        value={notifData.homeworkTitle}
                        onChange={(e) => handleChange(e, 'homeworkTitle')}
                    />
                    <label htmlFor="homework_deskripsi" className="dark:text-white sm:text-2xl">
                        Deskripsi
                    </label>
                    <textarea
                        name="homework_deskripsi"
                        id="homework_deskripsi"
                        className="bg-transparent dark:text-white border-b-2 h-32 outline-none sm:text-2xl sm:h-54"
                        required
                        value={notifData.homeworkSub}
                        onChange={(e) => handleChange(e, 'homeworkSub')}
                    />
                    <select
                        name="mata_pelajaran"
                        id="mata_pelajaran"
                        className="cursor-pointer border-none outline-none py-3 text-lg rounded-sm sm:py-4 sm:text-xl"
                        value={notifData.mataPelajaran}
                        onChange={handleMataPelajaranChange}
                        required
                    >
                        <option value="" disabled >
                            Mata Pelajaran
                        </option>
                        <option value="Bahasa Indonesia">Bahasa Indonesia</option>
                        <option value="Bahasa Inggris">Bahasa Inggris</option>
                        <option value="Bahasa Bali">Bahasa Bali</option>
                        <option value="Matematika">Matematika</option>
                        <option value="Sejarah">Sejarah</option>
                        <option value="PPKN">PPKN</option>
                        <option value="Olahraga">Olahraga</option>
                        <option value="Agama Hindu">Agama Hindu</option>
                        <option value="Agama Islam">Agama Hindu</option>
                        <option value="Agama Kristen">Agama Hindu</option>
                        <option value="KK Pak Ibam">KK (Pak Ibam)</option>
                        <option value="KK Pak Dharma">KK (Pak Dharma)</option>
                        <option value="KKPak Agung">KK (Pak Agung)</option>
                        <option value="PKK">PKK</option>
                        <option value="MPP">MPP</option>
                        <option value="Lainnya">Lainnya</option>
                    </select>
                    <label htmlFor="homework_deadline" className="dark:text-white sm:text-2xl">
                        Tanggal dikumpul
                    </label>
                    <input
                        type="date"
                        name="homework_deadline"
                        id="homework_deadline"
                        className="w-full"
                        required
                        value={notifData.dateline}
                        onChange={(e) => handleChange(e, 'dateline')}
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-2 text-white bg-second rounded-sm text-lg sm:text-2xl"
                    >   
                        {isLoading ? 'Loading' : 'Kirim'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default NotifForm;
