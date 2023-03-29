import { createContext, useReducer } from "react"
import { CartReducer } from "./CartReducer" 

const CartContext = createContext()


const CartContextProvider = ({children}) => {

    const [cart, dispatch] = useReducer(CartReducer, {shoppingCart:[], totalPrice:0 , totalQty:0})

    return (
        <CartContext.Provider value={{...cart, dispatch}}>
            {children}
        </CartContext.Provider>
    )

}

export {CartContext, CartContextProvider}