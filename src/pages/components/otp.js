import Link from 'next/link'
import React from "react";


const Otp = () => {

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
