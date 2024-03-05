import Link from 'next/link'
import React from 'react'

const Success = () => {
    return (
        <>
            <section className="login-section">
                <span className='gradient-linear'></span>
                <div className="parent">
                    <img src="\login-logo.svg" alt="img" className='img-fluid login-logo' />
                    <div className="main-card">
                        <div className="success">
                            <img src="\success.svg" alt="img" className='img-fluid' />
                            <h6>Success!</h6>
                            <p>Your Password has been successfuly changed</p>
                        </div>
                        <Link href="/" className='btn-sign mb-0'>Log In</Link>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Success
