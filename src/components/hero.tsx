const HeroSection = ({ mode }: { mode?:Boolean })=>{
    
    return(
        <div className=" bg-white w-full h-full relative flex dark:bg-darkBg">
            <div className="h-full  hidden lg:flex">
                <div className="h-full w-40 flex flex-col justify-center items-center ">
                    <h1 className="text-[8rem] text-[#ececec] dark:text-[#101012] rotate-90">T</h1>
                    <h1 className="text-[8rem] text-[#ececec] dark:text-[#101012] rotate-90">K</h1>
                    <h1 className="text-[8rem] text-[#ececec] dark:text-[#101012] rotate-90">J</h1>
                    <h1 className="text-[8rem] text-[#ececec] dark:text-[#101012] rotate-90">2</h1>
                </div>
                <div className="h-full bg-[#ececec] dark:bg-[#101012cc]   w-20"></div>
            </div>
            <div className={`${mode ? 'bgHerodark' : 'bgHero'} flex flex-col relative justify-center items-start mx-4 lg:mx-0 z-40 pb-16 sm:pl-12 lg:pl-0 sm:pb-24 `}>
                <h1 className="dua absolute text-[10rem] sm:text-[24rem] text-[#ececec]  pb-28 dark:text-[#101012]">2</h1>
                <h1 className="z-10 text-second text-4xl sm:text-6xl">Teknik </h1>
                <h1 className="z-10 text-second text-4xl sm:text-6xl">Komputer &</h1>
                <h1 className="z-10 text-second text-4xl sm:text-6xl">Jaringan</h1>                
                <p className="z-10 dark:text-white text-lg sm:text-3xl">Website resmi TKJ 2 SMKN 1 Kuta Selatan angkatan </p>
                <button className="bg-third text-white mt-2 py-2 sm:mt-6 px-4 rounded-sm sm:text-3xl sm:px-8 sm:py-4 sm:rounded-md">Jelajahi</button>
            </div>
        </div>
    )
}
export default HeroSection;