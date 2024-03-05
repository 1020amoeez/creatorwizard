'use client'

import React, { useEffect, useRef, useState } from 'react'
import Modal from 'react-bootstrap/Modal';

const Itemslist = ({ onNext }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [show3, setShow3] = useState(false);

    const handleShow3 = () => {
        setShow3(true);
        setTimeout(() => {
            setShow3(false);
            setShow4(true);
        }, 2000);
    };

    const handleClose3 = () => {
        setShow4(false);
        setShow3(false)
    };

    const [show4, setShow4] = useState(false);

    const handleClose4 = () => setShow4(false);
    const handleShow4 = () => setShow4(true);


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <>
            <section className='stepmain'>
                <div className='stepcontainerdetail'>
                    <h4 className="stepheadcollection">Items</h4>
                    <div className="items-launchpad">
                        <h5>Upload to Wizard NFT Marketplace</h5>
                        <div className="bottom-content">
                            <div className="single-upload">
                                <div className="select-img">
                                    <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="31" height="31" viewBox="0 0 31 31" fill="none">
                                        <path d="M19.375 29.3851H11.625C4.61129 29.3851 1.61462 26.3884 1.61462 19.3747V11.6247C1.61462 4.61092 4.61129 1.61426 11.625 1.61426H19.375C26.3888 1.61426 29.3855 4.61092 29.3855 11.6247V19.3747C29.3855 26.3884 26.3888 29.3851 19.375 29.3851ZM11.625 3.55176C5.67046 3.55176 3.55212 5.67009 3.55212 11.6247V19.3747C3.55212 25.3293 5.67046 27.4476 11.625 27.4476H19.375C25.3296 27.4476 27.448 25.3293 27.448 19.3747V11.6247C27.448 5.67009 25.3296 3.55176 19.375 3.55176H11.625Z" fill="#862FC0" />
                                        <path d="M11.625 13.8854C9.66163 13.8854 8.07288 12.2967 8.07288 10.3333C8.07288 8.37 9.66163 6.78125 11.625 6.78125C13.5883 6.78125 15.177 8.37 15.177 10.3333C15.177 12.2967 13.5883 13.8854 11.625 13.8854ZM11.625 8.71875C10.7337 8.71875 10.0104 9.44208 10.0104 10.3333C10.0104 11.2246 10.7337 11.9479 11.625 11.9479C12.5162 11.9479 13.2395 11.2246 13.2395 10.3333C13.2395 9.44208 12.5162 8.71875 11.625 8.71875Z" fill="#862FC0" />
                                        <path d="M3.44878 25.4461C3.13878 25.4461 2.82878 25.2911 2.64795 25.0199C2.35086 24.5807 2.46711 23.9736 2.9192 23.6765L9.28711 19.4011C10.6821 18.4582 12.6067 18.5745 13.8725 19.6465L14.2988 20.0211C14.9446 20.5765 16.0425 20.5765 16.6754 20.0211L22.0488 15.4099C23.4179 14.2345 25.575 14.2345 26.9571 15.4099L29.0625 17.2182C29.4629 17.567 29.5146 18.174 29.1659 18.5874C28.8171 18.9878 28.21 19.0395 27.7967 18.6907L25.6913 16.8824C25.0454 16.327 23.9475 16.327 23.3017 16.8824L17.9284 21.4936C16.5592 22.669 14.4021 22.669 13.02 21.4936L12.5938 21.1191C11.9996 20.6153 11.0179 20.5636 10.3592 21.0157L3.99128 25.2911C3.82336 25.3945 3.62961 25.4461 3.44878 25.4461Z" fill="#862FC0" />
                                    </svg></a>
                                </div>
                                <div className="text">
                                    <h6>Select Media</h6>
                                    <p>Drag and drop or click to select up to 10,000 media files, up to a total size of 5GB. JPG, PNG, SVG, and GIF are supported.</p>
                                </div>
                            </div>
                            <div className="single-upload">
                                <div className="select-img">
                                    <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="31" height="31" viewBox="0 0 31 31" fill="none">
                                        <path d="M19.375 29.3851H11.625C4.61129 29.3851 1.61462 26.3884 1.61462 19.3747V11.6247C1.61462 4.61092 4.61129 1.61426 11.625 1.61426H19.375C26.3888 1.61426 29.3855 4.61092 29.3855 11.6247V19.3747C29.3855 26.3884 26.3888 29.3851 19.375 29.3851ZM11.625 3.55176C5.67046 3.55176 3.55212 5.67009 3.55212 11.6247V19.3747C3.55212 25.3293 5.67046 27.4476 11.625 27.4476H19.375C25.3296 27.4476 27.448 25.3293 27.448 19.3747V11.6247C27.448 5.67009 25.3296 3.55176 19.375 3.55176H11.625Z" fill="#862FC0" />
                                        <path d="M11.625 13.8854C9.66163 13.8854 8.07288 12.2967 8.07288 10.3333C8.07288 8.37 9.66163 6.78125 11.625 6.78125C13.5883 6.78125 15.177 8.37 15.177 10.3333C15.177 12.2967 13.5883 13.8854 11.625 13.8854ZM11.625 8.71875C10.7337 8.71875 10.0104 9.44208 10.0104 10.3333C10.0104 11.2246 10.7337 11.9479 11.625 11.9479C12.5162 11.9479 13.2395 11.2246 13.2395 10.3333C13.2395 9.44208 12.5162 8.71875 11.625 8.71875Z" fill="#862FC0" />
                                        <path d="M3.44878 25.4461C3.13878 25.4461 2.82878 25.2911 2.64795 25.0199C2.35086 24.5807 2.46711 23.9736 2.9192 23.6765L9.28711 19.4011C10.6821 18.4582 12.6067 18.5745 13.8725 19.6465L14.2988 20.0211C14.9446 20.5765 16.0425 20.5765 16.6754 20.0211L22.0488 15.4099C23.4179 14.2345 25.575 14.2345 26.9571 15.4099L29.0625 17.2182C29.4629 17.567 29.5146 18.174 29.1659 18.5874C28.8171 18.9878 28.21 19.0395 27.7967 18.6907L25.6913 16.8824C25.0454 16.327 23.9475 16.327 23.3017 16.8824L17.9284 21.4936C16.5592 22.669 14.4021 22.669 13.02 21.4936L12.5938 21.1191C11.9996 20.6153 11.0179 20.5636 10.3592 21.0157L3.99128 25.2911C3.82336 25.3945 3.62961 25.4461 3.44878 25.4461Z" fill="#862FC0" />
                                    </svg></a>
                                </div>
                                <div className="text">
                                    <h6>Select Metadata</h6>
                                    <p>Grag and drop or click to upload a CSV file</p>
                                </div>
                            </div>
                            <a href="#" className='btn-upload'>Upload</a>
                        </div>
                    </div>
                    {/* ifdisconnect class */}
                    <button style={{maxWidth: "100%"}} className="stepbtn ">
                    Connect Wallet
                    </button>

                    <button style={{maxWidth: "100%", marginTop: "18px"}} className="stepbtn opacitylowifdisable" onClick={handleShow}>
                        List Launchpad
                    </button>
                </div>
            </section>


            <Modal className='buymodal' show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Launch Collection</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="buynowimg">
                        <img src="\assets\nftdetailassets\mainnft.png" alt="buynowinnerimg" className="buynowinnerimg" />
                    </div>
                    <div className="buydatamain mt-5">
                        <div className="buydata">
                            <p className="buydataleft">Total Funds Raised</p>
                            <h6 className="buydataright">100,000 CORE</h6>
                        </div>
                        <div className="buydata">
                            <p className="buydataleft">Platform Fees</p>
                            <h6 className="buydataright">30,000 CORE</h6>
                        </div>
                    </div>
                    <div className="buyitemmain pb-0">
                        <h6 className="buyitemhead">Your Earning</h6>
                        <div className="buyitemright">
                            <img src="\assets\nftdetailassets\token.svg" alt="buyitemimg" className="buyitemimg" />
                            <h6 className="buyitemright">70,000</h6>
                            <p className="buyitemrightpara">CORE</p>
                        </div>
                    </div>
                    <div className="buymodalbtns">
                        <button className="borderbtn">Cancel</button>
                        <button className="bluebtn" onClick={() => {
                            handleClose();
                            handleShow3();
                        }}>Launch Collection</button>
                    </div>

                </Modal.Body>

            </Modal>


            <Modal className='buymodal' show={show3} onHide={handleClose3} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Launch Collection</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src="\assets\discovercollection\loadermain.png" alt="loader" className='loaderimg' />
                    <h6 className="loaderhead">Waiting for blockchain confirmation...</h6>
                </Modal.Body>

            </Modal>

            <Modal className='buymodal' show={show4} onHide={handleClose4} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Launch Collection</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src="\assets\nftdetailassets\PURCHASED.svg" alt="purchasedimg" className="purchasedimg" />
                    <p className="purshasedpara">Your transaction succeded!</p>
                    <button onClick={handleClose4} className="bluebtn">View Launchpad</button>
                </Modal.Body>

            </Modal>

          
        </>
    )
}

export default Itemslist