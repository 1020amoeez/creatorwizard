import React, { useEffect, useState } from 'react'
import { Accordion, Offcanvas, Pagination } from 'react-bootstrap'
import Navbar from './navbar'
import Footer from './footer'
import MultiRangeSlider from './multirangeslider'

const Discovercollection = () => {
    const [activeSpan, setActiveSpan] = useState('1D');

    const handleSpanClick = (span) => {
        setActiveSpan(span);
    };


    const [clickedSearch, setClickedsearch] = useState(true);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [toggle, setToggle] = useState(true);

    useEffect(()=>{
        let res = localStorage.getItem("toggle");
        if(res === "false") {
            setToggle(false);
        }
    }, [])

    return (
        <>
            <Navbar />
            <section className="discovercollectionmain">
                <span className="discovercollectionshade"></span>
                <div className="discovercollectioncontainer">
                    <h5 className="discovercollectionhead">Collections</h5>
                    <div className="dicovercollectionupper">
                        <button className={toggle ? "collectionfilterbtn" : "collectionfilterbtntext"} onClick={() => {setToggle(!toggle), localStorage.setItem("toggle", !toggle)}}>
                            {toggle ?
                                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" className="filterimginner">
                                    <path d="M23.4351 8.04373H17.1742C16.7464 8.04373 16.3916 7.68895 16.3916 7.26112C16.3916 6.8333 16.7464 6.47852 17.1742 6.47852H23.4351C23.8629 6.47852 24.2177 6.8333 24.2177 7.26112C24.2177 7.68895 23.8629 8.04373 23.4351 8.04373Z" fill="white" />
                                    <path d="M6.73973 8.04373H2.56581C2.13799 8.04373 1.7832 7.68895 1.7832 7.26112C1.7832 6.8333 2.13799 6.47852 2.56581 6.47852H6.73973C7.16755 6.47852 7.52233 6.8333 7.52233 7.26112C7.52233 7.68895 7.16755 8.04373 6.73973 8.04373Z" fill="white" />
                                    <path d="M10.9133 11.6957C8.47156 11.6957 6.47852 9.70269 6.47852 7.26095C6.47852 4.81922 8.47156 2.82617 10.9133 2.82617C13.355 2.82617 15.3481 4.81922 15.3481 7.26095C15.3481 9.70269 13.355 11.6957 10.9133 11.6957ZM10.9133 4.39139C9.32721 4.39139 8.04373 5.67487 8.04373 7.26095C8.04373 8.84704 9.32721 10.1305 10.9133 10.1305C12.4994 10.1305 13.7829 8.84704 13.7829 7.26095C13.7829 5.67487 12.4994 4.39139 10.9133 4.39139Z" fill="white" />
                                    <path d="M23.435 19.5222H19.2611C18.8333 19.5222 18.4785 19.1675 18.4785 18.7396C18.4785 18.3118 18.8333 17.957 19.2611 17.957H23.435C23.8629 17.957 24.2176 18.3118 24.2176 18.7396C24.2176 19.1675 23.8629 19.5222 23.435 19.5222Z" fill="white" />
                                    <path d="M8.82668 19.5222H2.56581C2.13799 19.5222 1.7832 19.1675 1.7832 18.7396C1.7832 18.3118 2.13799 17.957 2.56581 17.957H8.82668C9.25451 17.957 9.60929 18.3118 9.60929 18.7396C9.60929 19.1675 9.25451 19.5222 8.82668 19.5222Z" fill="white" />
                                    <path d="M15.0871 23.1743C12.6454 23.1743 10.6523 21.1812 10.6523 18.7395C10.6523 16.2977 12.6454 14.3047 15.0871 14.3047C17.5289 14.3047 19.5219 16.2977 19.5219 18.7395C19.5219 21.1812 17.5289 23.1743 15.0871 23.1743ZM15.0871 15.8699C13.501 15.8699 12.2176 17.1534 12.2176 18.7395C12.2176 20.3256 13.501 21.609 15.0871 21.609C16.6732 21.609 17.9567 20.3256 17.9567 18.7395C17.9567 17.1534 16.6732 15.8699 15.0871 15.8699Z" fill="white" />
                                </svg>
                                :
                                <>
                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" className={toggle ? 'arrowimgfilter hidepara' : 'arrowimgfilter showpara'}>
                                        <g id="arrow-down-sign-to-navigate 1" clipPath="url(#clip0_206_10404)">
                                            <g id="Group">
                                                <path id="Vector" d="M2.1503 4.99997C2.1503 4.82075 2.21873 4.64155 2.35531 4.50492L6.65513 0.205141C6.92865 -0.0683805 7.37212 -0.0683805 7.64553 0.205141C7.91894 0.478553 7.91894 0.921933 7.64553 1.19548L3.84081 4.99997L7.64539 8.80449C7.91881 9.07801 7.91881 9.52135 7.64539 9.79474C7.37198 10.0684 6.92851 10.0684 6.65499 9.79474L2.35517 5.49503C2.21858 5.35832 2.1503 5.17913 2.1503 4.99997Z" fill="white" />
                                            </g>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_206_10404">
                                                <rect width="10" height="10" fill="white" transform="translate(10) rotate(90)" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    <p className={toggle ? 'hidepara' : 'showpara'}>Filters</p>
                                </>
                            }
                        </button>
                        <div className="searchcollectionmain">
                            <input type="search" placeholder='Search by collection' className="searchcollectioninput" />
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="searchcollectionimg">
                                <g id="vuesax/outline/search-normal">
                                    <g id="search-normal">
                                        <path id="Vector" d="M9.58366 18.1253C4.87533 18.1253 1.04199 14.292 1.04199 9.58366C1.04199 4.87533 4.87533 1.04199 9.58366 1.04199C14.292 1.04199 18.1253 4.87533 18.1253 9.58366C18.1253 14.292 14.292 18.1253 9.58366 18.1253ZM9.58366 2.29199C5.55866 2.29199 2.29199 5.56699 2.29199 9.58366C2.29199 13.6003 5.55866 16.8753 9.58366 16.8753C13.6087 16.8753 16.8753 13.6003 16.8753 9.58366C16.8753 5.56699 13.6087 2.29199 9.58366 2.29199Z" fill="#555357" />
                                        <path id="Vector_2" d="M18.3335 18.9585C18.1752 18.9585 18.0169 18.9002 17.8919 18.7752L16.2252 17.1085C15.9835 16.8669 15.9835 16.4669 16.2252 16.2252C16.4669 15.9835 16.8669 15.9835 17.1085 16.2252L18.7752 17.8919C19.0169 18.1335 19.0169 18.5335 18.7752 18.7752C18.6502 18.9002 18.4919 18.9585 18.3335 18.9585Z" fill="#555357" />
                                    </g>
                                </g>
                            </svg>
                        </div>
                        <div className="timefilter">
                            <span
                                className={activeSpan === '1H' ? 'timespan active' : 'timespan'}
                                onClick={() => handleSpanClick('1H')}
                            >
                                1H
                            </span>
                            <span
                                className={activeSpan === '1D' ? 'timespan active' : 'timespan'}
                                onClick={() => handleSpanClick('1D')}
                            >
                                1D
                            </span>
                            <span
                                className={activeSpan === '7D' ? 'timespan active' : 'timespan'}
                                onClick={() => handleSpanClick('7D')}
                            >
                                7D
                            </span>
                            <span
                                className={activeSpan === '30D' ? 'timespan active' : 'timespan'}
                                onClick={() => handleSpanClick('30D')}
                            >
                                30D
                            </span>
                        </div>
                    </div>
                    {
                        clickedSearch ?
                            <div className="dicovercollectionuppermbl d-none">
                                <div className="dicovercollectionbtns">
                                    <button className="filterbtnmbl" onClick={handleShow}>
                                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" className="filterimginner">
                                            <path d="M23.4351 8.04373H17.1742C16.7464 8.04373 16.3916 7.68895 16.3916 7.26112C16.3916 6.8333 16.7464 6.47852 17.1742 6.47852H23.4351C23.8629 6.47852 24.2177 6.8333 24.2177 7.26112C24.2177 7.68895 23.8629 8.04373 23.4351 8.04373Z" fill="white" />
                                            <path d="M6.73973 8.04373H2.56581C2.13799 8.04373 1.7832 7.68895 1.7832 7.26112C1.7832 6.8333 2.13799 6.47852 2.56581 6.47852H6.73973C7.16755 6.47852 7.52233 6.8333 7.52233 7.26112C7.52233 7.68895 7.16755 8.04373 6.73973 8.04373Z" fill="white" />
                                            <path d="M10.9133 11.6957C8.47156 11.6957 6.47852 9.70269 6.47852 7.26095C6.47852 4.81922 8.47156 2.82617 10.9133 2.82617C13.355 2.82617 15.3481 4.81922 15.3481 7.26095C15.3481 9.70269 13.355 11.6957 10.9133 11.6957ZM10.9133 4.39139C9.32721 4.39139 8.04373 5.67487 8.04373 7.26095C8.04373 8.84704 9.32721 10.1305 10.9133 10.1305C12.4994 10.1305 13.7829 8.84704 13.7829 7.26095C13.7829 5.67487 12.4994 4.39139 10.9133 4.39139Z" fill="white" />
                                            <path d="M23.435 19.5222H19.2611C18.8333 19.5222 18.4785 19.1675 18.4785 18.7396C18.4785 18.3118 18.8333 17.957 19.2611 17.957H23.435C23.8629 17.957 24.2176 18.3118 24.2176 18.7396C24.2176 19.1675 23.8629 19.5222 23.435 19.5222Z" fill="white" />
                                            <path d="M8.82668 19.5222H2.56581C2.13799 19.5222 1.7832 19.1675 1.7832 18.7396C1.7832 18.3118 2.13799 17.957 2.56581 17.957H8.82668C9.25451 17.957 9.60929 18.3118 9.60929 18.7396C9.60929 19.1675 9.25451 19.5222 8.82668 19.5222Z" fill="white" />
                                            <path d="M15.0871 23.1743C12.6454 23.1743 10.6523 21.1812 10.6523 18.7395C10.6523 16.2977 12.6454 14.3047 15.0871 14.3047C17.5289 14.3047 19.5219 16.2977 19.5219 18.7395C19.5219 21.1812 17.5289 23.1743 15.0871 23.1743ZM15.0871 15.8699C13.501 15.8699 12.2176 17.1534 12.2176 18.7395C12.2176 20.3256 13.501 21.609 15.0871 21.609C16.6732 21.609 17.9567 20.3256 17.9567 18.7395C17.9567 17.1534 16.6732 15.8699 15.0871 15.8699Z" fill="white" />
                                        </svg>
                                    </button>

                                    <button className="filterbtnmbl" onClick={() => setClickedsearch(!clickedSearch)}>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="filterimginner">
                                            <g id="vuesax/outline/search-normal">
                                                <g id="search-normal">
                                                    <path id="Vector" d="M9.58366 18.1253C4.87533 18.1253 1.04199 14.292 1.04199 9.58366C1.04199 4.87533 4.87533 1.04199 9.58366 1.04199C14.292 1.04199 18.1253 4.87533 18.1253 9.58366C18.1253 14.292 14.292 18.1253 9.58366 18.1253ZM9.58366 2.29199C5.55866 2.29199 2.29199 5.56699 2.29199 9.58366C2.29199 13.6003 5.55866 16.8753 9.58366 16.8753C13.6087 16.8753 16.8753 13.6003 16.8753 9.58366C16.8753 5.56699 13.6087 2.29199 9.58366 2.29199Z" fill="#555357" />
                                                    <path id="Vector_2" d="M18.3335 18.9585C18.1752 18.9585 18.0169 18.9002 17.8919 18.7752L16.2252 17.1085C15.9835 16.8669 15.9835 16.4669 16.2252 16.2252C16.4669 15.9835 16.8669 15.9835 17.1085 16.2252L18.7752 17.8919C19.0169 18.1335 19.0169 18.5335 18.7752 18.7752C18.6502 18.9002 18.4919 18.9585 18.3335 18.9585Z" fill="#555357" />
                                                </g>
                                            </g>
                                        </svg>
                                    </button>
                                </div>
                                <button className="lastbtn">
                                    <p>last 1D</p>
                                    <div className="arrowimages">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="6" viewBox="0 0 12 6" fill="none">
                                            <path d="M1.62263 6L6.62705 6L11.1334 6C11.9046 6 12.2902 5.13 11.7439 4.62L7.58295 0.735C6.91623 0.112499 5.83181 0.112499 5.16509 0.735L3.58263 2.2125L1.0041 4.62C0.465904 5.13 0.851479 6 1.62263 6Z" fill="#745F8C" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="6" viewBox="0 0 12 6" fill="none">
                                            <path d="M11.1313 0H6.12685H1.62046C0.849313 0 0.463739 0.87 1.00997 1.38L5.17095 5.265C5.83767 5.8875 6.9221 5.8875 7.58882 5.265L9.17128 3.7875L11.7498 1.38C12.288 0.87 11.9024 0 11.1313 0Z" fill="#745F8C" />
                                        </svg>
                                    </div>
                                </button>
                            </div>
                            :
                            <>
                                <div className="searchingmain">
                                    <button className="crossbtn" onClick={() => setClickedsearch(!clickedSearch)}>
                                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className='crossimg'>
                                            <circle cx="16.0008" cy="15.9969" r="14.7" stroke="white" />
                                            <path d="M12.0418 19.9598L19.9614 12.0402M19.9614 19.9598L12.0418 12.0402" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </button>
                                    <div className="searchcollectionmain">
                                        <input type="search" placeholder='Search by collection' className="searchcollectioninput" />
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="searchcollectionimg">
                                            <g id="vuesax/outline/search-normal">
                                                <g id="search-normal">
                                                    <path id="Vector" d="M9.58366 18.1253C4.87533 18.1253 1.04199 14.292 1.04199 9.58366C1.04199 4.87533 4.87533 1.04199 9.58366 1.04199C14.292 1.04199 18.1253 4.87533 18.1253 9.58366C18.1253 14.292 14.292 18.1253 9.58366 18.1253ZM9.58366 2.29199C5.55866 2.29199 2.29199 5.56699 2.29199 9.58366C2.29199 13.6003 5.55866 16.8753 9.58366 16.8753C13.6087 16.8753 16.8753 13.6003 16.8753 9.58366C16.8753 5.56699 13.6087 2.29199 9.58366 2.29199Z" fill="#555357" />
                                                    <path id="Vector_2" d="M18.3335 18.9585C18.1752 18.9585 18.0169 18.9002 17.8919 18.7752L16.2252 17.1085C15.9835 16.8669 15.9835 16.4669 16.2252 16.2252C16.4669 15.9835 16.8669 15.9835 17.1085 16.2252L18.7752 17.8919C19.0169 18.1335 19.0169 18.5335 18.7752 18.7752C18.6502 18.9002 18.4919 18.9585 18.3335 18.9585Z" fill="#555357" />
                                                </g>
                                            </g>
                                        </svg>
                                    </div>
                                </div>
                            </>
                    }
                    <div className={toggle ? 'dicovercollectionlower' : "dicovercollectionlower forgap"}>
                        <div className={toggle ? 'filter filter-hidden' : 'filter'}>
                            <Accordion defaultActiveKey="0">
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Floor price</Accordion.Header>
                                    <Accordion.Body>
                                        <div className="price-content">
                                            <MultiRangeSlider
                                                min={0}
                                                max={100}
                                                onChange={({ min, max }) => console.log(`min = ${min}, max = ${max}`)}
                                            />
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>Volume</Accordion.Header>
                                    <Accordion.Body>
                                        <div className="price-content">
                                            <MultiRangeSlider
                                                min={0}
                                                max={100}
                                                onChange={({ min, max }) => console.log(`min = ${min}, max = ${max}`)}
                                            />
                                        </div>

                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="2">
                                    <Accordion.Header>Volume Change</Accordion.Header>
                                    <Accordion.Body>
                                        <div className="price-content">
                                            <MultiRangeSlider
                                                min={0}
                                                max={100}
                                                onChange={({ min, max }) => console.log(`min = ${min}, max = ${max}`)}
                                            />
                                        </div>

                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="3">
                                    <Accordion.Header>Sale</Accordion.Header>
                                    <Accordion.Body>
                                        <div className="price-content">
                                            <MultiRangeSlider
                                                min={0}
                                                max={100}
                                                onChange={({ min, max }) => console.log(`min = ${min}, max = ${max}`)}
                                            />
                                        </div>

                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="4">
                                    <Accordion.Header>Unique owner ratio</Accordion.Header>
                                    <Accordion.Body>
                                        <div className="price-content">
                                            <MultiRangeSlider
                                                min={0}
                                                max={100}
                                                onChange={({ min, max }) => console.log(`min = ${min}, max = ${max}`)}
                                            />
                                        </div>

                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                        <div className={toggle ? 'maindicovercollectiontable' : 'maindicovercollectiontable widthset'}>
                            <div className="dicovercollectiontable">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Collections</th>
                                            <th>Floor</th>
                                            <th>
                                                <div className="theadmain">
                                                    <p className="theadpara">
                                                        Volume
                                                    </p>
                                                    <div className="theadarrows">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="6" viewBox="0 0 12 6" fill="none" className='theadupperarrow'>
                                                            <path d="M1.5572 6L6.56162 6L11.068 6C11.8392 6 12.2247 5.13 11.6785 4.62L7.51752 0.735C6.8508 0.112499 5.76638 0.112499 5.09966 0.735L3.5172 2.2125L0.938671 4.62C0.400475 5.13 0.786049 6 1.5572 6Z" fill="white" />
                                                        </svg>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="6" viewBox="0 0 12 6" fill="none" className='theadlowerarrow'>
                                                            <path d="M11.0659 0H6.06142H1.55503C0.783883 0 0.39831 0.87 0.944539 1.38L5.10552 5.265C5.77224 5.8875 6.85667 5.8875 7.52339 5.265L9.10585 3.7875L11.6844 1.38C12.2226 0.87 11.837 0 11.0659 0Z" fill="#2C253E" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </th>
                                            <th>Market cap</th>
                                            <th>Floor 1d%</th>
                                            <th>
                                                <div className="theadmain">
                                                    <p className="theadpara">
                                                        Volume 1d%
                                                    </p>
                                                    <div className="theadarrows">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="6" viewBox="0 0 12 6" fill="none" className='theadupperarrow'>
                                                            <path d="M1.5572 6L6.56162 6L11.068 6C11.8392 6 12.2247 5.13 11.6785 4.62L7.51752 0.735C6.8508 0.112499 5.76638 0.112499 5.09966 0.735L3.5172 2.2125L0.938671 4.62C0.400475 5.13 0.786049 6 1.5572 6Z" fill="white" />
                                                        </svg>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="6" viewBox="0 0 12 6" fill="none" className='theadlowerarrow'>
                                                            <path d="M11.0659 0H6.06142H1.55503C0.783883 0 0.39831 0.87 0.944539 1.38L5.10552 5.265C5.77224 5.8875 6.85667 5.8875 7.52339 5.265L9.10585 3.7875L11.6844 1.38C12.2226 0.87 11.837 0 11.0659 0Z" fill="#2C253E" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </th>
                                            <th>Vol 1d%</th>
                                            <th>Sale 1D</th>
                                            <th>Listed</th>
                                            <th>Owners</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>
                                                <div className="maincollectiontd">
                                                    <div className="collectiontdimg">
                                                        <img src="\assets\discovercollection\collectionone.png" alt="collectiontdinnerimg" className="collectiontdinnerimg" />
                                                    </div>
                                                    <p className="collectiontdpara">Forganas</p>
                                                </div>
                                            </td>
                                            <td>30 CORE</td>
                                            <td>2,087 CORE</td>
                                            <td>9.4M USDC</td>
                                            <td><p className="redtext">-1%</p></td>
                                            <td>2,087 CORE</td>
                                            <td><p className="redtext">-1%</p></td>
                                            <td>2,448</td>
                                            <td><p className="textspan">754 <span className='darktext'>(6.9%)</span></p></td>
                                            <td><p className="textspan">754 <span className='darktext'>(6.9%)</span></p></td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>
                                                <div className="maincollectiontd">
                                                    <div className="collectiontdimg">
                                                        <img src="\assets\discovercollection\collectiontwo.png" alt="collectiontdinnerimg" className="collectiontdinnerimg" />
                                                    </div>
                                                    <p className="collectiontdpara">Index ONE</p>
                                                </div>
                                            </td>
                                            <td>30 CORE</td>
                                            <td>2,087 CORE</td>
                                            <td>9.4M USDC</td>
                                            <td><p className="redtext">-8.8%</p></td>
                                            <td>2,087 CORE</td>
                                            <td><p className="redtext">-8.8%</p></td>
                                            <td>2,448</td>
                                            <td><p className="textspan">754 <span>(6.9%)</span></p></td>
                                            <td><p className="textspan">754 <span>(6.9%)</span></p></td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>
                                                <div className="maincollectiontd">
                                                    <div className="collectiontdimg">
                                                        <img src="\assets\discovercollection\collectionthree.png" alt="collectiontdinnerimg" className="collectiontdinnerimg" />
                                                    </div>
                                                    <p className="collectiontdpara">SNB</p>
                                                </div>
                                            </td>
                                            <td>30 CORE</td>
                                            <td>2,087 CORE</td>
                                            <td>9.4M USDC</td>
                                            <td><p className="redtext">-1%</p></td>
                                            <td>2,087 CORE</td>
                                            <td><p className="redtext">-1%</p></td>
                                            <td>2,448</td>
                                            <td><p className="textspan">754 <span>(6.9%)</span></p></td>
                                            <td><p className="textspan">754 <span>(6.9%)</span></p></td>
                                        </tr>
                                        <tr>
                                            <td>4</td>
                                            <td>
                                                <div className="maincollectiontd">
                                                    <div className="collectiontdimg">
                                                        <img src="\assets\discovercollection\collectionfour.png" alt="collectiontdinnerimg" className="collectiontdinnerimg" />
                                                    </div>
                                                    <p className="collectiontdpara">DeGods</p>
                                                </div>
                                            </td>
                                            <td>30 CORE</td>
                                            <td>2,087 CORE</td>
                                            <td>9.4M USDC</td>
                                            <td><p className="redtext">-1%</p></td>
                                            <td>2,087 CORE</td>
                                            <td><p className="redtext">-1%</p></td>
                                            <td>2,448</td>
                                            <td><p className="textspan">754 <span>(6.9%)</span></p></td>
                                            <td><p className="textspan">754 <span>(6.9%)</span></p></td>
                                        </tr>
                                        <tr>
                                            <td>5</td>
                                            <td>
                                                <div className="maincollectiontd">
                                                    <div className="collectiontdimg">
                                                        <img src="\assets\discovercollection\collectionfive.png" alt="collectiontdinnerimg" className="collectiontdinnerimg" />
                                                    </div>
                                                    <p className="collectiontdpara">Azuki</p>
                                                </div>
                                            </td>
                                            <td>30 CORE</td>
                                            <td>2,087 CORE</td>
                                            <td>9.4M USDC</td>
                                            <td><p className="greentext">+1.8%</p></td>
                                            <td>2,087 CORE</td>
                                            <td><p className="greentext">+1.8%</p></td>
                                            <td>2,448</td>
                                            <td><p className="textspan">754 <span>(6.9%)</span></p></td>
                                            <td><p className="textspan">754 <span>(6.9%)</span></p></td>
                                        </tr>
                                        <tr>
                                            <td>6</td>
                                            <td>
                                                <div className="maincollectiontd">
                                                    <div className="collectiontdimg">
                                                        <img src="\assets\discovercollection\collectionsix.png" alt="collectiontdinnerimg" className="collectiontdinnerimg" />
                                                    </div>
                                                    <p className="collectiontdpara">Milady</p>
                                                </div>
                                            </td>
                                            <td>30 CORE</td>
                                            <td>2,087 CORE</td>
                                            <td>9.4M USDC</td>
                                            <td><p className="redtext">-5.3%</p></td>
                                            <td>2,087 CORE</td>
                                            <td><p className="redtext">-5.3%</p></td>
                                            <td>2,448</td>
                                            <td><p className="textspan">754 <span>(6.9%)</span></p></td>
                                            <td><p className="textspan">754 <span>(6.9%)</span></p></td>
                                        </tr>
                                        <tr>
                                            <td>7</td>
                                            <td>
                                                <div className="maincollectiontd">
                                                    <div className="collectiontdimg">
                                                        <img src="\assets\discovercollection\collectionseven.png" alt="collectiontdinnerimg" className="collectiontdinnerimg" />
                                                    </div>
                                                    <p className="collectiontdpara">LilPudgys</p>
                                                </div>
                                            </td>
                                            <td>30 CORE</td>
                                            <td>2,087 CORE</td>
                                            <td>9.4M USDC</td>
                                            <td><p className="redtext">-1%</p></td>
                                            <td>2,087 CORE</td>
                                            <td><p className="redtext">-1%</p></td>
                                            <td>2,448</td>
                                            <td><p className="textspan">754 <span>(6.9%)</span></p></td>
                                            <td><p className="textspan">754 <span>(6.9%)</span></p></td>
                                        </tr>
                                        <tr>
                                            <td>8</td>
                                            <td>
                                                <div className="maincollectiontd">
                                                    <div className="collectiontdimg">
                                                        <img src="\assets\discovercollection\collectioneight.png" alt="collectiontdinnerimg" className="collectiontdinnerimg" />
                                                    </div>
                                                    <p className="collectiontdpara">Moonbirds</p>
                                                </div>
                                            </td>
                                            <td>30 CORE</td>
                                            <td>2,087 CORE</td>
                                            <td>9.4M USDC</td>
                                            <td><p className="redtext">-1%</p></td>
                                            <td>2,087 CORE</td>
                                            <td><p className="redtext">-1%</p></td>
                                            <td>2,448</td>
                                            <td><p className="textspan">754 <span>(6.9%)</span></p></td>
                                            <td><p className="textspan">754 <span>(6.9%)</span></p></td>
                                        </tr>
                                        <tr>
                                            <td>9</td>
                                            <td>
                                                <div className="maincollectiontd">
                                                    <div className="collectiontdimg">
                                                        <img src="\assets\discovercollection\collectionnine.png" alt="collectiontdinnerimg" className="collectiontdinnerimg" />
                                                    </div>
                                                    <p className="collectiontdpara">TOPIA</p>
                                                </div>
                                            </td>
                                            <td>30 CORE</td>
                                            <td>2,087 CORE</td>
                                            <td>9.4M USDC</td>
                                            <td><p className="greentext">+4.5%</p></td>
                                            <td>2,087 CORE</td>
                                            <td><p className="greentext">+4.5%</p></td>
                                            <td>2,448</td>
                                            <td><p className="textspan">754 <span>(6.9%)</span></p></td>
                                            <td><p className="textspan">754 <span>(6.9%)</span></p></td>
                                        </tr>
                                        <tr>
                                            <td>10</td>
                                            <td>
                                                <div className="maincollectiontd">
                                                    <div className="collectiontdimg">
                                                        <img src="\assets\discovercollection\collectionten.png" alt="collectiontdinnerimg" className="collectiontdinnerimg" />
                                                    </div>
                                                    <p className="collectiontdpara">Block</p>
                                                </div>
                                            </td>
                                            <td>30 CORE</td>
                                            <td>2,087 CORE</td>
                                            <td>9.4M USDC</td>
                                            <td><p className="greentext">+1%</p></td>
                                            <td>2,087 CORE</td>
                                            <td><p className="greentext">+1%</p></td>
                                            <td>2,448</td>
                                            <td><p className="textspan">754 <span>(6.9%)</span></p></td>
                                            <td><p className="textspan">754 <span>(6.9%)</span></p></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="paginationmain">
                                <button className="paginationbtn">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="pagearrowimg">
                                        <g id="arrow/left regular">
                                            <path id="Icon" d="M15.8332 10H4.99987M9.16654 5L4.7558 9.41074C4.43036 9.73618 4.43036 10.2638 4.7558 10.5893L9.16654 15" stroke="white" stroke-width="1.5" stroke-linecap="round" />
                                        </g>
                                    </svg>
                                    Prev
                                </button>
                                <Pagination>
                                    <Pagination.Item>{1}</Pagination.Item>
                                    <Pagination.Item>{2}</Pagination.Item>
                                    <Pagination.Ellipsis />
                                    <Pagination.Item active>{5}</Pagination.Item>
                                    <Pagination.Item>{6}</Pagination.Item>
                                </Pagination>
                                <button className="paginationbtn">
                                    Next
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="pagearrowimg">
                                        <g id="arrow/right regular">
                                            <path id="Icon" d="M4.16699 10H15.0003M10.8337 5L15.2444 9.41074C15.5698 9.73618 15.5698 10.2638 15.2444 10.5893L10.8337 15" stroke="white" stroke-width="1.5" stroke-linecap="round" />
                                        </g>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />


            <Offcanvas show={show} onHide={handleClose} placement='bottom' className="filtersidebar">
                <Offcanvas.Body>
                    <div className="filtersidehead">
                        <h6 className="filtersideheading">Filters</h6>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none" className="crossimg" onClick={handleClose}>
                            <g clipPath="url(#clip0_206_27652)">
                                <path d="M0.683721 14.0001C0.548501 14.0001 0.41631 13.96 0.30387 13.8849C0.191431 13.8098 0.103793 13.703 0.0520429 13.5781C0.000292829 13.4532 -0.0132448 13.3157 0.0131423 13.1831C0.0395295 13.0505 0.104656 12.9287 0.200284 12.8331L12.8331 0.200246C12.9613 0.0720308 13.1352 0 13.3165 0C13.4979 0 13.6718 0.0720308 13.8 0.200246C13.9282 0.328462 14.0002 0.50236 14.0002 0.683684C14.0002 0.865008 13.9282 1.03891 13.8 1.16712L1.16716 13.7999C1.10373 13.8635 1.02837 13.9139 0.945409 13.9482C0.862446 13.9826 0.773514 14.0002 0.683721 14.0001Z" fill="white" />
                                <path d="M13.3165 14.0001C13.2267 14.0002 13.1378 13.9826 13.0548 13.9482C12.9718 13.9139 12.8965 13.8635 12.8331 13.7999L0.200246 1.16712C0.0720308 1.03891 0 0.865008 0 0.683684C0 0.50236 0.0720308 0.328462 0.200246 0.200246C0.328462 0.0720308 0.50236 0 0.683684 0C0.865008 0 1.03891 0.0720308 1.16712 0.200246L13.7999 12.8331C13.8956 12.9287 13.9607 13.0505 13.9871 13.1831C14.0135 13.3157 13.9999 13.4532 13.9482 13.5781C13.8964 13.703 13.8088 13.8098 13.6963 13.8849C13.5839 13.96 13.4517 14.0001 13.3165 14.0001Z" fill="white" />
                            </g>
                            <defs>
                                <clipPath id="clip0_206_27652">
                                    <rect width="14" height="14" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Floor price</Accordion.Header>
                            <Accordion.Body>
                                <div className="price-content">
                                    <MultiRangeSlider
                                        min={0}
                                        max={100}
                                        onChange={({ min, max }) => console.log(`min = ${min}, max = ${max}`)}
                                    />
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Volume</Accordion.Header>
                            <Accordion.Body>
                                <div className="price-content">
                                    <MultiRangeSlider
                                        min={0}
                                        max={100}
                                        onChange={({ min, max }) => console.log(`min = ${min}, max = ${max}`)}
                                    />
                                </div>

                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>Volume Change</Accordion.Header>
                            <Accordion.Body>
                                <div className="price-content">
                                    <MultiRangeSlider
                                        min={0}
                                        max={100}
                                        onChange={({ min, max }) => console.log(`min = ${min}, max = ${max}`)}
                                    />
                                </div>

                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3">
                            <Accordion.Header>Sale</Accordion.Header>
                            <Accordion.Body>
                                <div className="price-content">
                                    <MultiRangeSlider
                                        min={0}
                                        max={100}
                                        onChange={({ min, max }) => console.log(`min = ${min}, max = ${max}`)}
                                    />
                                </div>

                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="4">
                            <Accordion.Header>Unique owner ratio</Accordion.Header>
                            <Accordion.Body>
                                <div className="price-content">
                                    <MultiRangeSlider
                                        min={0}
                                        max={100}
                                        onChange={({ min, max }) => console.log(`min = ${min}, max = ${max}`)}
                                    />
                                </div>

                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default Discovercollection