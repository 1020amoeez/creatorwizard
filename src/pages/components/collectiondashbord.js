import React, { useState, useEffect, useRef } from "react";
import Navbar from "./navbar";
import { Modal, Nav } from "react-bootstrap";
import Footer from "./footer";
import Link from "next/link";
import Environment from "@/utils/Enviroment";
import Launchpadlistedcard from "./launchpadlistedcard";
import Completedcard from "./completedcard";
import axios from "axios";
import moment from "moment";
import { useWeb3React } from "@web3-react/core";
import { getCreatersContract } from "@/utils/contractHelpers";
import { getMarketContract } from "@/utils/contractHelpers";
import ContractEnvironment from "@/utils/ContractEnvironment";
import useWeb3 from "@/hooks/useWeb3";
import { ToastContainer, toast } from "react-toastify";
import useAuth from "@/hooks/useAuth";
// import { useWeb3React } from '@web3-react/core';
import Loader from "./loader";
import Loadertwo from "./loadertwo";
// import { useRouter } from 'next/router';
import { NFTStorage, File } from "nft.storage";
import mime from "mime";
// import { create as ipfsHttpClient } from 'ipfs-http-client'
// import fs from 'fs';
// import path from 'path';
import { create } from "ipfs-http-client";
import { IpfsStorage2 } from "./ipfs";

