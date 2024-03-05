import React, { useEffect, useState } from 'react'
import { Dropdown, Modal, Nav } from 'react-bootstrap'
import Navbar from './navbar';
import Footer from './footer';
import MoreCollection from './morecollection';

const Acceptbid = () => {
    const [activeTab, setActiveTab] = useState('link-3');

    const handleSelect = (eventKey) => {
        setActiveTab(eventKey);
    };

    const [heart, setHeart] = useState(true)

    const [startLength, setStartLength] = useState(6);

    useEffect(() => {
        const handleResize = () => {
            const newStartLength = window.innerWidth >= 600 ? 11 : 6;
            setStartLength(newStartLength);
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const truncateWalletAddress = (address, endLength = 4) => {
        const start = address.slice(0, startLength);
        const end = address.slice(-endLength);
        return `${start}...${end}`;
    };

    const walletAddress1 = '0x228c1ed4521c55684584714255415584125541524152552145215451';
    const walletAddress2 = '0x3a4b1ed8569c9e1fda3e7a1425518a63482a41524152552145215789';

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [show1, setShow1] = useState(false);

    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);

    const [show2, setShow2] = useState(false);

    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

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

    const [timeshow, setTimeshow] = useState(false);
    const [day, setDay] = useState(0);
    const [hour, setHour] = useState(0);
    const [min, setMin] = useState(0);
    const [sec, setSec] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const time = new Date("jan 30, 2024 08:00:00");
            const diff = time.getTime() - now.getTime();
            if (diff <= 0) {
                clearInterval(interval);
                setTimeshow(true);
                return;
            }
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const secs = Math.floor((diff % (1000 * 60)) / 1000);
            setDay(days);
            setHour(hours);
            setMin(mins);
            setSec(secs);
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    return (
        <>
            <Navbar />
            <section className="nftdetailmain">
                <div className="custom-container">
                    <div className="nftdetailupper">
                        <div className="nftimagemain">
                            <img src="\assets\nftdetailassets\mainnft.png" alt="nftimginner" className="nftimginner" />
                        </div>
                        <div className="nftdetails">
                            <div className="nftownerdetail">
                                <div className="nftownerimage">
                                    <img src="\assets\nftdetailassets\ownerimage.png" alt="nftownerinnerimage" className="nftownerinnerimage" />
                                </div>
                                <h6 className="nftownername">Azuki</h6>
                                <img src="\assets\nftdetailassets\verify.svg" alt="verifiedimage" className="verifiedimage" />
                            </div>
                            <h5 className="nftname">Azuki #4437</h5>
                            <div className="royalitymain">
                                <h6 className="royalitypara">Royalties</h6>
                                <span className="royalitypercentage">5%</span>
                            </div>
                            <div className="creatorandownermain">
                                <div className="creatorownermain">
                                    <div className="creatorownermainimage">
                                        <img src="\assets\nftdetailassets\creator.png" alt="creatorownerinnerimage" className="creatorownerinnerimage" />
                                    </div>
                                    <div className="creatorownertexts">
                                        <p className="creatorownerpara">Creator</p>
                                        <h6 className="creatorownerwallet">{truncateWalletAddress(walletAddress1)}</h6>
                                    </div>
                                </div>

                                <div className="creatorownermain">
                                    <div className="creatorownermainimage">
                                        <img src="\assets\nftdetailassets\currentowner.png" alt="creatorownerinnerimage" className="creatorownerinnerimage" />
                                    </div>
                                    <div className="creatorownertexts">
                                        <p className="creatorownerpara">Current Owner</p>
                                        <h6 className="creatorownerwallet">{truncateWalletAddress(walletAddress2)}</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="likesharemain">
                                <div className="likeshareleft">
                                    <div className="likemain">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={heart ? 'lineimg' : 'fillimg'} onClick={() => setHeart(!heart)} cursor="pointer">
                                            <path d="M12 21.6496C11.69 21.6496 11.39 21.6096 11.14 21.5196C7.32 20.2096 1.25 15.5596 1.25 8.68961C1.25 5.18961 4.08 2.34961 7.56 2.34961C9.25 2.34961 10.83 3.00961 12 4.18961C13.17 3.00961 14.75 2.34961 16.44 2.34961C19.92 2.34961 22.75 5.19961 22.75 8.68961C22.75 15.5696 16.68 20.2096 12.86 21.5196C12.61 21.6096 12.31 21.6496 12 21.6496ZM7.56 3.84961C4.91 3.84961 2.75 6.01961 2.75 8.68961C2.75 15.5196 9.32 19.3196 11.63 20.1096C11.81 20.1696 12.2 20.1696 12.38 20.1096C14.68 19.3196 21.26 15.5296 21.26 8.68961C21.26 6.01961 19.1 3.84961 16.45 3.84961C14.93 3.84961 13.52 4.55961 12.61 5.78961C12.33 6.16961 11.69 6.16961 11.41 5.78961C10.48 4.54961 9.08 3.84961 7.56 3.84961Z" fill="#745F8C" />
                                        </svg>
                                        <p className="likepara">7</p>
                                    </div>
                                    <div className="sharemain">
                                        <img src="\assets\nftdetailassets\export.svg" alt="shareimgbrdr" className="shareimgbrdr" />
                                        <p className="sharepara">Share</p>
                                    </div>
                                </div>
                                <Dropdown align='end'>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        <img src="\assets\nftdetailassets\dropimage.svg" alt="dropimageright" className="dropimageright" />
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <p className="dropitem">
                                            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" className='dropimg'>
                                                <g id="vuesax/outline/refresh-2">
                                                    <g id="refresh-2">
                                                        <path id="Vector" d="M15.5837 8.50033C15.5837 12.4103 12.4103 15.5837 8.50033 15.5837C4.59033 15.5837 2.20324 11.6453 2.20324 11.6453M2.20324 11.6453H5.40491M2.20324 11.6453V15.187M1.41699 8.50033C1.41699 4.59033 4.56199 1.41699 8.50033 1.41699C13.2249 1.41699 15.5837 5.35533 15.5837 5.35533M15.5837 5.35533V1.81366M15.5837 5.35533H12.4387" stroke="#862FC0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                    </g>
                                                </g>
                                            </svg>
                                            Refresh metadata</p>
                                        <p className="dropitem">
                                            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" className='dropimg'>
                                                <g id="vuesax/outline/flag">
                                                    <g id="flag">
                                                        <path id="Vector" d="M3.64746 16.1149C3.35704 16.1149 3.11621 15.8741 3.11621 15.5837V1.41699C3.11621 1.12658 3.35704 0.885742 3.64746 0.885742C3.93788 0.885742 4.17871 1.12658 4.17871 1.41699V15.5837C4.17871 15.8741 3.93788 16.1149 3.64746 16.1149Z" fill="#745F8C" />
                                                        <path id="Vector_2" d="M11.5808 11.8643H3.64746C3.35704 11.8643 3.11621 11.6234 3.11621 11.333C3.11621 11.0426 3.35704 10.8018 3.64746 10.8018H11.5808C12.3529 10.8018 12.7141 10.5963 12.785 10.4193C12.8558 10.2422 12.7495 9.84551 12.197 9.30009L11.347 8.45009C11 8.14551 10.7875 7.68509 10.7662 7.17509C10.745 6.63676 10.9575 6.10551 11.347 5.71592L12.197 4.86592C12.7212 4.34176 12.8841 3.91676 12.8062 3.73259C12.7283 3.54842 12.3245 3.36426 11.5808 3.36426H3.64746C3.34996 3.36426 3.11621 3.12342 3.11621 2.83301C3.11621 2.54259 3.35704 2.30176 3.64746 2.30176H11.5808C13.132 2.30176 13.6279 2.94634 13.7908 3.32884C13.9466 3.71134 14.0529 4.51884 12.9479 5.62384L12.0979 6.47384C11.9208 6.65092 11.8216 6.89884 11.8287 7.14676C11.8358 7.35926 11.9208 7.55051 12.0695 7.68509L12.9479 8.55634C14.0316 9.64009 13.9254 10.4476 13.7695 10.8372C13.6066 11.2126 13.1037 11.8643 11.5808 11.8643Z" fill="#745F8C" />
                                                    </g>
                                                </g>
                                            </svg>
                                            Report</p>
                                    </Dropdown.Menu>
                                </Dropdown>

                            </div>

                            {/* buy now and place a bid flow */}

                            {/* <div className="priceandbid">
                                <div className="pricebidinner">
                                    <p className="pricebidpara">Price</p>
                                    <h6 className="pricebidhead">7.3 CORE</h6>
                                    <p className="pricebidlowerpara">$16,541</p>
                                </div>
                                <div className="pricebidinner">
                                    <p className="pricebidpara">Highest <span className="bluetext">Floor bid</span></p>
                                    <h6 className="pricebidhead">4.42 CORE</h6>
                                    <p className="pricebidlowerpara">by <span className="whitetext">0x1fee3385b...b59b</span></p>
                                </div>
                            </div> */}

                            {/* acceptbidflow */}

                            <div className="priceandbid">
                                <div className="pricebidinner">
                                    <p className="pricebidpara">Highest Bid</p>
                                    <h6 className="pricebidhead">1,500 CORE</h6>
                                    <p className="pricebidlowerpara">= $12.246</p>
                                </div>
                                <div className="pricebidinner">
                                    <p className="pricebidpara">Countdown</p>
                                    <div className="countdownmain">
                                        <span className="innertimertext">{day ? day : 0}</span>
                                        :
                                        <span className="innertimertext">{hour ? hour : 0}</span>
                                        :
                                        <span className="innertimertext">{min ? min : 0}</span>
                                        :
                                        <span className="innertimertext">{sec ? sec : 0}</span>
                                    </div>
                                </div>
                            </div>
                            {/* buy now and place a bid flow buttons */}
                            {/* <div className="pricebidbtns">
                                <button onClick={handleShow} className="bluebtn">Buy for 7.3 CORE</button>
                                <button className="borderbtn" onClick={handleShow2}>Place a bid</button>
                            </div> */}
                            <div className="acceptbidmainbtn">
                                <button onClick={handleShow} className="bluebtnaccept">
                                    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg" className='judgeimg'>
                                        <g id="vuesax/bold/judge">
                                            <g id="judge">
                                                <path id="Vector" d="M17.6167 15.8667C17.4917 15.9917 17.3333 16.0501 17.175 16.0501C17.0167 16.0501 16.8583 15.9917 16.7333 15.8667L12.6083 11.7417L13.05 11.3001L13.4917 10.8584L17.6167 14.9834C17.8583 15.2251 17.8583 15.6251 17.6167 15.8667Z" fill="white" />
                                                <path id="Vector_2" d="M5.89167 7.73308L10.725 12.5664C11.05 12.8914 11.05 13.4164 10.725 13.7414L9.975 14.4997C9.3 15.1664 8.23333 15.1664 7.56667 14.4997L3.95 10.8831C3.29167 10.2247 3.29167 9.14975 3.95 8.48308L4.70833 7.72475C5.03333 7.40808 5.56667 7.40808 5.89167 7.73308Z" fill="white" />
                                                <path id="Vector_3" d="M15.9917 8.49141L12.8167 11.6581C12.4833 11.9914 11.95 11.9914 11.6167 11.6581L6.8 6.84141C6.46667 6.50807 6.46667 5.97474 6.8 5.64141L9.975 2.46641C10.6333 1.80807 11.7083 1.80807 12.375 2.46641L15.9917 6.08307C16.65 6.74974 16.65 7.81641 15.9917 8.49141Z" fill="white" />
                                                <path id="Vector_4" d="M7.16667 18.125H2.16667C1.825 18.125 1.54167 17.8417 1.54167 17.5C1.54167 17.1583 1.825 16.875 2.16667 16.875H7.16667C7.50833 16.875 7.79167 17.1583 7.79167 17.5C7.79167 17.8417 7.50833 18.125 7.16667 18.125Z" fill="white" />
                                            </g>
                                        </g>
                                    </svg>

                                    Accept bid
                                </button>
                            </div>
                            {/* buy now and place a bid flow timer */}
                            {/* <p className="lastpara"><span>Sale ends in:</span><span className='timermain'>
                                <span className="innertimertext">{day ? day : 0}d</span>
                                <span className="innertimertext">{hour ? hour : 0}h</span>
                                <span className="innertimertext">{min ? min : 0}m</span>
                                <span className="innertimertext">{sec ? sec : 0}s</span>
                            </span></p> */}
                        </div>
                    </div>
                    <div className="nftdetaillower">
                        <div>
                            <Nav variant="pills" activeKey={activeTab} onSelect={handleSelect}>
                                <Nav.Item>
                                    <Nav.Link eventKey="link-1">Overview</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="link-2">Properties</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="link-3">Bids</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="link-4">Activity</Nav.Link>
                                </Nav.Item>
                            </Nav>

                            {activeTab === 'link-1' && (
                                <>
                                    <div className="nftdetailtabone">
                                        <div className="descriptionmain">
                                            <h6 className="descriptionhead">
                                                Description
                                            </h6>
                                            <p className="descriptionpara">Take the red bean to join the garden. View the collection at [azuki.com/gallery] (https://azuki.com/gallery).</p>
                                            <p className="descriptionpara">Azuki starts with a collection of 10,000 avatars that give you membership access to The Garden: a corner of the internet where artists, builders, and web3 enthusiasts meet to create a decentralized future. Azuki holders receive access to exclusive drops, experiences, and more. Visit [azuki.com](https://azuki.com) for more details.</p>
                                            <p className="descriptionpara">We rise together. We build together. We grow together.</p>
                                        </div>
                                        <div className="royalitytabmain">
                                            <div className="royalitytabhead">
                                                <h5 className="royalitytabheadtext">Royalties</h5>
                                                <span className="royalitytabpercent">5%</span>
                                            </div>
                                            <p className="royalitytabpara">Split royalties are automatically deposited into each recipient&apos;s wallet</p>
                                        </div>
                                        <div className="detailtabinner">
                                            <h6 className="detailtabhead">
                                                Details
                                            </h6>
                                            <div className="detailtabdata">
                                                <img src="\assets\nftdetailassets\eth.svg" alt="detailtabimg" className="detailtabimg" />
                                                <p className="detailtabdatapara">Ethereum (ERC-721)</p>
                                            </div>
                                            <div className="detailtabdata">
                                                <img src="\assets\nftdetailassets\etherscan-logo.svg" alt="detailtabimg" className="detailtabimg" />
                                                <p className="detailtabdatapara">View on Etherscan</p>
                                            </div>
                                            <div className="detailtabdata">
                                                <img src="\assets\nftdetailassets\eye.svg" alt="detailtabimg" className="detailtabimg" />
                                                <p className="detailtabdatapara">Open original</p>
                                            </div>
                                            <div className="detailtabrefresh">
                                                <img src="\assets\nftdetailassets\refresh.svg" alt="refreshimg" className="refreshimg" />
                                                <p className="refreshpara">Refresh Metadata</p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                            {activeTab === 'link-2' && (
                                <>
                                    <div className="nftdetailtabtwo">
                                        <div className="rankmaintext">
                                            <h6 className="rankmainhead">Rank</h6>
                                            <span className="ranknumber">2,163 / 10,000</span>
                                        </div>
                                        <div className="ranktable">
                                            <div className="ranktablehead">
                                                <p className="rankinnerhead">Name</p>
                                                <p className="rankinnerhead">Rarity</p>
                                            </div>
                                            <div className="ranktablerow">
                                                <div className="ranktabletexts">
                                                    <p className="rankpara">Hair</p>
                                                    <h6 className="rankhead">Magenta Messy</h6>
                                                </div>
                                                <p className="rankmainpara">0.9%</p>
                                            </div>

                                            <div className="ranktablerow">
                                                <div className="ranktabletexts">
                                                    <p className="rankpara">Clothing</p>
                                                    <h6 className="rankhead">Red Kimono</h6>
                                                </div>
                                                <p className="rankmainpara">0.9%</p>
                                            </div>

                                            <div className="ranktablerow">
                                                <div className="ranktabletexts">
                                                    <p className="rankpara">Neck</p>
                                                    <h6 className="rankhead">Chain</h6>
                                                </div>
                                                <p className="rankmainpara">0.9%</p>
                                            </div>

                                            <div className="ranktablerow">
                                                <div className="ranktabletexts">
                                                    <p className="rankpara">Mouth</p>
                                                    <h6 className="rankhead">Not Bad</h6>
                                                </div>
                                                <p className="rankmainpara">0.9%</p>
                                            </div>

                                            <div className="ranktablerow">
                                                <div className="ranktabletexts">
                                                    <p className="rankpara">Eyes</p>
                                                    <h6 className="rankhead">Suspicious</h6>
                                                </div>
                                                <p className="rankmainpara">0.9%</p>
                                            </div>

                                            <div className="ranktablerow">
                                                <div className="ranktabletexts">
                                                    <p className="rankpara">Background</p>
                                                    <h6 className="rankhead">Off White A</h6>
                                                </div>
                                                <p className="rankmainpara">0.9%</p>
                                            </div>

                                            <div className="ranktablerow">
                                                <div className="ranktabletexts">
                                                    <p className="rankpara">Headgear</p>
                                                    <h6 className="rankhead">Full Bandana</h6>
                                                </div>
                                                <p className="rankmainpara">0.9%</p>
                                            </div>

                                            <div className="ranktablerow">
                                                <div className="ranktabletexts">
                                                    <p className="rankpara">Type</p>
                                                    <h6 className="rankhead">Red</h6>
                                                </div>
                                                <p className="rankmainpara">0.9%</p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                            {activeTab === 'link-3' && (
                                <>
                                    <div className="nftdetailtabthree">
                                        <div className="bidrow">
                                            <div className="bidrowleft">
                                                <div className="bidimg">
                                                    <img src="\assets\nftdetailassets\bidimg.png" alt="bidinnerimg" className="bidinnerimg" />
                                                </div>
                                                <div className="bidtexts">
                                                    <h6 className="bidtexthead">0x1fee3385b...b59b</h6>
                                                    <p className="bidtextpara">5 days ago • Expires in 1 days • <span className="bluetext">Floor bid</span></p>
                                                </div>
                                            </div>
                                            <div className="bidrowright">
                                                <h6 className="bidrighthead">4.42 CORE</h6>
                                                <p className="bidrightpara">$9,885</p>
                                            </div>
                                        </div>
                                        <div className="bidrow">
                                            <div className="bidrowleft">
                                                <div className="bidimg">
                                                    <img src="\assets\nftdetailassets\bidimg.png" alt="bidinnerimg" className="bidinnerimg" />
                                                </div>
                                                <div className="bidtexts">
                                                    <h6 className="bidtexthead">0x1fee3385b...b59b</h6>
                                                    <p className="bidtextpara">5 days ago • Expires in 1 days • <span className="bluetext">Floor bid</span></p>
                                                </div>
                                            </div>
                                            <div className="bidrowright">
                                                <h6 className="bidrighthead">4.42 CORE</h6>
                                                <p className="bidrightpara">$9,885</p>
                                            </div>
                                        </div>
                                        <div className="bidrow">
                                            <div className="bidrowleft">
                                                <div className="bidimg">
                                                    <img src="\assets\nftdetailassets\bidimg.png" alt="bidinnerimg" className="bidinnerimg" />
                                                </div>
                                                <div className="bidtexts">
                                                    <h6 className="bidtexthead">0x1fee3385b...b59b</h6>
                                                    <p className="bidtextpara">5 days ago • Expires in 1 days • <span className="bluetext">Floor bid</span></p>
                                                </div>
                                            </div>
                                            <div className="bidrowright">
                                                <h6 className="bidrighthead">4.42 CORE</h6>
                                                <p className="bidrightpara">$9,885</p>
                                            </div>
                                        </div>
                                        <div className="bidrow">
                                            <div className="bidrowleft">
                                                <div className="bidimg">
                                                    <img src="\assets\nftdetailassets\bidimg.png" alt="bidinnerimg" className="bidinnerimg" />
                                                </div>
                                                <div className="bidtexts">
                                                    <h6 className="bidtexthead">0x1fee3385b...b59b</h6>
                                                    <p className="bidtextpara">5 days ago • Expires in 1 days • <span className="bluetext">Floor bid</span></p>
                                                </div>
                                            </div>
                                            <div className="bidrowright">
                                                <h6 className="bidrighthead">4.42 CORE</h6>
                                                <p className="bidrightpara">$9,885</p>
                                            </div>
                                        </div>
                                        <div className="bidrow">
                                            <div className="bidrowleft">
                                                <div className="bidimg">
                                                    <img src="\assets\nftdetailassets\bidimg.png" alt="bidinnerimg" className="bidinnerimg" />
                                                </div>
                                                <div className="bidtexts">
                                                    <h6 className="bidtexthead">0x1fee3385b...b59b</h6>
                                                    <p className="bidtextpara">5 days ago • Expires in 1 days • <span className="bluetext">Floor bid</span></p>
                                                </div>
                                            </div>
                                            <div className="bidrowright">
                                                <h6 className="bidrighthead">4.42 CORE</h6>
                                                <p className="bidrightpara">$9,885</p>
                                            </div>
                                        </div>
                                        <div className="bidrow">
                                            <div className="bidrowleft">
                                                <div className="bidimg">
                                                    <img src="\assets\nftdetailassets\bidimg.png" alt="bidinnerimg" className="bidinnerimg" />
                                                </div>
                                                <div className="bidtexts">
                                                    <h6 className="bidtexthead">0x1fee3385b...b59b</h6>
                                                    <p className="bidtextpara">5 days ago • Expires in 1 days • <span className="bluetext">Floor bid</span></p>
                                                </div>
                                            </div>
                                            <div className="bidrowright">
                                                <h6 className="bidrighthead">4.42 CORE</h6>
                                                <p className="bidrightpara">$9,885</p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                            {activeTab === 'link-4' && (
                                <>
                                    <div className="nftdetailtabfour">
                                        <div className="activitymain">
                                            <div className="activityrow">
                                                <div className="activityrowleft">
                                                    <div className="activityimg">
                                                        <img src="\assets\nftdetailassets\bidimg.png" alt="activityinnerimg" className="activityinnerimg" />
                                                    </div>
                                                    <div className="activitytexts">
                                                        <h6 className="activitytexthead">0x1fee3385b...b59b <span className="darktext">listed for</span></h6>
                                                        <p className="activitytextpara">5 hours ago</p>
                                                    </div>
                                                </div>
                                                <div className="activityrowright">
                                                    <h6 className="activityrighthead">7.3 ETH</h6>
                                                    <p className="activityrightpara">$16,298</p>
                                                </div>
                                            </div>
                                            <div className="activityrow">
                                                <div className="activityrowleft">
                                                    <div className="activityimg">
                                                        <img src="\assets\nftdetailassets\bidimg.png" alt="activityinnerimg" className="activityinnerimg" />
                                                    </div>
                                                    <div className="activitytexts">
                                                        <h6 className="activitytexthead">0x1fee3385b...b59b <span className="darktext">transferred to</span> 0xb5b...6fd9</h6>
                                                        <p className="activitytextpara">5 hours ago</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="activityrow">
                                                <div className="activityrowleft">
                                                    <div className="activityimg">
                                                        <img src="\assets\nftdetailassets\bidimg.png" alt="activityinnerimg" className="activityinnerimg" />
                                                    </div>
                                                    <div className="activitytexts">
                                                        <h6 className="activitytexthead">0x1fee3385b...b59b <span className="darktext">listed for</span></h6>
                                                        <p className="activitytextpara">5 hours ago</p>
                                                    </div>
                                                </div>
                                                <div className="activityrowright">
                                                    <h6 className="activityrighthead">7.3 ETH</h6>
                                                    <p className="activityrightpara">$16,298</p>
                                                </div>
                                            </div>
                                            <div className="activityrow">
                                                <div className="activityrowleft">
                                                    <div className="activityimg">
                                                        <img src="\assets\nftdetailassets\bidimg.png" alt="activityinnerimg" className="activityinnerimg" />
                                                    </div>
                                                    <div className="activitytexts">
                                                        <h6 className="activitytexthead">0x1fee3385b...b59b <span className="darktext">transferred to</span> 0xb5b...6fd9</h6>
                                                        <p className="activitytextpara">5 hours ago</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="activityrow">
                                                <div className="activityrowleft">
                                                    <div className="activityimg">
                                                        <img src="\assets\nftdetailassets\bidimg.png" alt="activityinnerimg" className="activityinnerimg" />
                                                    </div>
                                                    <div className="activitytexts">
                                                        <h6 className="activitytexthead">0x1fee3385b...b59b <span className="darktext">listed for</span></h6>
                                                        <p className="activitytextpara">5 hours ago</p>
                                                    </div>
                                                </div>
                                                <div className="activityrowright">
                                                    <h6 className="activityrighthead">7.3 ETH</h6>
                                                    <p className="activityrightpara">$16,298</p>
                                                </div>
                                            </div>
                                            <div className="activityrow">
                                                <div className="activityrowleft">
                                                    <div className="activityimg">
                                                        <img src="\assets\nftdetailassets\bidimg.png" alt="activityinnerimg" className="activityinnerimg" />
                                                    </div>
                                                    <div className="activitytexts">
                                                        <h6 className="activitytexthead">0x1fee3385b...b59b <span className="darktext">transferred to</span> 0xb5b...6fd9</h6>
                                                        <p className="activitytextpara">5 hours ago</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="activityrow">
                                                <div className="activityrowleft">
                                                    <div className="activityimg">
                                                        <img src="\assets\nftdetailassets\bidimg.png" alt="activityinnerimg" className="activityinnerimg" />
                                                    </div>
                                                    <div className="activitytexts">
                                                        <h6 className="activitytexthead">0x1fee3385b...b59b <span className="darktext">listed for</span></h6>
                                                        <p className="activitytextpara">5 hours ago</p>
                                                    </div>
                                                </div>
                                                <div className="activityrowright">
                                                    <h6 className="activityrighthead">7.3 ETH</h6>
                                                    <p className="activityrightpara">$16,298</p>
                                                </div>
                                            </div>
                                            <div className="activityrow">
                                                <div className="activityrowleft">
                                                    <div className="activityimg">
                                                        <img src="\assets\nftdetailassets\bidimg.png" alt="activityinnerimg" className="activityinnerimg" />
                                                    </div>
                                                    <div className="activitytexts">
                                                        <h6 className="activitytexthead">0x1fee3385b...b59b <span className="darktext">transferred to</span> 0xb5b...6fd9</h6>
                                                        <p className="activitytextpara">5 hours ago</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                        <div></div>
                    </div>
                    <section className="more-collection">
                        <h6 className="main-heading">
                            More from this collection
                        </h6>
                        <MoreCollection />
                    </section>
                </div>
            </section>
            <Footer />


            <Modal className='buymodal' show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Accept bid</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="buynowimg">
                        <img src="\assets\nftdetailassets\mainnft.png" alt="buynowinnerimg" className="buynowinnerimg" />
                    </div>
                    <p className="buynowpara">You are about to Accept a bid for <span className="whitetext">Azuki #4437</span> from <span className="whitetext">Azuki.</span></p>
                    <div className="buyitemmain">
                        <h6 className="buyitemhead">Bid offered</h6>
                        <div className="buyitemright">
                            <img src="\assets\nftdetailassets\token.svg" alt="buyitemimg" className="buyitemimg" />
                            <h6 className="buyitemright">276.45</h6>
                            <p className="buyitemrightpara">CORE</p>
                        </div>
                    </div>
                    <div className="buydatamain">
                        <div className="buydata">
                            <p className="buydataleft">Service fee</p>
                            <h6 className="buydataright">0.025 CORE</h6>
                        </div>
                        <div className="buydata">
                            <p className="buydataleft">Total Bid amount</p>
                            <h6 className="buydataright">3.225 CORE</h6>
                        </div>
                    </div>
                    <div className="buymodalbtns">
                        <button className="borderbtn">Cancel</button>
                        <button className="bluebtn" onClick={() => {
                            handleClose();
                            handleShow3();
                        }}>Accept Bid</button>
                    </div>

                </Modal.Body>

            </Modal>

            <Modal className='buymodal' show={show1} onHide={handleClose1} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Successfully Purchased</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src="\assets\nftdetailassets\PURCHASED.svg" alt="purchasedimg" className="purchasedimg" />
                    <p className="purshasedpara">You have successfully purchased <span className="bluetext">Azuki #4301</span> for <span className="bluetext">7.5 CORE</span></p>
                    <button onClick={handleClose1} className="bluebtn">Ookay’s</button>
                </Modal.Body>

            </Modal>

            <Modal className='buymodal' show={show2} onHide={handleClose2} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Place a bid</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="buynowimg">
                        <img src="\assets\nftdetailassets\mainnft.png" alt="buynowinnerimg" className="buynowinnerimg" />
                    </div>
                    <p className="buynowpara">You are about to place a bid for <span className="whitetext">Azuki #4437</span> from <span className="whitetext">Azuki.</span></p>
                    <div className="bidinputmain">
                        <h6 className="bidinputhead">Your bid</h6>
                        <input type="text" placeholder='Enter yor bid' className='bidinput' />
                    </div>
                    <div className="placebiddatamain">
                        <div className="placebiddata">
                            <p className="placebiddataleft">Your balance</p>
                            <h6 className="placebiddataright">0.025 CORE</h6>
                        </div>
                        <div className="placebiddata">
                            <p className="placebiddataleft">Service fee</p>
                            <h6 className="placebiddataright">3.225 CORE</h6>
                        </div>
                    </div>
                    <div className="buyitemmain p-0">
                        <h6 className="buyitemhead">You will pay</h6>
                        <div className="buyitemright">
                            <img src="\assets\nftdetailassets\token.svg" alt="buyitemimg" className="buyitemimg" />
                            <h6 className="buyitemright">276.45</h6>
                            <p className="buyitemrightpara">CORE</p>
                        </div>
                    </div>
                    <div className="buymodalbtns">
                        <button className="borderbtn">Cancel</button>
                        <button className="bluebtn" onClick={() => {
                            handleClose2();
                            handleShow3();
                        }}>Buy Now</button>
                    </div>

                </Modal.Body>

            </Modal>

            <Modal className='buymodal' show={show3} onHide={handleClose3} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Accept Bid</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src="\assets\discovercollection\loadermain.png" alt="loader" className='loaderimg' />
                    <h6 className="loaderhead">Waiting for blockchain confirmation...</h6>
                </Modal.Body>

            </Modal>

            <Modal className='buymodal' show={show4} onHide={handleClose4} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Accept Bid</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src="\assets\nftdetailassets\PURCHASED.svg" alt="purchasedimg" className="purchasedimg" />
                    <p className="purshasedpara">Your transaction succeded!</p>
                    <button onClick={handleClose4} className="bluebtn">Ookay’s</button>
                </Modal.Body>

            </Modal>
        </>
    )
}

export default Acceptbid