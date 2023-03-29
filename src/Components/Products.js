import React, { useState, useContext, useEffect } from 'react'
import { ProductsContext } from '../Global/ProductsContext'
import { useNavigate} from 'react-router-dom'
import {CartContext} from '../Global/CartContext'
import { LoginPopup } from './Auth/LoginPopup'


export const Products = () => {


    const {userAuth, getUserAuth, productCards, getProductCards} = useContext(ProductsContext)
    const navigate = useNavigate()
    
    const {dispatch} = useContext(CartContext)
    const [isModelOpen, setIsModelOpen] = useState(false)


    useEffect(()=> {
        getProductCards()
        getUserAuth()
    },[])

    const addCartHandler = (product) => {
        if (userAuth ) {
            dispatch({type:"ADD_TO_CART", product})

            navigate("/cart-product")
        } else {
            setIsModelOpen(true)
            console.log("Please log in")
        }



    }



    return (
        <div className='mb-5'>
            {/* {productCards.length !== 0 && <h2>Products</h2>} */}
            { isModelOpen  && 
                <LoginPopup isModelOpen={isModelOpen} setIsModelOpen={setIsModelOpen} /> 
            }
            <div className="row mt-4 g-4">
                {productCards.length === 0 ? (
                    <h3>wait a minute to display products</h3>
                ) : (productCards.map((product) => {
                    return (
                        <div key={product.id} className="col-12 col-sm-6 col-lg-4 text-center">
                            <div class="card">
                                <img class="card-img-top" 
                                src={product.productImageURL} alt=""
                                style={{height: "200px", objectFit: "fill"}}
                                />
                                <div class="card-body">
                                    <h5 class="card-title">{product.productName}</h5>
                                    <p class="card-text">${product.productPrice}</p>
                                    <button className='w-100 blu-button'
                                        onClick={() => addCartHandler(product)}>
                                        Add to cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                }))
                }
            </div>
        </div>
    )
}
