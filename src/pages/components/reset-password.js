// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import axios from 'axios';

// const Create = () => {
//     const [confirmPassword, setConfirmPassword] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState('');
//     const [showPass, setShowPass] = useState("password");
//     const [showCon, setShowCon] = useState("password");

//     useEffect(() => {
//         const searchParams = new URLSearchParams(window.location.search);
//         const token = searchParams.get('token');
//         // console.log(token, 'ewe3');
//     }, [])

//     const CreateNewPassword = async (e) => {
//         e.preventDefault();

//         if (password !== confirmPassword) {
//             setError("Passwords do not match");
//             return;
//         }

//         try {
//             const response = await axios.post(`${api_url}/auth/creators/reset-password`, {
//                 token: token,
//                 password: password,
//                 confirmPassword: confirmPassword,
//             });

//             console.log(response.data);
//         } catch (error) {
//             console.error('Error creating new password:', error);
//             setError("Failed to create new password. Please try again.");
//         }
//     };

//     return (
//         <>
//             <section className="login-section">
//                 <span className='gradient-linear'></span>
//                 <div className="parent">
//                     <img src="\login-logo.svg" alt="img" className='img-fluid login-logo' />
//                     <div className="main-card">
//                         <div className="main-heading">
//                             <h6>Create New Password</h6>
//                             <p>Your new password must be different from previously used passwords.</p>
//                         </div>
//                         <form onSubmit={CreateNewPassword}>
//                             <div className="option-field">
//                                 <label>New Password</label>
//                                 <input
//                                     value={password} onChange={(e) => setPassword(e.target.value)} type={showPass} placeholder='Your password...'
//                                 />
//                                 <svg
//                                     onClick={() => {
//                                         showPass === "password"
//                                             ? setShowPass("text")
//                                             : setShowPass("password");
//                                     }}

//                                     className='eye '
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     width="24"
//                                     height="25"
//                                     viewBox="0 0 24 25"
//                                     fill="none"

