import Link from 'next/link'
import React from 'react'
import Navbar from './navbar'
import Footer from './footer'

const Aboutus = () => {
    return (
        <>
            <Navbar />
            {/* <section className="mainabout">
                <img src="\assets\landing\static\banner-img-shadow.png" alt="img" className='img-fluid banner-img-shadow' />
                <div className="custom-container-small">
                    <div className="row">
                        <div className="col-xl-7 col-12 m-auto padd-sm p-0">
                            <div className="main-content">
                                <h4>Welcome to  <span>Wizard NFT</span>Marketplace</h4>
                                <p>Wizard Gallery is the first NFT marketplace built for the Core ecosystem.</p>
                                <div className="twice-btns">
                                    <Link href="/discovercollection" className='btn-explore'>Explore marketplace</Link>
                                    <a href="https://wizardnft-creator.vercel.app" target='_blank' className='btn-learn'>Apply for launchpad</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-5 col-12 m-auto padd-sm displaynoneinmobile">
                            <div className="wrapper-img">
                                <img src="\assets\landing\static\banner-img1.png" alt="img" className='img-fluid' />
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
            <section className="main-banner">
                <img src="\assets\landing\static\banner-img-shadow.png" alt="img" className='img-fluid banner-img-shadow' />
                <div className="custom-container">
                    <div className="row">
                        <div className="col-xl-7 col-12 m-auto padd-sm">
                            <div className="main-content">
                                <h4>Buy, Own & Sell NFTs <span>In The Wizard NFT</span>Marketplace</h4>
                                {/* <p>Wizard Gallery is the first NFT marketplace built for the Core ecosystem.</p> */}
                                <p>Wizard Gallery is a marketplace built on and for the Core ecosystem</p>
                                <div className="twice-btns">
                                    <Link href="/discovercollection" className='btn-explore'>Explore</Link>
                                    <a href="https://wizardnft-creator.vercel.app" target='_blank' className='btn-learn'>Apply For LaunchPad</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-5 col-12 m-auto padd-sm displaynoneinmobile">
                            <div className="wrapper-img">
                                <img src="\assets\landing\static\banner-img1.png" alt="img" className='img-fluid' />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='ourstory'>
                <div className="custom-container-small">
                    <div className='row'>
                        <div className='col-xl-12 col-12 m-auto p-0'>
                            <div className='storyparent'>
                                <div className='left'>
                                    <div className='heading'>
                                        <h2>Who are we?</h2>
                                        <p>Wizard Gallery is developing to become the flagship NFT marketplace on the Core Network, aiming to provide its users with a seamless NFT minting and trading platform. Our main goal is to ensure a flawless experience for our users and bring dynamic innovations and progressive features to the world of NFT trading. </p>
                                    </div>
                                    <div className='mainpara'>
                                        <h4>Our Blockchain: The Core Chain </h4>
                                        <p>Wizard Gallery operates on the Core Chain- A Bitcoin-powered, EVM-compatible blockchain that combines delegated Proof-of-Work and delegated Proof-of-Stake. Core Chain is designed to address industry limitations pertaining to Bitcoin&apos;s scalability, performance, scripting, and interoperability. Core also brings a consensus mechanism called Satoshi Plus which combines Delegated Proof of Work (DPoW) and Delegated Proof of Stake (DPoS).
                                            With their native token, $CORE, Core&apos;s ambitious aims are to leverage the security of Bitcoin miners, and expand on Bitcoin&apos;s utility by enabling a broader range of use cases. This will ultimately convert Bitcoin from a passive asset protector into an active enabler.
                                        </p>
                                    </div>
                                    <div className='mainpara'>
                                        <h4>Expectations and Predicted Outcomes: </h4>
                                        <p>With an innovative and progressive operating model, The Wizard Gallery aims to:  </p>
                                        <ol>
                                            <li>Enhance Innovation: Advocating for a diverse set of minds to work on the project in order to bring forth different perspectives and ideas. </li>
                                            <li>Rapid Issue Resolution: By encouraging community involvement, we ensure an efficient identification of issues with platform stability and performance. </li>
                                            <li>Community Trust: An open-source system furthers trust within the users and developers and furthers an insider&apos;s perspective with the platform&apos;s internal working. </li>
                                            <li>Long-Term Sustainability: Without any dependency on a single entity or a central management system, Wizard Gallery aims to become a sustainable project due to maximum encryption and safety.</li>
                                        </ol>
                                    </div>
                                </div>
                                <div className='center'></div>
                                <div className='right'>
                                    <div className='parentright'>
                                        <h2>100+</h2>
                                        <p>Collections</p>
                                    </div>
                                    <div className='parentright'>
                                        <h2>20,000+</h2>
                                        <p>NFTs</p>
                                    </div>
                                    <div className='parentright'>
                                        <h2>50+</h2>
                                        <p>Artists</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
            {/* <section className='backed'>
                <div className="custom-container-small">
                    <div className='row'>
                        <div className='col-xl-12 col-12 m-auto'>
                            <div className='parentheading'>
                                <h2>Backed by top firms & industry leaders</h2>
                                <p>who are helping us pave the way towards a brand new digital economy</p>
                            </div>
                            <div className='mainimages'>
                                <img src='\assets\nftdetailassets\vc-NFTKred.svg' alt='img' className='img-fluid' />
                                <img src='\assets\nftdetailassets\vc-blockchain-capital 1.svg' alt='img' className='img-fluid' />
                                <img src='\assets\nftdetailassets\vc-founders-fund.svg' alt='img' className='img-fluid' />
                                <img src='\assets\nftdetailassets\vc-ycombinator.svg' alt='img' className='img-fluid' />
                                <img src='\assets\nftdetailassets\vc-pascal-capital.svg' alt='img' className='img-fluid' />
                                <img src='\assets\nftdetailassets\vc-blockstack.svg' alt='img' className='img-fluid' />
                                <img src='\assets\nftdetailassets\vc-quantstamp.svg' alt='img' className='img-fluid' />
                                <img src='\assets\nftdetailassets\vc-trust-wallet.svg' alt='img' className='img-fluid' />
                                <img src='\assets\nftdetailassets\vc-andressen-horowitz.svg' alt='img' className='img-fluid' />
                                <img src='\assets\nftdetailassets\vc-coinbase.svg' alt='img' className='img-fluid' />
                            </div>

                        </div>
                    </div>
                </div>

            </section>
            <section className='forwardthinking'>
                <div className="custom-container-small">
                    <div className='row'>
                        <div className='col-xl-12 col-12 m-auto'>
                            <div className='parentheading'>
                                <h2>with some of the most forward-thinking angels</h2>
                                <p>who are just as passionate about this space as we are.</p>
                            </div>
                            <div className='mainimages'>
                                <div className='parentimg'>
                                    <div className='mainsimg'>
                                        <img src='\assets\nftdetailassets\img1.svg' alt='img' className='img-fluid' />
                                    </div>

                                    <div className='text'>
                                        <h6>alfred wood</h6>
                                        <p>CEO</p>
                                    </div>

                                </div>

                                <div className='parentimg'>
                                    <div className='mainsimg'>
                                        <img src='\assets\dummy-imgs\teamtwo.svg' alt='img' className='img-fluid' />
                                    </div>

                                    <div className='text'>
                                        <h6>Patwood cummins</h6>
                                        <p>Investor</p>
                                    </div>

                                </div>
                                <div className='parentimg'>
                                    <div className='mainsimg'>
                                        <img src='\assets\dummy-imgs\teamthree.svg' alt='img' className='img-fluid' />
                                    </div>

                                    <div className='text'>
                                        <h6>Katie star</h6>
                                        <p>Actor</p>
                                    </div>

                                </div>
                                <div className='parentimg'>
                                    <div className='mainsimg'>
                                        <img src='\assets\dummy-imgs\teamfour.svg' alt='img' className='img-fluid' />
                                    </div>

                                    <div className='text'>
                                        <h6>Julie lara</h6>
                                        <p>Actor</p>
                                    </div>

                                </div>
                                <div className='parentimg'>
                                    <div className='mainsimg'>
                                        <img src='\assets\dummy-imgs\teamfive.svg' alt='img' className='img-fluid' />
                                    </div>

                                    <div className='text'>
                                        <h6>Mark wood</h6>
                                        <p>Author</p>
                                    </div>

                                </div>
                                <div className='parentimg'>
                                    <div className='mainsimg'>
                                        <img src='\assets\dummy-imgs\teamsix.svg' alt='img' className='img-fluid' />
                                    </div>

                                    <div className='text'>
                                        <h6>Christian alan</h6>
                                        <p>CEO</p>
                                    </div>

                                </div>
                                <div className='parentimg'>
                                    <div className='mainsimg'>
                                        <img src='\assets\dummy-imgs\teamseven.svg' alt='img' className='img-fluid' />
                                    </div>

                                    <div className='text'>
                                        <h6>chris pat</h6>
                                        <p>Investor</p>
                                    </div>

                                </div>
                                <div className='parentimg'>
                                    <div className='mainsimg'>
                                        <img src='\assets\dummy-imgs\teameight.svg' alt='img' className='img-fluid' />
                                    </div>

                                    <div className='text'>
                                        <h6>lara Craft</h6>
                                        <p>Actor</p>
                                    </div>

                                </div>
                                <div className='parentimg'>
                                    <div className='mainsimg'>
                                        <img src='\assets\dummy-imgs\teamnine.svg' alt='img' className='img-fluid' />
                                    </div>

                                    <div className='text'>
                                        <h6>Katie</h6>
                                        <p>Actor</p>
                                    </div>

                                </div>
                                <div className='parentimg'>
                                    <div className='mainsimg'>
                                        <img src='\assets\dummy-imgs\teamten.svg' alt='img' className='img-fluid' />
                                    </div>

                                    <div className='text'>
                                        <h6>Phil chris</h6>
                                        <p>Author</p>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </section> */}
            <Footer />
        </>
    )
}

export default Aboutus