import React, { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
// import RichTextEditor from "./RichTextEditor";
import axios from 'axios';
import Environment from '@/utils/Enviroment';

const Launchpadinfo = ({ onNext, formDataname, setFormDataName, draftdata }) => {
    const fileInputRef = useRef(null);
    const fileInputRef2 = useRef(null);
    const [activeEdition, setActiveEdition] = useState(null);


    const handleLimited = () => {
        setFormDataName({ ...formDataname, limitedEddition: true, openEddition: false });
        setActiveEdition('limited');
    };

    const handleOpen = () => {
        setFormDataName({ ...formDataname, limitedEddition: false, openEddition: true });
        setActiveEdition('open');
    };

    const api_url = Environment.api_url;
    const [accessToken, setAccessToken] = useState("");

    useEffect(() => {
        const val = localStorage.getItem("accessToken");
        setAccessToken(val);
    }, []);

    // const handleImageChange = (e) => {
    //     const file = e.target.files[0];

    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onload = () => {
    //             setFormDataName({
    //                 ...formDataname,
    //                 launchpadImage: reader.result
    //             });
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
                    setFormDataName({
                        ...formDataname,
                        launchpadImage: reader.result,
                        imageUrl: imageUrl
                    });
                    // setFormDataName({
                    //     ...formDataname,
                    //     featureImageUrl: reader.result,
                    //     imageUrl: imageUrl
                    // });
                } catch (error) {
                    toast.error("Failed to upload image. Please provide a PNG, JPG, or JPEG file.");
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
                    // setFormDataName({
                    //     ...formDataname,
                    //     launchpadImage: reader.result,
                    //     imageUrl: imageUrl
                    // });
                    localStorage.setItem('featureImageUrl', imageUrl);
                    setFormDataName({
                        ...formDataname,
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



    const handleButtonClick = () => {
        if (!formDataname?.name) {
            toast.error('Enter Launchpad Name');
        } else if (!formDataname?.symbol) {
            toast.error('Enter Symbol');
        } else if (!formDataname?.description) {
            toast.error('Enter Launchpad Description');
        } else if (!formDataname?.launchpadImage) {
            toast.error('Enter Image');
        } else if (!formDataname?.featureImageUrl) {
            toast.error('Enter Featured Image');
        } else if (!formDataname?.limitedEddition && !formDataname?.openEddition) {
            toast.error('Select an edition type');
        } else if (!formDataname?.totalSupply && !formDataname?.limitedEddition && !formDataname?.openEddition) {
            toast.error('Enter Total Supply');
        } else if (!formDataname?.websiteUrl) {
            toast.error('Website URL is Required');
        } else if (!isValidUrl(formDataname?.websiteUrl)) {
            toast.error('Website URL must be a valid URL');
        } else if (!formDataname?.discordUrl) {
            toast.error('Discord URL is required');
        } else if (!isValidUrl(formDataname?.discordUrl)) {
            toast.error('Discord URL must be a valid URL');
        } else if (!formDataname?.twitterUrl) {
            toast.error('Twitter URL is required');
        } else if (!isValidUrl(formDataname?.twitterUrl)) {
            toast.error('Twitter URL must be a valid URL');
        } else {
            CreateLaunchPad();
        }
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




    const getValue = (fieldName, value) => {
        setFormDataName({ ...formDataname, [fieldName]: value });
    };



    const CreateLaunchPad = async () => {
        const launchpadData = {
            name: formDataname?.name,
            symbol: formDataname?.symbol,
            description: formDataname?.description,
            // totalSupply: formDataname?.totalSupply,
            // email: formDataname?.email,
            websiteUrl: formDataname?.websiteUrl,
            discordUrl: formDataname?.discordUrl,
            twitterUrl: formDataname?.twitterUrl,
            // price: formDataname?.price
        };
        if (formDataname?.limitedEddition) {
            launchpadData.limitedEddition = formDataname?.limitedEddition;
        }
        if (formDataname?.openEddition) {
            launchpadData.openEddition = formDataname?.openEddition;
        }
        if (!formDataname?.openEddition) {
            launchpadData.totalSupply = formDataname?.totalSupply;
        }
        try {
            const imageUrl = await getMetaData(accessToken, formDataname.launchpadImage);
            launchpadData.imageUrl = imageUrl;
            const featureImageUrl = await getMetaData(accessToken, formDataname.featureImageUrl);
            launchpadData.featureImageUrl = featureImageUrl;
        } catch (error) {
            toast.error("Failed to upload image. Please provide a PNG, JPG,JPEG or Gif file.");
            return;
        }
        var config = {
            method: "put",
            url: api_url + "/launchpads",
            data: launchpadData,
            headers: {
                Authorization: "Bearer " + accessToken,
            },
        };
        try {
            await axios(config);
            onNext();
        } catch (error) {
            toast.error(error?.response?.data?.message);
            toast.error(error?.response?.data?.details?.[0]?.totalSupply);
            toast.error(error?.response?.data?.details?.[0]?.twitterUrl);
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

    const isValidUrl = (url) => {
        try {
            new URL(url);
            return true;
        } catch (error) {
            return false;
        }
    };
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    // useEffect(() => {
    //     const searchParams = new URLSearchParams(window.location.search);
    //     const ide = searchParams.get('id');
    //     getDraftLaunchpad(ide)

    // }, [])

    // useEffect(() => {
    //     // if (accessToken) {
    //     getDraftLaunchpad()
    //     // }
    // }, [accessToken])
    const [imageSrc, setImageSrc] = useState('');
    const [isUploaded, setIsUploaded] = useState(false);
    const inputRef = useRef(null);
    const handleUploadClick = () => {
        inputRef.current.click();
    };
    const handleImageChangefeture = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            setImageSrc(reader.result);
            setIsUploaded(true); // Set isUploaded to true when the image is uploaded
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <section className='stepmain'>
                <div className="stepcontainerdetail">
                    <h4 className="stepheadcollection">Launchpad Info</h4>
                    <p className="collectionpara">Tell us about the Launchpad.</p>
                    <div className="stepinputmain">
                        <p className="stepinputpara">Launchpad Name</p>
                        <input value={formDataname?.name} onChange={(e) => setFormDataName({ ...formDataname, name: e.target.value })} type="text" className="stepinput" placeholder='Launchpad Name' />
                    </div>
                    <div className="stepinputmain">
                        <p className="stepinputpara">Launchpad Symbol</p>
                        <input value={formDataname?.symbol} onChange={(e) => setFormDataName({ ...formDataname, symbol: e.target.value })} type="text" className="stepinput" placeholder='Launchpad Symbol' />
                    </div>
                    <div className="stepinputmain">
                        <p className="stepinputpara">Launchpad Description</p>
                        <textarea value={formDataname?.description} onChange={(e) => setFormDataName({ ...formDataname, description: e.target.value })} type="text" className="stepinput" placeholder='Launchpad Description' />
                        {/* <RichTextEditor initialValue={description} getValue={getValue} /> */}
                        {/* <RichTextEditor initialValue={description} getValue={(value) => getValue('description', value)} /> */}
                    </div>
                    <div className="profileimgmain">
                        <h6 className="profilehead">Launchpad Image (500x500px)</h6>
                        {formDataname?.launchpadImage ? (
                            <div className="uploadimg">
                                <img src={formDataname?.launchpadImage} alt="uploadedimg" className="uploadedimg" />
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
                    {/* <div className="editions-div">
                        <div onClick={handleLimited} className={`inner-edition ${activeEdition === 'limited' ? 'active' : ''}`}>
                            <h6>Limited edition</h6>
                            <p>A limited number of items</p>
                        </div>
                        <div onClick={handleOpen} className={`inner-edition ${activeEdition === 'open' ? 'active' : ''}`}>
                            <h6>Open edition</h6>
                            <p>An unlimited number of items</p>
                        </div>
                    </div>
                    <div className="stepinputmain">
                        <p className="stepinputpara">Total Supply</p>
                        <input val
                        ue={formDataname?.totalSupply} onChange={(e) => setFormDataName({ ...formDataname, totalSupply: e.target.value })} type="text" className="stepinput" placeholder='Total Supply' />
                    </div> */}
                   <div className="featuredmain">
                        <h6 className="featurehead">Featured image</h6>
                        <p className="featurepara">This image will be used for featuring your collection on the homepage, category pages, or other display areas of Wizard.</p>
                       
                        <div className="featuredmain">
                            <h6 className="featurehead">Featured image</h6>
                            <p className="featurepara">This image will be used for featuring your collection on the homepage, category pages, or other display areas of Wizard.</p>
                   
                            {formDataname?.featureImageUrl ? (
                                <div className="featuremainimg">
                                    <img src={formDataname.featureImageUrl} alt="Uploaded feature image" className="featureinnerimg" />
                                </div>
                            ) : (
                                <div className="featureuploaddiv" onClick={handleButtonClickimg2}>
                                    <div className="fetureuploadinnerdiv">
                                    
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="31" viewBox="0 0 30 31" fill="none">
                                            <path d="M22.5 16.0791H7.5C6.9875 16.0791 6.5625 15.6541 6.5625 15.1416C6.5625 14.6291 6.9875 14.2041 7.5 14.2041H22.5C23.0125 14.2041 23.4375 14.6291 23.4375 15.1416C23.4375 15.6541 23.0125 16.0791 22.5 16.0791Z" fill="white" />
                                            <path d="M15 23.5791C14.4875 23.5791 14.0625 23.1541 14.0625 22.6416V7.6416C14.0625 7.1291 14.4875 6.7041 15 6.7041C15.5125 6.7041 15.9375 7.1291 15.9375 7.6416V22.6416C15.9375 23.1541 15.5125 23.5791 15 23.5791Z" fill="white" />
                                        </svg>
                                    </div>
                                    <p className="featurepara">Recommended size: 600 x 400</p>
                                </div>
                            )}
                            <input type="file" ref={fileInputRef2} style={{ display: 'none' }} onChange={handleImageChange2} />
                        </div>
                        <input type="file" ref={fileInputRef2} style={{ display: 'none' }} onChange={handleImageChange2} />
                    </div>
                    <div className="editions-div">
                        <div onClick={handleLimited} className={`inner-edition ${activeEdition === 'limited' ? 'active' : ''}`}>
                            <h6>Limited edition</h6>
                            <p>A limited number of items</p>
                        </div>
                        <div onClick={handleOpen} className={`inner-edition ${activeEdition === 'open' ? 'active' : ''}`}>
                            <h6>Open edition</h6>
                            <p>An unlimited number of items</p>
                        </div>
                    </div>
                    {activeEdition !== 'open' && (
                        <div className="stepinputmain">
                            <p className="stepinputpara">Total Supply</p>

                            <input
                                value={formDataname?.totalSupply}
                                onChange={(e) => setFormDataName({ ...formDataname, totalSupply: e.target.value })}
                                type="text"
                                className="stepinput"
                                placeholder='Total Supply'
                            />
                        </div>
                    )}
                    {/* <div className="stepinputmain">
                        <p className="stepinputpara">Price</p>
                        <input value={formDataname?.price} onChange={(e) => setFormDataName({ ...formDataname, price: e.target.value })} type="text" className="stepinput" placeholder='Price' />
                    </div> */}
                    {/* <div className="stepinputmain">
                        <p className="stepinputpara">Email</p>
                        <input value={formDataname?.email} onChange={(e) => setFormDataName({ ...formDataname, email: e.target.value })} type="text" className="stepinput" placeholder='Email' />
                    </div> */}
                    <div className="stepinputmain">
                        <p className="stepinputpara">Website URL</p>
                        <input value={formDataname?.websiteUrl} onChange={(e) => setFormDataName({ ...formDataname, websiteUrl: e.target.value })} type="text" className="stepinput" placeholder='Website URL' />
                    </div>
                    <div className="stepinputmain">
                        <p className="stepinputpara">Discord</p>
                        <input value={formDataname?.discordUrl} onChange={(e) => setFormDataName({ ...formDataname, discordUrl: e.target.value })} type="text" className="stepinput" placeholder='Discord' />
                    </div>
                    <div className="stepinputmain">
                        <p className="stepinputpara">Twitter</p>
                        <input value={formDataname?.twitterUrl} onChange={(e) => setFormDataName({ ...formDataname, twitterUrl: e.target.value })} type="text" className="stepinput" placeholder='Twitter' />
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

export default Launchpadinfo;