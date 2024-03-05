'use client'

import React, { useEffect, useRef, useState } from 'react'
import Modal from 'react-bootstrap/Modal';


const Submit = ({ formDataname, handleButtonClick, draftdata }) => {


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    return (
        <>
            <section className='stepmain'>
                <div style={{ width: "100%" }}>
                    <h4 className="stepheadcollection">Submit</h4>
                    <p className="collectionpara">Review your details and submit</p>
                    <div className="submit-section">
                        <div className="main-heading-top">
                            <h6>Launchpad Info</h6>
                        </div>
                        <div className="profile-conent">
                            <label>Launchpad Image</label>
                            <div className="profile-img">
                                <img
                                    // src={formDataname?.launchpadImage}
                                    src={formDataname?.launchpadImage || 'assets/discovercollection/upload-img.png'}
                                    alt="img"
                                    className='img-fluid' />
                            </div>
                        </div>
                        <div className="basic-data">
                            <div className="twice-field-text">
                                <div className="single-text">
                                    <p>Launchpad Name</p>
                                    <h6>{formDataname?.name}</h6>
                                </div>
                                <div className="single-text">
                                    <p>Launchpad</p>
                                    {formDataname?.limitedEddition && (
                                        <h6>Limited Edition</h6>
                                    )}
                                    {formDataname?.openEddition && (
                                        <h6>Open Edition</h6>
                                    )}
                                </div>
                            </div>
                            <div className="single-text">
                                <p>Launchpad Description</p>
                                <h6>{formDataname?.description}</h6>
                            </div>
                            <div className="twice-field-text">
                                <div className="single-text">
                                    <p>Total Supply</p>
                                    <h6>{formDataname?.totalSupply}</h6>
                                </div>
                                <div className="single-text">
                                    <p>Price</p>
                                    <h6>{formDataname?.price}</h6>
                                </div>
                            </div>
                        </div>
                        <div className="team-info">
                            <h5>Team Info</h5>
                            {/* <div className="parent parent-mobile">
                                <div className="left-side">
                                    <div className="main-heading">
                                        <h6>Team Member 1</h6>
                                    </div>
                                    <div className="parent">
                                        <div className="single-text">
                                            <p>Name</p>
                                            <h6>{formDataname?.teamMembers?.[0]?.name}</h6>
                                        </div>
                                        <div className="single-text">
                                            <p>Designation</p>
                                            <h6>{formDataname?.teamMembers?.[0]?.designation}</h6>
                                        </div>
                                        <div className="single-text">
                                            <p>Twitter</p>
                                            <h6>{formDataname?.teamMembers?.[0]?.twitterUrl}</h6>
                                        </div>
                                    </div>
                                </div>
                             
                            </div> */}
                            {formDataname?.teamMembers?.map((member, index) => (
                                <div className="parent parent-mobile" key={index}>
                                    <div className="left-side">
                                        <div className="main-heading">
                                            <h6>Team Member {index + 1}</h6>
                                        </div>
                                        <div className="parent">
                                            <div className="single-text">
                                                <p>Name</p>
                                                <h6>{member.name}</h6>
                                            </div>
                                            <div className="single-text">
                                                <p>Designation</p>
                                                <h6>{member.designation}</h6>
                                            </div>
                                            <div className="single-text">
                                                <p>Twitter</p>
                                                <h6>{member.twitterUrl}</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="team-info mint-info" style={{ border: "none", padding: "0", paddingTop: "30px" }}>
                            <h5>Mint info</h5>
                            <div className="single-text">
                                <p>Mint Start Date</p>
                                <h6>{formDataname?.mintStartTime.slice(0, 19)}</h6>
                            </div>
                        </div>
                        <div className="team-info mint-info">
                            {/* <div className="parent parent-mobile">
                                <div className="left-side">
                                    <div className="main-heading">
                                        <h6>Mint Stage 1</h6>
                                    </div>
                                    <div className="parent">
                                        <div className="single-text">
                                            <p>Name</p>
                                            <h6>{formDataname?.name}</h6>
                                        </div>
                                        <div className="single-text">
                                            <p>Duration</p>
                                            <h6>1d 2h 23m</h6>
                                        </div>
                                        <div className="single-text">
                                            <p>Sale Price</p>
                                            <h6>15.258 CORE</h6>
                                        </div>
                                    </div>
                                </div>

                            </div> */}
                            {formDataname?.mintStages.map((stage, index) => (
                                <div className="team-info mint-info" key={index}>
                                    <div className="parent parent-mobile">
                                        <div className="left-side">
                                            <div className="main-heading">
                                                <h6>{`Mint Stage ${index + 1}`}</h6>
                                            </div>
                                            <div className="parent">
                                                <div className="single-text">
                                                    <p>Name</p>
                                                    <h6>{stage.name}</h6>
                                                </div>
                                                <div className="single-text">
                                                    <p>Duration</p>
                                                    <h6>{stage.mintStageTime.slice(0, 19)}</h6>
                                                </div>
                                                <div className="single-text">
                                                    <p>Sale Price</p>
                                                    <h6>{stage.price}</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="team-info earnings" style={{ border: "none" }}>
                            <h5>Earnings</h5>
                            <div className="parent parent-mobile">
                                <div className="left-side">
                                    <div className="parent">
                                        <div className="single-text">
                                            <p>earnings address</p>
                                            <h6>
                                                {/* {formDataname?.earningAddress} */}
                                                {formDataname?.earningAddress?.slice(0, 11)}...
                                                {formDataname?.earningAddress?.slice(
                                                    formDataname?.earningAddress?.length - 3,
                                                    formDataname?.earningAddress?.length
                                                )}
                                            </h6>
                                        </div>
                                        <div className="single-text">
                                            <p>Platfrom Fees</p>
                                            <h6>90%</h6>
                                        </div>
                                        <div className="single-text">
                                            <p>Your Earning</p>
                                            <h6>10%</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button onClick={() => handleButtonClick()} className="stepbtn">
                        Submit
                    </button>
                </div>
            </section>
        </>
    )
}

export default Submit