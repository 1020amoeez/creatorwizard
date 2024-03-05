import React from 'react'
import Navbar from './navbar'
import Footer from './footer'

const Collectiondetail = () => {
    return (
        <>
            <Navbar />
            <section className="collection-detail">
                <div className="custom-container">
                    <div className="parent">
                        <div className="upper-twice-imgs">
                            <div className="logo-img-parent">
                                <h6>Logo</h6>
                                <p>350 x 350 recommended.</p>
                                <div className="logo-img">
                                    <label htmlFor="upload"> <img src="\assets\dummy-imgs\collection\logoimg.png" alt="img" className='img-fluid' /></label>
                                    <input type="file" className='d-none' id='upload' />
                                </div>
                            </div>
                            <div className="logo-img-parent">
                                <h6>Logo</h6>
                                <p>350 x 350 recommended.</p>
                                <div className="logo-img">
                                    <label htmlFor="upload1"> <img src="\assets\dummy-imgs\collection\logoimg.png" alt="img" className='img-fluid' /></label>
                                    <input type="file" className='d-none' id='upload1' />
                                </div>
                            </div>
                        </div>
                        <div className="banner-img">
                            <h6>Banner image</h6>
                            <div className="cover-img">
                                <label htmlFor="coverimg"> <img src="\assets\dummy-imgs\collection\cover-img-collection.png" alt="img" className='img-fluid' /></label>
                                <input type="file" className='d-none' id='coverimg' />
                            </div>
                        </div>
                        <div className="option-field">
                            <label>Name</label>
                            <input type="text" placeholder='Enter your display name here...' />
                        </div>
                        <div className="option-field">
                            <label>Description</label>
                            <textarea type="text" placeholder='Enter your Description...' />
                        </div>
                        <div className="bottom-link">
                            <h6>Links</h6>
                            <div className="inside-links">
                                <a href="#"><img src="\assets\landing\collection-links\global.svg" alt="img" className='img-fluid' />Tristafrancis.io</a>
                                <a href="#"><img src="\assets\landing\collection-links\discord.svg" alt="img" className='img-fluid' />https://discord.gg/Tristafrancis</a>
                                <a href="#"><img src="\assets\landing\collection-links\insta.svg" alt="img" className='img-fluid' />https://instagram.com/Tristafrancis</a>
                                <a href="#"><img src="\assets\landing\collection-links\telegram.svg" alt="img" className='img-fluid' />https://t.me/Tristafrancis</a>
                                <a href="#"><img src="\assets\landing\collection-links\twitter.svg" alt="img" className='img-fluid' />https://twitter.com/Tristafrancis</a>
                            </div>
                        </div>
                        <div className="option-field">
                            <label>Creator Earnings</label>
                            <p>Collect a fee when a user re-sells an item you originally created.</p>
                            <input type="text" placeholder='0.0%' />
                            <span className='percent-sign'>%</span>
                        </div>
                        <div className="option-field">
                            <div className="text">
                                <h6>Explicit & sensitive content</h6>
                                <p>Set this collection as explicit and sensitive content.</p>
                            </div>
                        </div>
                        <a href="#" className='btn-makecollection'>Make Collection Offer</a>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Collectiondetail
