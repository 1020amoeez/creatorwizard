import React from 'react'
import Navbar from './navbar'
import Dropdown from 'react-bootstrap/Dropdown';
import Footer from './footer';
const Applylaunchpad = () => {
    return (
        <>
            <Navbar />
            <section className="applylaunchpad">
                <div className="custom-container">
                    <div className='row'>
                        <div className='col-xl-12 col-12 m-auto  padd-sm'>
                            <div className='main-head'>
                                <h2>Launchpad - Expression of interest</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                <p className='para'>project name</p>
                                <input type='text' placeholder='Enter your project name here...' />
                            </div>
                            <div className='project'>
                                <h2>project description</h2>
                                <p>Share your elevator pitch for your project, including the overall concept, main utility (as applicable), and major partners involved.</p>
                                <input type='text' placeholder='Enter your project description here... ' />
                            </div>
                            <div className='project'>
                                <h2>team</h2>
                                <p>Who are the team members? please share social links: twitter & linkedin. What are the main responsibilities of each team member?</p>
                                <input type='text' placeholder='Enter your project description here... ' />
                            </div>
                            <div className='project'>
                                <h2>supply</h2>
                                <p>If undecided, please share your best estimate.</p>
                                <input type='text' placeholder='Enter your project supply here... ' />
                            </div>

                            <div className='project'>
                                <h2>price</h2>
                                <p>If undecided, please share your best estimate.</p>
                                <input type='text' placeholder='Enter your project price here... ' />
                            </div>
                            <div className='project'>
                                <h2 className='expected'>expected mint date</h2>

                                <input type='text' placeholder='mm/dd/yyyy ' />
                            </div>
                            <div className='project'>
                                <h2>twitter link</h2>
                                <p>Please share the link to the project twitter</p>
                                <input type='text' placeholder='Enter your project twitter link here... ' />
                            </div>
                            <div className='project'>
                                <h2>discord link</h2>
                                <p>Please share the link to the project discord server.</p>
                                <input type='text' placeholder='Enter your project discord link here... ' />
                                <p className='purple'>Please share the email address of the main contact on the team.</p>
                            </div>
                            <div className='project'>
                                <h2 className='expected'>email address</h2>

                                <input type='text' placeholder='Enter your project email address here... ' />

                            </div>
                            <div className='project'>
                                <h2>discord address</h2>
                                <p>Please share the discord name of the main contact on the team.</p>
                                <input type='text' placeholder='Enter your project discord address here...' />
                            </div>
                            <div className='art'>
                                <h2>artwork examples</h2>
                                <p>attach some examples of your project’s NFT collection</p>
                                <div className='maininput'>
                                    <div className='wrapper'>
                                        <label htmlFor='upload'>

                                            <img src='\assets\paperclip-2.svg' />
                                            attach
                                        </label>
                                        <input type='file' id='upload' placeholder='hhhhhhhhhh' className='d-none' />
                                    </div>
                                </div>
                            </div>
                            <div className='else'>
                                <h2>how did you hear about launchpad?</h2>
                                <textarea type="text" placeholder='' />
                            </div>
                            <div className='else'>
                                <h2>how did you hear about launchpad?</h2>
                                <div className='dropbtn'>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                            hear about launchpad?
                                            <img src='\assets\arrow-down.svg' alt='img' className='img-fluid' />
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item href="#/action-1">twitter</Dropdown.Item>
                                            <Dropdown.Item href="#/action-2">news article</Dropdown.Item>
                                            <Dropdown.Item href="#/action-3">an existing project that launched</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                                <button>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Applylaunchpad