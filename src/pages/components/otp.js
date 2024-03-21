import Link from 'next/link'
import React, { useState, useEffect } from "react";
import axios from 'axios'
import Environment from '@/utils/Enviroment'
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const Otp = () => {
    const api_url = Environment.api_url;
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [emailerrorregister, setEmailErrorRegister] = useState("");
    const [errorpassword, setErrorPassword] = useState("");
    const [error, setError] = useState(null);
    const [showPass, setShowPass] = useState("password");

    return (
        <>
            <section className="login-section">
                <span className='gradient-linear'></span>
                <div className="parent">
                    <img src="\login-logo.svg" alt="img" className='img-fluid login-logo' />
                    <div className="main-card">
                        <div className="main-heading">
                            <h6>Verify</h6>
                            <p>Your code was sent to you via email</p>
                        </div>
                        <div className="option-field">
                            <label>Enter your OTP</label>
                            <input style={{ paddingRight: "22px" }} type="text" placeholder='Enter your OTP' />
                        </div>
                        <a className='btn-sign'>Verify</a>
                        <Link href="" className='btn-forgot'><span style={{ color: "#fff" }}>Don&apos;t receive code? &nbsp; </span> Request again </Link>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Otp
