import React from 'react'
import Navbar from './navbar'
import Itemcards from './itemcards'

const Onsale = () => {
    return (
        <>
            <Navbar />
            <section className="onsale-section">
                <div className="upper-content">
                    <div className="left-side">
                        <div class="dropdown">
                            <button class="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Status <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                                    <g clip-path="url(#clip0_206_14998)">
                                        <path d="M4.99997 7.8497C4.82075 7.8497 4.64155 7.78127 4.50492 7.64469L0.205141 3.34487C-0.0683805 3.07135 -0.0683805 2.62788 0.205141 2.35447C0.478553 2.08106 0.921933 2.08106 1.19548 2.35447L4.99997 6.15919L8.80449 2.35461C9.07801 2.08119 9.52135 2.08119 9.79474 2.35461C10.0684 2.62802 10.0684 3.07149 9.79474 3.34501L5.49503 7.64483C5.35832 7.78142 5.17913 7.8497 4.99997 7.8497Z" fill="white" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_206_14998">
                                            <rect width="10" height="10" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </button>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#">Coming Soon...</a></li>
                                <li><a class="dropdown-item" href="#">Coming Soon...</a></li>
                                <li><a class="dropdown-item" href="#">Coming Soon...</a></li>
                            </ul>
                        </div>
                        <div class="dropdown">
                            <button class="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Price Range <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                                    <g clip-path="url(#clip0_206_14998)">
                                        <path d="M4.99997 7.8497C4.82075 7.8497 4.64155 7.78127 4.50492 7.64469L0.205141 3.34487C-0.0683805 3.07135 -0.0683805 2.62788 0.205141 2.35447C0.478553 2.08106 0.921933 2.08106 1.19548 2.35447L4.99997 6.15919L8.80449 2.35461C9.07801 2.08119 9.52135 2.08119 9.79474 2.35461C10.0684 2.62802 10.0684 3.07149 9.79474 3.34501L5.49503 7.64483C5.35832 7.78142 5.17913 7.8497 4.99997 7.8497Z" fill="white" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_206_14998">
                                            <rect width="10" height="10" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </button>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#">Coming Soon...</a></li>
                                <li><a class="dropdown-item" href="#">Coming Soon...</a></li>
                                <li><a class="dropdown-item" href="#">Coming Soon...</a></li>
                            </ul>
                        </div>
                        <div class="dropdown">
                            <button class="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Category <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                                    <g clip-path="url(#clip0_206_14998)">
                                        <path d="M4.99997 7.8497C4.82075 7.8497 4.64155 7.78127 4.50492 7.64469L0.205141 3.34487C-0.0683805 3.07135 -0.0683805 2.62788 0.205141 2.35447C0.478553 2.08106 0.921933 2.08106 1.19548 2.35447L4.99997 6.15919L8.80449 2.35461C9.07801 2.08119 9.52135 2.08119 9.79474 2.35461C10.0684 2.62802 10.0684 3.07149 9.79474 3.34501L5.49503 7.64483C5.35832 7.78142 5.17913 7.8497 4.99997 7.8497Z" fill="white" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_206_14998">
                                            <rect width="10" height="10" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </button>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#">Coming Soon...</a></li>
                                <li><a class="dropdown-item" href="#">Coming Soon...</a></li>
                                <li><a class="dropdown-item" href="#">Coming Soon...</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="right-side">
                        <div class="dropdown">
                            <button class="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                recently added <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <path d="M10.4534 4.77148H6.81926H3.54676C2.98676 4.77148 2.70676 5.44815 3.10343 5.84482L6.1251 8.86648C6.60926 9.35065 7.39676 9.35065 7.88093 8.86648L9.0301 7.71732L10.9026 5.84482C11.2934 5.44815 11.0134 4.77148 10.4534 4.77148Z" fill="white" />
                                </svg>
                            </button>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#">Coming Soon...</a></li>
                                <li><a class="dropdown-item" href="#">Coming Soon...</a></li>
                                <li><a class="dropdown-item" href="#">Coming Soon...</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <Itemcards />
            </section>
        </>
    )
}

export default Onsale
