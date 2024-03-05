import React, { useEffect, useState } from 'react'
import { Dropdown, Modal, Nav } from 'react-bootstrap'
import Navbar from './navbar';
import Footer from './footer';
import Link from 'next/link';

const Putonsale = () => {
    const [activeTab, setActiveTab] = useState('link-2');

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

                            <div className="putonsalebtns">
                                <Link href="/putonsalemethod" className="bluebtn">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                                        <path d="M19.3833 6.89199L19.1416 4.58366C18.7916 2.06699 17.65 1.04199 15.2083 1.04199H13.2416H12.0083H9.47495H8.24162H6.24162C3.79162 1.04199 2.65829 2.06699 2.29995 4.60866L2.07495 6.90032C1.99162 7.79199 2.23329 8.65866 2.75829 9.33366C3.39162 10.1587 4.36662 10.6253 5.44995 10.6253C6.49995 10.6253 7.50829 10.1003 8.14162 9.25866C8.70829 10.1003 9.67495 10.6253 10.75 10.6253C11.825 10.6253 12.7666 10.1253 13.3416 9.29199C13.9833 10.117 14.975 10.6253 16.0083 10.6253C17.1166 10.6253 18.1166 10.1337 18.7416 9.26699C19.2416 8.60032 19.4666 7.75866 19.3833 6.89199Z" fill="white" />
                                        <path d="M10.2083 13.8829C9.14998 13.9912 8.34998 14.8912 8.34998 15.9579V18.2412C8.34998 18.4662 8.53331 18.6496 8.75831 18.6496H12.7333C12.9583 18.6496 13.1416 18.4662 13.1416 18.2412V16.2496C13.15 14.5079 12.125 13.6829 10.2083 13.8829Z" fill="white" />
                                        <path d="M18.5583 12.0001V14.4834C18.5583 16.7834 16.6916 18.6501 14.3916 18.6501C14.1666 18.6501 13.9833 18.4667 13.9833 18.2417V16.2501C13.9833 15.1834 13.6583 14.3501 13.025 13.7834C12.4666 13.2751 11.7083 13.0251 10.7666 13.0251C10.5583 13.0251 10.35 13.0334 10.125 13.0584C8.64165 13.2084 7.51665 14.4584 7.51665 15.9584V18.2417C7.51665 18.4667 7.33332 18.6501 7.10832 18.6501C4.80832 18.6501 2.94165 16.7834 2.94165 14.4834V12.0167C2.94165 11.4334 3.51665 11.0417 4.05832 11.2334C4.28332 11.3084 4.50832 11.3667 4.74165 11.4001C4.84165 11.4167 4.94998 11.4334 5.04998 11.4334C5.18332 11.4501 5.31665 11.4584 5.44998 11.4584C6.41665 11.4584 7.36665 11.1001 8.11665 10.4834C8.83332 11.1001 9.76665 11.4584 10.75 11.4584C11.7416 11.4584 12.6583 11.1167 13.375 10.5001C14.125 11.1084 15.0583 11.4584 16.0083 11.4584C16.1583 11.4584 16.3083 11.4501 16.45 11.4334C16.55 11.4251 16.6416 11.4167 16.7333 11.4001C16.9916 11.3667 17.225 11.2917 17.4583 11.2167C18 11.0334 18.5583 11.4334 18.5583 12.0001Z" fill="white" />
                                    </svg>
                                    Put on Sale</Link>
                                <Link href="/putonsalemethod" className="borderbtn">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                                        <path d="M17.8667 15.8667C17.7417 15.9917 17.5834 16.0501 17.4251 16.0501C17.2667 16.0501 17.1084 15.9917 16.9834 15.8667L12.8584 11.7417L13.3001 11.3001L13.7417 10.8584L17.8667 14.9834C18.1084 15.2251 18.1084 15.6251 17.8667 15.8667Z" fill="#862FC0" />
                                        <path d="M6.14172 7.73308L10.975 12.5664C11.3 12.8914 11.3 13.4164 10.975 13.7414L10.225 14.4997C9.55005 15.1664 8.48338 15.1664 7.81672 14.4997L4.20005 10.8831C3.54172 10.2247 3.54172 9.14975 4.20005 8.48308L4.95838 7.72475C5.28338 7.40808 5.81672 7.40808 6.14172 7.73308Z" fill="#862FC0" />
                                        <path d="M16.2417 8.49141L13.0667 11.6581C12.7334 11.9914 12.2 11.9914 11.8667 11.6581L7.05005 6.84141C6.71672 6.50807 6.71672 5.97474 7.05005 5.64141L10.225 2.46641C10.8834 1.80807 11.9584 1.80807 12.625 2.46641L16.2417 6.08307C16.9 6.74974 16.9 7.81641 16.2417 8.49141Z" fill="#862FC0" />
                                        <path d="M7.41675 18.125H2.41675C2.07508 18.125 1.79175 17.8417 1.79175 17.5C1.79175 17.1583 2.07508 16.875 2.41675 16.875H7.41675C7.75841 16.875 8.04175 17.1583 8.04175 17.5C8.04175 17.8417 7.75841 18.125 7.41675 18.125Z" fill="#862FC0" />
                                    </svg>
                                    Put on Auction</Link>
                            </div>


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
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Putonsale