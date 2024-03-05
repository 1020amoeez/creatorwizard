import React, { useEffect, useState } from 'react'
import Navbar from './navbar'
import Footer from './footer'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Launchpadcards from './launchpadcards';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Launchpad = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('all');

    useEffect(() => {
        
        const { tab } = router.query;
        if (tab && (tab === 'all' || tab === 'edition')) {
            setActiveTab(tab);
        }
    }, [router.query]);

    const handleTabSelect = (selectedTab) => {
        setActiveTab(selectedTab);
    };

    return (
        <>
            <Navbar />
            <section className="launchpad-section">
                <div className="cover-img">
                    <img src="\assets\landing\static\launchpad-cover.png" alt="img" className='img-fluid' />
                    <span></span>
                </div>
                <div className="custom-container">
                    <div className="upper-content">
                        <div className="left-side">
                            <h4>VendX: Cyborgs <img src="\assets\landing\static\verify-icon.svg" alt="img" className='img-fluid' /></h4>
                            <p><img src="\assets\landing\static\crypto-icon-small.svg" alt="img" className='img-fluid' />Starts: 01d 08h 31m</p>
                            <h6>The first official vending and arcade business on CORE!</h6>
                        </div>
                        <div className="right-side">
                            <Link href="/launchpaddetailpage" className='btn-gotolaunchpad'>Go to launchpad</Link>
                        </div>
                    </div>
                    <Tabs
                        defaultActiveKey="live"
                        id="uncontrolled-tab-example"
                        className="parent-tab"
                    >
                        <Tab eventKey="live" title="Live & Upcoming">
                            <Tabs
                                // defaultActiveKey="all"
                                activeKey={activeTab} onSelect={handleTabSelect}
                                id="uncontrolled-tab-example"
                                className="inner-tab"
                            >
                                <Tab eventKey="all" title="All">
                                    <Launchpadcards />
                                </Tab>
                                <Tab eventKey="edition" title="Open Editions">
                                <Launchpadcards />
                                </Tab>
                            </Tabs>
                        </Tab>
                        <Tab eventKey="past" title="Past">
                        <Launchpadcards />
                        </Tab>
                    </Tabs>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Launchpad
