import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {auth, db} from '../../Config/Config'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import {useNavigate} from "react-router-dom"
import { FirebaseError } from 'firebase/app'
import { Link } from 'react-router-dom'
import { addDoc, collection } from 'firebase/firestore'
import { Navbar } from '../Navbar'

export const Singup = () => {

    const {register, watch, handleSubmit, formState: {errors} } =  useForm()
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage ] = useState("")
    const onSubmit = async (data) => {
        createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredintial) => {
            const firestoreRef = collection(db, "SignedUpUsersData")
            addDoc(firestoreRef, {
                id:userCredintial.user.uid,
                username: data.username,
                email: data.email,
                password: data.password
            })
            navigate('/')
        })
        .catch((error) => {
            if ( error instanceof FirebaseError) {
                const errorCode = error.code
                if (errorCode === 'auth/email-already-in-use') {
                    setErrorMessage("The email you entered is already registered. Please try logging in or use a different email address.")
                }
            }
        }) 
    }

    return (
        <div className='signup'>
            <Navbar/>
            <div className='container d-flex align-items-center justify-content-center'>
            <form className='signup-form' onSubmit={handleSubmit(onSubmit)}>
                <div className='text-center'>
                    <h2>Signup</h2>
                </div>
                <div>
                    <label htmlFor="username">username</label>
                    <input type="text"
                        className='blu-input'
                        id="username"
                        name="username"
                        {...register('username', {
                            required: "Please enter your name",
                        })}
                        />
                        <p className={`error-message ${errors.username?.message ? "visible" : "invisible"}`}>
                            {errors.username?.message}.
                        </p>
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="text"
                        className='blu-input'
                        name="email"
                        id="email"
                        placeHolder="e.g. stephenking@lorem.com"
                        {...register("email", {
                            required: "Please Enter email",
                            pattern: {
                                value:/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i , 
                                message: "Enter a valid email"
                            }
                        })}/>
                        <p className={`error-message ${errors.email?.message ? "visible" : "invisible"}`}>
                            {errors.email?.message}.
                        </p>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="text"
                        className='blu-input'
                        id='password'
                        name='password'
                        {...register("password", {
                            required: "Please Enter Password",
                            minLength: {
                                value: 6,
                                message: "password must be at least 6 characters long"
                            }
                        })}
                        />
                    <p className={`error-message ${errors.password?.message ? "visible" : "invisible"}`}>
                        {errors.password?.message}.
                    </p>
                </div>
                <div>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="text"
                            className='blu-input'
                            id='confirmPassword'
                            name='confirmPassword'
                            {...register("confirmPassword", {
                                required: "Password must be confirmed",
                                validate: ((value) => {
                                    if ( watch("password") !== value) {
                                        return "Your passwords do no match"
                                    }
                                })
                            })}/>
                        <p className={`error-message ${errors.confirmPassword?.message ? "visible" : "invisible"}`}>
                            {errors.confirmPassword?.message}.
                        </p>
                </div>
                <div className='my-3'>
                    <button type='submit' className='blu-button w-100'>
                        Sign Up
                    </button>
                </div>
                <div className='text-center'>
                    <p className={`error-message ${errorMessage ? "visible" : "invisible"} `} >
                        {errorMessage}
                    </p>
                </div>
                <div>
                    <p className='m-0'>Already have an account? <Link to='/login'> login</Link> </p>
                </div>
            </form>
            </div>
        </div>
    )
}