//                                 >
//                                     {showPass === "password" ? (
//                                         <>
//                                             <path
//                                                 d="M15.5799 12.9765C15.5799 14.9565 13.9799 16.5565 11.9999 16.5565C10.0199 16.5565 8.41992 14.9565 8.41992 12.9765C8.41992 10.9965 10.0199 9.39648 11.9999 9.39648C13.9799 9.39648 15.5799 10.9965 15.5799 12.9765Z"
//                                                 stroke="#745F8C"
//                                                 strokeWidth="1.5"
//                                                 strokeLinecap="round"
//                                                 strokeLinejoin="round"
//                                             />
//                                             <path
//                                                 d="M11.9998 21.2463C15.5298 21.2463 18.8198 19.1663 21.1098 15.5663C22.0098 14.1563 22.0098 11.7863 21.1098 10.3763C18.8198 6.77629 15.5298 4.69629 11.9998 4.69629C8.46984 4.69629 5.17984 6.77629 2.88984 10.3763C1.98984 11.7863 1.98984 14.1563 2.88984 15.5663C5.17984 19.1663 8.46984 21.2463 11.9998 21.2463Z"
//                                                 stroke="#745F8C"
//                                                 strokeWidth="1.5"
//                                                 strokeLinecap="round"
//                                                 strokeLinejoin="round"
//                                             />
//                                         </>
//                                     ) : (
//                                         <>
//                                             <path
//                                                 d="M15.0299 10.446L9.96992 15.506C9.31992 14.856 8.91992 13.966 8.91992 12.976C8.91992 10.996 10.5199 9.396 12.4999 9.396C13.4899 9.396 14.3799 9.796 15.0299 10.446Z"
//                                                 stroke="#862FC0"
//                                                 strokeWidth="1.5"
//                                                 strokeLinecap="round"
//                                                 strokeLinejoin="round"
//                                             />
//                                             <path
//                                                 d="M18.3198 6.74605C16.5698 5.42605 14.5698 4.70605 12.4998 4.70605C8.96984 4.70605 5.67984 6.78605 3.38984 10.3861C2.48984 11.7961 2.48984 14.1661 3.38984 15.5761C4.17984 16.8161 5.09984 17.8861 6.09984 18.7461"
//                                                 stroke="#862FC0"
//                                                 strokeWidth="1.5"
//                                                 strokeLinecap="round"
//                                                 strokeLinejoin="round"
//                                             />
//                                             <path
//                                                 d="M8.91992 20.5063C10.0599 20.9863 11.2699 21.2463 12.4999 21.2463C16.0299 21.2463 19.3199 19.1663 21.6099 15.5663C22.5099 14.1563 22.5099 11.7862 21.6099 10.3762C21.2799 9.85625 20.9199 9.36625 20.5499 8.90625"
//                                                 stroke="#862FC0"
//                                                 strokeWidth="1.5"
//                                                 strokeLinecap="round"
//                                                 strokeLinejoin="round"
//                                             />
//                                             <path
//                                                 d="M16.0099 13.6763C15.7499 15.0863 14.5999 16.2363 13.1899 16.4963"
//                                                 stroke="#862FC0"
//                                                 strokeWidth="1.5"
//                                                 strokeLinecap="round"
//                                                 strokeLinejoin="round"
//                                             />
//                                             <path
//                                                 d="M9.97 15.5059L2.5 22.9759"
//                                                 stroke="#862FC0"
//                                                 strokeWidth="1.5"
//                                                 strokeLinecap="round"
//                                                 strokeLinejoin="round"
//                                             />
//                                             <path
//                                                 d="M22.4998 2.97607L15.0298 10.4461"
//                                                 stroke="#862FC0"
//                                                 strokeWidth="1.5"
//                                                 strokeLinecap="round"
//                                                 strokeLinejoin="round"
//                                             />
//                                         </>
//                                     )}
//                                 </svg>
//                                 <svg
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     width="25"
//                                     height="25"
//                                     viewBox="0 0 25 25"
//                                     fill="none"
//                                 >
//                                 </svg>
//                             </div>
//                             <div className="password-must">
//                                 <h5>Password Must:</h5>
//                                 <ul>
//                                     <li>Be at least 8 characters long</li>
//                                     <li>Have at least one uppercase letter</li>
//                                     <li>Contain at least one special character</li>
//                                 </ul>
//                             </div>
//                             <div className="option-field">
//                                 <label>Confirm New Password</label>
//                                 <input
//                                     value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type={showCon} placeholder='Confirm password...'
//                                 />
//                                 <svg
//                                     onClick={() => {
//                                         showCon === "password"
//                                             ? setShowCon("text")
//                                             : setShowCon("password");
//                                     }}
//                                     className='eye mt-2'
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     width="24"
//                                     height="25"
//                                     viewBox="0 0 24 25"
//                                     fill="none"
//                                 >
//                                     {showCon === "password" ? (
//                                         <>
//                                             <path
//                                                 d="M15.5799 12.9765C15.5799 14.9565 13.9799 16.5565 11.9999 16.5565C10.0199 16.5565 8.41992 14.9565 8.41992 12.9765C8.41992 10.9965 10.0199 9.39648 11.9999 9.39648C13.9799 9.39648 15.5799 10.9965 15.5799 12.9765Z"
//                                                 stroke="#745F8C"
//                                                 strokeWidth="1.5"
//                                                 strokeLinecap="round"
//                                                 strokeLinejoin="round"
//                                             />
//                                             <path
//                                                 d="M11.9998 21.2463C15.5298 21.2463 18.8198 19.1663 21.1098 15.5663C22.0098 14.1563 22.0098 11.7863 21.1098 10.3763C18.8198 6.77629 15.5298 4.69629 11.9998 4.69629C8.46984 4.69629 5.17984 6.77629 2.88984 10.3763C1.98984 11.7863 1.98984 14.1563 2.88984 15.5663C5.17984 19.1663 8.46984 21.2463 11.9998 21.2463Z"
//                                                 stroke="#745F8C"
//                                                 strokeWidth="1.5"
//                                                 strokeLinecap="round"
//                                                 strokeLinejoin="round"
//                                             />
//                                         </>
//                                     ) : (
//                                         <>
//                                             <path
//                                                 d="M15.0299 10.446L9.96992 15.506C9.31992 14.856 8.91992 13.966 8.91992 12.976C8.91992 10.996 10.5199 9.396 12.4999 9.396C13.4899 9.396 14.3799 9.796 15.0299 10.446Z"
//                                                 stroke="#862FC0"
//                                                 strokeWidth="1.5"
//                                                 strokeLinecap="round"
//                                                 strokeLinejoin="round"
//                                             />
//                                             <path
//                                                 d="M18.3198 6.74605C16.5698 5.42605 14.5698 4.70605 12.4998 4.70605C8.96984 4.70605 5.67984 6.78605 3.38984 10.3861C2.48984 11.7961 2.48984 14.1661 3.38984 15.5761C4.17984 16.8161 5.09984 17.8861 6.09984 18.7461"
//                                                 stroke="#862FC0"
//                                                 strokeWidth="1.5"
//                                                 strokeLinecap="round"
//                                                 strokeLinejoin="round"
//                                             />
//                                             <path
//                                                 d="M8.91992 20.5063C10.0599 20.9863 11.2699 21.2463 12.4999 21.2463C16.0299 21.2463 19.3199 19.1663 21.6099 15.5663C22.5099 14.1563 22.5099 11.7862 21.6099 10.3762C21.2799 9.85625 20.9199 9.36625 20.5499 8.90625"
//                                                 stroke="#862FC0"
//                                                 strokeWidth="1.5"
//                                                 strokeLinecap="round"
//                                                 strokeLinejoin="round"
//                                             />
//                                             <path
//                                                 d="M16.0099 13.6763C15.7499 15.0863 14.5999 16.2363 13.1899 16.4963"
//                                                 stroke="#862FC0"
//                                                 strokeWidth="1.5"
//                                                 strokeLinecap="round"
//                                                 strokeLinejoin="round"
//                                             />
//                                             <path
//                                                 d="M9.97 15.5059L2.5 22.9759"
//                                                 stroke="#862FC0"
//                                                 strokeWidth="1.5"
//                                                 strokeLinecap="round"
//                                                 strokeLinejoin="round"
//                                             />
//                                             <path
//                                                 d="M22.4998 2.97607L15.0298 10.4461"
//                                                 stroke="#862FC0"
//                                                 strokeWidth="1.5"
//                                                 strokeLinecap="round"
//                                                 strokeLinejoin="round"
//                                             />
//                                         </>
//                                     )}
//                                 </svg>
//                             </div>
//                             {error && <p className="error-message">{error}</p>}
//                             <button type="submit" className='btn-sign mb-0'>Confirm</button>
//                         </form>
//                     </div>
//                 </div >
//             </section >
//         </>
//     );
// };

