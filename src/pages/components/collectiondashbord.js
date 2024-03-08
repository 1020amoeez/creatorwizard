import React, { useState, useEffect } from 'react';
import Navbar from './navbar';
import { Modal, Nav } from 'react-bootstrap';
import Footer from './footer';
import Link from 'next/link';
import Environment from '@/utils/Enviroment';
import Launchpadlistedcard from './launchpadlistedcard';
import Completedcard from './completedcard';
import axios from 'axios';
import moment from 'moment';
import { useWeb3React } from '@web3-react/core';
import { getCreatersContract } from '@/utils/contractHelpers';
import { getMarketContract } from '@/utils/contractHelpers';
import ContractEnvironment from '@/utils/ContractEnvironment';
import useWeb3 from '@/hooks/useWeb3';
import { ToastContainer, toast } from 'react-toastify';
import useAuth from '@/hooks/useAuth';
// import { useWeb3React } from '@web3-react/core';
import Loader from './loader';
import Loadertwo from './loadertwo';
// import { useRouter } from 'next/router';


const Collectiondashbord = () => {
    const api_url = Environment.api_url;
    const [activeTab, setActiveTab] = useState('draft');
    const [accessToken, setAccessToken] = useState("");
    const [justlanding, setJustLanding] = useState([]);
    const [modaldata, setModalData] = useState();
    const [ipfLink, setIpflink] = useState('');
    const [loader, setLoader] = useState(false);
    const [loadertwo, setLoadertwo] = useState(false);
    const [contractAddress, setContractAddress] = useState('');
    const [projectId, setProjectId] = useState('');
    const [id, setId] = useState([]);
    const { account } = useWeb3React();
    const [profile, setProfile] = useState([]);
    const web3 = useWeb3();
    const stakingAddress = ContractEnvironment.CreaterAddress;
    const stakingAddress2 = ContractEnvironment.MarketAddress;
    // console.log(stakingAddress, true, "dedf4f");
    const contract = getCreatersContract(stakingAddress, web3);
    const contract2 = getMarketContract(stakingAddress2, web3);
    const { login, logout } = useAuth();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [stagedata, setStageData] = useState([] || '');
    const [image, setImage] = useState([]);
    const [royaliy, setRoyality] = useState('');
    // const [stagesarray, setStagesArray] = useState([]);

    const getNft = async (accessToken, status) => {
        setLoadertwo(true)
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
                setLoadertwo(false)

                // setStagesArray(data?.mintStages)
                // console.log(data, 'geee');
                // console.log(data[0]?.mintStages, 'def');
            } else {
                setJustLanding([]);
                setId(null);
                setLoadertwo(false)
            }
        } catch (error) {
            console.error("API Request Error:", error);
            setLoadertwo(false)
        }
    };
    const ListedDetails = async (id, accessToken) => {
        try {
            const config = {
                method: "get",
                url: `${api_url}/launchpads/${id}`,
                headers: {
                    Authorization: "Bearer " + accessToken,
                },
            };
            const response = await axios(config);
            setStageData(response?.data?.data);
            console.log("details", response?.data?.data);
        } catch (error) {
            if (error?.response?.status === 501 || error?.response?.status === 401) {
                // localStorage.removeItem("accessToken");
                console.log("refresh token: ", error?.response);
            }
            console.log("error meessage: ", error?.response?.data?.message);
            toast.error(error?.response?.data?.message, {
                position: "top-right",
                autoClose: 2000,
            });
        }
    };

    useEffect(() => {
        const val = localStorage.getItem("accessToken");
        setAccessToken(val);
    }, []);

    useEffect(() => {
        if (accessToken) {
            getNft(accessToken, activeTab);
        }
    }, [accessToken, activeTab]);

    const handleSelect = (selectedTab) => {
        setActiveTab(selectedTab);
    };


    const fetchWithRetry = async (url, retries = 3, timeout = 10000) => {
        for (let i = 0; i < retries; i++) {
            try {
                return await axios.get(url, { timeout: timeout });
            } catch (error) {
                if (i === retries - 1) throw error;
            }
        }
    };
  
    // const fetchImages = async (ipfsLink) => {
    //     try {
    //         const response = await fetchWithRetry(ipfsLink);
    //         const parser = new DOMParser();
    //         const htmlDocument = parser.parseFromString(response.data, 'text/html');
    //         const links = htmlDocument.getElementsByTagName('a');
    //         const jsonFiles = Array.from(links)
    //             .map(link => 'https://ipfs.io' + link.getAttribute('href'))
    //             .filter(href => href.endsWith('.json') && !href.includes('_metadata.json'));
    //         const imageUrlsSet = new Set();
    //         for (const file of jsonFiles?.slice(0, modaldata?.totalSupply * 2)) { //if it cause issue remove  ?.slice(0, modaldata?.totalSupply * 2)
    //             const jsonRes = await fetchWithRetry(file);
    //             if (jsonRes.data.image && !imageUrlsSet.has(jsonRes.data.image)) {
    //                 imageUrlsSet.add(jsonRes.data.image);
    //             }
    //         }

    //         const successfulImages = Array.from(imageUrlsSet);
    //         // setImages(successfulImages);
    //         console.log(successfulImages, 'success');
    //         return successfulImages;

    //     } catch (error) {
    //         console.error('Error fetching images:', error);
    //     }
    // };
    const fetchImages = async (ipfsLink) => {
        try {
            const response = await fetchWithRetry(ipfsLink);
            const parser = new DOMParser();
            const htmlDocument = parser.parseFromString(response.data, 'text/html');
            const links = htmlDocument.getElementsByTagName('a');
            const jsonFiles = Array.from(links)
                .map(link => 'https://ipfs.io' + link.getAttribute('href'))
                .filter(href => href.endsWith('.json') && !href.includes('_metadata.json'));
            const imageUrlsSet = new Set();
            // console.log(jsonFiles,'jsonFiles');
            //this for loop is for .png images 
            // for (const file of jsonFiles?.slice(0, modaldata?.totalSupply * 2)) { //if it cause issue remove  ?.slice(0, modaldata?.totalSupply * 2)
            //     const jsonRes = await fetchWithRetry(file);
            //     if (jsonRes.data.image && !imageUrlsSet.has(jsonRes.data.image)) {
            //         imageUrlsSet.add(jsonRes.data.image);
            //     }
            // }
            for (const file of jsonFiles?.slice(0, modaldata?.totalSupply * 2)) {
                const jsonRes = await fetchWithRetry(file);
                if (jsonRes.data.image && !imageUrlsSet.has(jsonRes.data.image)) {
                    // Remove "ipfs://" prefix and append "https://ipfs.io/ipfs/"
                    const updatedImageLink = jsonRes.data.image.replace("ipfs://", "https://ipfs.io/ipfs/");
                    // Add the updated image link to the set
                    imageUrlsSet.add(updatedImageLink);
                }
            }
            
            const successfulImages = Array.from(imageUrlsSet);
            // setImages(successfulImages);
            console.log(successfulImages, 'success');
            return successfulImages;

        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    const transformStages = (mintStages, mintStartTime) => {
        return mintStages.map((stage, index) => {
            let startTime = index === 0 ? new Date(mintStartTime).getTime() / 1000 : new Date(mintStages[index - 1].mintStageTime).getTime() / 1000;
            let endTime = new Date(stage.mintStageTime).getTime() / 1000;
            let price = web3.utils.toWei(stage.price, 'ether');
            let whiteList = false;

            return [startTime, endTime, price, whiteList];
        });
    };
    console.log(modaldata);

    const ProjectContract = async (name, symbol, ipfLink, mintStages, totalSupply, perWalletLimit, LimitedEddition, mintStartTime) => {
        const val = localStorage.getItem("accessToken");

        if (!account) {
            toast.error("Please connect Metamask to continue");
            return;
        }
        if (!val) {
            toast.error("Please login First");
            return;
        }
        if (!ipfLink) {
            toast.error("Please enter an IPFS link");
            return;
        }
        try {
            // let weiAmount = web3.utils.toWei(price.toString(), "ether")
            // let weiAmounttwo = web3.utils.toWei(totalSupply.toString(), "ether")
            var gasFunPrice;
            web3.eth.getGasPrice().then((result) => {
                var result2 = parseInt(result) + 3000000000
                gasFunPrice = result2.toString()
            })
            setLoader(true);

            // let res = await fetchImages(`https://ipfs.io/ipfs/${ipfLink}`);
            // if (res.length < modaldata?.totalSupply) {
            //     toast.error(`Your Ipfs images must be equal to ${modaldata?.totalSupply}`)
            //     setLoader(false);
            //     return
            // }
            let res = await fetchImages(`https://ipfs.io/ipfs/${ipfLink}`, modaldata?.totalSupply);
            if (res?.length === 0) {
                    toast.warning(`Hash is not valid!`);
                    setLoader(false);
                    return
            }
            if (res?.length !== modaldata?.totalSupply) {
                if (res?.length < modaldata?.totalSupply) {
                    toast.error(`The number of IPFS images is less than the total supply (${modaldata?.totalSupply})`);
                    setLoader(false);
                    return
                } 
                setLoader(false);
                return;
            }
            let stagesData = transformStages(mintStages, mintStartTime);

          
            // console.log(name, 'symbol', mintStartTime, ipfLink, stagesData, weiAmounttwo, LimitedEddition, 'newwww');
            const gas = await contract.methods.createProject(name, 'symbol', ipfLink, stagesData, totalSupply, perWalletLimit, LimitedEddition)
                .estimateGas({ from: account });
            const staked = await contract.methods.createProject(name, 'symbol', ipfLink, stagesData, totalSupply, perWalletLimit, LimitedEddition)
                .send({ from: account, gas, gasPrice: gasFunPrice });

            const contractAddress = staked?.events?.ProjectCreated?.returnValues?.erc721Contract;
            let projectId = staked?.events?.ProjectCreated?.returnValues?.projectId || "";
            setContractAddress(contractAddress);
            setProjectId(projectId);
            await getLaunchpad(modaldata?._id, contractAddress, projectId);
            await getIpfsLaunchpad(modaldata?._id, account, res)
            setLoader(false);
            handleClose()
            return res;
        } catch (error) {
            console.error('Error in ProjectContract:', error);
            setLoader(false);
            throw error;
        }
    };




    const getLaunchpad = async (id, contractAddress, projectId) => {
        try {
            console.log(contractAddress, projectId, 'koko');
            const projectIdString = projectId.toString();
            const launchpadData = {
                contractAddress: contractAddress,
                ipfsHash: ipfLink,
                projectId: projectIdString,
            };
            const config = {
                method: "patch",
                url: api_url + `/launchpads/${id}`,
                data: launchpadData,
                headers: {
                    Authorization: "Bearer " + accessToken,
                },
            };

            await axios(config);
            // onNext();
            toast.success("Collection Created Succesfully")
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                console.error("Error in getLaunchpad:", error);
                toast.error(error.response.data.message.error);
            } else {
                console.error("Error in getLaunchpad:", error);
            }
        }

    };

    const getIpfsLaunchpad = async (id, account, res) => {
        try {
            const launchpadData = {
                files: res?.slice(0, modaldata?.totalSupply),
                walletAddress: account,
            };
            const config = {
                method: "post",
                url: api_url + `/launchpads/${id}/items`,
                data: launchpadData,
                headers: {
                    Authorization: "Bearer " + accessToken,
                },
            };

            await axios(config);
            // onNext();
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                console.error("Error in getLaunchpad:", error);
                toast.error(error.response.data.message.error);
            } else {
                console.error("Error in getLaunchpad:", error);
            }
        }

    };
    // console.log(modaldata?.projectId, "swdwde");
    const FinalizeContract = async (projectId, id) => {
        const val = localStorage.getItem("accessToken");
        if (!account) {
            toast.error("Please connect Metamask to continue");
            return;
        }
        if (!val) {
            toast.error("Please login First");
            return;
        }

        try {
            var gasFunPrice;
            web3.eth.getGasPrice().then((result) => {
                var result2 = parseInt(result) + 3000000000
                gasFunPrice = result2.toString()
            })
            setLoader(true);
            // const projectId = modaldata && modaldata.projectId ? Number(modaldata.projectId) : 0;
            // console.log(id, 'project');
            const gas = await contract.methods.FinalizeSale(projectId)
                .estimateGas({ from: account });
            const staked = await contract.methods.FinalizeSale(projectId)
                .send({ from: account, gas, gasPrice: gasFunPrice });
            setLoader(false);
            getFinallizeLaunchpad(id)
            getNft(accessToken, activeTab);
            return staked;
        } catch (error) {
            console.error('Error in FinalizeContract:', error);
            setLoader(false);
            throw error;
        }
    };


    const getFinallizeLaunchpad = async (id) => {
        try {

            const config = {
                method: "patch",
                url: api_url + `/launchpads/${id}/status`,
                // data: launchpadData,
                headers: {
                    Authorization: "Bearer " + accessToken,
                },
            };

            await axios(config);
            toast.success("Collection Finalized Successfully")
            // onNext();
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                console.error("Error in getLaunchpad:", error);
                toast.error(error.response.data.message.error);
            } else {
                console.error("Error in getLaunchpad:", error);
            }
        }
    };

    const disconnectWallet = async () => {
        const connectorId = window.localStorage.getItem("connectorId")
        logout(connectorId)
        localStorage.removeItem('connectorId')
        localStorage.removeItem('flag')
        localStorage.removeItem('chain')
        // localStorage.removeItem('accessToken')
    };

    const connectWallet = async (e) => {
        if (account) {
            const connectorId = window.localStorage.getItem("connectorId");
            await logout(connectorId);
            localStorage.removeItem("connectorId");
            localStorage.removeItem("flag");
        } else {
            await login("injected", e);
            localStorage.setItem("connectorId", "injected");
            localStorage.setItem("flag", "true");
            localStorage.setItem("chain", e);
        }
    };
    useEffect(() => {
        const val = localStorage.getItem("accessToken");
        setAccessToken(val);
    }, []);

    const HandleRemoveStorage = () => {
        localStorage.removeItem("formDataname")
    }


    const GetRoyality = async (contractAddress) => {
        console.log(contractAddress, royaliy, 'royal');
        const val = localStorage.getItem("accessToken");
        if (!royaliy) {
            toast.error('Please enter royalties before sending.');
            return;
        }

        if (!account) {
            toast.error("Please connect Metamask to continue");
            return;
        }
        if (!val) {
            toast.error("Please login First");
            return;
        }
        try {
            // let weiAmount = web3.utils.toWei(price.toString(), "ether")
            // let weiAmounttwo = web3.utils.toWei(totalSupply.toString(), "ether")
            var gasFunPrice;
            web3.eth.getGasPrice().then((result) => {
                var result2 = parseInt(result) + 3000000000
                gasFunPrice = result2.toString()
            })
            setLoader(true);
            // console.log(name, 'symbol', mintStartTime, ipfLink, stagesData, weiAmounttwo, LimitedEddition, 'newwww');
            const gas = await contract2.methods.setCollectionRoyalty(contractAddress, royaliy)
                .estimateGas({ from: account });
            const staked = await contract2.methods.setCollectionRoyalty(contractAddress, royaliy)
                .send({ from: account, gas, gasPrice: gasFunPrice });
            setLoader(false);
            handleClose()
            return staked;
        } catch (error) {
            console.error('Error in ProjectContract:', error);
            setLoader(false);
            throw error;
        }
    };

    return (
        <>
            <Navbar setProfile={setProfile} profile={profile} />


            {loader && (
                <>
                    <Loader text="Please wait..." />
                </>
            )}
          

            <section className="maincollectiondash">
                <div className="custom-container">
                    <div className='row'>
                        <div className='col-xl-12 col-12 m-auto padd-sm'>
                            <h3>My launchpads</h3>
                            <div className='collectionparent'>
                                <div className='mainssss'>
                                    <Nav variant="pills" activeKey={activeTab} onSelect={handleSelect}>
                                        <Nav.Item>
                                            <Nav.Link eventKey="draft" onSelect={() => getNft(accessToken, 'draft')}>
                                                Drafts
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="submitted" onSelect={() => getNft(accessToken, 'submitted')}>
                                                Submissions
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="approved" onSelect={() => getNft(accessToken, 'approved')}>
                                                Approved
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="listed" onSelect={() => getNft(accessToken, 'listed')}>
                                                Listed
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="rejected" onSelect={() => getNft(accessToken, 'rejected')}>
                                                Rejected
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="completed" onSelect={() => getNft(accessToken, 'completed')}>
                                                Completed
                                            </Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </div>
                                <div className='mainbtns'>
                                    {/* <Link href="/setupwhitelist"> <button>Create a whitelist</button></Link> */}
                                    <Link href="/createlaunchpadcollection">
                                        <button onClick={HandleRemoveStorage} >Apply for launchpad</button>
                                    </Link>
                                </div>
                            </div>
                            {loadertwo ? (
                                <Loadertwo />
                            ) : (
                                <>
                                    {activeTab === 'draft' && (
                                        <>
                                            <div className='mainhead'>
                                                {/* <p>These are your unsubmitted applications - only you can see these. You can return and update these at any time.
                    </p> */}
                                            </div>
                                            <div className='parentcard'>
                                                {justlanding.length > 0 ? (
                                                    justlanding.map((item, index) => (
                                                        <Link onClick={HandleRemoveStorage} href={`/createlaunchpadcollection?id=${accessToken, item?._id}`} key={index}>
                                                            <div className='maincard'>
                                                                <div className='mainimg'>
                                                                    <img src={item?.imageUrl} alt='img' className='img-fluid imgmain' />
                                                                </div>
                                                                <div className='cardtext'>
                                                                    <h6>{item?.name}</h6>
                                                                    <p>Submitted: {moment(item?.createdAt).format('YYYY-MM-DD')}</p>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    ))
                                                ) : (
                                                    <p className='text-white'>No data found</p>
                                                )}
                                            </div>
                                        </>
                                    )}
                                </>
                            )}
                            {loadertwo ? (
                                <Loadertwo />
                            ) : (
                                <>
                                    {activeTab === 'submitted' && (
                                        <>
                                            <div className='mainhead'>
                                                {/* <p>These are your unsubmitted applications - only you can see these. You can return and update these at any time.
                                        </p> */}
                                            </div>
                                            <div className='parentcard'>
                                                {justlanding.length > 0 ? (
                                                    justlanding.map((item, index) => (
                                                        <div className='maincard' key={index}>
                                                            <div className='mainimg'>
                                                                <img src={item?.imageUrl} alt='img' className='img-fluid imgmain' />
                                                            </div>
                                                            <div className='cardtext'>
                                                                <h6>{item?.name}</h6>
                                                                <p>Submitted: {moment(item?.createdAt).format('YYYY-MM-DD')}</p>
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p className='text-white'>No data found</p>
                                                )}
                                            </div>
                                        </>
                                    )}
                                </>
                            )}
                            {loadertwo ? (
                                <Loadertwo />
                            ) : (
                                <>
                                    {activeTab === 'approved' && (
                                        <>
                                            <div className='mainhead'>
                                            </div>
                                            <div className='parentcard parentcardapproved'>
                                                {justlanding.length > 0 ? (
                                                    justlanding.map((item, index) => (
                                                        <div className='maincard' key={index}>
                                                            <div className='mainimg'>
                                                                <img src={item?.imageUrl} alt='img' className='img-fluid imgmain' />
                                                            </div>
                                                            <div className='cardtext'>
                                                                <h6>{item?.name}</h6>
                                                            </div>
                                                            <a onClick={() => {
                                                                handleShow();
                                                                setModalData(item)
                                                                // ProjectContract(item?.name, 'symbol', item?.imageUrl, item?.price, item?.totalSupply, item?.limitedEddition)
                                                            }
                                                            } className='btn-mint'>Finalize and List</a>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p className='text-white'>No data found</p>
                                                )}
                                            </div>
                                        </>
                                    )}
                                </>
                            )}
                            {loadertwo ? (
                                <Loadertwo />
                            ) : (
                                <>
                                    {activeTab === 'listed' && (
                                        <>
                                            <Launchpadlistedcard
                                                justlanding={justlanding}
                                                ListedDetails={ListedDetails}
                                                stagedata={stagedata}
                                                GetRoyality={GetRoyality}
                                                royaliy={royaliy}
                                                setRoyality={setRoyality}
                                                FinalizeContract={FinalizeContract}
                                            />
                                        </>
                                    )}
                                </>
                            )}
                            {loadertwo ? (
                                <Loadertwo />
                            ) : (
                                <>
                                    {activeTab === 'rejected' && (
                                        <>
                                            <div className='mainhead'>
                                                {/* <p>These are your unsubmitted applications - only you can see these. You can return and update these at any time.
                                        </p> */}
                                            </div>
                                            {justlanding.length > 0 ? (
                                                justlanding.map((item, index) => (
                                                    <div className='parentcard' key={index}>
                                                        <div className='maincard'>
                                                            <div className='mainimg'>
                                                                <img src={item?.imageUrl} alt='img' className='img-fluid imgmain' />
                                                            </div>
                                                            <div className='cardtext'>
                                                                <h6>{item?.name}</h6>
                                                                <p>Submitted: {moment(item?.createdAt).format('YYYY-MM-DD')}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className='text-white'>No data found</p>
                                            )}
                                        </>
                                    )}
                                </>
                            )}
                            {loadertwo ? (
                                <Loadertwo />
                            ) : (
                                <>
                                    {activeTab === 'completed' && (
                                        <>
                                            <Completedcard
                                                justlanding={justlanding}
                                                ListedDetails={ListedDetails}
                                                stagedata={stagedata}
                                            />
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section >
            <Footer />


            <Modal className='buymodal' show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Launch Collection</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="option-field">
                        <label>IPF Link</label>
                        <input value={ipfLink}
                            onChange={(e) => setIpflink(e.target.value)} type="email" placeholder='Enter your media link' />
                    </div>
                    {/* <button onClick={() => connectWallet('5')} style={{ maxWidth: "100%" }} className="stepbtn bluebtn">
                        {account ? "Disconnect" : "Connect Wallet"}   </button> */}

                    {account ? (
                        <button onClick={disconnectWallet} style={{ maxWidth: "100%" }} className="stepbtn bluebtn">
                            Disconnect Wallet
                        </button>
                    ) : (
                        <button onClick={() => connectWallet('1115')} style={{ maxWidth: "100%" }} className="stepbtn bluebtn">
                            Connect Wallet
                        </button>
                    )}


                    <button style={{ maxWidth: "100%", marginTop: "18px" }} className={`stepbtn ${account ? 'bluebtn' : 'opacitylowifdisable bluebtn'}`} onClick={() => {
                        handleShow(); ProjectContract(
                            modaldata?.name,
                            'symbol',
                            ipfLink,
                            modaldata?.mintStages,
                            modaldata?.totalSupply,
                            modaldata?.perWalletLimit,
                            modaldata?.limitedEddition,
                            modaldata?.mintStartTime
                        );
                    }}>
                        List Launchpad
                    </button>
                    {/* <p className='text-white'> {modaldata?.[1]?.mintStages?.[0]?.perWalletMintLimit}</p> */}
                </Modal.Body>
            </Modal >

        </>
    )
}

export default Collectiondashbord;
