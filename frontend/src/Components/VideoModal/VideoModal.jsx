import React, { useRef } from 'react'
import "./VideoModal.css"
const VideoModal = ({ open, setOpen, source }) => {
    const handleCloseModal = () => {
        setOpen(!open)
        handlePause()
    }
    const videoRef = useRef(null);

    const handlePause = () => {
        if (videoRef.current) {
            videoRef.current.pause();
        }
    };
    return (
        <>
            <div className={`${open ? "block" : "hidden"} h-[100vh] w-[100vw] fixed top-0 left-0 z-30 bg-white backdrop-filter backdrop-blur-lg bg-opacity-30`} onClick={handleCloseModal}>
            </div>
            <div className='modal px-6'>
                <div className={`${open ? "block" : "hidden"} bg-yellow-300 shadow-xl rounded-xl py-6 px-6 md:px-[200px] w-[350px] mx-auto md:w-[900px]`}>
                    <video ref={videoRef} id='video' src={source} controls></video>
                </div>
            </div>
        </>
    )
}

export default VideoModal