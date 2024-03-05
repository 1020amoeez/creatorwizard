import React, { useState } from 'react';
import Navbar from './navbar';
import Footer from './footer';
import Environment from '@/utils/Enviroment';
import axios from 'axios';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';



const Editprofile = () => {
    const [profilePicture, setProfilePicture] = useState(null);
    const [coverPhoto, setCoverPhoto] = useState(null);
    const api_url = Environment.api_url;
    const [accessToken, setAccessToken] = useState("");
    const [profile, setProfile] = useState([]);
    const [updatedEmail, setUpdatedEmail] = useState("");
    const [bio, setBio] = useState("");
    const [name, setName] = useState("");
    const [walletaddress, setWalletAddress] = useState("");
    const [isCopied, setIsCopied] = useState(false);



    // const handleProfilePictureChange = (event) => {
    //     const file = event.target.files[0];
    //     setProfilePicture(file);
    // };

    // const handleCoverPhotoChange = (event) => {
    //     const file = event.target.files[0];
    //     setCoverPhoto(file);
    // };
    const handleProfilePictureChange = (event) => {
        const file = event.target.files[0];
        setProfilePicture(file);
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById("profile-image-preview").src = e.target.result;
        };
        reader.readAsDataURL(file);
    };

    const handleCoverPhotoChange = (event) => {
        const file = event.target.files[0];
        setCoverPhoto(file);
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById("cover-photo-preview").src = e.target.result;
        };
        reader.readAsDataURL(file);
    };





    const getProfile = async (accessToken) => {
        try {
            const config = {
                method: "get",
                url: `${api_url}/creators/profile`,
                headers: {
                    Authorization: "Bearer " + accessToken,
                },
            };
            const response = await axios(config);
            console.log(response?.data?.data, "swdwww");
            setProfile(response?.data?.data);
        } catch (error) {
            console.error("API Request Error:", error);
        }
    };
    useEffect(() => {
        const val = localStorage.getItem("accessToken");
        setAccessToken(val);
    }, []);

    useEffect(() => {
        if (accessToken) {
            getProfile(accessToken);
        }
    }, [accessToken]);


    const EditProfile = async (accessToken) => {
        try {
            const formData = new FormData();
            formData.append("name", name || profile.name || "");
            formData.append("bio", bio || profile.bio || "");
            formData.append("email", updatedEmail || profile.email || "");
            formData.append("walletAddress", walletaddress || profile.walletAddress || "");
            if (profilePicture) {
                formData.append("profileImage", profilePicture);
            }
            if (coverPhoto) {
                formData.append("coverImage", coverPhoto);
            }
            const config = {
                method: "patch",
                url: `${api_url}/creators/profile`,
                headers: {
                    Authorization: "Bearer " + accessToken,
                },
                data: formData,
            };
            const response = await axios(config);
            const updatedProfile = response?.data?.data
            setProfile(updatedProfile);
            localStorage.setItem("profile", JSON.stringify(updatedProfile));
            toast.success("Profile updated successfully");
        } catch (error) {
            console.error("API Request Error:", error);
            if (error.response.status === 400) {
                if (error.response.data.details) {
                    toast.error(error.response.data.details[0].walletAddress);
                } else {
                    toast.error(error.response.data.message);
                }
                if (error.response.data.details) {
                    toast.error(error.response.data.details[0].email);
                } else {
                    toast.error(error.response.data.message);
                }
                if (error.response.data.details) {
                    toast.error(error.response.data.details[0].name);
                } else {
                    toast.error(error.response.data.message);
                }
                if (error.response.data.details) {
                    toast.error(error.response.data.details[0].bio);
                } else {
                    toast.error(error.response.data.message);
                }
            }
        }
    };
    const handleCopyClick = () => {
        const textToCopy = profile?.walletAddress;
        const tempTextArea = document.createElement('textarea');
        tempTextArea.value = textToCopy;
        document.body.appendChild(tempTextArea);
        tempTextArea.select();
        document.execCommand('copy');
        document.body.removeChild(tempTextArea);
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 1000);
    };


    return (
        <>
            <Navbar />
            <section className="editprofile">
                <div className="custom-container-small">
                    <div className="main-heading">
                        <h6>Edit Your Profile</h6>
                        <p>You can set preferred display name and manage other personal settings</p>
                    </div>
                    <div className="bottom-twice-content">
                        <div className="left-content">
                            <div className="option-field">
                                <label>Display name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder={profile?.name}
                                />
                            </div>
                            <div className="option-field">
                                <label>bio</label>
                                <input
                                    type="text"
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    placeholder={profile?.bio}
                                // placeholder={profile?.bio.replace(/\b(\w)/g, (match) => match.toLowerCase())} />
                                />
                            </div>
                            {/* <div className="option-field">
                                <label>twitter handle</label>
                                <input type="text" placeholder='@enter your name in twitter' />
                                <a href="#" className='btn-connect'>connect</a>
                            </div>
                            <div className="twice-field">
                                <div className="option-field">
                                    <label>Instagram Handle</label>
                                    <input type="text" placeholder='enter your instagram' />
                                </div>
                                <div className="option-field">
                                    <label>your site</label>
                                    <input type="text" placeholder='yoursite.io' />
                                </div>
                            </div>
                            <div className="twice-field">
                                <div className="option-field">
                                    <label>reddit</label>
                                    <input type="text" placeholder='enter your reddit' />
                                </div>
                                <div className="option-field">
                                    <label>discord</label>
                                    <input type="text" placeholder='Discord' />
                                </div>
                            </div>
                            <div className="twice-field">
                                <div className="option-field">
                                    <label>medium</label>
                                    <input type="text" placeholder='enter your Medium' />
                                </div>
                                <div className="option-field">
                                    <label>telegram</label>
                                    <input type="text" placeholder='yoursite.io' />
                                </div>
                            </div> */}
                            <div className="option-field">
                                <label>wallet address</label>
                                <input
                                    type=""
                                    value={walletaddress}
                                    placeholder={profile?.walletAddress}
                                    onChange={(e) => setWalletAddress(e.target.value)}
                                />
                                <a onClick={handleCopyClick} href="#" className='btn-connect'>copy</a>
                                {isCopied &&
                                    <div className="copied">Copied!</div>
                                }
                            </div>
                            <div className="option-field">
                                <label>Email address</label>
                                <input
                                    value={updatedEmail}
                                    type="email"
                                    placeholder={profile?.email}
                                    onChange={(e) => setUpdatedEmail(e.target.value)}
                                />
                            </div>
                            <a onClick={() => EditProfile(accessToken, updatedEmail || profile.email)} href="#" className='btn-update'>Update Profile</a>
                        </div>
                        <div className="right-content">
                            {/* <div className="profile-picture-parent">
                                <h6>Profile Picture</h6>
                                <div className="twice-content">
                                    <div className="profile">
                                        <img src={profilePicture || profile?.profileImageUrl} alt="img" className='img-fluid' />
                                    </div>
                                    <div className="right-text">
                                        <p>We recommend an image of at least 300x300. Gifs work too. Max 5mb.</p>
                                        <label htmlFor="upload" className='btn-upload' >Upload Photo</label>
                                        <input type="file" className='d-none' id='upload' onChange={handleProfilePictureChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="cover-photo">
                                <h6>Cover Photo</h6>
                                <div className="cover-main">
                                    <img src={coverPhoto || profile?.coverImageUrl} alt="img" className='img-fluid' />
                                </div>
                                <label htmlFor="uploadcover" className='btn-cover'>Upload Cover</label>
                                <input onChange={handleCoverPhotoChange} type="file" className='d-none' id='uploadcover' />
                            </div> */}
                            <div className="profile-picture-parent">
                                <h6>Profile Picture</h6>
                                <div className="twice-content">
                                    <div className="profile">
                                        <img
                                            src={profilePicture ? URL.createObjectURL(profilePicture) : (profile?.profileImageUrl || 'assets/discovercollection/upload-img.png')}
                                            alt="Profile"
                                            className='img-fluid'
                                            id="profile-image-preview"
                                        />
                                    </div>
                                    <div className="right-text">
                                        <p>We recommend an image of at least 300x300. Gifs work too. Max 5mb.</p>
                                        <label htmlFor="upload" className='btn-upload' >Upload Photo</label>
                                        <input type="file" className='d-none' id='upload' onChange={handleProfilePictureChange} />
                                    </div>
                                </div>
                            </div>

                            <div className="cover-photo">
                                <h6>Cover Photo</h6>
                                <div className="cover-main">
                                    <img
                                        src={coverPhoto ? URL.createObjectURL(coverPhoto) : (profile?.coverImageUrl || 'assets/discovercollection/upload-img.png')}
                                        alt="Cover"
                                        className='img-fluid'
                                        id="cover-photo-preview"
                                    />
                                </div>
                                <label htmlFor="uploadcover" className='btn-cover'>Upload Cover</label>
                                <input onChange={handleCoverPhotoChange} type="file" className='d-none' id='uploadcover' />
                            </div>

                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Editprofile;