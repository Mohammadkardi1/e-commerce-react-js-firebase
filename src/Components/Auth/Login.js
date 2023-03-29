import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {auth} from "../../Config/Config"
import { signInWithEmailAndPassword  } from 'firebase/auth'
import {useNavigate} from "react-router-dom"
import { FirebaseError } from 'firebase/app'
import { Link } from 'react-router-dom'
import { Navbar } from '../Navbar'

export const Login = () => {
    const {register, handleSubmit, formState: {errors}} = useForm()
    const navigate = useNavigate()
    const [logInError, setLogInError] = useState("")
    const onSubmit = async (data) => {

        try {
            const userCredintial = await signInWithEmailAndPassword(auth, data.email, data.password)
            const user = userCredintial.user
            navigate('/')
        } catch (error) {
            if (error instanceof FirebaseError) {
                const errorCode = error.code
                if (errorCode === 'auth/wrong-password') {
                    setLogInError("Your email or password is incorrect. Please try again or reset your password.")
                } else if (errorCode === 'auth/user-not-found') {
                    setLogInError("The email you entered is not registered. Please verify your email or sign up if you're new to our service.")
                }
            }
        }
    }
    return (
        <div className="login">
            <Navbar/> 
            <div className='container d-flex align-items-center justify-content-center'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='text-center'>
                        <h2>Login</h2>
                    </div>
                    <div>
                        <label htmlFor="email">email</label>
                        <input typr="text"
                            className='blu-input'
                            id="email"
                            name="email"
                            placeholder="e.g. Stephen King"
                            {...register("email",{
                                required: "Enter your email",
                                pattern: {
                                    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i, 
                                    message: "Please enter a valid email"
                                }
                            })}
                            />
                        <p className={`error-message ${errors.email?.message ? "visible" : "invisible"}`}>
                            {errors.email?.message}.
                        </p>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="text"
                            className='blu-input'
                            name='password'
                            id="password"
                            {...register("password", {
                                required: "Enter your password"
                            })}/>
                        <p className={`error-message ${errors.password?.message ? "visible" : "invisible"}`}>
                            {errors.password?.message}.
                        </p>
                    </div>
                    <div>
                        <button type='submit'
                        className='w-100 blu-button my-3'>
                            Login
                        </button>
                    </div>
                    <div className='text-center'>
                        <p className={`error-message ${logInError ? "visible" : "invisible"}`}>
                            {logInError}
                        </p>
                    </div>
                    <div className='d-flex justify-content-between gap-5'>
                    <Link to='/signup'>Register</Link>
                    <Link to='/forgetPassword'>Forget Password?</Link> 
                    </div>
                </form>
            </div>
        </div>
    )
}
