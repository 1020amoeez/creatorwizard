'use client'
import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import Environment from '@/utils/Enviroment';
import { ToastContainer, toast } from 'react-toastify';

const Stepcollection = ({ onNext, createcollection, setCreateCollection }) => {

    const api_url = Environment.api_url;
    const [accessToken, setAccessToken] = useState("");

    useEffect(() => {
        const val = localStorage.getItem("accessToken");
        setAccessToken(val);
    }, []);

    const handleButtonClick = () => {
        if (!createcollection?.name) {
            toast.error('Enter Collection Name');
        } else if (!createcollection?.symbol) {
            toast.error('Enter Collection Symbol');
        } else {
            CreateCollection();
        }
    };
    const CreateCollection = async () => {
        const collectionData = {
            name: createcollection?.name,
            symbol: createcollection?.symbol,
        };
        var config = {
            method: "put",
            url: api_url + "/launchpads/collection",
            data: collectionData,
            headers: {
                Authorization: "Bearer " + accessToken,
            },
        };
        try {
            await axios(config);
            onNext();
        } catch (error) {
            // toast.error(error?.response?.data?.details?.[0]?.name);
        }
    };

    return (
        <>
            <section className='stepmain'>
                <div className="stepcontainer">
                    <p className="stepheadparacollection">Step 1 of 4</p>
                    <h4 className="stepheadcollection">Collection Info</h4>
                    <p className="collectionpara">Tell us about the collection you’re minting!</p>
                    <div className="stepinputmain">
                        <p className="stepinputpara">Collection Name</p>
                        <input value={createcollection?.name} onChange={(e) => setCreateCollection({ ...createcollection, name: e.target.value })} type="text" className="stepinput" placeholder='Super NFT collection' />
                    </div>
                    <div className="stepinputmain">
                        <p className="stepinputpara marginless">Collection Symbol</p>
                        <p className="ligthsteppara">https://magiceden.io/marketplace/</p>
                        <input
                            value={createcollection?.symbol}
                            onChange={(e) => setCreateCollection({ ...createcollection, symbol: e.target.value })}
                            type="text" className="stepinput" placeholder='Super_nft_collection' />
                    </div>
                    <button className="stepbtn" onClick={handleButtonClick}>
                        Save & Proced
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none" className='arrowbtn'>
                            <path d="M10.1194 12.5467C9.99276 12.5467 9.86609 12.5001 9.76609 12.4001C9.57276 12.2067 9.57276 11.8867 9.76609 11.6934L13.4594 8.00008L9.76609 4.30674C9.57276 4.11341 9.57276 3.79341 9.76609 3.60008C9.95943 3.40674 10.2794 3.40674 10.4728 3.60008L14.5194 7.64674C14.7128 7.84008 14.7128 8.16008 14.5194 8.35341L10.4728 12.4001C10.3728 12.5001 10.2461 12.5467 10.1194 12.5467Z" fill="white" />
                            <path d="M14.054 8.5H2.83398C2.56065 8.5 2.33398 8.27333 2.33398 8C2.33398 7.72667 2.56065 7.5 2.83398 7.5H14.054C14.3273 7.5 14.554 7.72667 14.554 8C14.554 8.27333 14.3273 8.5 14.054 8.5Z" fill="white" />
                        </svg>
                    </button>
                </div>
            </section>
        </>
    )
}

export default Stepcollection