// export default Create;
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Environment from '@/utils/Enviroment'
import { toast } from 'react-toastify';
import Success from './successpassword';

const Create = () => {
    const [confirmPassword, setConfirmPassword] = useState("");
    const [password, setPassword] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [showPass, setShowPass] = useState("password");
    const [showCon, setShowCon] = useState("password");
    const [passwordValid, setPasswordValid] = useState(false);
    const [confirmPasswordValid, setConfirmPasswordValid] = useState(false);
    const api_url = Environment.api_url;



    useEffect(() => {
        const validatePassword = () => {
            const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
            const isValid = passwordRegex.test(password);
            setPasswordValid(isValid);
            return isValid;
        };

        const validateConfirmPassword = () => {
            setConfirmPasswordValid(password === confirmPassword);
        };

        validatePassword();
        validateConfirmPassword();
    }, [password, confirmPassword]);

    const [success, setSuccess] = useState(false);
    const [create, setCreate] = useState(true);

    const CreateNewPassword = (e, token) => {
        e.preventDefault();
        if (!password) {
            toast.error("Enter Password");
        } else if (!passwordValid) {
            toast.error("Password is Not Valid");
        } else if (password != confirmPassword) {
            toast.error("Passwords do not Match");
        }

        if (!confirmPassword) {
            toast.error("Enter Confirm Password");
        } else if (!confirmPassword) {
            toast.error("ConfirmPassword is Not Valid");
        }

        axios.post(`${api_url}/auth/creators/reset-password`, {
            token: accessToken,
            password: password,
            confirmPassword: confirmPassword,
        })
            .then((response) => {
                console.log(response.data);
                setSuccess(true);
                setCreate(false)
            })
            .catch((error) => {
                console.error('Error creating new password:', error);
            });
    };
    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const token = searchParams.get('token');
        setAccessToken(token)
        console.log(token, 'token');
    }, []);


    return (
        <>
            {success ? <Success /> : null}
            {create ?
                <section className="login-section">
                    <span className='gradient-linear'></span>
                    <div className="parent">
                        <img src="\login-logo.svg" alt="img" className='img-fluid login-logo' />
                        <div className="main-card">
                            <div className="main-heading">
                                <h6>Create New Password</h6>
                                <p>Your new password must be different from previously used passwords.</p>
                            </div>
                            <form>
                                <div className="option-field">
                                    <label>New Password</label>
                                    <input
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        type={showPass}
                                        placeholder='Your password...'
                                        className={passwordValid ? "valid" : "invalid"}
                                    />
                                    <svg
                                        onClick={() => {
                                            showPass === "password"
                                                ? setShowPass("text")
                                                : setShowPass("password");
                                        }}

                                        className='eye mt-2 '
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
                                <div className="password-must">
                                    <h5>Password Must:</h5>
                                    <ul className={passwordValid ? "valid" : "invalid"}>
                                        <li className={password.length >= 8 ? "valid" : "invalid"}>Be at least 8 characters long</li>
                                        <li className={/[A-Z]/.test(password) ? "valid" : "invalid"}>Have at least one uppercase letter</li>
                                        <li className={/[!@#$%^&*]/.test(password) ? "valid" : "invalid"}>Contain at least one special character</li>
                                    </ul>
                                </div>
                                <div className="option-field">
                                    <label>Confirm New Password</label>
                                    <input
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        type={showCon}
                                        placeholder='Confirm password...'
                                        className={confirmPasswordValid ? "valid" : "invalid"}
                                    />
                                    <svg
                                        onClick={() => {
                                            showCon === "password"
                                                ? setShowCon("text")
                                                : setShowCon("password");
                                        }}
                                        className='eye mt-2'
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="25"
                                        viewBox="0 0 24 25"
                                        fill="none"
                                    >
                                        {showCon === "password" ? (
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

                                <button onClick={CreateNewPassword} type="submit" className='btn-sign mb-0'>Confirm</button>
                            </form>
                        </div>
                    </div >
                </section >
                : null}
        </>
    );
};

export default Create;
