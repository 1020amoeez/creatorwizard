import React, { useRef, useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import Onsale from './onsale';
import Authorcollection from './authorcollection';
import AuthorActivity from './authoractivity';
import Followers from './Followers';
import Navbar from './navbar';
import Footer from './footer';

const Authorprofile = () => {
    const textRef = useRef(null);
    const [svgColor, setSvgColor] = useState('#745F8C');

    const handleCopyClick = () => {
        const range = document.createRange();
        range.selectNode(textRef.current);

        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);

        document.execCommand('copy');


        setSvgColor('#862FC0');


        setTimeout(() => {
            setSvgColor('#745F8C');
        }, 2000);


        selection.removeAllRanges();
    };

    const [follow, setFollow] = useState(false)

    return (
        <>
        <Navbar />
            <section className="author-profile">
                <div className="custom-container">
                    <div className="collection-bg-parent">
                        <div className="collection-bg">
                            <img src="\assets\dummy-imgs\collection\author-bg.png" alt="img" className='img-fluid' />
                        </div>
                    </div>
                    <div className="profile-img">
                        <img src="\assets\dummy-imgs\collection\author-profile.png" alt="img" className='img-fluid' />
                    </div>
                    <div className="bottom-detail">
                        <h5>Damon Holland</h5>
                        <a className='btn-follow' onClick={() => {setFollow(!follow)}}>{follow ? "UnFollow" : "Follow"}</a>
                        <div className="followers-text">
                            <h6>3.4K <span>Followers</span></h6>
                            <h6>1.2K <span>Following</span></h6>
                        </div>
                        <p className="para">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati
                            dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.</p>
                        <div className="copy-text">
                            <p ref={textRef}>0x0F4Dc5c90b64437B9da458806cFb958404D6B5D8</p>
                            <a onClick={handleCopyClick}> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill={svgColor}>
                                <path d="M2.60938 1.875H1.67188V16H12.4531V15.0625H2.60938V1.875Z" fill={svgColor} />
                                <path d="M12.5669 3.51609L10.8125 1.76172V3.51609H12.5669Z" fill={svgColor} />
                                <path d="M12.9219 4.45312H9.875V1.40625C9.875 0.630844 9.24416 0 8.46875 0H3.54688V14.125H14.3281V5.85938C14.3281 5.08397 13.6973 4.45312 12.9219 4.45312Z" fill={svgColor} />
                            </svg></a>
                        </div>
                    </div>
                    <Tabs
                        defaultActiveKey="onsale"
                        id="uncontrolled-tab-example"
                    >
                        <Tab eventKey="onsale" title="On sale">
                            <Onsale />
                        </Tab>
                        <Tab eventKey="owned" title="Owned">
                        <Onsale />
                        </Tab>
                        <Tab eventKey="created" title="Created">
                        <Onsale />
                        </Tab>
                        <Tab eventKey="collection" title="Collection">
                            <Authorcollection />
                        </Tab>
                        <Tab eventKey="activity" title="Activity">
                            <AuthorActivity />
                        </Tab>
                        <Tab eventKey="followers" title="Followers">
                            <Followers />
                        </Tab>
                        <Tab eventKey="following" title="Following">
                        <Followers />
                        </Tab>
                        {/* <Tab eventKey="offers" title="Offers">

                        </Tab> */}
                    </Tabs>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Authorprofile
