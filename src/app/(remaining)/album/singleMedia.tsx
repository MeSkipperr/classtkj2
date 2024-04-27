// const MediaPlayer = ({fileName,userPost,tanggal,caption,like,comment}) => {
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaRegHeart ,FaHeart } from "react-icons/fa";
import { FaRegComment, FaPaperPlane } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useRouter  } from 'next/navigation'
import axios from "axios";
import { getSessionLogin } from "@/lib";
import { Toaster ,toast } from "sonner";

interface Comment {
    userName: string;
    userComment: string;
}
const MediaPlayer = ({data,setShowMedia}:{data:any,setShowMedia : any}) => {
    const [commentData, setCommentData] = useState(data.comment);

    const [showInsertComment, setShowInsertComment] = useState(false);
    const [showCommentBtn, setShowCommentBtn] = useState<boolean>(false);
    const router = useRouter();

    const [like, setLike] = useState(false);

    const changeLike = ()=>{
        setLike(!like);
    }
    const changeShowSingleMedia = ()=>{
        setShowMedia(false);
        router.push(`/album`);
    }

    useEffect(() => {
        const getCookie =async () => {
            try {
                const sessionData = await getSessionLogin();
                if (!sessionData||!sessionData.userName || !sessionData.auth || !sessionData.email) return
                setShowCommentBtn(true)
            } catch (error) {
                
            }
        }
        getCookie()
    }, []);

    const insertComment = ()=>{
        setShowInsertComment(!showInsertComment);
    }
    const serverUrl = process.env.NEXT_PUBLIC_API_SERVER_URL;   

    const [userComment, setUserComment] = useState('');

    const insertCommentDataBase = async () => {
        try {
            const sessionData = await getSessionLogin();
            const isData = {
                userComment,
                userName:sessionData?.userName,
                mediaID:data.mediaID
            }
            if(isData.userComment.trim() === '' || isData.userName.trim() === ''||!isData.mediaID){
                toast.error('Komentar tidak boleh kosong')  
                return  
            }
            const res = await axios.post(serverUrl+`api/insert/comment`,isData); 
            setCommentData([...commentData, isData]);
            toast.success('Event has been created')
            setUserComment('');
            setShowInsertComment(false)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };



        return ( 
            <div className="w-full min-h-[calc(100dvh-7rem)] bg-primary dark:bg-darkBg  flex flex-col justify-start  items-center mt-24   z-30 px-2 lg:px-6 relative">
            <Toaster richColors  position="top-right" className="my-24"/>
                <div className="w-full flex flex-row gap-2 relative py-2">
                    <div className="size-10 lg:size-16 border  rounded-full ">
                        {/* Photo Profile */}
                    </div>
                    <div className="flex flex-col justify-start"   >
                        <p  className="text-base dark:text-white lg:text-xl" >{data.userPost}</p>
                        <span className="text-xs dark:text-gray-500 lg:text-lg">{data.tanggal}</span>
                    </div>
                    <IoClose className="size-12 text-red-600 absolute right-0 top-0 cursor-pointer" onClick={changeShowSingleMedia}/>
                </div>
                <div className="w-full   lg:h-[calc(100%-5rem)]   flex lg:flex-row flex-col justify-center items-start lg:justify-center gap-2 ">
                    <FilterMedia fileName={data.fileName} />
                    <div className="w-full lg:w-1/3 dark:bg-darkBg h-full overflow-y-auto pb-28 lg:pb-0 ">
                        <div className="w-full flex flex-row gap-2">
                            <div className="size-11 dark:text-white flex flex-col    justify-center items-center text-sm" onClick={changeLike}>
                                {like?
                                <FaHeart  className="size-7 cursor-pointer" />
                                :
                                <FaRegHeart className="size-7 cursor-pointer" />
                                }
                                {data.like}
                            </div>
                            <div className={`size-11 dark:text-white  flex-col justify-center items-center text-sm ${showCommentBtn ? 'flex':'hidden'}`}
                            
                            onClick={insertComment}
                            >
                                <FaRegComment className="size-7 cursor-pointer" />
                                {commentData.length}
                            </div>
                        </div>
                        <p className="text-sm text-second py-2 lg:text-xl">Komentar</p>
                        {commentData.map((comment: Comment, index:number) => (
                            <div key={index} className="py-2 w-full">
                                <p className="text-sm dark:text-white pl-4 lg:text-lg">{comment.userName}</p>
                                <span className="text-sm text-gray-400 pl-2 lg:text-lg">{comment.userComment}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={`${showInsertComment?'flex':'hidden'} absolute w-full h-full bg-white dark:bg-darkBg lg:dark:bg-transparent  justify-center lg:items-center `} onClick={insertComment}>
                    <div className="w-full h-full lg:w-2/4 lg:h-3/4 bg-white dark:bg-darkBg px-2 sm:px-6  rounded-sm lg:flex lg:flex-col lg:justify-center" onClick={(e) => e.stopPropagation()}>
                        <textarea name="" id="" cols={30} rows={10} 
                        className="w-full h-1/4  lg:h-1/2" 
                        value={userComment}
                        onChange={(e)=>setUserComment(e.target.value)}
                        ></textarea>
                        <div className="w-full flex justify-end gap-2">
                            <button className="flex justify-center items-center text-4xl bg-red-500 text-white size-10" onClick={insertComment}><IoClose/></button>
                            <button className="flex justify-center items-center text-2xl bg-third text-white size-10" onClick={insertCommentDataBase}><FaPaperPlane /></button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
    const FilterMedia = ({fileName}:{fileName:string}) => {
        const serverUrl = process.env.NEXT_PUBLIC_API_SERVER_URL;
    
        const videoExtensions = ['mp4', 'mov', 'avi'];
    
        const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    
        const src = `${serverUrl}api/media/${fileName}`;

        const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

        const handleLoadedMetadata = (event:any) => {
            const { videoWidth, videoHeight } = event.target;
            setDimensions({ width: videoWidth, height: videoHeight });
        };

        const handleImageLoad = (event:any) => {
            const { width, height } = event.target;
            setDimensions({ width, height });
        };

        const dimensionsClass = ()=>{
            const {width,height} = dimensions;

            if(width === 0 && height === 0) return ''
            if(width === height) return 'lg:w-3/4 lg:h-full'
            if(width > height) return 'lg:w-3/4 lg:h-auto'
            if(width < height) return 'lg:h-1/2 lg:w-1/2'
        }
    
        if (fileName && fileName !== "") {
            const fileExtension = fileName.split('.').pop()?.toLowerCase();
            if (fileExtension) {
                if (videoExtensions.includes(fileExtension)) {
                    return ( 
                        <video
                        className={`size-full  ${dimensionsClass()} aspect-square object-contain cursor-pointer `}
                        autoPlay
                        controls
                        onLoadedMetadata={handleLoadedMetadata}
                        >
                        <source src={`${serverUrl}api/media/${fileName}`} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        
                    )
                } else if (imageExtensions.includes(fileExtension)) {
                    return (
                        <Image
                        loader={() => src} src={src}
                        className={`size-full ${dimensionsClass()} aspect-square lg:aspect-auto object-contain cursor-pointer relative`}
                        alt={fileName}
                        width={300} // Set your desired width
                        height={200} // Set your desired height
                        onLoad={handleImageLoad}
                        unoptimized 
                        priority
                    />
                    )
                }
            }
        }
    }
    
    
    export default MediaPlayer;
