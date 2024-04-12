import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from "react-router-dom"
import VideoModal from '../Components/VideoModal/VideoModal'
import LoadingModal from '../Components/LoadingModal/LoadingModal'
const NewRecipeSinglePage = () => {
    const { _id } = useParams()
    const [data, setData] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const handleOpenVideo = () => {
        setOpenModal(!openModal);
    }
    const keywordArray = data.keywords ? data.keywords.split(',') : [];
    useEffect(() => {
        const fetchData = async () => {
            const options = {
                method: 'GET',
                url: 'https://tasty.p.rapidapi.com/recipes/get-more-info',
                params: { id: _id },
                headers: {
                    'X-RapidAPI-Key': 'f8c30fb194mshbd6656c59861836p10230ejsn0db9c6d5cb04',
                    'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
                }
            };
            try {
                setLoading(true);
                const response = (await axios.request(options)).data;
                setData(response);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        }
        fetchData();
    }, [_id])
    return (
        <section className='pt-[10%]'>
            {loading ? <LoadingModal /> : <>
                {data &&
                    <>
                        <div className="container flex flex-col-reverse gap-6 px-6 py-10 mx-auto space-y-6 lg:h-[32rem] lg:py-16 lg:flex-row-reverse lg:items-center">
                            <div className="w-full lg:w-1/2">
                                <div className="lg:max-w-lg">
                                    {data.original_video_url && <button className='hover:bg-yellow-200 w-full block truncate mb-4 bg-yellow-300 px-6 py-2 text-center rounded-lg font-semibold text-yellow-900' onClick={handleOpenVideo}>
                                        Watch the procedure how to make this recipe.
                                    </button>}
                                    <h1 className="text-3xl font-bold tracking-wide text-yellow-900 lg:text-5xl">
                                        {data.name}
                                    </h1>
                                    <div className="mt-6">
                                        <ul className='flex flex-wrap gap-3'>
                                            {keywordArray.map((keyword, index) => (
                                                <li key={index}><p className='text-nowrap font-semibold px-4 py-2 bg-yellow-300 rounded-lg text-yellow-900'>{keyword.trim()}</p></li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-center w-full h-96 lg:w-1/2 ">
                                <img className="object-cover w-full h-[300px] sm:h-full mx-auto rounded-md lg:max-w-2xl" src={data.thumbnail_url} alt="glasses " />
                            </div>
                        </div>
                        <div className='container flex flex-col-reverse gap-12 px-6 py-10 mx-auto lg:flex-row '>
                            <div className='w-full lg:w-1/2'>
                                <h1 className='text-xl text-yellow-900 font-bold'>INSTRUCTIONS</h1>
                                <ul className='text-justify text-gray-700 mt-6'>
                                    {data.instructions?.map((instruction, index) => (
                                        <li key={instruction.id} className='mt-3'>
                                            <strong className="font-bold text-yellow-900">{index + 1}.</strong> {instruction.display_text}
                                        </li>
                                    ))}
                                </ul>

                            </div>
                        </div>
                        <VideoModal open={openModal} setOpen={setOpenModal} source={data.original_video_url} />
                    </>
                }

            </>}
        </section >
    )
}

export default NewRecipeSinglePage