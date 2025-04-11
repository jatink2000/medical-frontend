import React, { useState } from 'react';
import './SignUp1.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function SignUp() {
    let navigate = useNavigate()
    const [data, setdata] = useState({})
    const print = (e) => {
        setdata({ ...data, [e.target.name]: e.target.value })
    }
    const Signup = (e) => {
        e.preventDefault()
        axios.post("https://medical-backend-phi.vercel.app/signup",{data})
        .then((res)=>{
            if(res.data.status){
                alert("signup")
            }
            else{
                alert("failed")
            }
        })
    }

    return (
        <>
            <div className="wrap">
                <div className="signup-container">
                    <div className="left-img">
                        <img src="signup-g.svg" alt="" />
                    </div>
                    <div className="form-wrapper">
                        <h2>Create Your <span className='span'>Account</span> </h2>
                        <form >
                            <div className="input-group">
                                <input type="text" placeholder="Name" required name='name' onChange={print} />
                            </div>
                            <div className="input-group">
                                <input type="email" placeholder="Email" name='email' onChange={print} />
                            </div>
                            <div className="input-group">
                                <input type="password" placeholder="Password" name='password' onChange={print} />
                            </div>
                            <button type="button" onClick={Signup} className="submit-button">
                                Register
                            </button>
                            <p className="already-account">
                                Already have an account? <a href="/">Sign In</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignUp;
