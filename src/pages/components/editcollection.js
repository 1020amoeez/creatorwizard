import React, { useRef, useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import Onsale from './onsale';
import Authorcollection from './authorcollection';
import AuthorActivity from './authoractivity';
import Followers from './Followers';
import Navbar from './navbar';
import Footer from './footer';

const EditCollection = () => {
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
                        <img src="\assets\dummy-imgs\collection\editcollection.svg" alt="img" className='img-fluid' />
                    </div>
                    <div className="bottom-detail">
                        <h5>Damon Holland</h5>
                        <a className='btn-follow'>Edit Collection</a>
                        <p className="para">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                       
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
                    </Tabs>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default EditCollection
