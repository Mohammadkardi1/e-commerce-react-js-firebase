import React, {useState, createContext} from 'react'
import { collection, onSnapshot, orderBy,where, query, getDocs } from 'firebase/firestore'
import { db, auth } from '../Config/Config'
import { onAuthStateChanged } from 'firebase/auth'

// first step: you have to create context
const ProductsContext = createContext();


// second step: you have to create provider 
const ProductsContextProvider = ({children}) => {

    const [userAuth, setUserAuth] = useState(null)
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState('')

    const getUserAuth = async () => {
        const unsubscribe = await onAuthStateChanged(auth, (user) => {
            setUserAuth(user)
            const collectionRef = collection(db, 'SignedUpUsersData');
            const queryRef = query(collectionRef, where('id', '==', user.uid));
            getDocs(queryRef)
            .then((querySnapshot) => {
                if (querySnapshot.size > 0) {
                  // Document found
                    const document = querySnapshot.docs[0];
                    // console.log('Document data:', document.data().username);
                    setUsername(document.data().username)
                    setEmail(document.data().email)
                } else {
                  // Document not found
                    console.log('No matching documents');
                }
            })
        })
    }

    const [productCards, setProductCards ] = useState([])
    const getProductCards = () => {
        const firestoreRef = collection(db, "products")
        const queriedCollection = query(firestoreRef, orderBy("createdAt", "desc"))
        onSnapshot(queriedCollection, (snapshot) => {
            const products = snapshot.docs.map((doc) => ({
                id: doc.id ,...doc.data()
            }))
            setProductCards(products)
        })
    }

    const value = {
        productCards,
        getProductCards,
        userAuth,
        getUserAuth,
        username,
        setUsername,
        email, 
        setEmail
        }

    return (
        // value which I want to store and make it accessable to all components inside the project
        <ProductsContext.Provider value={value}>
            {children}
        </ProductsContext.Provider>
    )
}

// third step: export each of provider and context variable
export {ProductsContextProvider, ProductsContext }
