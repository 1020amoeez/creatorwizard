'use client'

import React, { useRef, useState, useEffect } from 'react'
import { Dropdown } from 'react-bootstrap'
import axios from 'axios';
import Environment from '@/utils/Enviroment';
import { ToastContainer, toast } from 'react-toastify';

const StepMint = ({ onNext, createcollection, setCreateCollection }) => {
    const [selectedItem, setSelectedItem] = useState("");
    const items = ["Pfps", "Games", "Art", "Virtual_worlds", "Music", "Photography", "Sports", "Games", "Art", "Virtual_worlds", "Music", "Photography", "Sports"]
    const [selectedItem1, setSelectedItem1] = useState("");
    const items1 = ["Pfps", "Games", "Art", "Virtual_worlds", "Music", "Photography", "Sports", "Games", "Art", "Virtual_worlds", "Music", "Photography", "Sports"]

    const [image, setImage] = useState(null);
    const fileInputRef = useRef(null);
    const api_url = Environment.api_url;
    const [accessToken, setAccessToken] = useState("");
    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    useEffect(() => {
        const val = localStorage.getItem("accessToken");
        setAccessToken(val);
    }, []);
    // const handleButtonClick = () => {
    //     if (fileInputRef.current) {
    //         fileInputRef.current.click();
    //     }
    // };

    const handleButtonClick = () => {
        if (!createcollection?.totalSupply) {
            toast.error('Enter TotalSupply');
        } else {
            CreateCollection();
        }
    };

    const CreateCollection = async () => {
        const storedCollection = JSON.parse(localStorage.getItem('createcollection'));
        const collectionimg = localStorage.getItem('collectionImageUrl');
        const collectionData = {
            name: storedCollection?.name,
            symbol: storedCollection?.symbol,
            description: storedCollection?.description,
            twitterUrl: storedCollection?.twitterUrl,
            discordUrl: storedCollection?.discordUrl,
            websiteUrl: storedCollection?.websiteUrl,
            imageUrl: storedCollection?.imageUrl,
            featureImageUrl: collectionimg,
            totalSupply: createcollection?.totalSupply
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
            toast.error(error?.response?.data?.details?.[0]?.name);
            toast.error(error?.response?.data?.details?.[0]?.description);
            // Handle error
        }
    };


    const handleUpload = () => {
        setImage(null);
    };

    return (
        <>
            <section className='stepmain'>
                <div className="stepcontainerdetail">
                    <p className="stepheadparacollection">Step 3 of 4</p>
                    <h4 className="stepheadcollection">Mint info</h4>
                    <p className="collectionpara">Please enter minting info for your NFTs. </p>
                    <div className="socialweblinks">
                        <div className="stepinputmain marginmain">
                            <p className="stepinputpara">Total supply</p>
                            <input value={createcollection?.totalSupply} onChange={(e) => setCreateCollection({ ...createcollection, totalSupply: e.target.value })} type="text" className="stepinput" />
                            <p className='para' style={{ color: "var(--Light-Text-Color, #745F8C)", fontSize: "14px", marginTop: "15px" }}>Number of total items in the collection existing or expected</p>
                        </div>
                    </div>
                    <button className="stepbtn" onClick={handleButtonClick}>
                        Review
                    </button>
                </div>
            </section>
        </>
    )
}

export default StepMint