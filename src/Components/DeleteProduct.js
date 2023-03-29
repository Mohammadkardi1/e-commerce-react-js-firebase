import React from 'react'
import {RiDeleteBin5Fill} from "react-icons/ri"
import { deleteDoc, doc } from 'firebase/firestore'
import {db, storage} from '../Config/Config'
import { deleteObject, ref } from 'firebase/storage'
import { toast } from 'react-toastify'



export const DeleteProduct = ({id, productImageURL}) => {
    const handlerDelete = async () => {
        try {
            // delete element from firestore
            await deleteDoc(doc(db, "products" , id))
            toast.success("the product has been deleted")
            // Get the image which is stored in firebase storage by its url and delete it
            const storageRef = ref(storage, productImageURL)
            await deleteObject(storageRef)
        } catch (error) {
            toast.error("unknow error may ocuured")
            
        }        
    }
    return (
        <div>
            <RiDeleteBin5Fill  onClick={handlerDelete}/>
        </div>
    )
}