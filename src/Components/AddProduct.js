import React, { useState, useContext } from 'react'
import {useForm} from "react-hook-form"
import {storage, db} from '../Config/Config'
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import {collection, addDoc } from "firebase/firestore"
import { Timestamp } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProductsContext } from '../Global/ProductsContext';
import { Navbar } from './Navbar';


export const AddProduct = () => {

    const {register, reset , handleSubmit, formState : {errors}, } = useForm()
    const [prograss, setPrograss] = useState(0)


    const validateImageType = (value) => {
        if (!value[0]) {
          // No file selected
            return true;
        }
        const file = value[0];
        const types = ['image/jpeg', 'image/png']
        if ( ! types.includes(file.type)  ) {
          // Invalid file type
        return 'Please upload a valid image file JPG or PNG';
        }
        // Valid file type
        return true;
    }

    const submithandler = async (data) => {
        // upload the iamge to firebase storage
        const storageRef =  ref(storage, `/productImages/${data.productImage[0].name}`)
        const uploadImage = uploadBytesResumable(storageRef, data.productImage[0])

        uploadImage.on("state_changed",
        (snapshot) => {
            const prograssPercent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
            setPrograss(prograssPercent)
        }, 
            (error) => {
                console.log(error)
            }, 
            () => {
                // Get the URL of the image which is stored in firebase storage
                // and then store URL in the firestore besides productName and productPrice
                getDownloadURL(uploadImage.snapshot.ref)
                .then((url) => {
                    const firestoreRef = collection(db, "products")
                    addDoc(firestoreRef, {
                        productName: data.productName,
                        productPrice: Number(data.productPrice),
                        productImageURL: url,
                        createdAt: Timestamp.now().toDate(),
                    })
                    .then(() => {
                        toast.success('The new product was successfully added!', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                            });
                        reset()
                        setPrograss(0)
                    })
                    .catch((error) => {
                        toast.error('An unknown error occurred and the new product was not added.', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                            });
                        reset()
                    })
                });
            }
        )
    }

    return (
        <div>
            <Navbar/>

            <div className='container add-product'>
                <h2 className='text-uppercase'>add products</h2>
                <form onSubmit={handleSubmit(submithandler)} className="add-product-form">
                    <div>
                        <label htmlFor="productName"> 
                            Product Name
                            <span className={`fw-bold error-message ${errors.productName?.message ? "visible" : "invisible"} `}> *</span>
                        </label>
                        <input type="text"
                            className='blu-input'
                            id="productName"
                            name="productName"
                            {...register("productName", {
                                required: "Please enter the name of the product"
                            })}
                        />
                            <p 
                                className={`error-message ${errors.productName?.message ? "visible" : "invisible"}`}>
                                {errors.productName?.message}!
                            </p>
                    </div>
                    <div>
                        <label htmlFor="productPrice">
                            Product Price 
                            <span className={`fw-bold error-message ${errors.productPrice?.message ? "visible" : "invisible"} `}> *</span>
                        </label>
                        <input type="text"
                            className='blu-input'
                            name='productPrice'
                            id='productPrice'
                            {...register("productPrice", {
                                required: "Please enter the price of the product",
                                pattern: {
                                    value: /^[0-9]*$/,  
                                    message: "Please enter a valid price"
                                } 
                            })}
                        />
                        <p className={`error-message ${errors.productPrice?.message ? "visible" : "invisible"}`}>
                            {errors.productPrice?.message}!
                        </p>
                    </div>
                    <div>
                        <input type="file"
                            name="productImage"
                            id='productImage'
                            accept='image/*'
                            {...register("productImage", {
                                required: "Please enter the iamge of the price",
                                validate: validateImageType
                            }
                            )}
                            
                        />
                        {errors.image && <span>Please upload a valid image file (jpg or png)</span>}
                        <p className={`error-message ${errors.productImage?.message ? "visible" : "invisible"}`} >
                            {errors.productImage?.message}!
                        </p>
                    </div>
                    {
                        prograss === 0 ? null : (
                            <div class="progress">
                                <div class="progress-bar progress-bar-striped" 
                                    role="progressbar" 
                                    style={{width: `${prograss}%`}} 
                                    aria-valuenow="10" 
                                    aria-valuemin="0" 
                                    ria-valuemax="100"
                                    >
                                    {`uploading image ${prograss}%`}
                                </div>
                            </div>
                        )
                    }
                    <div>
                        <button type='submit'
                            className='text-uppercase blu-button'>
                                add product
                        </button>
                    </div>
                </form>
                <ToastContainer />
            </div>
        </div>
    )
}
