import FooterBG from '../assets/lightFooter.svg';
import FooterBGDark from '../assets/darkFooter.svg';
import Image from 'next/image';


const Footer = ({ mode }: { mode?:Boolean })=>{
    return(
        <>
        <Image src={mode ? FooterBGDark : FooterBG} alt='footer background'  className='w-full'  />
        <div className="h- w-full bg-[#ececec] dark:bg-[#101012] flex flex-col justify-center items-center pb-24">
            <div className="flex justify-between sm:justify-beetwen lg:justify-start items-center px-4 mb-4 lg:mb-10">
                <div className="lg:w-1/2 lg:flex lg:items-center lg:flex-col">
                    <p className="dark:text-white text-xl font-semibold sm:text-4xl ">Teknik</p>
                    <p className="dark:text-white text-xl font-semibold sm:text-4xl ">Komputer &</p>
                    <p className="dark:text-white text-xl font-semibold sm:text-4xl ">Jaringan 2</p>
                </div>
                <div className="flex flex-col lg:px-12">
                        <p className="dark:text-white text-lg sm:text-3xl">Tautan</p>
                        <a className=" pl-1 text-[#A2A9B4] text-sm sm:text-xl" href="/">Beranda</a>
                        <a className=" pl-1 text-[#A2A9B4] text-sm sm:text-xl" href="">Kenangan</a>
                        <a className=" pl-1 text-[#A2A9B4] text-sm sm:text-xl" href="">Notifitkasi</a>
                        <a className=" pl-1 text-[#A2A9B4] text-sm sm:text-xl" href="">User</a>
                    </div>
                    <div className="flex flex-col lg:px-12">
                        <p className="dark:text-white text-lg sm:text-3xl">Quotes</p>
                        <p className='pl-1 text-[#A2A9B4] text-sm sm:text-xl'>Raihlah impianmu.</p>
                        <p className='pl-1 text-[#A2A9B4] text-sm sm:text-xl'>Doa dan usaha.</p>
                    </div>
            </div>
            <a href='https://ikadekyolaandika.vercel.app/' target='blank' className='dark:text-white text-sm sm:text-xl text-center'>Dibuat dengan ❤️ oleh <u>I Kadek Yola Andika</u> menggunakan<span className="text-second"> Next Typescript & Tailwind Css</span></a>
        </div>
        </>
    )
}

export default Footer