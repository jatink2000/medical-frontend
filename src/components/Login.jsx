import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login1.css';
import Swal from 'sweetalert2';
import logoimage from "../images/Logo.png"
import axios from 'axios';

const Login = () => {
    let Navigate = useNavigate();
    const [data, setdata] = useState([]);
    const printData = (e) => {
        setdata({ ...data, [e.target.name]: e.target.value });
    };

    const login = (e) => {
        e.preventDefault();

        axios.get("https://medical-backend-phi.vercel.app/login").then((res)=>{
            if(res.data.status){
                let userdata=res.data.alldata
                let filterData = userdata.filter((items) => {
                    if (data.email === items.email && data.password === items.password) {
                        localStorage.setItem("logged", true);
                        return items;
                    }
                });
                let user = filterData[0];
                if (filterData[0]) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Login Successful!',
                        confirmButtonText: 'Okay',
                    }).then(() => {
                        Navigate('/Home');
                        // localStorage.setItem("currentuser", JSON.stringify(user))
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'User does not exist or credentials are incorrect!',
                        confirmButtonText: 'Try Again',
                    });
                }
            }
        })



        // let filterData = userdata.filter((items) => {
        //     if (data.email === items.email && data.password === items.password) {
        //         localStorage.setItem("logged", true);
        //         return items;
        //     }
        // });
        // let user = filterData[0];
        // if (filterData[0]) {
        //     Swal.fire({
        //         icon: 'success',
        //         title: 'Login Successful!',
        //         text: `Welcome Back ${filterData[0].name}!`,
        //         confirmButtonText: 'Okay',
        //     }).then(() => {
        //         Navigate('/Home');
        //         // localStorage.setItem("currentuser", JSON.stringify(user))
        //     });
        // } else {
        //     Swal.fire({
        //         icon: 'error',
        //         title: 'Oops...',
        //         text: 'User does not exist or credentials are incorrect!',
        //         confirmButtonText: 'Try Again',
        //     });
        // }
    };

    
    return (
        <>
            <div className='login'>
                <div className="container">
                    <div className='loginlogo'>
                        <img src={logoimage} alt='logoimage' />
                    </div>
                    <h1>Sign in</h1>
                    <p>Stay updated on your professional world</p>
                    <input type="text" placeholder="Email or Phone" name='email' onChange={printData}/>
                    <div className="password-container">
                        <input type="password" placeholder="Password" name='password' onChange={printData}/>
                    </div>
                    <button onClick={login}>Sign in</button>
                </div>
            </div>
        </>
    );
};

export default Login;
