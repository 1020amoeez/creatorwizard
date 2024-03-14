'use client'
import React, { useRef, useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap'
import axios from 'axios';
import Environment from '@/utils/Enviroment';
import { ToastContainer, toast } from 'react-toastify';

const Stepdetail = ({ onNext, createcollection, setCreateCollection }) => {
    const [selectedItem, setSelectedItem] = useState("");
    const items = ["Pfps", "Games", "Art", "Virtual_worlds", "Music", "Photography", "Sports", "Games", "Art", "Virtual_worlds", "Music", "Photography", "Sports"]
    const [selectedItem1, setSelectedItem1] = useState("");
    const items1 = ["Pfps", "Games", "Art", "Virtual_worlds", "Music", "Photography", "Sports", "Games", "Art", "Virtual_worlds", "Music", "Photography", "Sports"]

    const [image, setImage] = useState(null);

    const fileInputRef = useRef(null);
    const fileInputRef2 = useRef(null);


    // const handleImageChange = (e) => {
    //     const file = e.target.files[0];

    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onload = () => {
    //             setImage(reader.result);
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // };
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = async () => {
                try {
                    const imageUrl = await getMetaData(accessToken, reader.result);
                    setCreateCollection({
                        ...createcollection,
                        launchpadImage: reader.result,
                        imageUrl: imageUrl
                    });

                } catch (error) {
                    toast.error("Failed to upload image. Please provide a PNG, JPG,JPEG or Gif file.");
                }
            };
            reader.readAsDataURL(file);
        }
    };
    const handleImageChange2 = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = async () => {
                try {
                    const imageUrl = await getMetaData(accessToken, reader.result);

                    localStorage.setItem('collectionImageUrl', imageUrl);
                    setCreateCollection({
                        ...createcollection,
                        featureImageUrl: reader.result,
                        imageUrl: imageUrl
                    });
                } catch (error) {
                    toast.error("Failed to upload image. Please provide a PNG, JPG,JPEG or Gif file.");
                }
            };
            reader.readAsDataURL(file);
        }
    };
    const getMetaData = async (accessToken, image) => {
        const formData = new FormData();
        const base64Image = image;
        const file = await dataURLtoFile(base64Image, 'image.png');
        formData.append("image", file);

        try {
            const response = await axios.post(api_url + "/metadata/upload-image", formData, {
                headers: {
                    Authorization: "Bearer " + accessToken,
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response?.data?.url) {
                return response.data.url;
            }
        } catch (error) {
            throw error;
        }
    };

    const dataURLtoFile = (dataUrl, filename) => {
        const arr = dataUrl.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    };

    const handleButtonClickimg = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    const handleButtonClickimg2 = () => {
        if (fileInputRef2.current) {
            fileInputRef2.current.click();
        }
    };



    const handleUpload = () => {
        setImage(null);
    };

    const api_url = Environment.api_url;
    const [accessToken, setAccessToken] = useState("");

    useEffect(() => {
        const val = localStorage.getItem("accessToken");
        setAccessToken(val);
    }, []);

    const handleButtonClick = () => {
        if (!createcollection?.description) {
            toast.error('Enter Collection Description');
        } else if (!createcollection?.launchpadImage) {
            toast.error('Provide Collection Image');
        } else if (!createcollection?.featureImageUrl) {
            toast.error('Provide Feature Image');
        } else if (!createcollection?.twitterUrl) {
            toast.error('Enter Twitter Url');
        } else if (!isValidUrl(createcollection?.twitterUrl)) {
            toast.error('Twitter URL must be a valid URL');
        } else {
            CreateCollection();
        }
    };

    const CreateCollection = async () => {
        const storedCollection = JSON.parse(localStorage.getItem('createcollection'));
        const collectionData = {
            name: storedCollection?.name,
            symbol: storedCollection?.symbol,
            description: createcollection?.description,
            twitterUrl: createcollection?.twitterUrl,
            discordUrl: createcollection?.discordUrl,
            websiteUrl: createcollection?.websiteUrl,
        };

        try {
            const imageUrl = await getMetaData(accessToken, createcollection.launchpadImage);
            collectionData.imageUrl = imageUrl;
            const featureImageUrl = await getMetaData(accessToken, createcollection.featureImageUrl);
            collectionData.featureImageUrl = featureImageUrl;
        } catch (error) {
            toast.error("Failed to upload image. Please provide a PNG, JPG,JPEG or Gif file.");
            return;
        }

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
            toast.error(error?.response?.data?.message)
            toast.error(error?.response?.data?.details?.[0]?.discordUrl);
            // Handle error
        }
    };

    const isValidUrl = (url) => {
        try {
            new URL(url);
            return true;
        } catch (error) {
            return false;
        }
    };
    const [video, setVideo] = useState(null);
    const [videoFile, setVideoFile] = useState(null);
    const fileInputRefVideo = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setVideoFile(file);
    };

    // const handleVideoChange = async () => {
    //     if (videoFile) {
    //         const reader = new FileReader();
    //         reader.onload = async () => {
    //             try {
    //                 const videoUrl = await uploadVideo(accessToken, reader.result);
    //                 setVideo(reader.result);
    //                 // Here you can do something with the uploaded video URL
    //                 console.log('Uploaded video URL:', videoUrl);
    //             } catch (error) {
    //                 toast.error("Failed to upload video. Please provide a valid video file.");
    //             }
    //         };
    //         reader.readAsDataURL(videoFile);
    //     }
    // };

    // const uploadVideo = async (accessToken, video) => {
    //     const formData = new FormData();
    //     const base64Video = video;
    //     const file = await dataURLtoFile(base64Video, 'video.mp4');
    //     formData.append("fileName", file?.name);
    //     formData.append("destination", "videos");
    //     try {
    //         const response = await axios.post(api_url + "/metadata/multipart-upload/init", formData, {
    //             headers: {
    //                 Authorization: "Bearer " + accessToken,
    //                 'Content-Type': 'multipart/form-data',
    //             },
    //         });

    //         if (response?.data?.url) {
    //             return response.data.url;
    //         }
    //     } catch (error) {
    //         throw error;
    //     }
    // };

    // const handleButtonClickVideo = () => {
    //     if (fileInputRefVideo.current) {
    //         fileInputRefVideo.current.click();
    //     }
    // };





    return (
        <>
            <section className='stepmain'>
                <div className="stepcontainerdetail">
                    <p className="stepheadparacollection">Step 2 of 4</p>
                    <h4 className="stepheadcollection">Listing details</h4>
                    <p className="collectionpara">Enter in the details on your collection that will be used for your marketplace page on magiceden.io</p>
                    <div className="stepinputmain">
                        <p className="stepinputpara">Collection Description</p>
                        <input value={createcollection?.description} onChange={(e) => setCreateCollection({ ...createcollection, description: e.target.value })} type="text" className="stepinput" placeholder='2000 unique NFTs governed by DAO' />
                    </div>
                    <div className="profileimgmain">
                        <h6 className="profilehead">Profile Image (500x500px)</h6>
                        {createcollection?.launchpadImage ? (
                            <div className="uploadimg">
                                <img src={createcollection?.launchpadImage} alt="uploadedimg" className="uploadedimg" />
                            </div>
                        ) : (
                            null
                        )}
                        {/* Hidden file input */}
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleImageChange}
                        />
                        {/* Upload button */}
                        <button className="uploadbtn" onClick={handleButtonClickimg}>
                            Upload
                        </button>
                        <p className="uploadpara">Max file size 5MB. This is the image that will show on your collection profile page</p>
                    </div>
                    <div className="feature-img">
                        <h6>Featured image</h6>
                        <p className='para'>This image will be used for featuring your collection on the homepage, category pages, or other display areas of Wizard.</p>
                        {/* <div onClick={handleButtonClickimg2} className="upload-feature">                      
                                <div className="upload"> */}
                        {createcollection?.featureImageUrl ? (
                            <div className="featuremainimg">
                                <img src={createcollection?.featureImageUrl} alt="featureinnerimg" className="featureinnerimg" />
                            </div>
                        ) : (
                            <div className="upload-feature" onClick={handleButtonClickimg2}>
                                <div className="upload">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="31" viewBox="0 0 30 31" fill="none">
                                        <path d="M22.5 16.4639H7.5C6.9875 16.4639 6.5625 16.0389 6.5625 15.5264C6.5625 15.0139 6.9875 14.5889 7.5 14.5889H22.5C23.0125 14.5889 23.4375 15.0139 23.4375 15.5264C23.4375 16.0389 23.0125 16.4639 22.5 16.4639Z" fill="white" />
                                        <path d="M15 23.9639C14.4875 23.9639 14.0625 23.5389 14.0625 23.0264V8.02637C14.0625 7.51387 14.4875 7.08887 15 7.08887C15.5125 7.08887 15.9375 7.51387 15.9375 8.02637V23.0264C15.9375 23.5389 15.5125 23.9639 15 23.9639Z" fill="white" />
                                    </svg>
                                </div>
                                <p className="featurepara">Recommended size: 600 x 400</p>
                            </div>
                        )}
                        <input ref={fileInputRef2} onChange={handleImageChange2} type="file" className='d-none' id='upload' />
                    </div>
                    <input ref={fileInputRef2} onChange={handleImageChange2} type="file" className='d-none' id='upload' />
                    {/* {createcollection?.featureImageUrl ? "" :  <p>Recommended size: 600 x 400</p>}
                           {
                            createcollection?.featureImageUrl &&  <label htmlFor="upload " className="imgafterupload">
                            <div className="upload ">
                                    <div className="featuremainimg">
                                        <img src={createcollection?.featureImageUrl} alt="featureinnerimg" className="featureinnerimg" />
                                    </div>
                                <input ref={fileInputRef2} onChange={handleImageChange2} type="file" className='d-none' id='upload' />
                            </div>
                        </label>
                           } */}
                    {/* </div>
                    </div> */}

                    {/* 

                    <div className="feature-img">
                        <h6>Featured {videoFile ? 'Video' : 'Image'}</h6>
                        <p className='para'>{videoFile ? 'This video will be used for featuring your collection on the homepage, category pages, or other display areas of Wizard.' : 'This image will be used for featuring your collection on the homepage, category pages, or other display areas of Wizard.'}</p>
                        <div onClick={videoFile ? handleButtonClickVideo : handleButtonClickimg2} className="upload-feature">
                            {createcollection?.featureImageUrl && !videoFile ? "" : <label htmlFor="upload">
                                <div className="upload">
                                    {createcollection?.featureImageUrl && !videoFile ? (
                                        <div className="featuremainimg">
                                            <img src={createcollection?.featureImageUrl} alt="featureinnerimg" className="featureinnerimg" />
                                        </div>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="31" viewBox="0 0 30 31" fill="none">
                                            <path d="M22.5 16.4639H7.5C6.9875 16.4639 6.5625 16.0389 6.5625 15.5264C6.5625 15.0139 6.9875 14.5889 7.5 14.5889H22.5C23.0125 14.5889 23.4375 15.0139 23.4375 15.5264C23.4375 16.0389 23.0125 16.4639 22.5 16.4639Z" fill="white" />
                                            <path d="M15 23.9639C14.4875 23.9639 14.0625 23.5389 14.0625 23.0264V8.02637C14.0625 7.51387 14.4875 7.08887 15 7.08887C15.5125 7.08887 15.9375 7.51387 15.9375 8.02637V23.0264C15.9375 23.5389 15.5125 23.9639 15 23.9639Z" fill="white" />
                                        </svg>
                                    )}
                            
                                    <input className='d-none' id='upload' type="file" accept="video/*" onChange={handleFileChange} />

                                </div>
                            </label>
                            }

                            {createcollection?.featureImageUrl && !videoFile ? "" : <p>{videoFile ? 'Recommended size: 600 x 400' : 'Recommended size: 600 x 400'}</p>}
                            {
                                createcollection?.featureImageUrl && !videoFile && <label htmlFor="upload " className="imgafterupload">
                                    <div className="upload ">
                                        <div className="featuremainimg">
                                            <img src={createcollection?.featureImageUrl} alt="featureinnerimg" className="featureinnerimg" />
                                        </div>
                                        <input ref={fileInputRef2} onChange={handleImageChange2} type="file" className='d-none' id='upload' />
                                    </div>
                                </label>
                            }
                        </div>
                    </div>

                    <button onClick={(e) => handleVideoChange(videoFile)}>asd</button> */}

                    <div className="socialweblinks">
                        <h3 className="socialwebhead">Social & Web Links</h3>
                        <p className="socialwebpara">Input your social and website links for your collection. These links will be displayed on your collection page</p>
                        <p className="scoialweblowerpara">Please link your Twitter account</p>
                        {/* <button className="uploadbtn">Link Twitter</button> */}
                        <div className="stepinputmain marginmain">
                            <p className="stepinputpara">Twitter Url</p>
                            <input value={createcollection?.twitterUrl} onChange={(e) => setCreateCollection({ ...createcollection, twitterUrl: e.target.value })} type="text" className="stepinput" placeholder='https://supercollection.io' />
                        </div>
                        <div className="stepinputmain marginmain">
                            <p className="stepinputpara">Discord Invite Code</p>
                            <p className="ligthsteppara">https://discord.gg/</p>
                            <input value={createcollection?.discordUrl} onChange={(e) => setCreateCollection({ ...createcollection, discordUrl: e.target.value })} type="text" className="stepinput" placeholder='-' />
                        </div>
                        <div className="stepinputmain marginmain">
                            <p className="stepinputpara">Website Url</p>
                            <input value={createcollection?.websiteUrl} onChange={(e) => setCreateCollection({ ...createcollection, websiteUrl: e.target.value })} type="text" className="stepinput" placeholder='https://supercollection.io' />
                        </div>
                    </div>
                    <button className="stepbtn" onClick={handleButtonClick}>
                        Save & Proceed
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

export default Stepdetail