'use client'

import React, { useState, useEffect } from 'react';
import Navbar from './navbar';
import Environment from '@/utils/Enviroment';
import axios from 'axios';
import dynamic from 'next/dynamic';
import Footer from './footer';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/router';



const StepLaunchpadInfo = dynamic(() => import('./launchpadinfo'), {
    loading: () => <p>Loading...</p>,
    ssr: false,
});

const StepTeamInfo = dynamic(() => import('./teaminfo'), {
    loading: () => <p>Loading...</p>,
    ssr: false,
});

const StepMintInfo = dynamic(() => import('./mintinfo'), {
    loading: () => <p>Loading...</p>,
    ssr: false,
});

const StepEarnings = dynamic(() => import('./earnings'), {
    loading: () => <p>Loading...</p>,
    ssr: false,
});

const StepSubmit = dynamic(() => import('./submit'), {
    loading: () => <p>Loading...</p>,
    ssr: false,
});




const Createlaunchpadcollection = () => {
    const isLocalStorageAvailable = typeof localStorage !== 'undefined';

    const [currentStep, setCurrentStep] = useState(1);
    const api_url = Environment.api_url;
    const [accessToken, setAccessToken] = useState("");
    const [completedSteps, setCompletedSteps] = useState([]);
    const [justlanding, setJustLanding] = useState([]);
    const [id, setId] = useState([]);
    const [draftdata, setDraftData] = useState([]);
    const [ide, setIde] = useState('');

    const router = useRouter();
    useEffect(() => {
        const val = localStorage.getItem("accessToken");
        setAccessToken(val);
    }, []);
    const [formDataname, setFormDataName] = useState(() => {
        if (isLocalStorageAvailable) {
            const savedData = localStorage.getItem('formDataname');
            return savedData ? JSON.parse(savedData) : {
                name: "",
                symbol: "",
                description: "",
                limitedEddition: false,
                openEddition: false,
                totalSupply: "",
                // price: "",
                teamMembers: [],
                mintStartTime: "",
                mintStages: [],
                earningAddress: "",
                perWalletLimit: "",
                earning: "",
                platformFee: "",
                launchpadImage: "",
                featureImageUrl: "",
                // email: "",
                websiteUrl: "",
                discordUrl: "",
                twitterUrl: "",
                // royalties: "",
            };
        } else {
            return {
                name: "",
                symbol: "",
                description: "",
                limitedEddition: false,
                openEddition: false,
                totalSupply: "",
                // price: "",
                teamMembers: [],
                mintStartTime: "",
                mintStages: [],
                earningAddress: "",
                perWalletLimit: "",
                earning: "",
                platformFee: "",
                launchpadImage: "",
                featureImageUrl: "",
                // email: "",
                websiteUrl: "",
                discordUrl: "",
                twitterUrl: "",
                // royalties: "",
            };
        }
    });



    useEffect(() => {
        localStorage.setItem('formDataname', JSON.stringify(formDataname));
    }, [formDataname]);




    // const handleButtonClick = () => {
    //     const formDataName = JSON.parse(localStorage.getItem('formDataname'));
    //     const mintStages = formDataName?.mintStages || [];
    //     const mintStartDateTime = formDataName?.mintStartTime ? new Date(formDataName?.mintStartTime) : new Date();
    //     const mintEndDateTime = formDataName?.mintEndTime ? new Date(formDataName?.mintEndTime) : new Date();
    //     mintStartDateTime.setHours(new Date().getHours(), new Date().getMinutes(), new Date().getSeconds());
    //     const mintStartTime = mintStartDateTime.toISOString();
    //     const mintEndTime = mintEndDateTime.toISOString();
    //     const formData = {
    //         earningAddress: formDataName?.earningAddress || '',
    //         name: formDataName?.name || '',
    //         description: formDataName?.description || '',
    //         discordUrl: formDataName?.discordUrl || '',
    //         twitterUrl: formDataName?.twitterUrl || '',
    //         email: formDataName?.email || '',
    //         price: formDataName?.price || '',
    //         // totalSupply: formDataName?.totalSupply || '',
    //         imageUrl: formDataName?.imageUrl || '',
    //         mintStartTime: mintStartTime,
    //         earning: '90',
    //         platformFee: '10',
    //         teamMembers: formDataName?.teamMembers || [],
    //         mintStages: mintStages,
    //         mintEndTime: mintEndTime,
    //     };
    //     if (formDataName?.limitedEddition) {
    //         formData.limitedEddition = formDataName?.limitedEddition;
    //         formData.totalSupply = formDataName.totalSupply;
    //     }
    //     if (formDataName?.openEddition) {
    //         formData.openEddition = formDataName?.openEddition;
    //     }

    //     CreateLaunchPad(formData);
    // };
    const handleButtonClick = () => {
        const featureImageUrl = localStorage.getItem('featureImageUrl');
        const formDataName = JSON.parse(localStorage.getItem('formDataname'));
        const mintStages = formDataName?.mintStages || [];
        const mintStartTime = formDataName?.mintStartTime || new Date().toISOString();
        const mintEndTime = formDataName?.mintEndTime || new Date().toISOString();
        const formData = {
            earningAddress: formDataName?.earningAddress || '',
            name: formDataName?.name || '',
            symbol: formDataname?.symbol || '',
            description: formDataName?.description || '',
            websiteUrl: formDataname?.websiteUrl || '',
            discordUrl: formDataName?.discordUrl || '',
            twitterUrl: formDataName?.twitterUrl || '',
            // email: formDataName?.email || '',
            // price: formDataName?.price || '',
            perWalletLimit: formDataName?.perWalletLimit,
            imageUrl: formDataName?.imageUrl || '',
            featureImageUrl: featureImageUrl || '',
            mintStartTime: mintStartTime,
            earning: '90',
            platformFee: '10',
            teamMembers: formDataName?.teamMembers || [],
            mintStages: mintStages,
            mintEndTime: mintEndTime,
        };
        if (formDataName?.limitedEddition) {
            formData.limitedEddition = formDataName?.limitedEddition;
            formData.totalSupply = formDataName.totalSupply;
        }
        if (formDataName?.openEddition) {
            formData.openEddition = formDataName?.openEddition;
        }

        CreateLaunchPad(formData);
    };


    const getNft = async (accessToken, status) => {
        try {
            const config = {
                method: "get",
                url: `${api_url}/launchpads?status=${status}`,
                headers: {
                    Authorization: "Bearer " + accessToken,
                },
            };
            const response = await axios(config);
            const data = response?.data?.data;
            if (data && data.length > 0) {
                const firstItem = data[0];
                setJustLanding(data);
                setId(firstItem._id);
                console.log(firstItem._id, 'def');
            } else {
                setJustLanding([]);
                setId(null);
            }
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
            getNft(accessToken);
        }
    }, [accessToken]);


    const CreateLaunchPad = async (formData) => {
        try {
            const response = await axios.put(`${api_url}/launchpads`, formData, {
                headers: {
                    Authorization: "Bearer " + accessToken,
                    'Content-Type': 'application/json',
                },
            });
            toast.success(response?.data?.message);
            router.push("/collectiondashbord");
            localStorage.removeItem('currentStep');
            localStorage.removeItem('launchPadId');
            localStorage.removeItem('formDataname');
            getNft(accessToken)
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    };

    const handleTabClick = (step) => {
        setCurrentStep(step);
        if (isLocalStorageAvailable) {
            localStorage.setItem('currentStep', step.toString());
        }
    };
    // const handleTabClick = (step) => {
    //     if (step === currentStep || step <= completedSteps.length + 1 || (step === 2 && completedSteps.includes(1))) {
    //         setCurrentStep(step);
    //         if (isLocalStorageAvailable) {
    //             localStorage.setItem('currentStep', step.toString());
    //         }
    //     }
    // };

    const handleNextStep = () => {
        if (isLocalStorageAvailable) {
            localStorage.setItem('currentStep', (currentStep + 1).toString());
        }
        const updatedCompletedSteps = [...completedSteps, currentStep];
        setCompletedSteps(updatedCompletedSteps);
        setCurrentStep(currentStep + 1);
    };

    useEffect(() => {
        if (isLocalStorageAvailable) {
            const storedStep = localStorage.getItem('currentStep');
            if (storedStep) {
                setCurrentStep(parseInt(storedStep));
            } else {
                setCurrentStep(1);
                localStorage.setItem('currentStep', '1');
            }
        }
    }, [isLocalStorageAvailable]);

    useEffect(() => {
        var val = window.location.href;
        val = new URL(val);
        setIde(val.searchParams.get("id"));
        localStorage.setItem("currentId", val.searchParams.get("id"));
        if (ide) {
            getDraftLaunchpad()
        }
    }, [ide]);
    useEffect(() => {
        const val = localStorage.getItem("accessToken");
        setAccessToken(val);
    }, []);

    const getDraftLaunchpad = async () => {
        try {
            const config = {
                method: "get",
                url: api_url + `/launchpads/${ide}`,

                headers: {
                    Authorization: "Bearer " + accessToken,
                },
            };
            const response = await axios(config);
            setDraftData(response?.data?.data)
            console.log(response?.data?.data, 'ee333');
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                console.error("Error in getLaunchpad:", error);
                toast.error(error.response.data.message.error);
            } else {
                console.error("Error in getLaunchpad:", error);
            }
        }
    };

    const renderContent = () => {
        switch (currentStep) {
            case 1:
                return <StepLaunchpadInfo
                    onNext={handleNextStep}
                    formDataname={formDataname}
                    setFormDataName={setFormDataName}
                    draftdata={draftdata}
                />;
            case 2:
                return <StepTeamInfo
                    onNext={handleNextStep}
                    formDataname={formDataname}
                    setFormDataName={setFormDataName}
                    draftdata={draftdata}
                />;
            case 3:
                return <StepMintInfo
                    onNext={handleNextStep}
                    formDataname={formDataname}
                    setFormDataName={setFormDataName}
                    draftdata={draftdata}
                />;
            case 4:
                return <StepEarnings
                    onNext={handleNextStep}
                    formDataname={formDataname}
                    setFormDataName={setFormDataName}
                    draftdata={draftdata}
                />;
            case 5:
                return <StepSubmit
                    onNext={handleNextStep}
                    formDataname={formDataname}
                    setFormDataName={setFormDataName}
                    handleButtonClick={handleButtonClick}
                    draftdata={draftdata}
                />;
            default:
                return null;
        }
    };




    return (
        <>
            <Navbar />
            <section className='createnew'>
                <span className="bottomshade"></span>
                <div className="custom-container">
                    <div className='createparent'>
                        <div className='left'>
                            <h2>Apply for listing</h2>
                            <div className='leftcard'>
                                {/* <ul>
                                    <li><a className={currentStep == 1 ? 'active listinner' : 'listinner'}>Launchpad Info {currentStep === 2 || currentStep === 3 || currentStep === 4 || currentStep === 5 ? (
                                        <img src="\assets\tick-circle.svg" alt="img" className='ticker' />
                                    ) : null}
                                    </a></li>
                                    <li><a className={currentStep == 2 ? 'active listinner' : 'listinner'}>Team Info {currentStep === 3 || currentStep === 4 || currentStep === 5 ? (
                                        <img src="\assets\tick-circle.svg" alt="img" className='ticker' />
                                    ) : null}</a></li>
                                    <li><a className={currentStep == 3 ? 'active listinner' : 'listinner'}>Mint info {currentStep === 4 || currentStep === 5 ? (
                                        <img src="\assets\tick-circle.svg" alt="img" className='ticker' />
                                    ) : null}</a></li>
                                    <li><a className={currentStep == 4 ? 'active listinner' : 'listinner'}>Earnings {currentStep === 5 ? (
                                        <img src="\assets\tick-circle.svg" alt="img" className='ticker' />
                                    ) : null}</a></li>
                                    <li><a className={currentStep == 5 ? 'active listinner' : 'listinner'}>Submit</a></li>
                                </ul> */}
                                <ul>
                                    {['Launchpad Info', 'Team Info', 'Mint Info', 'Earnings', 'Submit'].map((tab, index) => (
                                        <li key={index}>
                                            <a
                                                className={currentStep === index + 1 ? 'active listinner' : 'listinner'}
                                                onClick={() => handleTabClick(index + 1)}

                                            >
                                                {tab}
                                                {completedSteps.includes(index + 1) ? (
                                                    <img src="\assets\tick-circle.svg" alt="img" className='ticker' />
                                                ) : null}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className='content'>{renderContent()}</div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Createlaunchpadcollection;

