"use client";

import React, { useEffect, useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import Environment from "@/utils/Enviroment";
import axios from "axios";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { TextField } from "@mui/material";

const Mintinfo = ({ onNext, formDataname, setFormDataName, draftdata }) => {
  const api_url = Environment.api_url;
  // const { mintStartTime, mintStages } = formDataname;
  const [teamMembers, setTeamMembers] = useState([
    {
      id: 0,
      name: "",
      price: "",
      durationDays: "",
      durationHours: "",
      durationMins: "",
    },
  ]);
  const [currId, setCurrId] = useState();
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);
  const [modalInputValues, setModalInputValues] = useState({
    id: "",
    name: "",
    price: "",
    durationDays: "",
    durationHours: "",
    durationMins: "",
    // perWalletMintLimit: ''
  });
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const val = localStorage.getItem("accessToken");
    setAccessToken(val);
  }, []);

  const handleModalInputChange = (e) => {
    const { name, value } = e.target;
    setModalInputValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  // console.log(teamMembers);
  // const handleModalDoneClick = () => {
  //     const memberIndex = teamMembers.findIndex(member => member.id === currId);
  //     console.log(currId);
  //     if (memberIndex !== -1) {
  //         const updatedTeamMembers = [...teamMembers];
  //         updatedTeamMembers[memberIndex] = {
  //             ...updatedTeamMembers[memberIndex],
  //             name: modalInputValues.name,
  //             durationHours: modalInputValues.durationHours,
  //             durationMins: modalInputValues.durationMins,
  //             durationDays: modalInputValues.durationDays,
  //             price: modalInputValues.price
  //         };
  //         setTeamMembers(updatedTeamMembers);
  //     } else {
  //         const newTeamMember = {
  //             name: modalInputValues.name,
  //             durationHours: modalInputValues.durationHours,
  //             durationMins: modalInputValues.durationMins,
  //             durationDays: modalInputValues.durationDays,
  //             price: modalInputValues.price
  //         };
  //         setTeamMembers(prevTeamMembers => [...prevTeamMembers, newTeamMember]);
  //     }
  //     handleClose();
  // };
  const handleModalDoneClick = () => {
    console.log(currId);
    const newTeamMember = {
      id: currId,
      name: modalInputValues.name,
      durationHours: modalInputValues.durationHours,
      durationMins: modalInputValues.durationMins,
      durationDays: modalInputValues.durationDays,
      price: modalInputValues.price,
      // perWalletMintLimit: modalInputValues.perWalletMintLimit
    };
    setTeamMembers((prevTeamMembers) => {
      return prevTeamMembers.map((member) => {
        if (member.id === currId) {
          return newTeamMember;
        }
        return member;
      });
    });

    handleClose();
  };

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

  const handleUpload = () => {
    setImage(null);
  };

  // console.log('teamMembers', teamMembers);
  // console.log(teamMembers?.length);
  const handleAddTeamMember = () => {
    setTeamMembers([
      ...teamMembers,
      {
        id: teamMembers?.length,
        name: "",
        price: "",
        durationDays: "",
        durationHours: "",
        durationMins: "",
      },
    ]);
  };

  const handleDeleteTeamMember = (id) => {
    // const updatedTeamMembers = [...teamMembers];
    // updatedTeamMembers.splice(index, 1);
    const memberIndex = teamMembers.filter((member) => member.id !== id);
    setTeamMembers(memberIndex);
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

  const [selectedDate, setSelectedDate] = useState();
  const [selectedDate2, setSelectedDate2] = useState();

  // const handleButtonClick = () => {
  //     if (!formDataname?.mintStartTime) {
  //         toast.error('Enter Start Date');
  //         return;
  //     }
  //     if (teamMembers.length === 0) {
  //         toast.error('Add at least one mint stage');
  //         return;
  //     }
  //     const selectedDate = new Date(formDataname?.mintStartTime);
  //     const today = new Date();
  //     today.setHours(0, 0, 0, 0);
  //     if (selectedDate < today) {
  //         toast.error('Start Date must be at least today date');
  //         return;
  //     }
  //     // selectedDate.setHours(selectedDate.getHours() + 5);
  //     selectedDate.setHours(selectedDate.getHours());
  //     const formDataName = JSON.parse(localStorage.getItem('formDataname'));
  //     formDataName.mintStartTime = new Date(selectedDate).toISOString();

  //     const mintStages = teamMembers.map(member => {
  //         const endDate = new Date(selectedDate);
  //         endDate.setDate(selectedDate.getDate() + parseInt(member.durationDays || 0));
  //         endDate.setHours(endDate.getHours() + parseInt(member.durationHours || 0));
  //         endDate.setMinutes(endDate.getMinutes() + parseInt(member.durationMins || 0));

  //         return {
  //             name: member.name,
  //             mintStageTime: endDate.toISOString(),
  //             price: member.price
  //         };
  //     });

  //     const mintEndTime = mintStages[mintStages.length - 1]?.mintStageTime || '';
  //     console.log(mintEndTime, mintStages);
  //     formDataName.mintEndTime = new Date(mintEndTime).toISOString();
  //     formDataName.mintStages = mintStages;
  //     localStorage.setItem('formDataname', JSON.stringify(formDataName));
  //     CreateLaunchPad(formDataName, mintStages, mintEndTime);
  // };

  const handleButtonClick = () => {
    if (!formDataname?.mintStartTime) {
      toast.error("Enter Start Date");
      return;
    }
    if (teamMembers.length === 0) {
      toast.error("Add at least one mint stage");
      return;
    }
    let selectedDate = new Date(formDataname?.mintStartTime);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      toast.error("Start Date must be at least today date");
      return;
    }

    const mintStages = teamMembers.map((member) => {
      const endDate = new Date(selectedDate);
      endDate.setDate(
        selectedDate.getDate() + parseInt(member.durationDays || 0)
      );
      endDate.setHours(
        endDate.getHours() + parseInt(member.durationHours || 0)
      );
      endDate.setMinutes(
        endDate.getMinutes() + parseInt(member.durationMins || 0)
      );

      selectedDate = new Date(endDate); // Update selectedDate for the next iteration

      return {
        name: member.name,
        mintStageTime: endDate.toISOString(),
        price: member.price,
        // amount: "12",
        // perWalletMintLimit: member.perWalletMintLimit
      };
    });

    const mintEndTime = mintStages[mintStages.length - 1]?.mintStageTime || "";
    const formDataName = {
      ...JSON.parse(localStorage.getItem("formDataname")),
      mintStartTime: new Date(formDataname?.mintStartTime).toISOString(),
      mintEndTime: new Date(mintEndTime).toISOString(),
      mintStages: mintStages,
    };
    localStorage.setItem("formDataname", JSON.stringify(formDataName));
    CreateLaunchPad(formDataName, mintStages, mintEndTime);
  };

  const CreateLaunchPad = async (formDataName, mintStages, mintEndTime) => {
    // const featureImageUrl = localStorage.getItem("featureImageUrl");

    const stages = mintStages && Array.isArray(mintStages) ? mintStages : [];
    const launchpadData = {
      mintStartTime: formDataName?.mintStartTime,
      name: formDataName?.name,
      symbol: formDataname?.symbol,
      description: formDataName?.description,
      perWalletLimit: formDataName?.perWalletLimit,
      imageUrl: formDataName?.imageUrl,
      featureImageUrl: formDataName?.featureImageUrl,
      teamMembers: formDataName?.teamMembers || [],
      mintStages: stages,
      mintEndTime: mintEndTime,
    };
    if (formDataName?.websiteUrl) {
      launchpadData.websiteUrl = formDataName?.websiteUrl;
    }
    if (formDataName?.discordUrl) {
      launchpadData.discordUrl = formDataName?.discordUrl;
    }
    if (formDataName?.twitterUrl) {
      launchpadData.twitterUrl = formDataName?.twitterUrl;
    }
    if (formDataName?.limitedEddition) {
      launchpadData.limitedEddition = formDataName?.limitedEddition;
    }
    if (formDataName?.openEddition) {
      launchpadData.openEddition = formDataName?.openEddition;
    }
    if (!formDataName?.openEddition) {
      launchpadData.totalSupply = formDataName?.totalSupply;
    }
    try {
      const response = await axios.put(`${api_url}/launchpads`, launchpadData, {
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
      });
      onNext();
      window.location.reload();
    } catch (error) {
      toast.error(error?.response?.data?.message);
      toast.error(error?.response?.data?.details?.[0]?.mintEndTime);
      toast.error(error?.response?.data?.details?.[0]?.name);
      toast.error(error?.response?.data?.details?.[0]?.mintStartTime);
    }
  };

  return (
    <>
      <section className="stepmain">
        <div className="stepcontainerdetail">
          <h4 className="stepheadcollection">Mint info</h4>
          <p className="collectionpara">Tell us about the Launchpad.</p>
          <div className="stepinputmain">
            <p className="stepinputpara">Date when your mint starts (UTC)</p>
            {/* <input value={formDataname?.mintStartTime} onChange={(e) => setFormDataName({ ...formDataname, mintStartTime: e.target.value })} type="date" className="stepinput" /> */}
            {/* <LocalizationProvider value={formDataname?.mintStartTime} onChange={(e) => setFormDataName({ ...formDataname, mintStartTime: e.target.value })} dateAdapter={AdapterDayjs}>
                            <MobileDateTimePicker defaultValue={dayjs('')} />
                        </LocalizationProvider> */}

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileDateTimePicker
                value={selectedDate}
                onChange={(newValue) => {
                  setSelectedDate(newValue);
                  setSelectedDate2(newValue);
                  setFormDataName({ ...formDataname, mintStartTime: newValue });
                }}
                renderInput={(props) => <TextField {...props} />}
              />
            </LocalizationProvider>
          </div>
          <div className="stepinputmain">
            <p className="stepinputpara">Per-wallet mint limit</p>
            <input
              value={formDataname?.perWalletLimit}
              onChange={(e) =>
                setFormDataName({
                  ...formDataname,
                  perWalletLimit: e.target.value,
                })
              }
              type="text"
              className="stepinput"
              placeholder="Mint limit"
            />
          </div>

          <h6 className="minheading">Mint stages</h6>
          <div className="addteammembers">
            <a onClick={handleAddTeamMember}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  d="M13.5 9.5625H4.5C4.1925 9.5625 3.9375 9.3075 3.9375 9C3.9375 8.6925 4.1925 8.4375 4.5 8.4375H13.5C13.8075 8.4375 14.0625 8.6925 14.0625 9C14.0625 9.3075 13.8075 9.5625 13.5 9.5625Z"
                  fill="#862FC0"
                />
                <path
                  d="M9 14.0625C8.6925 14.0625 8.4375 13.8075 8.4375 13.5V4.5C8.4375 4.1925 8.6925 3.9375 9 3.9375C9.3075 3.9375 9.5625 4.1925 9.5625 4.5V13.5C9.5625 13.8075 9.3075 14.0625 9 14.0625Z"
                  fill="#862FC0"
                />
              </svg>{" "}
              Add a presale
            </a>
          </div>
          {teamMembers?.map((teamMember, index) => (
            <div key={index} className="main-mint-div">
              <div className="left-side">
                <div className="left-img">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="31"
                    height="31"
                    viewBox="0 0 31 31"
                    fill="none"
                  >
                    <path
                      d="M9.87943 27.0086C9.84068 27.0086 9.78902 27.0345 9.75027 27.0345C7.24443 25.7945 5.2036 23.7407 3.95068 21.2349C3.95068 21.1961 3.97652 21.1445 3.97652 21.1057C5.55235 21.5707 7.17985 21.9195 8.79443 22.1907C9.0786 23.8182 9.41443 25.4328 9.87943 27.0086Z"
                      fill="#862FC0"
                    />
                    <path
                      d="M27.0463 21.2478C25.7675 23.8182 23.6363 25.8978 21.04 27.1507C21.5309 25.5103 21.9442 23.857 22.2155 22.1907C23.843 21.9195 25.4446 21.5707 27.0205 21.1057C27.0075 21.1574 27.0463 21.209 27.0463 21.2478Z"
                      fill="#862FC0"
                    />
                    <path
                      d="M27.1496 9.9587C25.5221 9.46787 23.8817 9.06745 22.2155 8.78329C21.9442 7.11704 21.5438 5.4637 21.04 3.84912C23.7138 5.12787 25.8709 7.28495 27.1496 9.9587Z"
                      fill="#862FC0"
                    />
                    <path
                      d="M9.88188 3.99139C9.41688 5.56722 9.08104 7.16889 8.80979 8.79639C7.14354 9.05472 5.49021 9.46805 3.84979 9.95889C5.10271 7.36264 7.18229 5.23139 9.75271 3.95264C9.79146 3.95264 9.84313 3.99139 9.88188 3.99139Z"
                      fill="#862FC0"
                    />
                    <path
                      d="M20.0079 8.512C17.0112 8.17617 13.9887 8.17617 10.9921 8.512C11.315 6.74242 11.7283 4.97284 12.3096 3.26784C12.3354 3.1645 12.3225 3.087 12.3354 2.98367C13.3558 2.73825 14.4021 2.58325 15.5 2.58325C16.585 2.58325 17.6441 2.73825 18.6516 2.98367C18.6646 3.087 18.6646 3.1645 18.6904 3.26784C19.2716 4.98575 19.685 6.74242 20.0079 8.512Z"
                      fill="#862FC0"
                    />
                    <path
                      d="M8.51206 20.008C6.72956 19.6851 4.9729 19.2718 3.2679 18.6905C3.16456 18.6647 3.08706 18.6776 2.98373 18.6647C2.73831 17.6443 2.58331 16.598 2.58331 15.5001C2.58331 14.4151 2.73831 13.3559 2.98373 12.3484C3.08706 12.3355 3.16456 12.3355 3.2679 12.3097C4.98581 11.7414 6.72956 11.3151 8.51206 10.9922C8.18915 13.9889 8.18915 17.0114 8.51206 20.008Z"
                      fill="#862FC0"
                    />
                    <path
                      d="M28.4167 15.5001C28.4167 16.598 28.2617 17.6443 28.0162 18.6647C27.9129 18.6776 27.8354 18.6647 27.7321 18.6905C26.0142 19.2589 24.2575 19.6851 22.4879 20.008C22.8237 17.0114 22.8237 13.9889 22.4879 10.9922C24.2575 11.3151 26.0271 11.7284 27.7321 12.3097C27.8354 12.3355 27.9129 12.3484 28.0162 12.3484C28.2617 13.3689 28.4167 14.4151 28.4167 15.5001Z"
                      fill="#862FC0"
                    />
                    <path
                      d="M20.0079 22.488C19.685 24.2705 19.2716 26.0272 18.6904 27.7322C18.6646 27.8355 18.6646 27.913 18.6516 28.0164C17.6441 28.2618 16.585 28.4168 15.5 28.4168C14.4021 28.4168 13.3558 28.2618 12.3354 28.0164C12.3225 27.913 12.3354 27.8355 12.3096 27.7322C11.7412 26.0143 11.315 24.2705 10.9921 22.488C12.4904 22.656 13.9887 22.7722 15.5 22.7722C17.0112 22.7722 18.5225 22.656 20.0079 22.488Z"
                      fill="#862FC0"
                    />
                    <path
                      d="M20.3609 20.3609C17.1304 20.7685 13.8696 20.7685 10.639 20.3609C10.2314 17.1303 10.2314 13.8695 10.639 10.6389C13.8696 10.2314 17.1304 10.2314 20.3609 10.6389C20.7685 13.8695 20.7685 17.1303 20.3609 20.3609Z"
                      fill="#862FC0"
                    />
                  </svg>
                </div>
                <div className="left-text">
                  <h6>{teamMember?.name}</h6>
                  <p>
                    {teamMember
                      ? `${teamMember.durationDays || 0} days, ${
                          teamMember.durationHours || 0
                        } hours, ${teamMember.durationMins || 0} mins`
                      : "0 days, 0 hours, 0 mins"}
                  </p>
                  <p>{teamMember?.price} CORE</p>
                </div>
              </div>
              <div className="right-side">
                <a
                  onClick={() => {
                    setCurrId(index);
                    setModalInputValues(teamMember);
                    handleShow();
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                  >
                    <path
                      d="M4.155 14.6399C3.6975 14.6399 3.27001 14.4824 2.96251 14.1899C2.57251 13.8224 2.38501 13.2674 2.45251 12.6674L2.73001 10.2374C2.78251 9.77991 3.06001 9.17241 3.38251 8.84241L9.54001 2.32491C11.0775 0.697415 12.6825 0.652415 14.31 2.18991C15.9375 3.72741 15.9825 5.33241 14.445 6.95991L8.28751 13.4774C7.97251 13.8149 7.38751 14.1299 6.93001 14.2049L4.51501 14.6174C4.38751 14.6249 4.275 14.6399 4.155 14.6399ZM11.9475 2.18241C11.37 2.18241 10.8675 2.54241 10.3575 3.08241L4.20001 9.60742C4.05 9.76492 3.87751 10.1399 3.84751 10.3574L3.57001 12.7874C3.54001 13.0349 3.60001 13.2374 3.73501 13.3649C3.87001 13.4924 4.07251 13.5374 4.32001 13.4999L6.735 13.0874C6.95251 13.0499 7.31251 12.8549 7.46251 12.6974L13.62 6.17991C14.55 5.18991 14.8875 4.27491 13.53 2.99991C12.93 2.42241 12.4125 2.18241 11.9475 2.18241Z"
                      fill="white"
                    />
                    <path
                      d="M13.005 8.21239C12.99 8.21239 12.9675 8.21239 12.9525 8.21239C10.6125 7.97989 8.73001 6.20239 8.37001 3.87739C8.32501 3.56989 8.53501 3.28489 8.84251 3.23239C9.15001 3.18739 9.43501 3.39739 9.48751 3.70489C9.77251 5.51989 11.2425 6.91489 13.0725 7.09489C13.38 7.12489 13.605 7.40239 13.575 7.70989C13.5375 7.99489 13.29 8.21239 13.005 8.21239Z"
                      fill="white"
                    />
                    <path
                      d="M15.75 17.0625H2.25C1.9425 17.0625 1.6875 16.8075 1.6875 16.5C1.6875 16.1925 1.9425 15.9375 2.25 15.9375H15.75C16.0575 15.9375 16.3125 16.1925 16.3125 16.5C16.3125 16.8075 16.0575 17.0625 15.75 17.0625Z"
                      fill="white"
                    />
                  </svg>
                </a>
                {teamMembers != 0 ? (
                  <a
                    onClick={() => handleDeleteTeamMember(teamMember?.id)}
                    className="btn-delete"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                    >
                      <path
                        d="M15.75 5.04748C15.735 5.04748 15.7125 5.04748 15.69 5.04748C11.7225 4.64998 7.7625 4.49998 3.84 4.89748L2.31 5.04748C1.995 5.07748 1.7175 4.85248 1.6875 4.53748C1.6575 4.22248 1.8825 3.95248 2.19 3.92248L3.72 3.77248C7.71 3.36748 11.7525 3.52498 15.8025 3.92248C16.11 3.95248 16.335 4.22998 16.305 4.53748C16.2825 4.82998 16.035 5.04748 15.75 5.04748Z"
                        fill="#E84A4A"
                      />
                      <path
                        d="M6.37501 4.29C6.34501 4.29 6.31501 4.29 6.27751 4.2825C5.97751 4.23 5.76751 3.9375 5.82001 3.6375L5.98501 2.655C6.10501 1.935 6.27001 0.9375 8.01751 0.9375H9.98251C11.7375 0.9375 11.9025 1.9725 12.015 2.6625L12.18 3.6375C12.2325 3.945 12.0225 4.2375 11.7225 4.2825C11.415 4.335 11.1225 4.125 11.0775 3.825L10.9125 2.85C10.8075 2.1975 10.785 2.07 9.99001 2.07H8.02501C7.23001 2.07 7.21501 2.175 7.10251 2.8425L6.93001 3.8175C6.88501 4.095 6.64501 4.29 6.37501 4.29Z"
                        fill="#E84A4A"
                      />
                      <path
                        d="M11.4075 17.0626H6.5925C3.975 17.0626 3.87 15.6151 3.7875 14.4451L3.3 6.89256C3.2775 6.58506 3.5175 6.31506 3.825 6.29256C4.14 6.27756 4.4025 6.51006 4.425 6.81756L4.9125 14.3701C4.995 15.5101 5.025 15.9376 6.5925 15.9376H11.4075C12.9825 15.9376 13.0125 15.5101 13.0875 14.3701L13.575 6.81756C13.5975 6.51006 13.8675 6.27756 14.175 6.29256C14.4825 6.31506 14.7225 6.57756 14.7 6.89256L14.2125 14.4451C14.13 15.6151 14.025 17.0626 11.4075 17.0626Z"
                        fill="#E84A4A"
                      />
                      <path
                        d="M10.245 12.9375H7.7475C7.44 12.9375 7.185 12.6825 7.185 12.375C7.185 12.0675 7.44 11.8125 7.7475 11.8125H10.245C10.5525 11.8125 10.8075 12.0675 10.8075 12.375C10.8075 12.6825 10.5525 12.9375 10.245 12.9375Z"
                        fill="#E84A4A"
                      />
                      <path
                        d="M10.875 9.9375H7.125C6.8175 9.9375 6.5625 9.6825 6.5625 9.375C6.5625 9.0675 6.8175 8.8125 7.125 8.8125H10.875C11.1825 8.8125 11.4375 9.0675 11.4375 9.375C11.4375 9.6825 11.1825 9.9375 10.875 9.9375Z"
                        fill="#E84A4A"
                      />
                    </svg>
                  </a>
                ) : (
                  ""
                )}
              </div>
            </div>
          ))}
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
            <input
              type="text"
              className="stepinput"
              placeholder="Name"
              name="name"
              value={modalInputValues?.name}
              onChange={handleModalInputChange}
            />
          </div>
          <div className="stepinputmain">
            <p className="stepinputpara">Sale price</p>
            <input
              type="number"
              className="stepinput"
              placeholder="Example: 0.01"
              name="price"
              value={modalInputValues?.price}
              onChange={handleModalInputChange}
            />
            <span className="abs-text">Core</span>
          </div>
          <div className="twice-input-fields">
            <label>Duration</label>
            <div className="option-parent">
              <div className="option-field">
                <input
                  type="number"
                  placeholder="0"
                  name="durationDays"
                  value={modalInputValues?.durationDays}
                  onChange={handleModalInputChange}
                  style={{ paddingRight: "60px" }}
                />
                <span>Days</span>
              </div>
              <div className="option-field">
                <input
                  type="number"
                  placeholder="0"
                  name="durationHours"
                  value={modalInputValues?.durationHours}
                  onChange={handleModalInputChange}
                  style={{ paddingRight: "60px" }}
                />
                <span>Hours</span>
              </div>
              <div className="option-field">
                <input
                  type="number"
                  placeholder="0"
                  name="durationMins"
                  value={modalInputValues?.durationMins}
                  onChange={handleModalInputChange}
                  style={{ paddingRight: "60px" }}
                />
                <span>Mins</span>
              </div>
            </div>
          </div>
          <div className="twice-field">
            {/* <div className="single-field">
                            <h6>Per-wallet mint limit (optional)</h6>
                            {
                                isSwitchOn && <input className='oncheckinput' type='text' placeholder='0' />
                            }
                            <div className="derivativemain">
                                <label class="switch">
                                    <input type="checkbox" checked={isSwitchOn}
                                        onChange={handleToggleSwitch} />
                                    <div class="slidercheck"></div>
                                    <div class="slider-card">
                                        <div class="slider-card-face slider-card-front"></div>
                                        <div class="slider-card-face slider-card-back"></div>
                                    </div>
                                </label>

                            </div>
                        </div> */}
            {/* <div className="single-field">
                            <h6>Per-wallet mint limit (optional)</h6>
                             <input className='oncheckinput' type='text' value={formDataname?.perWalletLimit} onChange={(e) => setFormDataName({ ...formDataname, perWalletLimit: e.target.value })} placeholder='0' /> 
                            <div className="derivativemain">
                                <label className="switch">
                                    <input type="checkbox" checked={isSwitchOn} onChange={handleToggleSwitch} />
                                    <div className="slidercheck"></div>
                                    <div className="slider-card">
                                        <div className="slider-card-face slider-card-front"></div>
                                        <div className="slider-card-face slider-card-back"></div>
                                    </div>
                                </label>
                            </div>
                        </div> */}

            {/* <div className="single-field">
                            <h6>Allowlist</h6>
                            <div className="derivativemain">
                                <label class="switch">
                                    <input type="checkbox" checked={isSwitchOn1}
                                        onChange={handleToggleSwitch1} />
                                    <div class="slidercheck"></div>
                                    <div class="slider-card">
                                        <div class="slider-card-face slider-card-front"></div>
                                        <div class="slider-card-face slider-card-back"></div>
                                    </div>
                                </label>
                            </div>
                        </div> */}
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
            <button className="bluebtn" onClick={handleModalDoneClick}>
              Done
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Mintinfo;
