import React, { useEffect, useState, useContext } from 'react'
import navIcon from '../Images/icon-trolley.png'
import {AiOutlineShoppingCart} from "react-icons/ai"
import { Link, useNavigate } from 'react-router-dom'
import {signOut  } from 'firebase/auth'
import {auth} from '../Config/Config'
import { ProductsContext } from '../Global/ProductsContext'
import { CartContext } from '../Global/CartContext'
import { LoginPopup } from './Auth/LoginPopup'
import {RxHamburgerMenu} from 'react-icons/rx'



export const Navbar = () => {

    const {userAuth, getUserAuth, username, setUsername}  = useContext(ProductsContext)
    const [isburgOpnen, setIsburgOpnen] = useState (false)
    const [isModelOpen, setIsModelOpen] = useState(false)
    const {totalQty} = useContext(CartContext)
    const navigate = useNavigate()

    useEffect(() => {
        getUserAuth()
    },[auth])

    const handleSignOut = async () => {
        try {
            await signOut(auth)
            console.log("you have signed out successfully")
        } catch (error) {
            console.log(error)
        }
    }

    const ShoppingCartHandler = () => {
        if (userAuth ) {
            navigate("/cart-product")
        } else {
            setIsModelOpen(true)
        }
    }
    return (
        <div className='com-navbar py-3 mb-3'>
            { isModelOpen  && 
                <LoginPopup isModelOpen={isModelOpen} setIsModelOpen={setIsModelOpen} /> 
            }
            <div className="container">
                <div className='row navbar-content g-0'>
                        <div className="col-6 left-side d-flex">
                            <Link to="/" className='d-flex gap-1 text-decoration-none'>
                                <img src={navIcon} alt=""/>
                                <h2 className='m-0 align-self-center'>Brand</h2>
                            </Link>
                        </div>
                        <div className='col-6 d-block d-md-none text-end text-end'>
                            <div className='d-flex align-items-center justify-content-end gap-3 h-100'>
                                <div className='d-none d-md-block'>
                                    {userAuth ? (
                                        <p className='m-0 '>{username}</p>
                                ) : null }
                                </div>
                                <div className='position-relative p-2 trolley order' 
                                            onClick={() => ShoppingCartHandler() }>
                                                <AiOutlineShoppingCart size={30} />
                                                {userAuth && 
                                                <div className=''>
                                                    <p className='m-0 text-decoration-none no-products'>{totalQty}</p>
                                                </div>
                                                }
                                </div>
                                <div className='d-block d-md-none burger-menu'
                                    role='button'
                                    onClick={() => setIsburgOpnen(!isburgOpnen)}>
                                    <RxHamburgerMenu/>
                                </div>
                            </div>
                        </div>
                        <div className={`isburgOpnen col-12 col-md-6 d-md-flex align-items-center 
                        justify-content-start justify-content-md-end gap-2 mt-3 mt-md-0
                        ${isburgOpnen ? "d-block" : "d-none"}`}
                            >
                            <div className=''>
                                {userAuth ? (
                                    <p className='m-0 '>{username}</p>
                                ) : null }
                            </div>
                            <div className='position-relative p-2 trolley d-none d-md-block' 
                                onClick={() => ShoppingCartHandler() }>
                                    <AiOutlineShoppingCart size={30} />
                                    {userAuth && 
                                    <div className=''>
                                        <p className='m-0 text-decoration-none no-products'>{totalQty}</p>
                                    </div>
                                    }
                            </div>
                            {userAuth ? (
                                    <div>
                                        <button onClick={() => handleSignOut()}
                                            className={`mt-2 mt-md-0 ${isburgOpnen ? "black-button" : "blu-button"}`}>
                                            LOG OUT
                                        </button>
                                    </div>
                                ) : ( 
                                    <div className='d-flex flex-column flex-md-row gap-3 gap-md-2'>
                                        <Link to="/login">
                                            <button className={`${isburgOpnen ? "black-button" : "blu-button"}`}>
                                                LOGIN
                                            </button>
                                        </Link>
                                        <Link to="/signup">
                                            <button className={`${ isburgOpnen ? "black-button" : "blu-button"}`}>
                                                SIGN UP
                                            </button>
                                        </Link>
                                    </div>
                                )}
                        </div>
                </div>
            </div>
        </div>
    )
}
