"use client"
import React, { useState, ChangeEvent } from "react";

type SelectChangeEvent = ChangeEvent<HTMLSelectElement>;

const NotifForm = () => {
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

    return (
        <div className="dark:bg-darkBg w-full h-dvh flex flex-col justify-center items-center p-2">
            <div className="bg-[#ecececcc] dark:bg-[#101012cc] w-full rounded-sm px-2 py-8 lg:w-2/4 lg:px-8 lg:py-12 shadow-[0_3px_10px_rgb(0,0,0,0.2)] ">
                <form action="" className="flex flex-col gap-2">
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
                    >
                        <option value="" disabled>
                            Mata Pelajaran
                        </option>
                        <option value="bahasa_indonesia">Bahasa Indonesia</option>
                        <option value="bahasa_inggris">Bahasa Inggris</option>
                        <option value="bahasa_bali">Bahasa Bali</option>
                        <option value="matematika">Matematika</option>
                        <option value="sejarah">Sejarah</option>
                        <option value="ppkn">PPKN</option>
                        <option value="olahraga">Olahraga</option>
                        <option value="agama_hindu">Agama Hindu</option>
                        <option value="kk_pak_ibam">KK (Pak Ibam)</option>
                        <option value="kk_pak_dharma">KK (Pak Dharma)</option>
                        <option value="kk_pak_agung">KK (Pak Agung)</option>
                        <option value="pkk">PKK</option>
                        <option value="mpp">MPP</option>
                    </select>
                    <label htmlFor="homework_deadline" className="dark:text-white sm:text-2xl">
                        Tanggal dikumpul
                    </label>
                    <input
                        type="date"
                        name="homework_deadline"
                        id="homework_deadline"
                        className="w-full"
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
