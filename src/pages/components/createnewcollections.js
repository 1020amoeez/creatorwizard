"use client";

import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import axios from "axios";
import Environment from "@/utils/Enviroment";
import dynamic from "next/dynamic";
import Footer from "./footer";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";

const Stepcollection = dynamic(() => import("./stepcollection"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const Stepdetail = dynamic(() => import("./stepdetail"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const StepMint = dynamic(() => import("./stepmint"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const Stepsubmit = dynamic(() => import("./stepsubmit"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const CreateNewCollections = () => {
  const isLocalStorageAvailable = typeof localStorage !== "undefined";
  const router = useRouter();
  const [currentCollection, setCurrentCollection] = useState(1);
  const api_url = Environment.api_url;
  const [accessToken, setAccessToken] = useState("");
  const [completedSteps, setCompletedSteps] = useState([]);
  useEffect(() => {
    const val = localStorage.getItem("accessToken");
    setAccessToken(val);
  }, []);
  const [createcollection, setCreateCollection] = useState(() => {
    if (isLocalStorageAvailable) {
      const savedData = localStorage.getItem("createcollection");
      return savedData
        ? JSON.parse(savedData)
        : {
            name: "",
            symbol: "",
            description: "",
            launchpadImage: "",
            featureImageUrl: "",
            totalSupply: "",
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
        launchpadImage: "",
        featureImageUrl: "",
        totalSupply: "",
        websiteUrl: "",
        discordUrl: "",
        twitterUrl: "",
        // royalties: "",
      };
    }
  });
  useEffect(() => {
    localStorage.setItem("createcollection", JSON.stringify(createcollection));
  }, [createcollection]);

  const CreateCollection = async () => {
    const storedCollection = JSON.parse(
      localStorage.getItem("createcollection")
    );
    const collectionimg = localStorage.getItem("collectionImageUrl");
    const collectionData = {
      name: storedCollection?.name,
      symbol: storedCollection?.symbol,
      description: storedCollection?.description,
      // twitterUrl: storedCollection?.twitterUrl,
      // discordUrl: storedCollection?.discordUrl,
      // websiteUrl: storedCollection?.websiteUrl,
      imageUrl: storedCollection?.imageUrl,
      featureImageUrl: collectionimg,
      totalSupply: storedCollection?.totalSupply,
    };
    if (storedCollection?.websiteUrl) {
      collectionData.websiteUrl = storedCollection?.websiteUrl;
    }
    if (storedCollection?.discordUrl) {
      collectionData.discordUrl = storedCollection?.discordUrl;
    }
    if (storedCollection?.twitterUrl) {
      collectionData.twitterUrl = storedCollection?.twitterUrl;
    }
    var config = {
      method: "put",
      url: api_url + "/launchpads/collection",
      data: collectionData,
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    };
    const response = await axios(config);
    toast.success(response?.data?.message);
    router.push("/mycollection");
    localStorage.removeItem("currentCollection");
    localStorage.removeItem("createcollection");
    try {
      await axios(config);
      onNext();
    } catch (error) {
      toast.error(error?.response?.data?.details?.[0]?.totalSupply);
      toast.error(error?.response?.data?.message);
      // toast.error(error?.response?.data?.message)
      // Handle error
    }
  };

  const handleNextStep = () => {
    setCurrentCollection((prevStep) => {
      if (isLocalStorageAvailable) {
        localStorage.setItem("currentCollection", (prevStep + 1).toString());
      }
      return prevStep + 1;
    });
  };

  useEffect(() => {
    if (isLocalStorageAvailable) {
      const storedStep = localStorage.getItem("currentCollection");

      if (!storedStep) {
        localStorage.setItem("currentCollection", currentCollection.toString());
      } else {
        setCurrentCollection(parseInt(storedStep));
      }
    }
  }, [currentCollection, isLocalStorageAvailable]);

  const renderContent = () => {
    switch (currentCollection) {
      case 1:
        return (
          <>
            <Stepcollection
              onNext={handleNextStep}
              createcollection={createcollection}
              setCreateCollection={setCreateCollection}
            />
          </>
        );
      case 2:
        return (
          <>
            <Stepdetail
              onNext={handleNextStep}
              createcollection={createcollection}
              setCreateCollection={setCreateCollection}
            />
          </>
        );
      case 3:
        return (
          <>
            <StepMint
              onNext={handleNextStep}
              createcollection={createcollection}
              setCreateCollection={setCreateCollection}
            />
          </>
        );
      case 4:
        return (
          <>
            <Stepsubmit
              createcollection={createcollection}
              setCreateCollection={setCreateCollection}
              CreateCollection={CreateCollection}
            />
          </>
        );
      default:
        return null;
    }
  };
  const handleTabClick = (step) => {
    setCurrentCollection(step);
    if (isLocalStorageAvailable) {
      localStorage.setItem("currentCollection", step.toString());
    }
  };

  return (
    <>
      <Navbar />
      <section className="createnew">
        <span className="bottomshade"></span>
        <div className="custom-container">
          <div className="createparent">
            <div className="left">
              <h2>Apply for listing</h2>
              <div className="leftcard">
                {/* <ul>
                                    <li><a className={currentCollection == 1 ? 'active listinner' : 'listinner'}>Collection Info {currentCollection === 2 || currentCollection === 3 || currentCollection === 4 ? (
                                        <img src="\assets\tick-circle.svg" alt="img" className='ticker' />
                                    ) : null}
                                    </a></li>
                                    <li><a className={currentCollection == 2 ? 'active listinner' : 'listinner'}>Listing details {currentCollection === 2 || currentCollection === 3 || currentCollection === 4 ? (
                                        <img src="\assets\tick-circle.svg" alt="img" className='ticker' />
                                    ) : null}</a></li>
                                    <li><a className={currentCollection == 3 ? 'active listinner' : 'listinner'}>Mint info {currentCollection === 3 || currentCollection === 4 ? (
                                        <img src="\assets\tick-circle.svg" alt="img" className='ticker' />
                                    ) : null}</a></li>
                                    <li><a className={currentCollection == 4 ? 'active listinner' : 'listinner'}>Submit {currentCollection === 4 ? (
                                        <img src="\assets\tick-circle.svg" alt="img" className='ticker' />
                                    ) : null}</a></li>
                                </ul> */}
                <ul>
                  {[
                    "Collection Info",
                    "Listing details",
                    "Mint info",
                    "Submit",
                  ].map((tab, index) => (
                    <li key={index}>
                      <a
                        className={
                          currentCollection === index + 1
                            ? "active listinner"
                            : "listinner"
                        }
                        onClick={() => handleTabClick(index + 1)}
                      >
                        {tab}
                        {completedSteps.includes(index + 1) ? (
                          <img
                            src="\assets\tick-circle.svg"
                            alt="img"
                            className="ticker"
                          />
                        ) : null}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="content">{renderContent()}</div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default CreateNewCollections;
