import React, {useContext} from 'react'
import {CartContext} from '../Global/CartContext'
import { ProductsContext } from '../Global/ProductsContext'
import { Navbar } from './Navbar'

export const Cashout = () => {

    const {totalPrice, totalQty} = useContext(CartContext)
    const {username,email} = useContext(ProductsContext)

    return (
        <div>
            <Navbar/>
            <div className="container  d-flex align-items-center justify-content-start">
                <form className='d-flex flex-column gap-3 mb-5'>
                    <div className='text-start'>
                        <h2>Cashout</h2>
                    </div>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input type="text"
                            className='blu-input'
                            value={username} 
                            disabled/>
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="text" 
                            className='blu-input'
                            value={email}
                            disabled />
                    </div>
                    <div>
                        <label htmlFor="cell">Cell No</label>
                        <input type="number"
                            className='blu-input'
                            placeholder='eg 03123456789'/>
                    </div>
                    <div>
                        <label htmlFor="Delivery Address">Delivery Address</label>
                        <input type="text"
                            className='blu-input'/>
                    </div>
                    <div>
                        <label htmlFor="Price To Pay">Price To Pay</label>
                        <input type="text" 
                            value={totalPrice}
                            className='blu-input'
                            disabled />
                    </div>
                    <div>
                        <label htmlFor="Total No of Products">Total No of Products</label>
                        <input type="text" 
                        className='blu-input'
                        value={totalQty} 
                        disabled />
                    </div>
                    <div>
                        <button className='blu-button w-100'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
