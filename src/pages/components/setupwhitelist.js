import React from 'react'
import Navbar from './navbar'
import Dropdown from 'react-bootstrap/Dropdown';
const setupwhitelist = () => {
    return (
        <>
            <Navbar />
            <section className='setupwhitelist'>
                <div className="custom-container">
                    <div className='row'>
                        <div className='col-xl-12 col-12 m-auto padd-sm'>
                            <div className='mainhead'>
                                <h2>Set up your whitelist</h2>
                                <h6>Setup and edit your whitelist here.</h6>
                                <p>Which collection of yours is this for? (required)</p>
                                <div className='dropbtn'>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                            <div className='brdr'></div>
                                            <img src='\assets\dummy-imgs\arrow-down.svg' alt='img' className='img-fluid' />

                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item href="#/action-1">twitter</Dropdown.Item>
                                            <Dropdown.Item href="#/action-2">news article</Dropdown.Item>
                                            <Dropdown.Item href="#/action-3">an existing project that launched</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </div>
                            <div className='maininputss'>
                                <p>Twitter Account to Follow: </p>
                                <input type='text' placeholder='' />
                                <p>Discord Server Name: </p>
                                <input type='text' placeholder='Enter your project team member here...' />
                                <p>Discord Server ID:</p>
                                <input type='text' placeholder='Enter your project supply here...' />
                                <div className='innercontent'>
                                    <p>Discord Server URL:</p>
                                    <a href=''>https://discord.gg/</a>
                                    <input type='text' placeholder='Enter your project price here...' />
                                </div>
                                <p>Discord Role Name 1:</p>
                                <input type='serach' placeholder='mm/dd/yyyy' />
                                <p>Discord Role ID 1:</p>
                                <input type='serach' placeholder='Enter your project twitter link here...' />
                                <div className='btnrole'>
                                    <button>Add a role</button>
                                </div>
                                <p>Minimum ETH in Wallet to Enter::</p>
                                <input type='serach' placeholder='Enter your project discord link here...' />
                                <div className='innercontent'>
                                    <p>Set NFT Gating Requirement:</p>
                                    <p>NFT Collection Name</p>
                                    <input type='text' placeholder='Enter your project email address here...' />
                                </div>
                                <p>discord address</p>
                                <input type='text' placeholder='Enter your project discord address here...' />
                                <p>Expected Mint Date (UTC)</p>
                                <textarea type='text' />
                                <div className='submitbtn'>
                                    <button>Submit Changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default setupwhitelist