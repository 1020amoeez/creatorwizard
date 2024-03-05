'use client'

import React, { useEffect, useState } from 'react'
import Navbar from './navbar'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Items from './items';
import Modal from 'react-bootstrap/Modal';
import Activity from './activity';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useRouter } from 'next/router';
import Footer from './footer';

const Collections = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);

    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const [duration, setDuration] = useState(false);


    const router = useRouter();
    const [activeTab, setActiveTab] = useState('items');

    useEffect(() => {
        
        const { tab } = router.query;
        if (tab && (tab === 'items' || tab === 'activity')) {
            setActiveTab(tab);
        }
    }, [router.query]);

    const handleTabSelect = (selectedTab) => {
        setActiveTab(selectedTab);
    };


    return (
        <>
            <Navbar />
            <section className="collections">
                <div className="custom-container">
                    <div className="collection-bg-parent">
                        <div className="collection-bg">
                            <img src="\assets\dummy-imgs\collection\bg-img.png" alt="img" className='img-fluid' />
                        </div>
                    </div>
                    <div className="profile-img">
                        <img src="\assets\dummy-imgs\collection\profile-img.png" alt="img" className='img-fluid' />
                    </div>
                    <div className="bottom-detail">
                        <div className="left-content">
                            <h5 className="title">Azuki <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                <path d="M26.9501 13.4252L25.2501 11.4502C24.9251 11.0752 24.6626 10.3752 24.6626 9.8752V7.7502C24.6626 6.4252 23.5751 5.3377 22.2501 5.3377H20.1251C19.6376 5.3377 18.9251 5.0752 18.5501 4.7502L16.5751 3.0502C15.7126 2.3127 14.3001 2.3127 13.4251 3.0502L11.4626 4.7627C11.0876 5.0752 10.3751 5.3377 9.8876 5.3377H7.7251C6.4001 5.3377 5.3126 6.4252 5.3126 7.7502V9.8877C5.3126 10.3752 5.0501 11.0752 4.7376 11.4502L3.0501 13.4377C2.3251 14.3002 2.3251 15.7002 3.0501 16.5627L4.7376 18.5502C5.0501 18.9252 5.3126 19.6252 5.3126 20.1127V22.2502C5.3126 23.5752 6.4001 24.6627 7.7251 24.6627H9.8876C10.3751 24.6627 11.0876 24.9252 11.4626 25.2502L13.4376 26.9502C14.3001 27.6877 15.7126 27.6877 16.5876 26.9502L18.5626 25.2502C18.9376 24.9252 19.6376 24.6627 20.1376 24.6627H22.2626C23.5876 24.6627 24.6751 23.5752 24.6751 22.2502V20.1252C24.6751 19.6377 24.9376 18.9252 25.2626 18.5502L26.9626 16.5752C27.6876 15.7127 27.6876 14.2877 26.9501 13.4252ZM20.2001 12.6377L14.1626 18.6752C13.9876 18.8502 13.7501 18.9502 13.5001 18.9502C13.2501 18.9502 13.0126 18.8502 12.8376 18.6752L9.8126 15.6502C9.4501 15.2877 9.4501 14.6877 9.8126 14.3252C10.1751 13.9627 10.7751 13.9627 11.1376 14.3252L13.5001 16.6877L18.8751 11.3127C19.2376 10.9502 19.8376 10.9502 20.2001 11.3127C20.5626 11.6752 20.5626 12.2752 20.2001 12.6377Z" fill="#FFE600" />
                            </svg></h5>
                            <div className="twice-text">
                                <h6 className='created-text'>
                                    <span>Created by</span> 0x2ae6b...60aa
                                </h6>
                                <h6 className="royalities-text">
                                    Royalties <span>5%</span>
                                </h6>
                            </div>
                            <p className="main-para">A brand for the metaverse. Built by the community.</p>
                            <div className="detail-text-para">
                                <p> Azuki starts with a collection of 10,000 avatars that give you membership access to The Garden: a corner of the internet where artists, builders, and web3 enthusiasts meet to create a decentralized future. Azuki holders receive access to exclusive drops, experiences, and more. Visit <a href="#">azuki.com</a> for more details.</p>
                                <p>We rise together. We build together. We grow together.</p>
                                <p>Ready to take the red bean?</p>
                            </div>
                            <div className="bottom-btns">
                                <a onClick={handleShow} className='export-btn'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M15.2605 22.2503H8.74047C3.83047 22.2503 1.73047 20.1503 1.73047 15.2403V15.1103C1.73047 10.6703 3.48047 8.53027 7.40047 8.16027C7.80047 8.13027 8.18047 8.43027 8.22047 8.84027C8.26047 9.25027 7.96047 9.62027 7.54047 9.66027C4.40047 9.95027 3.23047 11.4303 3.23047 15.1203V15.2503C3.23047 19.3203 4.67047 20.7603 8.74047 20.7603H15.2605C19.3305 20.7603 20.7705 19.3203 20.7705 15.2503V15.1203C20.7705 11.4103 19.5805 9.93027 16.3805 9.66027C15.9705 9.62027 15.6605 9.26027 15.7005 8.85027C15.7405 8.44027 16.0905 8.13027 16.5105 8.17027C20.4905 8.51027 22.2705 10.6603 22.2705 15.1303V15.2603C22.2705 20.1503 20.1705 22.2503 15.2605 22.2503Z" fill="white" />
                                    <path d="M12 15.7501C11.59 15.7501 11.25 15.4101 11.25 15.0001V3.62012C11.25 3.21012 11.59 2.87012 12 2.87012C12.41 2.87012 12.75 3.21012 12.75 3.62012V15.0001C12.75 15.4101 12.41 15.7501 12 15.7501Z" fill="white" />
                                    <path d="M15.3501 6.60043C15.1601 6.60043 14.9701 6.53043 14.8201 6.38043L12.0001 3.56043L9.18009 6.38043C8.89009 6.67043 8.41009 6.67043 8.12009 6.38043C7.83009 6.09043 7.83009 5.61043 8.12009 5.32043L11.4701 1.97043C11.7601 1.68043 12.2401 1.68043 12.5301 1.97043L15.8801 5.32043C16.1701 5.61043 16.1701 6.09043 15.8801 6.38043C15.7401 6.53043 15.5401 6.60043 15.3501 6.60043Z" fill="white" />
                                </svg></a>
                                <a href="#" className='more-btn'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M4.05188 14.439C5.38983 14.439 6.47854 13.3508 6.47854 12.0126C6.47854 10.6744 5.38983 9.58594 4.05188 9.58594C2.71394 9.58594 1.625 10.6744 1.625 12.0126C1.625 13.3508 2.71394 14.439 4.05188 14.439Z" fill="white" />
                                    <path d="M11.9049 14.439C13.2427 14.439 14.3314 13.3508 14.3314 12.0126C14.3314 10.6744 13.2436 9.58594 11.9049 9.58594C10.5666 9.58594 9.47852 10.6744 9.47852 12.0126C9.47852 13.3508 10.567 14.439 11.9049 14.439Z" fill="white" />
                                    <path d="M19.8863 14.439C21.2246 14.439 22.3128 13.3508 22.3128 12.0126C22.3128 10.6744 21.2246 9.58594 19.8863 9.58594C18.5481 9.58594 17.459 10.6744 17.459 12.0126C17.459 13.3508 18.5477 14.439 19.8863 14.439Z" fill="white" />
                                </svg></a>
                            </div>
                        </div>
                        <div className="right-content">
                            <div className="upper-table">
                                <div className="text">
                                    <p>Floor</p>
                                    <h6>6.824 ETH</h6>
                                </div>
                                <div className="text">
                                    <p>Volume</p>
                                    <h6>775.4K ETH</h6>
                                </div>
                                <div className="text">
                                    <p>Items</p>
                                    <h6>10K</h6>
                                </div>
                                <div className="text">
                                    <p>Owners</p>
                                    <h6>4.4K</h6>
                                </div>
                                <div className="text">
                                    <p>Address</p>
                                    <h6>0xed5...c544yad713121</h6>
                                </div>
                            </div>
                            <a onClick={handleShow1} className='more-collection-btn'>Make Collection Offer</a>
                        </div>
                    </div>
                    <Tabs
                        // defaultActiveKey="items"
                        activeKey={activeTab} onSelect={handleTabSelect}
                        id="uncontrolled-tab-example"
                    >
                        <Tab eventKey="items" title="Items">
                            <Items />
                        </Tab>
                        <Tab eventKey="activity" title="Activity">
                            <Activity />
                        </Tab>
                    </Tabs>
                </div>
            </section>
            <Footer />

            <Modal className='buymodal collection-stats-modal' show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Collection stats</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="upper-content">
                        <div className="left-img">
                            <img src="\assets\dummy-imgs\modals\collection-img.png" alt="img" className='img-fluid' />
                        </div>
                        <div className="right-text">
                            <h6>floor price</h6>
                            <h4>12.3 <img src="\assets\landing\static\crypto-icon.svg" alt="img" className='img-fluid' /></h4>
                            <div className="twice-text">
                                <span className='orange-text'><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <path d="M6.99989 9.79988C6.59156 9.79988 6.18322 9.64238 5.87406 9.33321L2.07072 5.52988C1.90156 5.36071 1.90156 5.08071 2.07072 4.91154C2.23989 4.74238 2.51989 4.74238 2.68906 4.91154L6.49239 8.71488C6.77239 8.99488 7.22739 8.99488 7.50739 8.71488L11.3107 4.91154C11.4799 4.74238 11.7599 4.74238 11.9291 4.91154C12.0982 5.08071 12.0982 5.36071 11.9291 5.52988L8.12572 9.33321C7.81656 9.64238 7.40822 9.79988 6.99989 9.79988Z" fill="#FFAA00" />
                                </svg>-17.14%</span>
                                <p>24h Change</p>
                            </div>
                        </div>
                        <div className="right-text">
                            <h6>24h Volume</h6>
                            <h4>12.3 <img src="\assets\landing\static\crypto-icon.svg" alt="img" className='img-fluid' /></h4>
                            <div className="twice-text">
                                <span className='green-text'><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <path d="M6.99989 4.20012C6.59156 4.20012 6.18322 4.35762 5.87406 4.66679L2.07072 8.47012C1.90156 8.63929 1.90156 8.91929 2.07072 9.08846C2.23989 9.25762 2.51989 9.25762 2.68906 9.08846L6.49239 5.28512C6.77239 5.00512 7.22739 5.00512 7.50739 5.28512L11.3107 9.08846C11.4799 9.25762 11.7599 9.25762 11.9291 9.08846C12.0982 8.91929 12.0982 8.63929 11.9291 8.47012L8.12572 4.66679C7.81656 4.35762 7.40822 4.20012 6.99989 4.20012Z" fill="#00D181" />
                                </svg>17.14%</span>
                                <p>24h Change</p>
                            </div>
                        </div>
                    </div>
                    <div className="bottom-content">
                        <div className="text">
                            <p>Top Offers</p>
                            <h6>12.31 <img src="\assets\landing\static\crypto-icon.svg" alt="img" className='img-fluid' /></h6>
                        </div>
                        <div className="text">
                            <p>24h Sales</p>
                            <h6>1,716 </h6>
                        </div>
                        <div className="text">
                            <p>All Volume</p>
                            <h6>97.7K <img src="\assets\landing\static\crypto-icon.svg" alt="img" className='img-fluid' /></h6>
                        </div>
                        <div className="text">
                            <p>Holders</p>
                            <h6>1.83K </h6>
                        </div>
                        <div className="text">
                            <p>Listed/Supply</p>
                            <h6>901/5,555</h6>
                        </div>
                    </div>
                </Modal.Body>

            </Modal>

            <Modal className='buymodal make-collection-offer' show={show1} onHide={handleClose1} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Make Collection Offer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="offer-price-div">
                        <h6>Offer Price</h6>
                        <p><span>Floor Price:</span> 6.12 CORE <span>| Best offer:</span> 6.12 CORE </p>
                        <div className="twice-field">
                            <div className="option-field">
                                <input type="text" placeholder='Price' />
                                <a href="#" className='btn-core'>CORE</a>
                            </div>
                            <a href="#" className='btn-settobestoffer'>Set to best offer</a>
                        </div>
                    </div>
                    <div className="quantity-div">
                        <div className="text">
                            <h6>Quantity</h6>
                            <p>Offers Can Be Accepted Separately</p>
                        </div>
                        <div className="counter-area">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M18 12.75H6C5.59 12.75 5.25 12.41 5.25 12C5.25 11.59 5.59 11.25 6 11.25H18C18.41 11.25 18.75 11.59 18.75 12C18.75 12.41 18.41 12.75 18 12.75Z" fill="white" />
                            </svg>
                            <span>1</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                <path d="M16.5 11.6875H5.5C5.12417 11.6875 4.8125 11.3758 4.8125 11C4.8125 10.6242 5.12417 10.3125 5.5 10.3125H16.5C16.8758 10.3125 17.1875 10.6242 17.1875 11C17.1875 11.3758 16.8758 11.6875 16.5 11.6875Z" fill="white" />
                                <path d="M11 17.1875C10.6242 17.1875 10.3125 16.8758 10.3125 16.5V5.5C10.3125 5.12417 10.6242 4.8125 11 4.8125C11.3758 4.8125 11.6875 5.12417 11.6875 5.5V16.5C11.6875 16.8758 11.3758 17.1875 11 17.1875Z" fill="white" />
                            </svg>
                        </div>
                    </div>
                    <div className="duration-div">
                        <h6>Duration</h6>
                        <a onClick={() => { setDuration(!duration) }}>{duration ? "" : "7 days"}
                            {
                                duration ? <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                    <path d="M16.5 11.6875H5.5C5.12417 11.6875 4.8125 11.3758 4.8125 11C4.8125 10.6242 5.12417 10.3125 5.5 10.3125H16.5C16.8758 10.3125 17.1875 10.6242 17.1875 11C17.1875 11.3758 16.8758 11.6875 16.5 11.6875Z" fill="white" />
                                </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                    <path d="M16.5 11.6875H5.5C5.12417 11.6875 4.8125 11.3758 4.8125 11C4.8125 10.6242 5.12417 10.3125 5.5 10.3125H16.5C16.8758 10.3125 17.1875 10.6242 17.1875 11C17.1875 11.3758 16.8758 11.6875 16.5 11.6875Z" fill="white" />
                                    <path d="M11 17.1875C10.6242 17.1875 10.3125 16.8758 10.3125 16.5V5.5C10.3125 5.12417 10.6242 4.8125 11 4.8125C11.3758 4.8125 11.6875 5.12417 11.6875 5.5V16.5C11.6875 16.8758 11.3758 17.1875 11 17.1875Z" fill="white" />
                                </svg>
                            }
                        </a>
                    </div>
                    {
                        duration && <div className="ifopenedduration">
                            <div className="twice-field">
                                <div class="dropdown">
                                    <button class="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        7 days <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                                            <g clip-path="url(#clip0_206_23247)">
                                                <path d="M4.99997 7.8497C4.82075 7.8497 4.64155 7.78127 4.50492 7.64469L0.205141 3.34487C-0.0683805 3.07135 -0.0683805 2.62788 0.205141 2.35447C0.478553 2.08106 0.921933 2.08106 1.19548 2.35447L4.99997 6.15919L8.80449 2.35461C9.07801 2.08119 9.52135 2.08119 9.79474 2.35461C10.0684 2.62802 10.0684 3.07149 9.79474 3.34501L5.49503 7.64483C5.35832 7.78142 5.17913 7.8497 4.99997 7.8497Z" fill="white" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_206_23247">
                                                    <rect width="10" height="10" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li><a class="dropdown-item" href="#">Action</a></li>
                                        <li><a class="dropdown-item" href="#">Another action</a></li>
                                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                                    </ul>
                                </div>
                                <div className="option-field">
                                    <DatePicker
                                        selected={selectedDate}
                                        onChange={handleDateChange}
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={15}
                                        dateFormat="MMMM d, yyyy h:mm aa"
                                        timeCaption="Time"
                                    />
                                </div>
                            </div>
                        </div>
                    }

                    <div className="last-div">
                        <div className="left-profile-side">
                            <div className="profile">
                                <img src="\assets\dummy-imgs\collection\a1.png" alt="img" className='img-fluid' />
                            </div>
                            <h6>Forganas <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M17.9667 8.95046L16.8334 7.63379C16.6167 7.38379 16.4417 6.91712 16.4417 6.58379V5.16712C16.4417 4.28379 15.7167 3.55879 14.8334 3.55879H13.4167C13.0917 3.55879 12.6167 3.38379 12.3667 3.16712L11.0501 2.03379C10.4751 1.54212 9.5334 1.54212 8.95006 2.03379L7.64173 3.17546C7.39173 3.38379 6.91673 3.55879 6.59173 3.55879H5.15006C4.26673 3.55879 3.54173 4.28379 3.54173 5.16712V6.59212C3.54173 6.91712 3.36673 7.38379 3.1584 7.63379L2.0334 8.95879C1.55007 9.53379 1.55007 10.4671 2.0334 11.0421L3.1584 12.3671C3.36673 12.6171 3.54173 13.0838 3.54173 13.4088V14.8338C3.54173 15.7171 4.26673 16.4421 5.15006 16.4421H6.59173C6.91673 16.4421 7.39173 16.6171 7.64173 16.8338L8.9584 17.9671C9.5334 18.4588 10.4751 18.4588 11.0584 17.9671L12.3751 16.8338C12.6251 16.6171 13.0917 16.4421 13.4251 16.4421H14.8417C15.7251 16.4421 16.4501 15.7171 16.4501 14.8338V13.4171C16.4501 13.0921 16.6251 12.6171 16.8417 12.3671L17.9751 11.0505C18.4584 10.4755 18.4584 9.52546 17.9667 8.95046ZM13.4667 8.42546L9.44173 12.4505C9.32506 12.5671 9.16673 12.6338 9.00006 12.6338C8.8334 12.6338 8.67506 12.5671 8.5584 12.4505L6.54173 10.4338C6.30006 10.1921 6.30006 9.79212 6.54173 9.55046C6.7834 9.30879 7.1834 9.30879 7.42506 9.55046L9.00006 11.1255L12.5834 7.54212C12.8251 7.30046 13.2251 7.30046 13.4667 7.54212C13.7084 7.78379 13.7084 8.18379 13.4667 8.42546Z" fill="#FFE600" />
                            </svg></h6>
                        </div>
                        <div className="right-side">
                            <h6>-- CORE</h6>
                            <p>--</p>
                        </div>
                    </div>
                    <a href="#" className='btn-makeoffer'>Make Offer</a>
                    <p className='learnmore-text'>Service Offers Come with protections. <a href="#">Learn more</a></p>
                </Modal.Body>

            </Modal>
        </>
    )
}

export default Collections
