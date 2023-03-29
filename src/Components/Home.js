import React from 'react'
import { Navbar } from "./Navbar";
import {Products} from './Products'


export const Home = () => {
    return (
        <div>
            <Navbar />
            <div className='container'>
                <Products />
            </div>
        </div>
    )
}
