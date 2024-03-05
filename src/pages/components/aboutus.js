import Link from 'next/link'
import React from 'react'
import Navbar from './navbar'
import Footer from './footer'

const Aboutus = () => {
    return (
        <>
            <Navbar />
            <section className="mainabout">
                <img src="\assets\landing\static\banner-img-shadow.png" alt="img" className='img-fluid banner-img-shadow' />
                <div className="custom-container-small">
                    <div className="row">
                        <div className="col-xl-7 col-12 m-auto padd-sm">
                            <div className="main-content">
                                <h4>Welcome to  <span>Wizard NFT</span>Marketplace</h4>
                                <p>Et aliquam maxime qui expedita quisquam a mollitia quia nam quia deleniti qui tenetur omnis.</p>
                                <div className="twice-btns">
                                    <Link href="/collections" className='btn-explore'>Explore marketplace</Link>
                                    <a href="#" className='btn-learn'>Apply for launchpad</a>
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
                        <div className='col-xl-12 col-12 m-auto'>
                            <div className='storyparent'>
                                <div className='left'>
                                    <div className='heading'>
                                        <h2>Our story about our marvelous team </h2>
                                        <p>Navigating the uncharted waters of non-fungible tokens</p>
                                    </div>
                                    <div className='mainpara'>
                                        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
                                        <p> Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit. sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
                                    </div>
                                </div>
                                <div className='center'></div>
                                <div className='right'>
                                    <div className='parentright'>
                                        <h2>2M+</h2>
                                        <p>Collections</p>
                                    </div>
                                    <div className='parentright'>
                                        <h2>80M+</h2>
                                        <p>NFTs</p>
                                    </div>
                                    <div className='parentright'>
                                        <h2>80M+</h2>
                                        <p>NFTs</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
            <section className='backed'>
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
                                        <img src='\assets\nftdetailassets\img1.svg' alt='img' className='img-fluid' />
                                    </div>

                                    <div className='text'>
                                        <h6>alfred wood</h6>
                                        <p>CEO</p>
                                    </div>

                                </div>
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
                                        <img src='\assets\nftdetailassets\img1.svg' alt='img' className='img-fluid' />
                                    </div>

                                    <div className='text'>
                                        <h6>alfred wood</h6>
                                        <p>CEO</p>
                                    </div>

                                </div>
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
                                        <img src='\assets\nftdetailassets\img1.svg' alt='img' className='img-fluid' />
                                    </div>

                                    <div className='text'>
                                        <h6>alfred wood</h6>
                                        <p>CEO</p>
                                    </div>

                                </div>
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
                                        <img src='\assets\nftdetailassets\img1.svg' alt='img' className='img-fluid' />
                                    </div>

                                    <div className='text'>
                                        <h6>alfred wood</h6>
                                        <p>CEO</p>
                                    </div>

                                </div>
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
                                        <img src='\assets\nftdetailassets\img1.svg' alt='img' className='img-fluid' />
                                    </div>

                                    <div className='text'>
                                        <h6>alfred wood</h6>
                                        <p>CEO</p>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </section>
            <Footer />
        </>
    )
}

export default Aboutus