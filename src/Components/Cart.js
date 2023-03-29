import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {CartContext} from '../Global/CartContext'
import { Navbar } from './Navbar'
import {AiOutlinePlus} from 'react-icons/ai'
import {AiOutlineMinus} from 'react-icons/ai'
import {AiFillDelete} from 'react-icons/ai'


export const Cart = () => {

    const {shoppingCart, totalPrice , totalQty, dispatch } = useContext(CartContext)

    return (
        <div>
            <Navbar/>
            <div className="container">
                <div className='row my-5'>
                    {shoppingCart.map((product) => {
                            return (
                                <div key={product.id} className="col-12 col-sm-6 col-lg-4 text-center">
                                    <div class="card ">
                                        <img class="card-img-top" 
                                        src={product.productImageURL} alt=""
                                        style={{height: "200px", objectFit: "fill"}}
                                        />
                                        <div class="card-body d-flex flex-column gap-2">
                                            <h5 class="card-title  m-0">{product.productName}</h5>
                                            <p class="card-text m-0">${product.productPrice}</p>
                                            <div className='d-flex justify-content-center gap-4'>
                                                
                                                <div onClick={() => dispatch({type:"DEC", product})}
                                                    role='button' >
                                                        <AiOutlineMinus/>
                                                </div>
                                                <p class="card-text m-0">{product.totalProductQty}</p>
                                                <div onClick={() => dispatch({type:"INC", product})}
                                                    role='button'>
                                                        <AiOutlinePlus/>
                                                </div>
                                            </div>
                                            <p class="card-text m-0">${product.totalProductPrice}</p>
                                            <div onClick={() => dispatch({type:"REMOVE", product})}
                                            role='button'
                                            className='delete-cart'>
                                                    <AiFillDelete size={30}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                {shoppingCart.length > 0 && (
                    <div className='text-center d-flex flex-column align-items-center justify-content-center mb-5'>
                        <div class="card">
                            <div class="card-header">
                                <h4>Cart-summary</h4>
                            </div>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">Total Price: {totalPrice}</li>
                                <li class="list-group-item">Total Qty: {totalQty}</li>
                                <li class="list-group-item">
                                    <Link to='/cashout'>
                                        <button className='blu-button'>Cash on delivery</button>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
            )}
            </div>
        </div>
    )
}