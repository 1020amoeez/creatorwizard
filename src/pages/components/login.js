import Link from 'next/link'
import React, { useState, useEffect } from "react";
import axios from 'axios'
import Environment from '@/utils/Enviroment'
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const Login = () => {
    const api_url = Environment.api_url;
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [emailerrorregister, setEmailErrorRegister] = useState("");
    const [errorpassword, setErrorPassword] = useState("");
    const [error, setError] = useState(null);
    const [showPass, setShowPass] = useState("password");

    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

    const userLogin = (e) => {
        if (email.length === 0) {
            setEmailErrorRegister("Email is Required");
        } else if (!isValidEmail(email)) {
            setEmailErrorRegister("Email is invalid");
        }
        if (password.length === 0) {
            setErrorPassword("Password is Required");
        } else {
            var data = JSON.stringify({
                email: email,
                password: password,
                rememberMe: rememberMe,
            });
            var config = {
                method: "post",
                url: `${api_url}/auth/creators/signin`,
                headers: {
                    "Content-Type": "application/json",
                },
                data: data,
            };
            axios(config)
                .then(function (response) {
                    const resData = response?.data?.data;
                    localStorage.setItem("accessToken", resData?.accessToken);
                    localStorage.setItem("refreshToken", resData?.refreshToken);
                    localStorage.setItem("userId", resData?.user?._id);
                    router.push("/collectiondashbord")
                })
                .catch(function (error) {
                    if (
                        email.length > 0 &&
                        isValidEmail(email) &&
                        password.length > 0
                    ) {
                        setError("Incorrect email or password!");
                    }
                });
        }
    };
    return (
        <>
            <section className="login-section">
                <span className='gradient-linear'></span>
                <div className="parent">
                    <img src="\login-logo.svg" alt="img" className='img-fluid login-logo' />
                    <div className="main-card">
                        <div className="main-heading">
                            <h6>Sign In</h6>
                            <p>Enter your credentials to access your account</p>
                        </div>
                        <div className="option-field">
                            <label>Email</label>
                            <input style={{ paddingRight: "22px" }} autoComplete="off" value={email} onChange={(e) => { setEmail(e.target.value); setEmailErrorRegister(""); setError("") }} type="text" placeholder='Your email...' />
                            <div>
                                {emailerrorregister ? (
                                    <p className="text-danger mt-2">{emailerrorregister}</p>
                                ) : null}
                            </div>
                        </div>
                        <div className="option-field">
                            <label>Password</label>
                          <div className="twice-inputeye">
                          <input value={password} autoComplete="off" onChange={(e) => { setPassword(e.target.value); setErrorPassword(""); setError("") }} type={showPass} placeholder='Your password...' />
                            <svg
                                onClick={() => {
                                    showPass === "password"
                                        ? setShowPass("text")
                                        : setShowPass("password");
                                }}
                                className='eye'
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="25"
                                viewBox="0 0 24 25"
                                fill="none"
                            >
                                {showPass === "password" ? (
                                    <>
                                        <path
                                            d="M15.5799 12.9765C15.5799 14.9565 13.9799 16.5565 11.9999 16.5565C10.0199 16.5565 8.41992 14.9565 8.41992 12.9765C8.41992 10.9965 10.0199 9.39648 11.9999 9.39648C13.9799 9.39648 15.5799 10.9965 15.5799 12.9765Z"
                                            stroke="#745F8C"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M11.9998 21.2463C15.5298 21.2463 18.8198 19.1663 21.1098 15.5663C22.0098 14.1563 22.0098 11.7863 21.1098 10.3763C18.8198 6.77629 15.5298 4.69629 11.9998 4.69629C8.46984 4.69629 5.17984 6.77629 2.88984 10.3763C1.98984 11.7863 1.98984 14.1563 2.88984 15.5663C5.17984 19.1663 8.46984 21.2463 11.9998 21.2463Z"
                                            stroke="#745F8C"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </>
                                ) : (
                                    <>
                                        <path
                                            d="M15.0299 10.446L9.96992 15.506C9.31992 14.856 8.91992 13.966 8.91992 12.976C8.91992 10.996 10.5199 9.396 12.4999 9.396C13.4899 9.396 14.3799 9.796 15.0299 10.446Z"
                                            stroke="#862FC0"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M18.3198 6.74605C16.5698 5.42605 14.5698 4.70605 12.4998 4.70605C8.96984 4.70605 5.67984 6.78605 3.38984 10.3861C2.48984 11.7961 2.48984 14.1661 3.38984 15.5761C4.17984 16.8161 5.09984 17.8861 6.09984 18.7461"
                                            stroke="#862FC0"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M8.91992 20.5063C10.0599 20.9863 11.2699 21.2463 12.4999 21.2463C16.0299 21.2463 19.3199 19.1663 21.6099 15.5663C22.5099 14.1563 22.5099 11.7862 21.6099 10.3762C21.2799 9.85625 20.9199 9.36625 20.5499 8.90625"
                                            stroke="#862FC0"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M16.0099 13.6763C15.7499 15.0863 14.5999 16.2363 13.1899 16.4963"
                                            stroke="#862FC0"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M9.97 15.5059L2.5 22.9759"
                                            stroke="#862FC0"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M22.4998 2.97607L15.0298 10.4461"
                                            stroke="#862FC0"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </>
                                )}
                            </svg>
                          </div>
                            {/* <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                viewBox="0 0 25 25"
                                fill="none"
                            >
                            </svg> */}


                            {errorpassword && (
                                <p className="text-danger mt-2">{errorpassword}</p>
                            )}
                        </div>
                        <div className="twice-items">
                            <div className="custom-check-style">
                                <div class="form-group">
                                    <input checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} type="checkbox" id="html" />
                                    <label for="html">Remember me</label>
                                </div>
                            </div>
                            <Link href="/forgotpassword" className='btn-forgotpassword'>Forgot Password?</Link>
                        </div>
                        {error ? (
                            <p className="input-Errors pb-3 text-danger mt-2">{error}</p>
                        ) : null}
                        <a onClick={userLogin} className='btn-sign'>Sign In</a>
                        <Link href="/signup" className='btn-forgot'><span style={{ color: "#fff" }}>Don&apos;t have an account? &nbsp; </span> Sign up </Link>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login
