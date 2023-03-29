import React from 'react'
import {AiOutlineClose} from 'react-icons/ai'
import { Link } from 'react-router-dom'

export const LoginPopup = ({isModelOpen, setIsModelOpen}) => {

    return (
        <div className='login-popup d-flex align-items-center justify-content-center'>
            <div className="overlay"></div>
            <div className='popup-content p-3 d-flex flex-column gap-3'>
                <div className='text-end'
                    role="button"
                    onClick={() => setIsModelOpen(!isModelOpen)}>
                    <AiOutlineClose/>
                </div>
                <div>
                    <p className='m-0'>Please log in before selecting items.</p>
                </div>
                <div className='d-flex justify-content-end gap-1'>
                    <Link to='/login'>
                        <button className='blu-button'>
                            login
                        </button>
                    </Link>
                    <button onClick={() => setIsModelOpen(!isModelOpen)}
                        className="blu-button" style={{backgroundColor: "hsl(354, 84%, 57%)"}}>
                        clsoe
                    </button>
                </div>
            </div>
        </div>
    )
}
