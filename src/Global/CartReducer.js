export const CartReducer = (state, action) => {

    const {shoppingCart, totalPrice, totalQty} = state; 

    let updatedTotalPrice
    let updatedQty
    let index
    let product

    switch (action.type) {
        case "ADD_TO_CART": 
            product = action.product
            console.log('the product is   ', product)
            console.log('the shoppingCart is', shoppingCart)
            const check = shoppingCart.find((item) => item.id === product.id)
            console.log("the check value is  ",check)
            if (check) {
                console.log("the product is already exist in your cart")
                return state
            } else {
                console.log("you can add the product to your cart")
                product["totalProductQty"] = 1
                product["totalProductPrice"] = product.productPrice
                updatedTotalPrice = totalPrice + product.productPrice
                updatedQty = totalQty + 1 
                return {
                    shoppingCart:[product, ...shoppingCart], totalPrice: updatedTotalPrice, totalQty: updatedQty
                }
            }
            break;
        case "INC" : 
            
            product = action.product
            console.log(product)
            product.totalProductQty +=1
            product.totalProductPrice = product.totalProductPrice + product.productPrice
            index = shoppingCart.findIndex((item) => product.id === item.id )
            shoppingCart[index] = product
            console.log(shoppingCart)
            updatedTotalPrice = totalPrice + product.productPrice
            updatedQty = totalQty  + 1
            return {
                shoppingCart:[...shoppingCart], totalPrice: updatedTotalPrice, totalQty:updatedQty
            }
            break;
        case "DEC" : 
            product = action.product
            product.totalProductQty -=1
            product.totalProductPrice = product.totalProductPrice - product.productPrice
            updatedTotalPrice = totalPrice - product.productPrice
            updatedQty = totalQty  - 1
            index = shoppingCart.findIndex(item => item.id === product.id)
            if (product.totalProductQty <= 0 ) {
                shoppingCart.splice(index,1)
            }
            return {
                shoppingCart:[...shoppingCart], totalPrice: updatedTotalPrice, totalQty:updatedQty
            }
            case "REMOVE": 
                product= action.product
                index= shoppingCart.findIndex(item => item.id === product.id)
                updatedTotalPrice = totalPrice - product.totalProductPrice
                updatedQty = totalQty - product.totalProductQty
                shoppingCart.splice(index,1)
                return {
                    shoppingCart:[...shoppingCart], totalPrice: updatedTotalPrice, totalQty:updatedQty
                }
            case "EMPTY" : 
                return {
                    shoppingCart: [], totalPrice: 0, totalQty:0
                }
        default: 
            console.log("jnasja")
            return state
    }
    
}
