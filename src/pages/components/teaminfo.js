import React, { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Environment from '@/utils/Enviroment';
import axios from 'axios';


const Teaminfo = ({ onNext, formDataname, setFormDataName, id, draftdata }) => {
    const api_url = Environment.api_url;
    const [teamMembers, setTeamMembers] = useState(formDataname?.teamMembers || []);
    const [image, setImage] = useState(null);
    const fileInputRefs = useRef([]);
    const [accessToken, setAccessToken] = useState("");

    useEffect(() => {
        const val = localStorage.getItem("accessToken");
        setAccessToken(val);
    }, []);

    // const handleImageChange = (index, e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onload = () => {
    //             setImage(reader.result);
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // };
    // const handleImageChange = (index, e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onload = () => {
    //             const updatedTeamMembers = [...teamMembers];
    //             updatedTeamMembers[index].imageUrl = reader.result; // Set the image URL for the specific team member
    //             setTeamMembers(updatedTeamMembers);

    //             // Update local storage with the updated team members' data
    //             const updatedFormData = { ...formDataname, teamMembers: updatedTeamMembers };
    //             localStorage.setItem('formDataname', JSON.stringify(updatedFormData));
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // };

    const handleImageChange = async (index, e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = async () => {
                try {
                    const imageUrl = await getMetaData(accessToken, reader.result);
                    const updatedTeamMembers = [...teamMembers];
                    updatedTeamMembers[index].imageUrl = imageUrl; // Set the image URL for the specific team member
                    setTeamMembers(updatedTeamMembers);

                    // Update local storage with the updated team members' data
                    const updatedFormData = { ...formDataname, teamMembers: updatedTeamMembers };
                    localStorage.setItem('formDataname', JSON.stringify(updatedFormData));
                } catch (error) {
                    toast.error(error?.response?.data?.message);
                }
            };
            reader.readAsDataURL(file);
        }
    };


    const handleButtonClick = (index) => {
        fileInputRefs.current[index].click();
    };


    const handleAddTeamMember = () => {
        const newMember = { name: '', designation: '', twitterUrl: '', imageUrl: '' };
        const updatedMembers = [...teamMembers, newMember];
        setTeamMembers(updatedMembers);
        setFormDataName({ ...formDataname, teamMembers: updatedMembers });
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);



    const handleInputChange = (index, fieldName, value) => {
        const updatedTeamMembers = [...teamMembers];
        updatedTeamMembers[index][fieldName] = value;
        setTeamMembers(updatedTeamMembers);
        setFormDataName({ ...formDataname, teamMembers: updatedTeamMembers });
    };



    const handleSaveAndProceed = async () => {
        for (let i = 0; i < teamMembers?.length; i++) {
            const { name, designation, twitterUrl, imageUrl } = teamMembers[i];
            if (
                !validateInput(name, 'Team Member Name') ||
                !validateInput(designation, 'Team Member Designation') ||
                !validateInput(twitterUrl, 'Team Member Twitter') ||
                !validateInput(imageUrl, 'Team Member Image')
            ) {
                return;
            }
        }
        if (teamMembers?.length === 0) {
            toast.error("Please add at least one team member");
            return;
        }
        const updatedMembers = [];
        for (let i = 0; i < teamMembers?.length; i++) {
            const { name, designation, twitterUrl, imageUrl } = teamMembers[i];
            const updatedMember = { name, designation, twitterUrl };
            updatedMember.imageUrl = imageUrl;
            updatedMembers.push(updatedMember);
        }
        const existingFormData = JSON.parse(localStorage.getItem('formDataname'));
        const updatedFormData = {
            ...existingFormData,
            teamMembers: [...(existingFormData?.teamMembers || []), ...updatedMembers]
        };
        localStorage.setItem('formDataname', JSON.stringify(updatedFormData));
        CreateLaunchPad(updatedFormData);
    };






    const validateInput = (value, fieldName) => {
        if (!value || value.trim() === '') {
            toast.error(`Please enter ${fieldName}`);
            return false;
        }
        return true;
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

    // const getMetaData = async (accessToken, index) => {
    //     const formData = new FormData();
    //     if (image) {
    //         const base64Image = image;
    //         const file = await dataURLtoFile(base64Image, 'image.png');
    //         formData.append("image", file);
    //     }
    //     try {
    //         const response = await axios.post(api_url + "/metadata/upload-image", formData, {
    //             headers: {
    //                 Authorization: "Bearer " + accessToken,
    //                 'Content-Type': 'multipart/form-data',
    //             },
    //         });
    //         console.log(response?.data?.url, "res");
    //         if (response?.data?.url) {
    //             return response.data.url;
    //         }
    //     } catch (error) {
    //         toast.error(error?.response?.data?.message);
    //     }
    // };
    const getMetaData = async (accessToken, imageUrl) => {
        const formData = new FormData();
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        formData.append("image", blob);
        try {
            const response = await axios.post(api_url + "/metadata/upload-image", formData, {
                headers: {
                    Authorization: "Bearer " + accessToken,
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response?.data?.url, "res");
            if (response?.data?.url) {
                return response.data.url;
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    };



    useEffect(() => {
        if (image) {
            const fetchImageUrls = async () => {
                const updatedMembers = [...teamMembers];
                for (let i = 0; i < updatedMembers.length; i++) {
                    const imageUrl = await getMetaData(accessToken, i);
                    updatedMembers[i].imageUrl = imageUrl;
                }
                setTeamMembers(updatedMembers);
                setFormDataName({ ...formDataname, teamMembers: updatedMembers });
            };
            fetchImageUrls();
        }
    }, [image]);


    const CreateLaunchPad = async (formDataName) => {
        const featureImageUrl = localStorage.getItem('featureImageUrl');
        const launchpadData = {
            name: formDataName?.name,
            symbol: formDataname?.symbol,
            description: formDataName?.description,
            websiteUrl: formDataname?.websiteUrl,
            discordUrl: formDataName?.discordUrl,
            twitterUrl: formDataName?.twitterUrl,
            // email: formDataName?.email,
            // price: formDataName?.price,
            // totalSupply: formDataName?.totalSupply,
            teamMembers: formDataName?.teamMembers,
            imageUrl: formDataName?.imageUrl,
            featureImageUrl: featureImageUrl,

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
        console.log(launchpadData, 'ddee4');
        try {
            const response = await axios.put(`${api_url}/launchpads`, launchpadData, {
                headers: {
                    Authorization: "Bearer " + accessToken,
                    'Content-Type': 'application/json',
                },
            });
            onNext();
            // toast.success(response?.data?.message);
        } catch (error) {
            // toast.error(error?.response?.data?.message);
            toast.error(error?.response?.data?.message);
            toast.error(error?.response?.data?.details?.[0]?.twitterUrl);
        }
    };

    const handleDeleteTeamMember = () => {
        const updatedMembers = [...teamMembers];
        updatedMembers.pop(); // Remove the last member
        setTeamMembers(updatedMembers);
        setFormDataName({ ...formDataname, teamMembers: updatedMembers });
    };
    return (
        <>
            <section className='stepmain'>
                <div className="stepcontainerdetail">
                    <h4 className="stepheadcollection">Team Info</h4>
                    <p className="collectionpara">Tell us about the Launchpad.</p>

                    <div className="team-members">
                        {teamMembers.map((member, index) => (
                            <div className="team-member" key={index}>
                                <div className="profileimgmain">
                                    <h6 className="profilehead">Team Member Image (500x500px)</h6>
                                    {member.imageUrl ? (
                                        <div className="uploadimg">
                                            <img src={member.imageUrl} alt="uploadedimg" className="uploadedimg" />
                                        </div>
                                    ) : null}
                                    <input
                                        type="file"
                                        ref={(el) => (fileInputRefs.current[index] = el)}
                                        style={{ display: 'none' }}
                                        accept="image/*"
                                        onChange={(e) => handleImageChange(index, e)}
                                    />
                                    <button className="uploadbtn" onClick={() => handleButtonClick(index)}>
                                        Upload
                                    </button>
                                    <p className="uploadpara">Max file size 5MB.</p>
                                </div>
                                <div className="stepinputmain">
                                    <p className="stepinputpara">Team Member Name</p>
                                    <input
                                        type="text"
                                        className="stepinput"
                                        placeholder='Team Member Name'
                                        value={member.name || ''}
                                        onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                                    />
                                </div>
                                <div className="stepinputmain">
                                    <p className="stepinputpara">Team Member Designation</p>
                                    <input
                                        type="text"
                                        className="stepinput"
                                        placeholder='Team Member Designation'
                                        value={member.designation || ''}
                                        onChange={(e) => handleInputChange(index, 'designation', e.target.value)}
                                    />
                                </div>
                                <div className="stepinputmain">
                                    <p className="stepinputpara">Team Member Twitter</p>
                                    <input
                                        type="text"
                                        className="stepinput"
                                        placeholder='Team Member Twitter'
                                        value={member.twitterUrl || ''}
                                        onChange={(e) => handleInputChange(index, 'twitterUrl', e.target.value)}
                                    />
                                </div>

                            </div>
                        ))}
                    </div>
                    <div className="addteammembers">
                        <a onClick={handleAddTeamMember}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <path d="M13.5 9.5625H4.5C4.1925 9.5625 3.9375 9.3075 3.9375 9C3.9375 8.6925 4.1925 8.4375 4.5 8.4375H13.5C13.8075 8.4375 14.0625 8.6925 14.0625 9C14.0625 9.3075 13.8075 9.5625 13.5 9.5625Z" fill="#862FC0" />
                                <path d="M9 14.0625C8.6925 14.0625 8.4375 13.8075 8.4375 13.5V4.5C8.4375 4.1925 8.6925 3.9375 9 3.9375C9.3075 3.9375 9.5625 4.1925 9.5625 4.5V13.5C9.5625 13.8075 9.3075 14.0625 9 14.0625Z" fill="#862FC0" />
                            </svg> Add a Team Member
                        </a>
                    </div>
                    {teamMembers.length > 0 &&
                        <button
                            onClick={handleDeleteTeamMember}
                            style={{
                                padding: '10px 10px',
                                backgroundColor: 'var(--Red, #E84A4A)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '15px',
                                cursor: 'pointer',
                            }}
                        >
                            Remove
                        </button>
                    }
                    <button className="stepbtn" onClick={handleSaveAndProceed}>
                        Save & Proceed
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none" className='arrowbtn'>
                            <path d="M10.1194 12.5467C9.99276 12.5467 9.86609 12.5001 9.76609 12.4001C9.57276 12.2067 9.57276 11.8867 9.76609 11.6934L13.4594 8.00008L9.76609 4.30674C9.57276 4.11341 9.57276 3.79341 9.76609 3.60008C9.95943 3.40674 10.2794 3.40674 10.4728 3.60008L14.5194 7.64674C14.7128 7.84008 14.7128 8.16008 14.5194 8.35341L10.4728 12.4001C10.3728 12.5001 10.2461 12.5467 10.1194 12.5467Z" fill="white" />
                            <path d="M14.054 8.5H2.83398C2.56065 8.5 2.33398 8.27333 2.33398 8C2.33398 7.72667 2.56065 7.5 2.83398 7.5H14.054C14.3273 7.5 14.554 7.72667 14.554 8C14.554 8.27333 14.3273 8.5 14.054 8.5Z" fill="white" />
                        </svg>
                    </button>
                </div>
            </section>
        </>
    );
};

export default Teaminfo;