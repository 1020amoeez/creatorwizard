import React, { useState, useEffect } from 'react';
import Navbar from './navbar';
import { Modal, Nav } from 'react-bootstrap';
import Footer from './footer';
import Link from 'next/link';
import Environment from '@/utils/Enviroment';
import Launchpadlistedcard from './launchpadlistedcard';
import axios from 'axios';
import moment from 'moment';
import { useWeb3React } from '@web3-react/core';
import { getCreatersContract } from '@/utils/contractHelpers';
import ContractEnvironment from '@/utils/ContractEnvironment';
import useWeb3 from '@/hooks/useWeb3';
import { ToastContainer, toast } from 'react-toastify';
import useAuth from '@/hooks/useAuth';
// import { useWeb3React } from '@web3-react/core';
import Loader from './loader';
import Loadertwo from './loadertwo';
// import { useRouter } from 'next/router';


const MyCollection = () => {
    const api_url = Environment.api_url;
    const [activeTab, setActiveTab] = useState('draft');
    const [accessToken, setAccessToken] = useState("");
    const [justlanding, setJustLanding] = useState([]);
    const [modaldata, setModalData] = useState();
    const [ipfLink, setIpflink] = useState('');
    const [loader, setLoader] = useState(false);
    const [contractAddress, setContractAddress] = useState('');
    // const [projectId, setProjectId] = useState('');
    const [id, setId] = useState([]);
    const { account } = useWeb3React();
    const [profile, setProfile] = useState([]);
    const [collection, setCollection] = useState('collection');
    const web3 = useWeb3();
    const stakingAddress = ContractEnvironment.CreaterAddress;
    console.log(stakingAddress, true, "dedf4f");
    const contract = getCreatersContract(stakingAddress, web3);
    const { login, logout } = useAuth();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);

    const [stagedata, setStageData] = useState([] || '');
    const [image, setImage] = useState([]);
    const [loadertwo, setLoadertwo] = useState(false);
    // const [stagesarray, setStagesArray] = useState([]);

    const getNft = async (accessToken, status) => {
        setLoadertwo(true)
        try {
            const config = {
                method: "get",
                url: `${api_url}/launchpads?status=${status}&type=${collection}`,
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
                console.log(data, 'geee');
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


    // const fetchWithRetry = async (url, retries = 3, timeout = 10000) => {
    //     for (let i = 0; i < retries; i++) {
    //         try {
    //             return await axios.get(url, { timeout: timeout });
    //         } catch (error) {
    //             if (i === retries - 1) throw error;
    //         }
    //     }
    // };
    const fetchWithRetry = async (url, retries = 3, timeout = 30000) => {
        for (let i = 0; i < retries; i++) {
            try {
                return await axios.get(url, { timeout: timeout });
            } catch (error) {
                if (i === retries - 1) throw error;
            }
        }
    };

    
    // const [uploadedImages, setUploadedImages] = useState(null);
    // const [totalImages, setTotalImages] = useState(null);
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

    //         // Update totalImages here
    //         setTotalImages(jsonFiles.length);

    //         for (const file of jsonFiles?.slice(0, modaldata?.totalSupply * 2)) {
    //             const jsonRes = await fetchWithRetry(file);
    //             if (jsonRes.data.image && !imageUrlsSet.has(jsonRes.data.image)) {
    //                 // Remove "ipfs://" prefix and append "https://ipfs.io/ipfs/"
    //                 const updatedImageLink = jsonRes.data.image.replace("ipfs://", "https://ipfs.io/ipfs/");
    //                 // Add the updated image link to the set
    //                 imageUrlsSet.add(updatedImageLink);
    //             }

    //             // Update uploadedImages here
    //             setUploadedImages(imageUrlsSet.size);
    //         }
    //         const successfulImages = Array.from(imageUrlsSet);
    //         //         // setImages(successfulImages);
    //         //         console.log(successfulImages, 'success');
    //         return successfulImages;
    //         // Rest of the code...
    //     } catch (error) {
    //         console.error('Error fetching images:', error);
    //     }
    // };
    const [uploadedImages, setUploadedImages] = useState(0);
    const [totalImages, setTotalImages] = useState(null);

    const fetchImages = async (ipfsLink) => {
        try {
            const response =  await axios.get(ipfsLink);
            const parser = new DOMParser();
            const htmlDocument = parser.parseFromString(response.data, 'text/html');
            const links = htmlDocument.getElementsByTagName('a');
            const jsonFiles = Array.from(links)
                .map(link => 'https://ipfs.io' + link.getAttribute('href'))
                .filter(href => href.endsWith('.json') && !href.includes('_metadata.json'));
            const imageUrlsSet = [];

            console.log(jsonFiles, jsonFiles.length, 'jsonnn');
            // setTotalImages(jsonFiles.length);
            if (jsonFiles?.length / 2 !== modaldata?.totalSpply) {
                if (jsonFiles?.length / 2  <= modaldata?.totalSpply) {
                    toast.error(`The number of IPFS images is less than the total supply (${modaldata?.totalSupply})`);
                    setLoader(false);
                    return false;
                }
            }
            for (const file of jsonFiles?.slice(0, parseInt(modaldata?.totalSupply * 2))) {
                let jsonRes;
                if (file.includes('?filename=')) {
                    // If the URL includes a filename, skip fetchWithRetry and directly add the file to the set
                    // imageUrlsSet.add(file);
                } else {
                    // If the URL doesn't include a filename, use fetchWithRetry to fetch the file
                    jsonRes = await fetchWithRetry(file);
                    // if (jsonRes.data.image && !imageUrlsSet.has(jsonRes.data.image)) {
                    if (jsonRes.data.image) {
                        // Remove "ipfs://" prefix and append "https://ipfs.io/ipfs/"
                        const updatedImageLink = jsonRes.data.image.replace("ipfs://", "https://ipfs.io/ipfs/");
                        // Add the updated image link to the set
                        imageUrlsSet.push(updatedImageLink);
                        // Update uploadedImages only when an image is successfully processed
                        setUploadedImages(prevUploadedImages => prevUploadedImages + 1);
                    }
                }
            }
            const successfulImages = imageUrlsSet;
            console.log(successfulImages, 'dasdfasdffasdf');
            return successfulImages;
            // Rest of the code...
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    const ProjectContractCollection = async (name, symbol, ipfLink, totalSupply) => {
        const val = localStorage.getItem("accessToken");
        console.log(ipfLink, "dwde");
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
            // let weiAmounttwo = web3.utils.toWei(totalSupply.toString(), "ether")
            var gasFunPrice;
            web3.eth.getGasPrice().then((result) => {
                var result2 = parseInt(result) + 3000000000
                gasFunPrice = result2.toString()
            })
            setLoader(true);

            // let res = await fetchImages(`https://ipfs.io/ipfs/${ipfLink}`, modaldata?.totalSupply);
            let res = await fetchImages(ipfLink, modaldata?.totalSupply);
            if (res?.length === 0) {
                toast.info(`Please Retry`);
                setLoader(false);
                return
            }
            if(!res){
                return ;
            }
        
        
            const gas = await contract.methods.deployCollection(name, symbol, ipfLink, totalSupply)
                .estimateGas({ from: account });
            const staked = await contract.methods.deployCollection(name, symbol, ipfLink, totalSupply)
                .send({ from: account, gas, gasPrice: gasFunPrice });
            // console.log(staked, staked?.events?.newCollectionDeployed?.returnValues?.ERC721Deployed, 'stakedd');
            const contractAddress = staked?.events?.newCollectionDeployed?.returnValues?.ERC721Deployed;
            console.log(contractAddress, 'dededeuu');
            setContractAddress(contractAddress);
            await getCollection(modaldata?._id, contractAddress);
            await getIpfsCollection(modaldata?._id, account, res)
            setLoader(false);
            handleClose()
            return res;
        } catch (error) {
            console.error('Error in ProjectContract:', error);
            setLoader(false);
            throw error;
        }
    };




    const getCollection = async (id, contractAddress) => {
        try {
            // console.log(contractAddress, projectId, 'koko');

            const launchpadData = {
                contractAddress: contractAddress,
                ipfsHash: ipfLink,
            };
            const config = {
                method: "patch",
                url: api_url + `/launchpads/${id}/collection`,
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

    const getIpfsCollection = async (id, account, res) => {
        try {
            const launchpadData = {
                files: res?.slice(0, modaldata?.totalSupply),
                walletAddress: account,
            };
            const config = {
                method: "post",
                url: api_url + `/launchpads/${id}/collection-items`,
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

    return (
        <>
            <Navbar setProfile={setProfile} profile={profile} />


            {loader && (
                <>
                    <Loader
                        uploadedImages={uploadedImages}
                        totalImages={modaldata?.totalSupply}
                        modaldata={modaldata}
                        text="Please wait..." />
                </>
            )}

            <section className="maincollectiondash">
                <div className="custom-container">
                    <div className='row'>
                        <div className='col-xl-12 col-12 m-auto padd-sm'>
                            <h3>My Collections</h3>
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
                                        {/* <Nav.Item>
                                            <Nav.Link eventKey="listed" onSelect={() => getNft(accessToken, 'listed')}>
                                                Listed
                                            </Nav.Link>
                                        </Nav.Item> */}
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
                                    <Link href="/createnewcollections">
                                        <button>Create New Collection</button>
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
                                                        <>
                                                            <Link onClick={HandleRemoveStorage} href={`/createnewcollections?id=${accessToken, item?._id}`}>
                                                                <div className='maincard' key={index}>
                                                                    <div className='mainimg'>
                                                                        <img src={item?.imageUrl} alt='img' className='img-fluid imgmain' />
                                                                    </div>
                                                                    <div className='cardtext'>
                                                                        <h6>{item?.name}</h6>
                                                                        <p>Submitted: {moment(item?.createdAt).format('YYYY-MM-DD')}</p>
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        </>
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
                                                            } className='btn-mint'>Deploy Collection</a>
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
                            {/* {activeTab === 'listed' && (
                                <>
                                    <Launchpadlistedcard
                                        justlanding={justlanding}
                                        ListedDetails={ListedDetails}
                                        stagedata={stagedata}
                                    />
                                </>
                            )} */}
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
                        <div className="twice-itemssss">
                            <label>IPF Link</label>
                            <a onClick={() => {
                                handleClose();
                                handleShow1();
                            }} className='btn-guide'>Guide</a>
                        </div>
                        <input value={ipfLink}
                            onChange={(e) => setIpflink(e.target.value)} type="email" placeholder='Enter your media link' />
                        <p className="note-text">Note: Valid IPF Link Format <br />e.g. https://gateway.pinata.cloud/ipfs/QmcmUUkBLycE9J9bG9g8FSu3ASB9SeqmArjoe5z4A57Dku</p>
                    </div>

                    {/* <button onClick={() => connectWallet('5')} style={{ maxWidth: "100%" }} className="stepbtn bluebtn">
                        {account ? "Disconnect" : "Connect Wallet"}   </button> */}

                    {account ? (
                        <button onClick={disconnectWallet} style={{ maxWidth: "100%" }} className="stepbtn bluebtn">
                            Disconnect Wallet
                        </button>
                    ) : (
                        <button onClick={() => connectWallet('1116')} style={{ maxWidth: "100%" }} className="stepbtn bluebtn">
                            Connect Wallet
                        </button>
                    )}


                    <button style={{ maxWidth: "100%", marginTop: "18px" }} className={`stepbtn ${account ? 'bluebtn' : 'opacitylowifdisable bluebtn'}`} onClick={() => {
                        handleShow(); ProjectContractCollection(
                            modaldata?.name,
                            modaldata?.symbol,
                            ipfLink,
                            modaldata?.totalSupply,
                        );
                    }}>
                        List Collection
                    </button>
                </Modal.Body>
            </Modal>

            <Modal className='buymodal guideline-modal' show={show1} onHide={handleClose1} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Launch Collection Guideline</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="guide-text">
                        <div>
                            <h2>Follow these steps in order to generate the IPFS hash for multiple images</h2>
                            <ol>
                                <li>Create a folder and paste all your images into it.</li>
                                <li>Ensure that the images are named like 1.png, 2.png, 3.png, and so on up to 100.png.</li>
                                <li>Now, go to the Pinata website and create an account. After that, click on the "Upload" button at the top right corner, then select "Folder" and upload your images folder.</li>
                                <li>After uploading, navigate to your uploaded folder on Pinata and copy the entire URL. The URL should look like: <code>https://pinata/.../</code>. This URL will be used to fetch your images.</li>
                                <li>Save this URL (<code>https://pinata/.../</code>) and create another folder. In this folder, create JSON files for all your 100 images. Each JSON file should be named like 1.json, 2.json, 3.json, similar to how you named your images.</li>
                                <li>In each JSON file, include the following structure, replacing the image URL with the actual URL of your images:</li>
                                <pre>
                                    {`
          {
            "name": "Wizard NFTs",
            "image": "https://aqua-familiar-marmot-952.mypinata.cloud/ipfs/QmcmUUkBLycE9J9bG9g8FSu3ASB9SeqmArjoe5z4A57Dku/1.png"
          }
          `}
                                </pre>
                                <li>In each JSON file, update the image URL to include the specific image name and extension. For example, for the first image, the URL should be <code>https://pinata/.../1.png</code>.</li>
                                <li>Once you've updated all JSON files, return to Pinata, click on the "Upload" button again, select "Folder", and upload your JSON folder.</li>
                                <li>After uploading, open your uploaded folder and copy the entire URL. This URL will be added in the smart contract, and it should look like: <code>https://pinata/.../</code>.</li>
                                <li>Provide this URL when deploying your collection, and the contract will automatically add the image names and extensions for each JSON file.</li>
                            </ol>
                        </div>
                    </div>


                    <button onClick={() => {
                        handleClose1();
                        handleShow();
                    }} style={{ maxWidth: "100%", marginTop: "18px" }} className="bluebtn">
                        Back to IPF Link
                    </button>
                </Modal.Body>
            </Modal>

        </>
    )
}

export default MyCollection;