const Collectiondashbord = () => {
  const api_url = Environment.api_url;
  const [activeTab, setActiveTab] = useState("draft");
  const [accessToken, setAccessToken] = useState("");
  const [justlanding, setJustLanding] = useState([]);
  const [modaldata, setModalData] = useState();
  const [ipfLink, setIpflink] = useState("");
  const [loader, setLoader] = useState(false);
  const [loadertwo, setLoadertwo] = useState(false);
  const [loaderthree, setLoaderthree] = useState(false);
  const [contractAddress, setContractAddress] = useState("");
  const [projectId, setProjectId] = useState("");
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
  const [stagedata, setStageData] = useState([] || "");
  const [image, setImage] = useState([]);
  const [royaliy, setRoyality] = useState("");
  // const [stagesarray, setStagesArray] = useState([]);
  // const fileInputRef = useRef(null);
  const fileInputRef = React.createRef();
  const fileInputRef2 = React.createRef();
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const getNft = async (accessToken, status) => {
    setLoadertwo(true);
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
        setLoadertwo(false);

        // setStagesArray(data?.mintStages)
        // console.log(data, 'geee');
        // console.log(data[0]?.mintStages, 'def');
      } else {
        setJustLanding([]);
        setId(null);
        setLoadertwo(false);
      }
    } catch (error) {
      console.error("API Request Error:", error);
      setLoadertwo(false);
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
      setStageData(response?.data?.data?.[0]);
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

  const fetchWithRetry = async (url, retries = 3, timeout = 30000) => {
    console.log("fetchWithRetry", url);
    for (let i = 0; i < retries; i++) {
      try {
        return await axios.get(url, { timeout: timeout });
      } catch (error) {
        if (i === retries - 1) throw error;
      }
    }
  };

  const [imagesUploaded, setImagesUploaded] = useState(false);
  const [metadataUploaded, setMetadataUploaded] = useState(false);
  const apikey = "abe309bc89d182c2dd16";
  const secretapikey =
    "9bbd417897c320cd04e5894acd00762adee32e6e72dfd393dec2f061df895c6c";
  const [selectedFile, setSelectedFile] = useState();

  const [fileHashes, setFileHashes] = useState([]);
  const changeHandler = (event) => {
    setSelectedFile(event.target.files);
  };

  const handleImageChange = async () => {
    try {
      setLoaderthree(true);
      const formData = new FormData();
      Array.from(selectedFile).forEach((file) => {
        formData.append("file", file);
      });
      const fileNames = Array.from(selectedFile).map((file) => file.name);
      const metadata = JSON.stringify({
        name: fileNames.join(", "),
      });
      formData.append("pinataMetadata", metadata);
      const options = JSON.stringify({
        cidVersion: 0,
      });
      formData.append("pinataOptions", options);
      const res = await fetch(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        {
          method: "POST",
          headers: {
            pinata_api_key: `${apikey}`,
            pinata_secret_api_key: `${secretapikey}`,
          },
          body: formData,
        }
      );
      const resData = await res.json();
      // const response = await axios.get(
      //   `https://ipfs-lb.com/ipfs/${resData.IpfsHash}`
      // );
      const ipfsUrl = `https://ipfs-lb.com/ipfs/${resData.IpfsHash}`;
      const response = await fetchWithRetry(ipfsUrl);
      const parser = new DOMParser();
      const htmlDocument = parser.parseFromString(response.data, "text/html");
      const links = htmlDocument.getElementsByTagName("a");
      const imageFiles = Array.from(links)
        .map((link) => "https://ipfs.io" + link.getAttribute("href"))
        .filter((href) => /\.(jpg|jpeg|png|gif)$/i.test(href));
      const imageUrlsSet = [];
      for (const file of imageFiles) {
        if (file.includes("?filename=")) {
          imageUrlsSet.push(file);
        }
      }
      const modifiedSet = [];
      imageUrlsSet.forEach((url) => {
        const parts = url.split("/");
        const lastPart = parts[parts.length - 1];
        const hash = lastPart.split("?")[0];
        modifiedSet.push("/" + hash);
      });
      setFileHashes(modifiedSet);
      localStorage.setItem(
        "fileHashes",
        JSON.stringify(Array.from(modifiedSet))
      );
      setImagesUploaded(true);
      setLoaderthree(false);
      const successfulImages = imageUrlsSet;
      return successfulImages;
    } catch (error) {
      setLoaderthree(false);
      console.error("Error fetching images:", error);
    }
  };

  const [selectedMetaFile, setSelectedMetaFile] = useState();

  const changeMetaHandler = (event) => {
    setSelectedMetaFile(event.target.files);
  };
  const [metahash, setMetaHash] = useState();
  const handleMetaChange = async () => {
    try {
      console.log("Selected Files", selectedMetaFile);
      setLoaderthree(true);

      const metadataFile = Array.from(selectedMetaFile).find(
        (file) => file.name === "metadata.json"
      );
      const metadataContent = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          resolve(event.target.result);
        };
        reader.onerror = (error) => {
          reject(error);
        };
        reader.readAsText(metadataFile);
      });
      let parsedMetadata = JSON.parse(metadataContent);
      const fileHashesString = localStorage.getItem("fileHashes");
      const fileHashes = JSON.parse(fileHashesString);
      if (fileHashes.length !== parsedMetadata.length) {
        toast.error("Metadata is not equal to image hash");
        setLoaderthree(false);
        return;
      }
      for (let i = 0; i < parsedMetadata.length; i++) {
        parsedMetadata[i].hash = fileHashes[i];
      }

      console.log(parsedMetadata, "parsed");
      const formData = new FormData();
      const jsonBlob = new Blob([JSON.stringify(parsedMetadata)], {
        type: "application/json",
      });
      formData.append("file", jsonBlob);
      const res = await fetch(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        {
          method: "POST",
          headers: {
            pinata_api_key: `${apikey}`,
            pinata_secret_api_key: `${secretapikey}`,
          },
          body: formData,
        }
      );
      const data = await res.json();
      setMetaHash(data?.IpfsHash);
      setMetadataUploaded(true);
      setLoaderthree(false);
    } catch (error) {
      setLoaderthree(false);
      console.error("Error fetching metadata:", error);
    }
  };
  // console.log(metahash, "hash");

  // const [uploadedImages, setUploadedImages] = useState(0);
  // const [totalImages, setTotalImages] = useState(null);

  // const fetchImages = async (ipfsLink) => {
  //   try {
  //     const response = await axios.get(ipfsLink);
  //     const parser = new DOMParser();
  //     const htmlDocument = parser.parseFromString(response.data, "text/html");
  //     const links = htmlDocument.getElementsByTagName("a");
  //     const jsonFiles = Array.from(links)
  //       .map((link) => "https://ipfs.io" + link.getAttribute("href"))
  //       .filter(
  //         (href) => href.endsWith(".json") && !href.includes("_metadata.json")
  //       );
  //     const imageUrlsSet = [];

  //     console.log(jsonFiles, jsonFiles.length, "jsonnn");
  //     // setTotalImages(jsonFiles.length);
  //     if (jsonFiles?.length / 2 !== modaldata?.totalSupply) {
  //       if (jsonFiles?.length / 2 <= modaldata?.totalSupply) {
  //         toast.error(
  //           `The number of IPFS metadata is less than the total supply (${modaldata?.totalSupply})`
  //         );
  //         setLoader(false);
  //         return false;
  //       }
  //     }
  //     for (const file of jsonFiles?.slice(
  //       0,
  //       parseInt(modaldata?.totalSupply * 2)
  //     )) {
  //       let jsonRes;
  //       if (file.includes("?filename=")) {
  //       } else {
  //         jsonRes = await fetchWithRetry(file);
  //         if (jsonRes.data.image) {
  //           const updatedImageLink = jsonRes.data.image.replace(
  //             "ipfs://",
  //             "https://ipfs.io/ipfs/"
  //           );
  //           imageUrlsSet.push(updatedImageLink);
  //           setUploadedImages((prevUploadedImages) => prevUploadedImages + 1);
  //         }
  //       }
  //     }
  //     const successfulImages = imageUrlsSet;
  //     console.log(successfulImages, "dasdfasdffasdf");
  //     return successfulImages;
  //   } catch (error) {
  //     console.error("Error fetching metadata:", error);
  //     throw error;
  //   }
  // };

  const transformStages = (mintStages, mintStartTime) => {
    console.log(mintStages, "mint");
    return mintStages.map((stage, index) => {
      let startTime =
        index === 0
          ? new Date(mintStartTime).getTime() / 1000
          : new Date(mintStages[index - 1].mintStageTime).getTime() / 1000;
      let endTime = new Date(stage.mintStageTime).getTime() / 1000;
      let amount = stage.amount;
      let sold = "0";
      let price = web3.utils.toWei(stage.price, "ether");
      let whiteList = false;
      let closed = false;
      return [startTime, endTime, amount, sold, price, whiteList, closed];
    });
  };

  const ProjectContract = async (
    name,
    symbol,
    metahash,
    mintStages,
    totalSupply,
    perWalletLimit,
    LimitedEddition,
    mintStartTime
  ) => {
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
        var result2 = parseInt(result) + 3000000000;
        gasFunPrice = result2.toString();
      });
      setLoader(true);

      let stagesData = transformStages(mintStages, mintStartTime);
      console.log(
        name,
        symbol,
        metahash,
        stagesData,
        totalSupply,
        perWalletLimit,
        LimitedEddition,
        mintStartTime,
        "totall"
      );
      // console.log(fileHashes, "filehashes");
      const gas = await contract.methods
        .createProject(
          name,
          symbol,
          metahash,
          stagesData,
          totalSupply,
          perWalletLimit,
          LimitedEddition
        )
        .estimateGas({ from: account });
      const staked = await contract.methods
        .createProject(
          name,
          symbol,
          metahash,
          stagesData,
          totalSupply,
          perWalletLimit,
          LimitedEddition
        )
        .send({ from: account, gas, gasPrice: gasFunPrice });
      const contractAddress =
        staked?.events?.ProjectCreated?.returnValues?.erc721Contract;
      let projectId =
        staked?.events?.ProjectCreated?.returnValues?.projectId || "";
      setContractAddress(contractAddress);
      setProjectId(projectId);
      if (staked) {
        await getLaunchpad(modaldata?._id, contractAddress, projectId);
        await getIpfsLaunchpad(modaldata?._id, account);
      }

      setLoader(false);
      handleClose();
    } catch (error) {
      console.error("Error in ProjectContract:", error);
      setLoader(false);
      throw error;
    }
  };

  const getLaunchpad = async (id, contractAddress, projectId) => {
    try {
      console.log(contractAddress, projectId, "koko");
      const projectIdString = projectId.toString();
      const launchpadData = {
        contractAddress: contractAddress,
        ipfsHash: metahash,
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
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.error("Error in getLaunchpad:", error);
        toast.error(error.response.data.message.error);
      } else {
        console.error("Error in getLaunchpad:", error);
      }
    }
  };

  const getIpfsLaunchpad = async (id, account) => {
    const fileHashes = JSON.parse(localStorage.getItem("fileHashes"));
    try {
      // const files = fileHashes.map((image, index) => ({
      //   name: `image ${index + 1}`,
      //   image: image,
      // }));
      const launchpadData = {
        files: fileHashes,
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
      // console.log(response.data, "statuswww");
      toast.success("Collection Created Succesfully");

      // onNext();
      // localStorage.removeItem;
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.error("Error in getLaunchpad:", error);
        toast.error(error.response.data.message);
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
        var result2 = parseInt(result) + 3000000000;
        gasFunPrice = result2.toString();
      });
      setLoaderthree(true);
      // const projectId = modaldata && modaldata.projectId ? Number(modaldata.projectId) : 0;
      // console.log(id, 'project');
      const gas = await contract.methods
        .FinalizeSale(projectId)
        .estimateGas({ from: account });
      const staked = await contract.methods
        .FinalizeSale(projectId)
        .send({ from: account, gas, gasPrice: gasFunPrice });
      setLoaderthree(false);
      getFinallizeLaunchpad(id);
      getNft(accessToken, activeTab);
      handleClose();
      return staked;
    } catch (error) {
      console.error("Error in FinalizeContract:", error);
      setLoaderthree(false);
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
      toast.success("Collection Finalized Successfully");
      // onNext();
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.error("Error in getLaunchpad:", error);
        toast.error(error.response.data.message.error);
      } else {
        console.error("Error in getLaunchpad:", error);
      }
    }
  };

  const disconnectWallet = async () => {
    const connectorId = window.localStorage.getItem("connectorId");
    logout(connectorId);
    localStorage.removeItem("connectorId");
    localStorage.removeItem("flag");
    localStorage.removeItem("chain");
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
    localStorage.removeItem("formDataname");
  };

  const GetRoyality = async (contractAddress) => {
    console.log(contractAddress, royaliy, "royal");
    const val = localStorage.getItem("accessToken");
    if (!royaliy) {
      toast.error("Please enter royalties before sending.");
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
      var gasFunPrice;
      web3.eth.getGasPrice().then((result) => {
        var result2 = parseInt(result) + 3000000000;
        gasFunPrice = result2.toString();
      });
      setLoader(true);
      const gas = await contract2.methods
        .setCollectionRoyalty(contractAddress, royaliy)
        .estimateGas({ from: account });
      const staked = await contract2.methods
        .setCollectionRoyalty(contractAddress, royaliy)
        .send({ from: account, gas, gasPrice: gasFunPrice });
      setLoader(false);
      handleClose();
      return staked;
    } catch (error) {
      console.error("Error in ProjectContract:", error);
      setLoader(false);
      throw error;
    }
  };

  return (
    <>
      <Navbar setProfile={setProfile} profile={profile} />

      {loader && (
        <>
          <Loader
            // uploadedImages={uploadedImages}
            // totalImages={modaldata?.totalSupply}
            modaldata={modaldata}
            text="Please wait..."
          />
        </>
      )}

      {loaderthree && (
        <>
          <Loader text2="Uploading..." />
        </>
      )}

      <section className="maincollectiondash">
        <div className="custom-container">
          <div className="row">
            <div className="col-xl-12 col-12 m-auto padd-sm">
              <h3>My launchpads</h3>
              <div className="collectionparent">
                <div className="mainssss">
                  <Nav
                    variant="pills"
                    activeKey={activeTab}
                    onSelect={handleSelect}
                  >
                    <Nav.Item>
                      <Nav.Link
                        eventKey="draft"
                        onSelect={() => getNft(accessToken, "draft")}
                      >
                        Drafts
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="submitted"
                        onSelect={() => getNft(accessToken, "submitted")}
                      >
                        Submissions
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="approved"
                        onSelect={() => getNft(accessToken, "approved")}
                      >
                        Approved
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="listed"
                        onSelect={() => getNft(accessToken, "listed")}
                      >
                        Listed
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="rejected"
                        onSelect={() => getNft(accessToken, "rejected")}
                      >
                        Rejected
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="completed"
                        onSelect={() => getNft(accessToken, "completed")}
                      >
                        Completed
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </div>
                <div className="mainbtns">
                  {/* <Link href="/setupwhitelist"> <button>Create a whitelist</button></Link> */}
                  <Link href="/createlaunchpadcollection">
                    <button onClick={HandleRemoveStorage}>
                      Apply for launchpad
                    </button>
                  </Link>
                </div>
              </div>
              {loadertwo ? (
                <Loadertwo />
              ) : (
                <>
                  {activeTab === "draft" && (
                    <>
                      <div className="mainhead">
                        {/* <p>These are your unsubmitted applications - only you can see these. You can return and update these at any time.
                    </p> */}
                      </div>
                      <div className="parentcard">
                        {justlanding.length > 0 ? (
                          justlanding.map((item, index) => (
                            <Link
                              onClick={HandleRemoveStorage}
                              href={`/createlaunchpadcollection?id=${
                                (accessToken, item?._id)
                              }`}
                              key={index}
                            >
                              <div className="maincard">
                                <div className="mainimg">
                                  <img
                                    src={item?.imageUrl}
                                    alt="img"
                                    className="img-fluid imgmain"
                                  />
                                </div>
                                <div className="cardtext">
                                  <h6>{item?.name}</h6>
                                  <p>
                                    Submitted:{" "}
                                    {moment(item?.createdAt).format(
                                      "YYYY-MM-DD"
                                    )}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          ))
                        ) : (
                          <p className="text-white">No data found</p>
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
                  {activeTab === "submitted" && (
                    <>
                      <div className="mainhead">
                        {/* <p>These are your unsubmitted applications - only you can see these. You can return and update these at any time.
                                        </p> */}
                      </div>
                      <div className="parentcard">
                        {justlanding.length > 0 ? (
                          justlanding.map((item, index) => (
                            <div className="maincard" key={index}>
                              <div className="mainimg">
                                <img
                                  src={item?.imageUrl}
                                  alt="img"
                                  className="img-fluid imgmain"
                                />
                              </div>
                              <div className="cardtext">
                                <h6>{item?.name}</h6>
                                <p>
                                  Submitted:{" "}
                                  {moment(item?.createdAt).format("YYYY-MM-DD")}
                                </p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-white">No data found</p>
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
                  {activeTab === "approved" && (
                    <>
                      <div className="mainhead"></div>
                      <div className="parentcard parentcardapproved">
                        {justlanding.length > 0 ? (
                          justlanding.map((item, index) => (
                            <div className="maincard" key={index}>
                              <div className="mainimg">
                                <img
                                  src={item?.imageUrl}
                                  alt="img"
                                  className="img-fluid imgmain"
                                />
                              </div>
                              <div className="cardtext">
                                <h6>{item?.name}</h6>
                              </div>
                              <a
                                onClick={() => {
                                  handleShow();
                                  setModalData(item);
                                  // ProjectContract(item?.name, 'symbol', item?.imageUrl, item?.price, item?.totalSupply, item?.limitedEddition)
                                }}
                                className="btn-mint"
                              >
                                Finalize and List
                              </a>
                            </div>
                          ))
                        ) : (
                          <p className="text-white">No data found</p>
                        )}
                      </div>
                    </>
                  )}
                </>
              )}

              {/* <label className="form-label"> Choose File</label>
              <input
                directory=""
                webkitdirectory=""
                type="file"
                onChange={changeHandler}
              />
              <button onClick={handleImageChange}>Submit</button> */}

              {loadertwo ? (
                <Loadertwo />
              ) : (
                <>
                  {activeTab === "listed" && (
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
                  {activeTab === "rejected" && (
                    <>
                      <div className="mainhead">
                        {/* <p>These are your unsubmitted applications - only you can see these. You can return and update these at any time.
                                        </p> */}
                      </div>
                      {justlanding.length > 0 ? (
                        justlanding.map((item, index) => (
                          <div className="parentcard" key={index}>
                            <div className="maincard">
                              <div className="mainimg">
                                <img
                                  src={item?.imageUrl}
                                  alt="img"
                                  className="img-fluid imgmain"
                                />
                              </div>
                              <div className="cardtext">
                                <h6>{item?.name}</h6>
                                <p>
                                  Submitted:{" "}
                                  {moment(item?.createdAt).format("YYYY-MM-DD")}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-white">No data found</p>
                      )}
                    </>
                  )}
                </>
              )}
              {loadertwo ? (
                <Loadertwo />
              ) : (
                <>
                  {activeTab === "completed" && (
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
      </section>
      <Footer />

      <Modal className="buymodal" show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Launch Collection</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <div className="option-field">
                        <div className="twice-itemssss">
                            <label>IPF Link</label>
                            <a onClick={() => {
                                handleClose();
                                handleShow1();
                            }} className='btn-guide'>Guide</a>
                        </div>
                        <input value={ipfLink}
                            onChange={(e) => setIpflink(e.target.value)} type="email" placeholder='Enter your media link' />
                    </div> */}
          <label
            htmlFor="uploadmedia"
            style={{ width: "100%", height: "100%" }}
          >
            <div className="select-media">
              <svg
                style={{ width: "80px", height: "80px" }}
                xmlns="http://www.w3.org/2000/svg"
                width="31"
                height="32"
                viewBox="0 0 31 32"
                fill="none"
              >
                <path
                  d="M19.3747 29.8851H11.6247C4.61092 29.8851 1.61426 26.8884 1.61426 19.8747V12.1247C1.61426 5.11092 4.61092 2.11426 11.6247 2.11426H19.3747C26.3884 2.11426 29.3851 5.11092 29.3851 12.1247V19.8747C29.3851 26.8884 26.3884 29.8851 19.3747 29.8851ZM11.6247 4.05176C5.67009 4.05176 3.55176 6.17009 3.55176 12.1247V19.8747C3.55176 25.8293 5.67009 27.9476 11.6247 27.9476H19.3747C25.3293 27.9476 27.4476 25.8293 27.4476 19.8747V12.1247C27.4476 6.17009 25.3293 4.05176 19.3747 4.05176H11.6247Z"
                  fill="#862FC0"
                />
                <path
                  d="M11.6253 14.3854C9.66199 14.3854 8.07324 12.7967 8.07324 10.8333C8.07324 8.87 9.66199 7.28125 11.6253 7.28125C13.5887 7.28125 15.1774 8.87 15.1774 10.8333C15.1774 12.7967 13.5887 14.3854 11.6253 14.3854ZM11.6253 9.21875C10.7341 9.21875 10.0107 9.94208 10.0107 10.8333C10.0107 11.7246 10.7341 12.4479 11.6253 12.4479C12.5166 12.4479 13.2399 11.7246 13.2399 10.8333C13.2399 9.94208 12.5166 9.21875 11.6253 9.21875Z"
                  fill="#862FC0"
                />
                <path
                  d="M3.44915 25.9461C3.13915 25.9461 2.82915 25.7911 2.64831 25.5199C2.35123 25.0807 2.46748 24.4736 2.91956 24.1765L9.28748 19.9011C10.6825 18.9582 12.6071 19.0745 13.8729 20.1465L14.2991 20.5211C14.945 21.0765 16.0429 21.0765 16.6758 20.5211L22.0491 15.9099C23.4183 14.7345 25.5754 14.7345 26.9575 15.9099L29.0629 17.7182C29.4633 18.067 29.515 18.674 29.1662 19.0874C28.8175 19.4878 28.2104 19.5395 27.7971 19.1907L25.6916 17.3824C25.0458 16.827 23.9479 16.827 23.3021 17.3824L17.9287 21.9936C16.5596 23.169 14.4025 23.169 13.0204 21.9936L12.5941 21.6191C12 21.1153 11.0183 21.0636 10.3596 21.5157L3.99165 25.7911C3.82373 25.8945 3.62998 25.9461 3.44915 25.9461Z"
                  fill="#862FC0"
                />
              </svg>
              <input
                id="uploadmedia"
                directory=""
                webkitdirectory=""
                type="file"
                onChange={changeHandler}
                className="d-none"
              />
              <div className="right-side">
                <h6>Select Media</h6>
                <p>
                  Click here to select up to 10,000 media files, up to a total
                  size of 5GB. JPG, PNG, SVG, and GIF are supported.
                </p>
              </div>
            </div>
          </label>
          <button
            className="btn-save-submit"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={handleImageChange}
          >
            Upload images
          </button>
          <label
            style={{ width: "100%", height: "100%" }}
            htmlFor="uploadmetadata"
          >
            <div className="select-media">
              <svg
                style={{ width: "50px", height: "50px" }}
                xmlns="http://www.w3.org/2000/svg"
                width="31"
                height="32"
                viewBox="0 0 31 32"
                fill="none"
              >
                <path
                  d="M20.6667 29.8851H10.3333C5.61875 29.8851 2.90625 27.1726 2.90625 22.458V9.54134C2.90625 4.82676 5.61875 2.11426 10.3333 2.11426H20.6667C25.3813 2.11426 28.0938 4.82676 28.0938 9.54134V22.458C28.0938 27.1726 25.3813 29.8851 20.6667 29.8851ZM10.3333 4.05176C6.63917 4.05176 4.84375 5.84717 4.84375 9.54134V22.458C4.84375 26.1522 6.63917 27.9476 10.3333 27.9476H20.6667C24.3608 27.9476 26.1562 26.1522 26.1562 22.458V9.54134C26.1562 5.84717 24.3608 4.05176 20.6667 4.05176H10.3333Z"
                  fill="#862FC0"
                />
                <path
                  d="M23.8962 12.4479H21.3128C19.3495 12.4479 17.7607 10.8592 17.7607 8.89583V6.3125C17.7607 5.78292 18.1999 5.34375 18.7295 5.34375C19.2591 5.34375 19.6982 5.78292 19.6982 6.3125V8.89583C19.6982 9.78708 20.4216 10.5104 21.3128 10.5104H23.8962C24.4257 10.5104 24.8649 10.9496 24.8649 11.4792C24.8649 12.0087 24.4257 12.4479 23.8962 12.4479Z"
                  fill="#862FC0"
                />
                <path
                  d="M15.4997 18.2607H10.333C9.80342 18.2607 9.36426 17.8216 9.36426 17.292C9.36426 16.7624 9.80342 16.3232 10.333 16.3232H15.4997C16.0293 16.3232 16.4684 16.7624 16.4684 17.292C16.4684 17.8216 16.0293 18.2607 15.4997 18.2607Z"
                  fill="#862FC0"
                />
                <path
                  d="M20.6663 23.4268H10.333C9.80342 23.4268 9.36426 22.9876 9.36426 22.458C9.36426 21.9284 9.80342 21.4893 10.333 21.4893H20.6663C21.1959 21.4893 21.6351 21.9284 21.6351 22.458C21.6351 22.9876 21.1959 23.4268 20.6663 23.4268Z"
                  fill="#862FC0"
                />
              </svg>
              <input
                //   directory=""
                //   webkitdirectory=""
                id="uploadmetadata"
                type="file"
                onChange={changeMetaHandler}
                className="d-none"
              />
              <div className="right-side">
                <h6>Select Metadata</h6>
                <p>Click here to upload a CSV file</p>
              </div>
            </div>
          </label>
          <button
            className="btn-save-submit"
            onClick={handleMetaChange}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "25px",
            }}
          >
            Upload metadata
          </button>
          {/* <div>
            <input
              type="file"
              ref={fileInputRef2}
              style={{ display: "none" }}
              onChange={handleMetaChange}
              multiple
            />
            <div
              onClick={() => fileInputRef2.current.click()}
              className="select-metadata"
            >
              <div className="left-side">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="31"
                  height="32"
                  viewBox="0 0 31 32"
                  fill="none"
                >
                  <path
                    d="M20.6667 29.8851H10.3333C5.61875 29.8851 2.90625 27.1726 2.90625 22.458V9.54134C2.90625 4.82676 5.61875 2.11426 10.3333 2.11426H20.6667C25.3813 2.11426 28.0938 4.82676 28.0938 9.54134V22.458C28.0938 27.1726 25.3813 29.8851 20.6667 29.8851ZM10.3333 4.05176C6.63917 4.05176 4.84375 5.84717 4.84375 9.54134V22.458C4.84375 26.1522 6.63917 27.9476 10.3333 27.9476H20.6667C24.3608 27.9476 26.1562 26.1522 26.1562 22.458V9.54134C26.1562 5.84717 24.3608 4.05176 20.6667 4.05176H10.3333Z"
                    fill="#862FC0"
                  />
                  <path
                    d="M23.8962 12.4479H21.3128C19.3495 12.4479 17.7607 10.8592 17.7607 8.89583V6.3125C17.7607 5.78292 18.1999 5.34375 18.7295 5.34375C19.2591 5.34375 19.6982 5.78292 19.6982 6.3125V8.89583C19.6982 9.78708 20.4216 10.5104 21.3128 10.5104H23.8962C24.4257 10.5104 24.8649 10.9496 24.8649 11.4792C24.8649 12.0087 24.4257 12.4479 23.8962 12.4479Z"
                    fill="#862FC0"
                  />
                  <path
                    d="M15.4997 18.2607H10.333C9.80342 18.2607 9.36426 17.8216 9.36426 17.292C9.36426 16.7624 9.80342 16.3232 10.333 16.3232H15.4997C16.0293 16.3232 16.4684 16.7624 16.4684 17.292C16.4684 17.8216 16.0293 18.2607 15.4997 18.2607Z"
                    fill="#862FC0"
                  />
                  <path
                    d="M20.6663 23.4268H10.333C9.80342 23.4268 9.36426 22.9876 9.36426 22.458C9.36426 21.9284 9.80342 21.4893 10.333 21.4893H20.6663C21.1959 21.4893 21.6351 21.9284 21.6351 22.458C21.6351 22.9876 21.1959 23.4268 20.6663 23.4268Z"
                    fill="#862FC0"
                  />
                </svg>
              </div>
              <div className="right-side">
                <h6>Select Metadata</h6>
                <p>Drag and drop or click to upload a CSV file</p>
              </div>
            </div>
          </div> */}
          {/* {account ? (
                        <button onClick={disconnectWallet} style={{ maxWidth: "100%" }} className="stepbtn bluebtn">
                            Disconnect Wallet
                        </button>
                    ) : (
                        <button onClick={() => connectWallet('1115')} style={{ maxWidth: "100%" }} className="stepbtn bluebtn">
                            Connect Wallet
                        </button>
                    )} */}

          {/* <button style={{ maxWidth: "100%", marginTop: "18px" }} className={`stepbtn ${account ? 'bluebtn' : 'opacitylowifdisable bluebtn'}`} onClick={() => {
                        handleShow(); ProjectContract(
                            modaldata?.name,
                            modaldata?.symbol,
                            ipfLink,
                            modaldata?.mintStages,
                            modaldata?.totalSupply,
                            modaldata?.perWalletLimit,
                            modaldata?.limitedEddition,
                            modaldata?.mintStartTime
                        );
                    }}>
                        List Launchpad
                    </button> */}
          <div className="twice-btn">
            <a onClick={handleClose} className="btn-cancel">
              Cancel
            </a>

            {/* <a className='btn-save'>Save</a> */}

            {/* <a className='btn-save'>{imagesUploaded && metadataUploaded ? 'List Launchpad' : 'Save'}</a> */}
            <a
              onClick={() =>
                !(!imagesUploaded || !metadataUploaded) &&
                ProjectContract(
                  modaldata?.name,
                  modaldata?.symbol,
                  metahash,
                  modaldata?.mintStages,
                  modaldata?.totalSupply,
                  modaldata?.perWalletLimit,
                  modaldata?.limitedEddition,
                  modaldata?.mintStartTime
                )
              }
              className={`btn-save ${
                (!imagesUploaded || !metadataUploaded) && "disabled"
              }`}
              style={{
                opacity: !imagesUploaded || !metadataUploaded ? 0.5 : 1,
              }}
              disabled={!imagesUploaded || !metadataUploaded}
            >
              List Launchpad
            </a>
          </div>
          {/* <p className='text-white'> {modaldata?.[1]?.mintStages?.[0]?.perWalletMintLimit}</p> */}
        </Modal.Body>
      </Modal>

      <Modal
        className="buymodal guideline-modal"
        show={show1}
        onHide={handleClose1}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Launch Collection Guideline</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="guide-text">
            <div>
              <h2>
                Follow these steps in order to generate the IPFS hash for
                multiple images
              </h2>
              <ol>
                <li>Create a folder and paste all your images into it.</li>
                <li>
                  Ensure that the images are named like 1.png, 2.png, 3.png, and
                  so on up to 100.png.
                </li>
                <li>
                  Now, go to the Pinata website and create an account. After
                  that, click on the "Upload" button at the top right corner,
                  then select "Folder" and upload your images folder.
                </li>
                <li>
                  After uploading, navigate to your uploaded folder on Pinata
                  and copy the entire URL. The URL should look like:{" "}
                  <code>https://pinata/.../</code>. This URL will be used to
                  fetch your images.
                </li>
                <li>
                  Save this URL (<code>https://pinata/.../</code>) and create
                  another folder. In this folder, create JSON files for all your
                  100 images. Each JSON file should be named like 1.json,
                  2.json, 3.json, similar to how you named your images.
                </li>
                <li>
                  In each JSON file, include the following structure, replacing
                  the image URL with the actual URL of your images:
                </li>
                <pre>
                  {`
          {
            "name": "Wizard NFTs",
            "image": "https://aqua-familiar-marmot-952.mypinata.cloud/ipfs/QmcmUUkBLycE9J9bG9g8FSu3ASB9SeqmArjoe5z4A57Dku/1.png"
          }
          `}
                </pre>
                <li>
                  In each JSON file, update the image URL to include the
                  specific image name and extension. For example, for the first
                  image, the URL should be <code>https://pinata/.../1.png</code>
                  .
                </li>
                <li>
                  Once you've updated all JSON files, return to Pinata, click on
                  the "Upload" button again, select "Folder", and upload your
                  JSON folder.
                </li>
                <li>
                  After uploading, open your uploaded folder and copy the entire
                  URL. This URL will be added in the smart contract, and it
                  should look like: <code>https://pinata/.../</code>.
                </li>
                <li>
                  Provide this URL when deploying your collection, and the
                  contract will automatically add the image names and extensions
                  for each JSON file.
                </li>
              </ol>
            </div>
          </div>

          <button
            onClick={() => {
              handleClose1();
              handleShow();
            }}
            style={{ maxWidth: "100%", marginTop: "18px" }}
            className="bluebtn"
          >
            Back to IPF Link
          </button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Collectiondashbord;
