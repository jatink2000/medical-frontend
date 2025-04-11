import React, { useEffect, useState } from 'react';
import './Home1.css';
import Navbar from './Navbar';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Home = () => {

    let [productdata,setproductdata]=useState([])

    let totalstock = productdata.reduce((total, item) => {
        return total + eval(item.stock);
    }, 0);

    useEffect(()=>{
        allproduct()
    },[])

    let allproduct=()=>{
        axios.get("https://medical-backend-phi.vercel.app/allproduct").then((res)=>{
            if(res.data.status){
                setproductdata(res.data.productdata)
            }
        }).catch((err)=>{
            console.log(err)
        })
    }

    return (
        <>
            <Navbar />
            <div className='dashboard'>
                <div className="container">
                    <div className="card-container">
                        <div className="card">
                        <Link to={"/allproductlist"}>
                        <h2><i class="fa-solid fa-store"></i> {totalstock}</h2>
                        <p id="total-stock">Total-Stock</p>
                        </Link>
                            
                        </div>
                        <div className="card">
                            <h2>Monthly Income</h2>
                            <p id="total-stock">₹45,000</p>
                        </div>
                        <div className="card">
                            <h2>today Income</h2>
                            <p id="total-stock">₹450</p>
                        </div>
                    </div>

                    <div className="card-container">
                        <div className="card">
                            <h2>Total Customer</h2>
                            <p id="total-stock">45</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
