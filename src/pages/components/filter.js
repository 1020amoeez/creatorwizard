import React, { useState } from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Accordion from 'react-bootstrap/Accordion';
import MultiRangeSlider from './multirangeslider';


const Filter = () => {
    const [searchValue, setSearchValue] = useState('');

    const handleInputChange = (event) => {
        setSearchValue(event.target.value);
    };

    const clearInput = () => {
        setSearchValue('');
    };
    return (
        <>
            <section className="filter-section">
                <Tabs
                    defaultActiveKey="filters"
                    id="uncontrolled-tab-example"
                >
                    <Tab eventKey="filters" title="Filters">
                        <div className="inner-items">
                            <div className="custom-radio">
                                <input type="radio" id="test1" name="radio-group" />
                                <label for="test1">Show all</label>
                            </div>
                            <div className="custom-radio">
                                <input type="radio" id="test1" name="radio-group" />
                                <label for="test1">Buy now</label>
                            </div>
                            <div className="custom-radio">
                                <input type="radio" id="test1" name="radio-group" />
                                <label for="test1">Lucky buy</label>
                            </div>
                        </div>
                        <Accordion defaultActiveKey={['0']} alwaysOpen>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>
                                    <div className="twice-items">
                                        <h6>Price</h6>
                                        <p><img src="\assets\landing\static\crypto-icon.svg" alt="img" className='img-fluid' /> 0 - <img src="\assets\landing\static\crypto-icon.svg" alt="img" className='img-fluid' /> 5000 </p>
                                    </div>
                                </Accordion.Header>
                                <Accordion.Body>
                                    <div className="price-content">

                                        <MultiRangeSlider
                                            min={0}
                                            max={1000}
                                            onChange={({ min, max }) => console.log(`min = ${min}, max = ${max}`)}
                                        />
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>
                                    <div className="twice-items">
                                        <h6>Trait Count</h6>
                                    </div>
                                </Accordion.Header>
                                <Accordion.Body>
                                    <div className="price-content">
                                        <MultiRangeSlider
                                            min={0}
                                            max={5}
                                            onChange={({ min, max }) => console.log(`min = ${min}, max = ${max}`)}
                                        />
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Tab>
                    <Tab eventKey="traits" title="Traits">
                        <div className="traits-content">
                            <div className="option-field">
                                <input type="text" placeholder='Search by collection' value={searchValue} onChange={handleInputChange} />
                                <svg className='search-icon' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M9.58342 18.125C4.87508 18.125 1.04175 14.2917 1.04175 9.58332C1.04175 4.87499 4.87508 1.04166 9.58342 1.04166C14.2917 1.04166 18.1251 4.87499 18.1251 9.58332C18.1251 14.2917 14.2917 18.125 9.58342 18.125ZM9.58342 2.29166C5.55842 2.29166 2.29175 5.56666 2.29175 9.58332C2.29175 13.6 5.55842 16.875 9.58342 16.875C13.6084 16.875 16.8751 13.6 16.8751 9.58332C16.8751 5.56666 13.6084 2.29166 9.58342 2.29166Z" fill="#555357" />
                                    <path d="M18.3333 18.9583C18.175 18.9583 18.0166 18.9 17.8916 18.775L16.225 17.1083C15.9833 16.8667 15.9833 16.4667 16.225 16.225C16.4666 15.9833 16.8666 15.9833 17.1083 16.225L18.775 17.8917C19.0166 18.1333 19.0166 18.5333 18.775 18.775C18.65 18.9 18.4916 18.9583 18.3333 18.9583Z" fill="#555357" />
                                </svg>
                                {
                                    searchValue && <svg onClick={clearInput} className='close-icon' xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                                        <g clipPath="url(#clip0_583_13700)">
                                            <path d="M0.488128 9.99991C0.391542 9.99993 0.29712 9.9713 0.216806 9.91765C0.136492 9.864 0.0738937 9.78773 0.0369294 9.6985C-3.49772e-05 9.60927 -0.00970473 9.51108 0.00914325 9.41635C0.0279912 9.32162 0.0745101 9.23461 0.142816 9.16632L9.16625 0.142881C9.25784 0.051298 9.38205 -0.000152588 9.51156 -0.000152588C9.64108 -0.000152588 9.76529 0.051298 9.85688 0.142881C9.94846 0.234463 9.99991 0.358676 9.99991 0.488193C9.99991 0.61771 9.94846 0.741923 9.85688 0.833506L0.833441 9.85694C0.788135 9.90234 0.734307 9.93834 0.675048 9.96288C0.615789 9.98741 0.552266 10 0.488128 9.99991Z" fill="#555357" />
                                            <path d="M9.51154 9.99991C9.4474 10 9.38388 9.98741 9.32462 9.96288C9.26536 9.93834 9.21153 9.90234 9.16623 9.85694L0.142789 0.833506C0.0512064 0.741923 -0.000244141 0.61771 -0.000244141 0.488193C-0.000244141 0.358676 0.0512064 0.234463 0.142789 0.142881C0.234372 0.051298 0.358584 -0.000152588 0.488101 -0.000152588C0.617619 -0.000152588 0.741831 0.051298 0.833414 0.142881L9.85685 9.16632C9.92516 9.23461 9.97168 9.32162 9.99052 9.41635C10.0094 9.51108 9.9997 9.60927 9.96274 9.6985C9.92577 9.78773 9.86317 9.864 9.78286 9.91765C9.70255 9.9713 9.60812 9.99993 9.51154 9.99991Z" fill="#555357" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_583_13700">
                                                <rect width="10" height="10" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                }

                            </div>
                            <div className="multi-dropdowns">
                                <div className="each-drop">
                                    <h6>Attributes count <span>(1)</span></h6>
                                    <div class="dropdown">
                                        <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Select... <svg xmlns="http://www.w3.org/2000/svg" width="9" height="14" viewBox="0 0 9 14" fill="none">
                                                <path d="M4.87746 13.3499C4.72969 13.3499 4.58194 13.2935 4.46928 13.1809L0.924026 9.63558C0.698502 9.41006 0.698502 9.04441 0.924026 8.81898C1.14946 8.59354 1.51504 8.59354 1.74058 8.81898L4.87746 11.956L8.01437 8.81909C8.23989 8.59365 8.60543 8.59365 8.83085 8.81909C9.05648 9.04452 9.05648 9.41017 8.83085 9.63569L5.28565 13.181C5.17293 13.2936 5.02518 13.3499 4.87746 13.3499Z" fill="white" />
                                                <path d="M4.87746 0.650098C4.72969 0.650098 4.58194 0.70652 4.46928 0.819127L0.924026 4.36442C0.698502 4.58994 0.698502 4.95559 0.924026 5.18102C1.14946 5.40646 1.51504 5.40646 1.74058 5.18102L4.87746 2.04395L8.01437 5.18091C8.23989 5.40635 8.60543 5.40635 8.83085 5.18091C9.05648 4.95548 9.05648 4.58983 8.83085 4.36431L5.28565 0.819017C5.17293 0.706392 5.02518 0.650098 4.87746 0.650098Z" fill="white" />
                                            </svg>
                                        </a>

                                        <ul class="dropdown-menu">
                                            <li><a class="dropdown-item" href="#">
                                                <div className="inner-text">
                                                    <div className="text">
                                                        <h6>Samurai armour</h6>
                                                        <h6>0/1</h6>
                                                    </div>
                                                    <div className="text">
                                                        <p><img src="\assets\landing\static\crypto-icon-small.svg" alt="img" className='img-fluid' /><span>5000 floor</span></p>
                                                        <p>25%</p>
                                                    </div>
                                                </div>
                                            </a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="each-drop">
                                    <h6>Background <span>(1)</span></h6>
                                    <div class="dropdown">
                                        <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Select... <svg xmlns="http://www.w3.org/2000/svg" width="9" height="14" viewBox="0 0 9 14" fill="none">
                                                <path d="M4.87746 13.3499C4.72969 13.3499 4.58194 13.2935 4.46928 13.1809L0.924026 9.63558C0.698502 9.41006 0.698502 9.04441 0.924026 8.81898C1.14946 8.59354 1.51504 8.59354 1.74058 8.81898L4.87746 11.956L8.01437 8.81909C8.23989 8.59365 8.60543 8.59365 8.83085 8.81909C9.05648 9.04452 9.05648 9.41017 8.83085 9.63569L5.28565 13.181C5.17293 13.2936 5.02518 13.3499 4.87746 13.3499Z" fill="white" />
                                                <path d="M4.87746 0.650098C4.72969 0.650098 4.58194 0.70652 4.46928 0.819127L0.924026 4.36442C0.698502 4.58994 0.698502 4.95559 0.924026 5.18102C1.14946 5.40646 1.51504 5.40646 1.74058 5.18102L4.87746 2.04395L8.01437 5.18091C8.23989 5.40635 8.60543 5.40635 8.83085 5.18091C9.05648 4.95548 9.05648 4.58983 8.83085 4.36431L5.28565 0.819017C5.17293 0.706392 5.02518 0.650098 4.87746 0.650098Z" fill="white" />
                                            </svg>
                                        </a>

                                        <ul class="dropdown-menu">
                                            <li><a class="dropdown-item" href="#">
                                                <div className="inner-text">
                                                    <div className="text">
                                                        <h6>Samurai armour</h6>
                                                        <h6>0/1</h6>
                                                    </div>
                                                    <div className="text">
                                                        <p><img src="\assets\landing\static\crypto-icon-small.svg" alt="img" className='img-fluid' /><span>5000 floor</span></p>
                                                        <p>25%</p>
                                                    </div>
                                                </div>
                                            </a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="each-drop">
                                    <h6>clothing <span>(1)</span></h6>
                                    <div class="dropdown">
                                        <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Select... <svg xmlns="http://www.w3.org/2000/svg" width="9" height="14" viewBox="0 0 9 14" fill="none">
                                                <path d="M4.87746 13.3499C4.72969 13.3499 4.58194 13.2935 4.46928 13.1809L0.924026 9.63558C0.698502 9.41006 0.698502 9.04441 0.924026 8.81898C1.14946 8.59354 1.51504 8.59354 1.74058 8.81898L4.87746 11.956L8.01437 8.81909C8.23989 8.59365 8.60543 8.59365 8.83085 8.81909C9.05648 9.04452 9.05648 9.41017 8.83085 9.63569L5.28565 13.181C5.17293 13.2936 5.02518 13.3499 4.87746 13.3499Z" fill="white" />
                                                <path d="M4.87746 0.650098C4.72969 0.650098 4.58194 0.70652 4.46928 0.819127L0.924026 4.36442C0.698502 4.58994 0.698502 4.95559 0.924026 5.18102C1.14946 5.40646 1.51504 5.40646 1.74058 5.18102L4.87746 2.04395L8.01437 5.18091C8.23989 5.40635 8.60543 5.40635 8.83085 5.18091C9.05648 4.95548 9.05648 4.58983 8.83085 4.36431L5.28565 0.819017C5.17293 0.706392 5.02518 0.650098 4.87746 0.650098Z" fill="white" />
                                            </svg>
                                        </a>

                                        <ul class="dropdown-menu">
                                            <li><a class="dropdown-item" href="#">
                                                <div className="inner-text">
                                                    <div className="text">
                                                        <h6>Samurai armour</h6>
                                                        <h6>0/1</h6>
                                                    </div>
                                                    <div className="text">
                                                        <p><img src="\assets\landing\static\crypto-icon-small.svg" alt="img" className='img-fluid' /><span>5000 floor</span></p>
                                                        <p>25%</p>
                                                    </div>
                                                </div>
                                            </a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="each-drop">
                                    <h6>Eyes <span>(1)</span></h6>
                                    <div class="dropdown">
                                        <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Select... <svg xmlns="http://www.w3.org/2000/svg" width="9" height="14" viewBox="0 0 9 14" fill="none">
                                                <path d="M4.87746 13.3499C4.72969 13.3499 4.58194 13.2935 4.46928 13.1809L0.924026 9.63558C0.698502 9.41006 0.698502 9.04441 0.924026 8.81898C1.14946 8.59354 1.51504 8.59354 1.74058 8.81898L4.87746 11.956L8.01437 8.81909C8.23989 8.59365 8.60543 8.59365 8.83085 8.81909C9.05648 9.04452 9.05648 9.41017 8.83085 9.63569L5.28565 13.181C5.17293 13.2936 5.02518 13.3499 4.87746 13.3499Z" fill="white" />
                                                <path d="M4.87746 0.650098C4.72969 0.650098 4.58194 0.70652 4.46928 0.819127L0.924026 4.36442C0.698502 4.58994 0.698502 4.95559 0.924026 5.18102C1.14946 5.40646 1.51504 5.40646 1.74058 5.18102L4.87746 2.04395L8.01437 5.18091C8.23989 5.40635 8.60543 5.40635 8.83085 5.18091C9.05648 4.95548 9.05648 4.58983 8.83085 4.36431L5.28565 0.819017C5.17293 0.706392 5.02518 0.650098 4.87746 0.650098Z" fill="white" />
                                            </svg>
                                        </a>

                                        <ul class="dropdown-menu">
                                            <li><a class="dropdown-item" href="#">
                                                <div className="inner-text">
                                                    <div className="text">
                                                        <h6>Samurai armour</h6>
                                                        <h6>0/1</h6>
                                                    </div>
                                                    <div className="text">
                                                        <p><img src="\assets\landing\static\crypto-icon-small.svg" alt="img" className='img-fluid' /><span>5000 floor</span></p>
                                                        <p>25%</p>
                                                    </div>
                                                </div>
                                            </a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="each-drop">
                                    <h6>Face <span>(1)</span></h6>
                                    <div class="dropdown">
                                        <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Select... <svg xmlns="http://www.w3.org/2000/svg" width="9" height="14" viewBox="0 0 9 14" fill="none">
                                                <path d="M4.87746 13.3499C4.72969 13.3499 4.58194 13.2935 4.46928 13.1809L0.924026 9.63558C0.698502 9.41006 0.698502 9.04441 0.924026 8.81898C1.14946 8.59354 1.51504 8.59354 1.74058 8.81898L4.87746 11.956L8.01437 8.81909C8.23989 8.59365 8.60543 8.59365 8.83085 8.81909C9.05648 9.04452 9.05648 9.41017 8.83085 9.63569L5.28565 13.181C5.17293 13.2936 5.02518 13.3499 4.87746 13.3499Z" fill="white" />
                                                <path d="M4.87746 0.650098C4.72969 0.650098 4.58194 0.70652 4.46928 0.819127L0.924026 4.36442C0.698502 4.58994 0.698502 4.95559 0.924026 5.18102C1.14946 5.40646 1.51504 5.40646 1.74058 5.18102L4.87746 2.04395L8.01437 5.18091C8.23989 5.40635 8.60543 5.40635 8.83085 5.18091C9.05648 4.95548 9.05648 4.58983 8.83085 4.36431L5.28565 0.819017C5.17293 0.706392 5.02518 0.650098 4.87746 0.650098Z" fill="white" />
                                            </svg>
                                        </a>

                                        <ul class="dropdown-menu">
                                            <li><a class="dropdown-item" href="#">
                                                <div className="inner-text">
                                                    <div className="text">
                                                        <h6>Samurai armour</h6>
                                                        <h6>0/1</h6>
                                                    </div>
                                                    <div className="text">
                                                        <p><img src="\assets\landing\static\crypto-icon-small.svg" alt="img" className='img-fluid' /><span>5000 floor</span></p>
                                                        <p>25%</p>
                                                    </div>
                                                </div>
                                            </a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="each-drop">
                                    <h6>Head <span>(1)</span></h6>
                                    <div class="dropdown">
                                        <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Select... <svg xmlns="http://www.w3.org/2000/svg" width="9" height="14" viewBox="0 0 9 14" fill="none">
                                                <path d="M4.87746 13.3499C4.72969 13.3499 4.58194 13.2935 4.46928 13.1809L0.924026 9.63558C0.698502 9.41006 0.698502 9.04441 0.924026 8.81898C1.14946 8.59354 1.51504 8.59354 1.74058 8.81898L4.87746 11.956L8.01437 8.81909C8.23989 8.59365 8.60543 8.59365 8.83085 8.81909C9.05648 9.04452 9.05648 9.41017 8.83085 9.63569L5.28565 13.181C5.17293 13.2936 5.02518 13.3499 4.87746 13.3499Z" fill="white" />
                                                <path d="M4.87746 0.650098C4.72969 0.650098 4.58194 0.70652 4.46928 0.819127L0.924026 4.36442C0.698502 4.58994 0.698502 4.95559 0.924026 5.18102C1.14946 5.40646 1.51504 5.40646 1.74058 5.18102L4.87746 2.04395L8.01437 5.18091C8.23989 5.40635 8.60543 5.40635 8.83085 5.18091C9.05648 4.95548 9.05648 4.58983 8.83085 4.36431L5.28565 0.819017C5.17293 0.706392 5.02518 0.650098 4.87746 0.650098Z" fill="white" />
                                            </svg>
                                        </a>

                                        <ul class="dropdown-menu">
                                            <li><a class="dropdown-item" href="#">
                                                <div className="inner-text">
                                                    <div className="text">
                                                        <h6>Samurai armour</h6>
                                                        <h6>0/1</h6>
                                                    </div>
                                                    <div className="text">
                                                        <p><img src="\assets\landing\static\crypto-icon-small.svg" alt="img" className='img-fluid' /><span>5000 floor</span></p>
                                                        <p>25%</p>
                                                    </div>
                                                </div>
                                            </a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="each-drop">
                                    <h6>Offhand <span>(1)</span></h6>
                                    <div class="dropdown">
                                        <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Select... <svg xmlns="http://www.w3.org/2000/svg" width="9" height="14" viewBox="0 0 9 14" fill="none">
                                                <path d="M4.87746 13.3499C4.72969 13.3499 4.58194 13.2935 4.46928 13.1809L0.924026 9.63558C0.698502 9.41006 0.698502 9.04441 0.924026 8.81898C1.14946 8.59354 1.51504 8.59354 1.74058 8.81898L4.87746 11.956L8.01437 8.81909C8.23989 8.59365 8.60543 8.59365 8.83085 8.81909C9.05648 9.04452 9.05648 9.41017 8.83085 9.63569L5.28565 13.181C5.17293 13.2936 5.02518 13.3499 4.87746 13.3499Z" fill="white" />
                                                <path d="M4.87746 0.650098C4.72969 0.650098 4.58194 0.70652 4.46928 0.819127L0.924026 4.36442C0.698502 4.58994 0.698502 4.95559 0.924026 5.18102C1.14946 5.40646 1.51504 5.40646 1.74058 5.18102L4.87746 2.04395L8.01437 5.18091C8.23989 5.40635 8.60543 5.40635 8.83085 5.18091C9.05648 4.95548 9.05648 4.58983 8.83085 4.36431L5.28565 0.819017C5.17293 0.706392 5.02518 0.650098 4.87746 0.650098Z" fill="white" />
                                            </svg>
                                        </a>

                                        <ul class="dropdown-menu">
                                            <li><a class="dropdown-item" href="#">
                                                <div className="inner-text">
                                                    <div className="text">
                                                        <h6>Samurai armour</h6>
                                                        <h6>0/1</h6>
                                                    </div>
                                                    <div className="text">
                                                        <p><img src="\assets\landing\static\crypto-icon-small.svg" alt="img" className='img-fluid' /><span>5000 floor</span></p>
                                                        <p>25%</p>
                                                    </div>
                                                </div>
                                            </a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="each-drop">
                                    <h6>Type <span>(1)</span></h6>
                                    <div class="dropdown">
                                        <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Select... <svg xmlns="http://www.w3.org/2000/svg" width="9" height="14" viewBox="0 0 9 14" fill="none">
                                                <path d="M4.87746 13.3499C4.72969 13.3499 4.58194 13.2935 4.46928 13.1809L0.924026 9.63558C0.698502 9.41006 0.698502 9.04441 0.924026 8.81898C1.14946 8.59354 1.51504 8.59354 1.74058 8.81898L4.87746 11.956L8.01437 8.81909C8.23989 8.59365 8.60543 8.59365 8.83085 8.81909C9.05648 9.04452 9.05648 9.41017 8.83085 9.63569L5.28565 13.181C5.17293 13.2936 5.02518 13.3499 4.87746 13.3499Z" fill="white" />
                                                <path d="M4.87746 0.650098C4.72969 0.650098 4.58194 0.70652 4.46928 0.819127L0.924026 4.36442C0.698502 4.58994 0.698502 4.95559 0.924026 5.18102C1.14946 5.40646 1.51504 5.40646 1.74058 5.18102L4.87746 2.04395L8.01437 5.18091C8.23989 5.40635 8.60543 5.40635 8.83085 5.18091C9.05648 4.95548 9.05648 4.58983 8.83085 4.36431L5.28565 0.819017C5.17293 0.706392 5.02518 0.650098 4.87746 0.650098Z" fill="white" />
                                            </svg>
                                        </a>

                                        <ul class="dropdown-menu">
                                            <li><a class="dropdown-item" href="#">
                                                <div className="inner-text">
                                                    <div className="text">
                                                        <h6>Samurai armour</h6>
                                                        <h6>0/1</h6>
                                                    </div>
                                                    <div className="text">
                                                        <p><img src="\assets\landing\static\crypto-icon-small.svg" alt="img" className='img-fluid' /><span>5000 floor</span></p>
                                                        <p>25%</p>
                                                    </div>
                                                </div>
                                            </a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Tab>
                </Tabs>
            </section>
        </>
    )
}

export default Filter
