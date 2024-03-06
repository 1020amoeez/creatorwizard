import React, { useState, useEffect } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import moment from 'moment';
import { Modal } from 'react-bootstrap';
import Environment from '@/utils/Enviroment';
import { ToastContainer, toast } from 'react-toastify';
import Countdown from 'react-countdown/dist';



const Launchpadlistedcard = ({ justlanding, ListedDetails, stagedata, getFinallizeLaunchpad, modaldata, FinalizeContract, GetRoyality, royality, setRoyality }) => {
    // const launchpadData = [
    //     {
    //         title: 'GREENCY-NEKO',
    //         image: '/assets/dummy-imgs/allcards/1.png',
    //         price: 584.85,
    //         currency: 'Core',
    //         items: 7777,
    //         minted: 6789,
    //     },
    //     {
    //         title: 'GREENCY-NEKO',
    //         image: '/assets/dummy-imgs/allcards/2.png',
    //         price: 584.85,
    //         currency: 'Core',
    //         items: 7777,
    //         minted: 6789,
    //     },
    //     {
    //         title: 'GREENCY-NEKO',
    //         image: '/assets/dummy-imgs/allcards/3.png',
    //         price: 584.85,
    //         currency: 'Core',
    //         items: 7777,
    //         minted: 6789,
    //     },
    //     {
    //         title: 'GREENCY-NEKO',
    //         image: '/assets/dummy-imgs/allcards/4.png',
    //         price: 584.85,
    //         currency: 'Core',
    //         items: 7777,
    //         minted: 6789,
    //     },
    //     {
    //         title: 'GREENCY-NEKO',
    //         image: '/assets/dummy-imgs/allcards/5.png',
    //         price: 584.85,
    //         currency: 'Core',
    //         items: 7777,
    //         minted: 6789,
    //     },
    //     {
    //         title: 'GREENCY-NEKO',
    //         image: '/assets/dummy-imgs/allcards/6.png',
    //         price: 584.85,
    //         currency: 'Core',
    //         items: 7777,
    //         minted: 6789,
    //     },

    // ];
    // const formattedEndTime = moment(justlanding?.mintEndTime).format('YYYY-MM-DD HH:mm:ss');

    const [show, setShow] = useState(false);
    const api_url = Environment.api_url;
    // const [stagedata, setStageData] = useState(false);
    const [accessToken, setAccessToken] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    useEffect(() => {
        const val = localStorage.getItem("accessToken");
        setAccessToken(val);
    }, []);



    // Time count down ==================================
    const currentTimeEpoch = Date.now(); // Get the current time in milliseconds since the Unix epoch
    const myCurrentTime = (Math.floor(currentTimeEpoch / 1000)); // Convert to seconds

    // const renderer = ({ days, hours, minutes, seconds, completed }) => {
    //     return (
    //         <>
    //             <span>Ends: {hours}H {minutes}M {seconds}S</span>
    //         </>
    //     );
    // };
    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            return <span>00H 00M 00S</span>;
        } else {
            if (justlanding?.hasMintingStarted) {
                return (
                    <span>Ends in: {hours}H {minutes}M {seconds}S</span>
                );
            } else {
                return (
                    <span>Starts in: {hours}H {minutes}M {seconds}S</span>
                );
            }
        }
    };

    return (
        <>
            <section className="launchpad-cards launchpadlisted-cards">
                <div className="parent-cards">
                    {justlanding?.length > 0 ? (
                        justlanding?.map((card, index) => {
                            const startTime = moment(card?.mintStartTime);
                            const endTime = moment(card?.mintEndTime);
                            const epochTime = Date.parse(card?.mintEndTime);
                            const duration = moment.duration(endTime.diff(startTime));
                            const hours = Math.floor(duration.asHours()).toString().padStart(2, '0');
                            const minutes = moment.utc(duration.asMilliseconds()).format('mm');
                            const seconds = moment.utc(duration.asMilliseconds()).format('ss');
                            const formattedDuration = `${hours}h ${minutes}m ${seconds}s`;
                            const currentTime = moment();
                            const hasMintingStarted = currentTime.isAfter(startTime);
                            const hasMintingEnded = endTime.isBefore(currentTime);
                            console.log(hasMintingEnded);
                            return (
                                <div className="single-card" key={index}>
                                    <div className="main-img">
                                        <img src={card?.imageUrl} alt="img" className="img-fluid" />
                                        <button onClick={() => { handleShow(); ListedDetails(card?._id, accessToken) }} className="bluebtn">View Details</button>
                                    </div>
                                    <div className="bottom-content">
                                        <h6 className="main-title">{card?.title}</h6>
                                        <div className="progress-div">
                                            <div className="upper-text">
                                                <h6>Total Minted</h6>
                                                <p>{(card?.minted / card?.totalSupply) * 100 || '0'}%<span>({card?.minted}/{card?.totalSupply})</span></p>
                                            </div>
                                            <ProgressBar now={(card?.minted / card?.totalSupply) * 100} />
                                        </div>
                                        <div className="fundraise-text">
                                            <h6>Total Funds Raised</h6>
                                            <p>{parseFloat(card?.minted || 0) * parseFloat(card?.price || 0)} CORE</p>
                                        </div>
                                        <div className="timer-div">
                                            {/* {hasMintingEnded ? (
                                                <p className="text-danger">
                                                    Ended
                                                </p>
                                            ) : (
                                                <p className="live">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="11" viewBox="0 0 10 11" fill="none">
                                                        <circle cx="5" cy="5.5" r="5" fill="#04C182" />
                                                    </svg>
                                                    Live
                                                </p>
                                            )} */}
                                            {hasMintingEnded ? (
                                                <p className="text-danger">
                                                    Ended
                                                </p>
                                            ) : hasMintingStarted ? (
                                                <p className="live">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="11" viewBox="0 0 10 11" fill="none">
                                                        <circle cx="5" cy="5.5" r="5" fill="#04C182" />
                                                    </svg>
                                                    Live
                                                </p>
                                            ) : (
                                                <p className="upcoming text-warning">
                                                    Upcoming
                                                </p>
                                            )}

                                            <h6>
                                                <Countdown
                                                    className='text-white'
                                                    date={hasMintingStarted ? endTime : startTime}
                                                    renderer={renderer}
                                                />
                                            </h6>
                                        </div>
                                        {(card?.minted === card?.totalSupply || hasMintingEnded) && (
                                            <div className="ifliveended">
                                                {/* <a href="#" className='btn-ended'>Ended</a> */}
                                                <a onClick={() => FinalizeContract(card?.projectId, card?._id)} href="#" className='btn-finalize'>Finalize</a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p className='text-white'>No data found</p>
                    )}
                </div>
            </section>

            {/* <Modal show={show} onHide={handleClose} className='buymodal' centered>
                <Modal.Header closeButton>
                    <Modal.Title>Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mainminted">
                        <div className="upperminted">
                            <h6 className="totalpara">Total Minted</h6>
                            <p className="percentagepara">0% <span className="numbergrey">(0/5555)</span></p>
                        </div>
                        <ProgressBar now={0} />
                        <div className="mintstagesmain">
                            <h6 className="minthead">Mint Stages</h6>
                            <div className="mintstages">
                                <p className="stagehead">Mint Stage 1</p>
                                <div className="innermintstages">
                                    <div className="left">
                                        <p className="namepara">Name</p>
                                        <h6 className="presalepara">Presale 1</h6>
                                    </div>
                                    <div className="right">
                                        <p className="salepara">Sale Price</p>
                                        <h6 className="corepara">0.259 CORE</h6>
                                    </div>
                                </div>
                                <div className="innermintstages">
                                    <div className="left">
                                        <p className="namepara">Start Date</p>
                                        <h6 className="presalepara">16/02/2024 12:11 AM</h6>
                                    </div>
                                    <div className="right">
                                        <p className="salepara">End Date</p>
                                        <h6 className="corepara">16/03/2024 12:11 AM</h6>
                                    </div>
                                </div>
                                <div className="innermintstages">
                                    <div className="left">
                                        <p className="namepara">Per-wallet mint limit</p>
                                        <h6 className="presalepara">10</h6>
                                    </div>
                                    <div className="right">
                                        <p className="salepara">Allowlist</p>
                                        <h6 className="bluepara">Download
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <path d="M9.90005 12.4917C9.74172 12.4917 9.58338 12.4334 9.45838 12.3084L7.32505 10.1751C7.08338 9.93339 7.08338 9.53339 7.32505 9.29172C7.56672 9.05006 7.96672 9.05006 8.20838 9.29172L9.90005 10.9834L11.5917 9.29172C11.8334 9.05006 12.2334 9.05006 12.475 9.29172C12.7167 9.53339 12.7167 9.93339 12.475 10.1751L10.3417 12.3084C10.2167 12.4334 10.0584 12.4917 9.90005 12.4917Z" fill="#862FC0" />
                                                <path d="M9.8999 12.4334C9.55824 12.4334 9.2749 12.15 9.2749 11.8084V3.33337C9.2749 2.99171 9.55824 2.70837 9.8999 2.70837C10.2416 2.70837 10.5249 2.99171 10.5249 3.33337V11.8084C10.5249 12.15 10.2416 12.4334 9.8999 12.4334Z" fill="#862FC0" />
                                                <path d="M9.99992 17.4417C5.70825 17.4417 2.70825 14.4417 2.70825 10.15C2.70825 9.80836 2.99159 9.52502 3.33325 9.52502C3.67492 9.52502 3.95825 9.80836 3.95825 10.15C3.95825 13.7084 6.44159 16.1917 9.99992 16.1917C13.5583 16.1917 16.0416 13.7084 16.0416 10.15C16.0416 9.80836 16.3249 9.52502 16.6666 9.52502C17.0083 9.52502 17.2916 9.80836 17.2916 10.15C17.2916 14.4417 14.2916 17.4417 9.99992 17.4417Z" fill="#862FC0" />
                                            </svg>
                                        </h6>
                                    </div>
                                </div>
                                <div className="totalmain">
                                    <div className="totalleft">
                                        <p className="greypara">Total Minted</p>
                                        <h6 className="whitepara">600</h6>
                                    </div>
                                    <div className="totalleft">
                                        <p className="greypara">Total Funds Raised</p>
                                        <h6 className="whitepara">15,789 CORE</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal> */}
            <Modal show={show} onHide={handleClose} className='buymodal' centered>
                <Modal.Header closeButton>
                    <Modal.Title>Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mainminted">
                        <div className="upperminted">
                            <h6 className="totalpara">Total Minted</h6>
                            <p className="percentagepara">{(stagedata?.minted / stagedata?.totalSupply) * 100 || '0'}%<span className="numbergrey">({stagedata?.minted}/{stagedata?.totalSupply})</span></p>
                        </div>

                        <ProgressBar now={(stagedata?.minted / stagedata?.totalSupply) * 100} />
                        <div className="twice-elem">
                            <p className="addres-text p-1">
                                Royalties
                            </p>
                        </div>
                        <div className="twice-elem">
                            <p className="addres-text-new">
                                <input value={royality} onChange={(e) => setRoyality(e.target.value)} placeholder='Royalities' type="text" />
                                <span>%</span>
                            </p>
                            <button onClick={() => GetRoyality(stagedata?.[0]?.contractAddress)} className='btn-send'>Send</button>
                            {/* <p className='text-white'> {stagedata?.[0]?.contractAddress}</p> */}
                        </div>
                        <div className="mintstagesmain">
                            <h6 className="minthead">Mint Stages</h6>
                            {/* {stagedata?.mintStages?.map((stage, index) => (
                                <div className="mintstages" key={index}>
                                    <p className="stagehead">Mint Stage {index + 1}</p>
                                    <div className="innermintstages">
                                        <div className="left">
                                            <p className="namepara">Name</p>
                                            <h6 className="presalepara">{stage?.name}</h6>
                                        </div>
                                        <div className="right">
                                            <p className="salepara">Sale Price</p>
                                            <h6 className="corepara">{stage?.price} CORE</h6>
                                        </div>
                                    </div>
                                    <div className="innermintstages">
                                        <div className="left">
                                            <p className="namepara">Start Date</p>
                                            <h6 className="presalepara">{moment(stage?.mintStartTime).format('DD/MM/YYYY hh:mm A')}</h6>
                                        </div>
                                        <div className="right">
                                            <p className="salepara">End Date</p>
                                            <h6 className="corepara">{moment(stage?.mintStageTime).format('DD/MM/YYYY hh:mm A')}</h6>
                                        </div>
                                    </div>
                                    <div className="innermintstages">
                                        <div className="left">
                                            <p className="namepara">Per-wallet mint limit</p>
                                            <h6 className="presalepara">0</h6>
                                        </div>
                                        <div className="right">
                                            <p className="salepara">Allowlist</p>
                                            <h6 className="bluepara">Download
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                    <path d="M9.90005 12.4917C9.74172 12.4917 9.58338 12.4334 9.45838 12.3084L7.32505 10.1751C7.08338 9.93339 7.08338 9.53339 7.32505 9.29172C7.56672 9.05006 7.96672 9.05006 8.20838 9.29172L9.90005 10.9834L11.5917 9.29172C11.8334 9.05006 12.2334 9.05006 12.475 9.29172C12.7167 9.53339 12.7167 9.93339 12.475 10.1751L10.3417 12.3084C10.2167 12.4334 10.0584 12.4917 9.90005 12.4917Z" fill="#862FC0" />
                                                    <path d="M9.8999 12.4334C9.55824 12.4334 9.2749 12.15 9.2749 11.8084V3.33337C9.2749 2.99171 9.55824 2.70837 9.8999 2.70837C10.2416 2.70837 10.5249 2.99171 10.5249 3.33337V11.8084C10.5249 12.15 10.2416 12.4334 9.8999 12.4334Z" fill="#862FC0" />
                                                    <path d="M9.99992 17.4417C5.70825 17.4417 2.70825 14.4417 2.70825 10.15C2.70825 9.80836 2.99159 9.52502 3.33325 9.52502C3.67492 9.52502 3.95825 9.80836 3.95825 10.15C3.95825 13.7084 6.44159 16.1917 9.99992 16.1917C13.5583 16.1917 16.0416 13.7084 16.0416 10.15C16.0416 9.80836 16.3249 9.52502 16.6666 9.52502C17.0083 9.52502 17.2916 9.80836 17.2916 10.15C17.2916 14.4417 14.2916 17.4417 9.99992 17.4417Z" fill="#862FC0" />
                                                </svg>
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                            ))} */}
                            {stagedata?.mintStages?.length ? (
                                stagedata?.mintStages?.map((stage, index) => {
                                    const previousEndTime = index > 0 ? stagedata?.mintStages[index - 1].mintStageTime : stagedata?.mintStartTime;
                                    return (
                                        <div className="mintstages" key={index}>
                                            <p className="stagehead">Mint Stage {index + 1}</p>
                                            <div className="innermintstages">
                                                <div className="left">
                                                    <p className="namepara">Name</p>
                                                    <h6 className="presalepara">{stage?.name}</h6>
                                                </div>
                                                <div className="right">
                                                    <p className="salepara">Sale Price</p>
                                                    <h6 className="corepara">{stage?.price} CORE</h6>
                                                </div>
                                            </div>
                                            <div className="innermintstages">
                                                <div className="left">
                                                    <p className="namepara">Start Date</p>
                                                    <h6 className="presalepara">{previousEndTime.slice(0, 19)}</h6>
                                                </div>
                                                <div className="right">
                                                    <p className="salepara">End Date</p>
                                                    <h6 className="corepara">{stage?.mintStageTime.slice(0, 19)}</h6>
                                                </div>
                                            </div>
                                            {/* <div className="innermintstages">
                                                <div className="left">
                                                    <p className="namepara">Per-wallet mint limit</p>
                                                    <h6 className="presalepara">0</h6>
                                                </div>
                                                <div className="right">
                                                    <p className="salepara">Allowlist</p>
                                                    <h6 className="bluepara">Download
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                            <path d="M9.90005 12.4917C9.74172 12.4917 9.58338 12.4334 9.45838 12.3084L7.32505 10.1751C7.08338 9.93339 7.08338 9.53339 7.32505 9.29172C7.56672 9.05006 7.96672 9.05006 8.20838 9.29172L9.90005 10.9834L11.5917 9.29172C11.8334 9.05006 12.2334 9.05006 12.475 9.29172C12.7167 9.53339 12.7167 9.93339 12.475 10.1751L10.3417 12.3084C10.2167 12.4334 10.0584 12.4917 9.90005 12.4917Z" fill="#862FC0" />
                                                            <path d="M9.8999 12.4334C9.55824 12.4334 9.2749 12.15 9.2749 11.8084V3.33337C9.2749 2.99171 9.55824 2.70837 9.8999 2.70837C10.2416 2.70837 10.5249 2.99171 10.5249 3.33337V11.8084C10.5249 12.15 10.2416 12.4334 9.8999 12.4334Z" fill="#862FC0" />
                                                            <path d="M9.99992 17.4417C5.70825 17.4417 2.70825 14.4417 2.70825 10.15C2.70825 9.80836 2.99159 9.52502 3.33325 9.52502C3.67492 9.52502 3.95825 9.80836 3.95825 10.15C3.95825 13.7084 6.44159 16.1917 9.99992 16.1917C13.5583 16.1917 16.0416 13.7084 16.0416 10.15C16.0416 9.80836 16.3249 9.52502 16.6666 9.52502C17.0083 9.52502 17.2916 9.80836 17.2916 10.15C17.2916 14.4417 14.2916 17.4417 9.99992 17.4417Z" fill="#862FC0" />
                                                        </svg>
                                                    </h6>
                                                </div>
                                            </div> */}
                                        </div>
                                    );
                                })
                            ) : (
                                <p className='text-white'>No data found</p>
                            )}


                        </div>
                    </div >
                </Modal.Body >
            </Modal >
        </>
    );
};

export default Launchpadlistedcard;
