import React from 'react'
import Navbar from './navbar'
import Footer from './footer'

const Contactus = () => {
    return (
        <>
            <Navbar />
            <section className="contactus">
                <span className="topshadow"></span>
                <img src="\assets\landing\static\banner-img-shadow.png" alt="img" className='img-fluid banner-img-shadow' />
                <div className="contactus-container">
                    <div className="row">
                        <div className="col-xl-7 col-12 m-auto padd-sm">
                            <div className="contactusleftmain">
                                <div className="contactusleft">
                                    <h4 className="contacthead">Let’s chat, Reach out to us</h4>
                                    <p className="contactpara">Have questions or feedback? we’re here to help. Send us a message, and we’ll respond within 24 hours.</p>
                                    <div className="contactmaininput">
                                        <div className="contactinnerinput">
                                            <p className="contactinputpara">First name</p>
                                            <input type="text" className="contactusinnerinput" placeholder='First Name' />
                                        </div>
                                        <div className="contactinnerinput">
                                            <p className="contactinputpara">Last name</p>
                                            <input type="text" className="contactusinnerinput" placeholder='Last name' />
                                        </div>
                                    </div>
                                    <div className="contactinnerinput">
                                        <p className="contactinputpara">Email address</p>
                                        <input type="text" className="contactusinnerinput" placeholder='Email address' />
                                    </div>
                                    <div className="contactinnerinput">
                                        <p className="contactinputpara">Message</p>
                                        <textarea className="contactusinnertextarea" placeholder='Leave us message' ></textarea>
                                    </div>
                                    <button className="contactusbtn">Submit</button>
                                </div>
                                <div className="contactusleftlower">
                                    <img src="\assets\contactusassets\message.svg" alt="contactusimg" className="contactusimg" />
                                    <div className="contactusleftlowertext">
                                        <p className="contactusleftlowerpara">Email Address</p>
                                        <h6 className="contactusleftlowerhead">help@wizardgallery.com</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-5 col-12 padd-sm displaynoneinmobile">
                        <div className="wrapper-img">
                            <img src="\assets\landing\static\banner-img1.png" alt="img" className='img-fluid' />
                        </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Contactus