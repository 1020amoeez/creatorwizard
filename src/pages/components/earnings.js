"use client";

import React, { useEffect, useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import Environment from "@/utils/Enviroment";
import axios from "axios";
import { useWeb3React } from "@web3-react/core";

const Earnings = ({ onNext, formDataname, setFormDataName, draftdata }) => {
  const api_url = Environment.api_url;
  // const { earningAddress } = formDataname;
  const [teamMembers, setTeamMembers] = useState([0]);
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);
  const [accessToken, setAccessToken] = useState("");
  const { account } = useWeb3React();

  useEffect(() => {
    const val = localStorage.getItem("accessToken");
    setAccessToken(val);
  }, []);

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

  // const handleButtonClick = () => {
  //     if (fileInputRef.current) {
  //         fileInputRef.current.click();
  //     }
  // };

  const handleUpload = () => {
    setImage(null);
  };

  const handleAddTeamMember = () => {
    setTeamMembers([...teamMembers, {}]);
  };

  const handleDeleteTeamMember = (index) => {
    const updatedTeamMembers = [...teamMembers];
    updatedTeamMembers.splice(index, 1);
    setTeamMembers(updatedTeamMembers);
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [isSwitchOn, setSwitchOn] = useState(false);

  const handleToggleSwitch = () => {
    setSwitchOn(!isSwitchOn);
  };

  const [isSwitchOn1, setSwitchOn1] = useState(false);

  const handleToggleSwitch1 = () => {
    setSwitchOn1(!isSwitchOn1);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // const handleButtonClick = () => {
  //     const featureImageUrl = localStorage.getItem('featureImageUrl');
  //     if (!formDataname?.earningAddress) {
  //         toast.error('Enter Wallet Address');
  //     } else if (formDataname?.earningAddress.length !== 42) {
  //         toast.error('Wallet Address length must be 42 characters long');
  //     } else {
  //         const earningAddress = formDataname?.earningAddress;
  //         const formDataName = JSON.parse(localStorage.getItem('formDataname'));
  //         const mintStartTime = new Date(formDataName?.mintStartTime);
  //         const mintEndTime = new Date(formDataName?.mintEndTime);
  //         const formData = {
  //             earningAddress,
  //             name: formDataName?.name || '',
  //             symbol: formDataname?.symbol || '',
  //             description: formDataName?.description || '',
  //             websiteUrl: formDataname?.websiteUrl || '',
  //             discordUrl: formDataName?.discordUrl || '',
  //             twitterUrl: formDataName?.twitterUrl || '',
  //             imageUrl: formDataName?.imageUrl || '',
  //             featureImageUrl: featureImageUrl || '',
  //             perWalletLimit: formDataName?.perWalletLimit || '',
  //             teamMembers: formDataName?.teamMembers || [],
  //             mintStartTime: mintStartTime,
  //             mintStages: formDataName?.mintStages || [],
  //             mintEndTime: mintEndTime,
  //         };

  //         if (formDataName?.limitedEddition) {
  //             formData.limitedEddition = formDataName.limitedEddition;
  //             formData.totalSupply = formDataName.totalSupply;
  //         }
  //         if (formDataName?.openEddition) {
  //             formData.openEddition = formDataName.openEddition;
  //         }

  //         CreateLaunchPad(formData);
  //     }
  // };

  const handleButtonClick = () => {
    const featureImageUrl = localStorage.getItem("featureImageUrl");
    if (!formDataname?.earningAddress) {
      toast.error("Enter Wallet Address");
    } else if (formDataname?.earningAddress.length !== 42) {
      toast.error("Wallet Address length must be 42 characters long");
    } else {
      const earningAddress = formDataname?.earningAddress;
      const formDataName = JSON.parse(localStorage.getItem("formDataname"));

      // Parse dates from localStorage
      const mintStartTime = new Date(formDataName?.mintStartTime);
      const mintEndTime = new Date(formDataName?.mintEndTime);

      // Clone mintStages array to prevent mutation
      const mintStages = [...formDataName?.mintStages];

      // Prepare formData object
      const formData = {
        earningAddress,
        name: formDataName?.name || "",
        symbol: formDataname?.symbol || "",
        description: formDataName?.description || "",
        // websiteUrl: formDataname?.websiteUrl || "",
        // discordUrl: formDataName?.discordUrl || "",
        // twitterUrl: formDataName?.twitterUrl || "",
        imageUrl: formDataName?.imageUrl || "",
        featureImageUrl: featureImageUrl || "",
        perWalletLimit: formDataName?.perWalletLimit || "",
        teamMembers: formDataName?.teamMembers || [],
        mintStartTime,
        mintStages,
        mintEndTime,
      };
      if (formDataName?.websiteUrl) {
        formData.websiteUrl = formDataName?.websiteUrl;
      }
      if (formDataName?.discordUrl) {
        formData.discordUrl = formDataName?.discordUrl;
      }
      if (formDataName?.twitterUrl) {
        formData.twitterUrl = formDataName?.twitterUrl;
      }
      // Handle additional properties
      if (formDataName?.limitedEddition) {
        formData.limitedEddition = formDataName.limitedEddition;
        formData.totalSupply = formDataName.totalSupply;
      }
      if (formDataName?.openEddition) {
        formData.openEddition = formDataName.openEddition;
      }

      CreateLaunchPad(formData);
    }
  };

  const CreateLaunchPad = async (formData) => {
    try {
      const response = await axios.put(`${api_url}/launchpads`, formData, {
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
      });
      onNext();
    } catch (error) {
      toast.error(error?.response?.data?.message);
      toast.error(error?.response?.data?.message);
    }
  };

  // useEffect(() => {
  //     if (account) {
  //         setFormDataName({ ...formDataname, earningAddress: account });
  //     }
  // }, [account]);

  return (
    <>
      <section className="stepmain">
        <div className="stepcontainerdetail">
          <h4 className="stepheadcollection">Earnings</h4>
          <div className="earning-section">
            <div className="main-heading">
              <h6>Drop earnings addresses</h6>
              <p>
                Add a wallet to receive earnings from your primary sale. You can
                add multiple wallets by using a splitter contract. Wizard takes
                a 5% fee on primary sales.
              </p>
            </div>
            <div className="bottom-option">
              <div className="twice-elem">
                {/* <p className="addres-text">
                                    0xab6fd6074782c805933d030e801...
                                </p> */}
                <p className="addres-text-new">
                  <input
                    placeholder="Earning Address"
                    type="text"
                    value={formDataname?.earningAddress}
                    onChange={(e) =>
                      setFormDataName({
                        ...formDataname,
                        earningAddress: e.target.value,
                      })
                    }
                  />
                </p>
                {/* <p className="addres-text-new">
                                    <input
                                        placeholder='Earning Address'
                                        type="text"
                                        value={formDataname?.earningAddress ? `${formDataname.earningAddress.slice(0, 15)}...${formDataname.earningAddress.slice(-4)}` : ''}
                                        onChange={(e) => setFormDataName({ ...formDataname, earningAddress: e.target.value })}
                                    />
                                </p> */}

                <div className="input-field">
                  <input type="text" placeholder="95" readOnly />
                  <span>%</span>
                </div>
              </div>
              <div className="twice-elem">
                <p className="addres-text">
                  <img
                    src="\assets\wizardnft.svg"
                    alt="img"
                    className="img-fluid"
                  />
                  Wizard NFT
                </p>
                <div className="input-field">
                  <input type="text" placeholder="5" readOnly />
                  <span>%</span>
                </div>
              </div>
              {/* <div className="twice-elem">
                                <p className="addres-text p-1">
                                    Royalties
                                </p>
                            </div>
                            <div className="twice-elem">
                                <p className="addres-text-new">
                                    <input placeholder='Royalities' value={formDataname?.royalties} onChange={(e) => setFormDataName({ ...formDataname, royalties: e.target.value })} type="text" />
                                    <span>%</span>
                                </p>
                            </div> */}
            </div>
            {/* <p className='percent-max'>Maximum 10 Percent</p> */}
          </div>
          <button className="stepbtn" onClick={handleButtonClick}>
            Save & Proceed
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
              className="arrowbtn"
            >
              <path
                d="M10.1194 12.5467C9.99276 12.5467 9.86609 12.5001 9.76609 12.4001C9.57276 12.2067 9.57276 11.8867 9.76609 11.6934L13.4594 8.00008L9.76609 4.30674C9.57276 4.11341 9.57276 3.79341 9.76609 3.60008C9.95943 3.40674 10.2794 3.40674 10.4728 3.60008L14.5194 7.64674C14.7128 7.84008 14.7128 8.16008 14.5194 8.35341L10.4728 12.4001C10.3728 12.5001 10.2461 12.5467 10.1194 12.5467Z"
                fill="white"
              />
              <path
                d="M14.054 8.5H2.83398C2.56065 8.5 2.33398 8.27333 2.33398 8C2.33398 7.72667 2.56065 7.5 2.83398 7.5H14.054C14.3273 7.5 14.554 7.72667 14.554 8C14.554 8.27333 14.3273 8.5 14.054 8.5Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
      </section>

      <Modal
        className="buymodal mint-stage-modal"
        show={show}
        onHide={handleClose}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add a Mint stage</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="stepinputmain">
            <p className="stepinputpara">Name</p>
            <input type="text" className="stepinput" placeholder="Name" />
          </div>
          <div className="stepinputmain">
            <p className="stepinputpara">Sale price</p>
            <input
              type="text"
              className="stepinput"
              placeholder="Example: 0.01"
            />
          </div>
          <div className="twice-input-fields">
            <label>Duration</label>
            <div className="option-parent">
              <div className="option-field">
                <input type="text" placeholder="0" />
                <span>Days</span>
              </div>
              <div className="option-field">
                <input type="text" placeholder="0" />
                <span>Hours</span>
              </div>
              <div className="option-field">
                <input type="text" placeholder="0" />
                <span>Mins</span>
              </div>
            </div>
          </div>
          <div className="twice-field">
            <div className="single-field">
              <h6>Per-wallet mint limit</h6>
              {isSwitchOn && (
                <input className="oncheckinput" type="text" placeholder="0" />
              )}
              <div className="derivativemain">
                <label class="switch">
                  <input
                    type="checkbox"
                    checked={isSwitchOn}
                    onChange={handleToggleSwitch}
                  />
                  <div class="slidercheck"></div>
                  <div class="slider-card">
                    <div class="slider-card-face slider-card-front"></div>
                    <div class="slider-card-face slider-card-back"></div>
                  </div>
                </label>
              </div>
            </div>
            <div className="single-field">
              <h6>Allowlist</h6>
              <div className="derivativemain">
                <label class="switch">
                  <input
                    type="checkbox"
                    checked={isSwitchOn1}
                    onChange={handleToggleSwitch1}
                  />
                  <div class="slidercheck"></div>
                  <div class="slider-card">
                    <div class="slider-card-face slider-card-front"></div>
                    <div class="slider-card-face slider-card-back"></div>
                  </div>
                </label>
              </div>
            </div>
            {isSwitchOn1 && (
              <>
                <p className="para">
                  You can set specific mint limits and prices per wallet, which
                  will override the global sale price and mint limit above for
                  those specified.
                </p>
                <div className="twice-elem">
                  <a href="#">Download CSV Template</a>
                  <a href="#">Select CSV file</a>
                </div>
                <p className="last-para">Drag and drop a CSV file</p>
              </>
            )}
          </div>
          <div className="buymodalbtns">
            <button
              className="bluebtn"
              onClick={() => {
                handleClose();
              }}
            >
              Done
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Earnings;
