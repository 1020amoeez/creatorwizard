"use client";

import React from "react";

const StepMint = ({ CreateCollection, createcollection }) => {
  return (
    <>
      <section className="stepmain">
        <p className="stepheadparacollection">Step 4 of 4</p>
        <h4 className="stepheadcollection">Submit</h4>
        <p className="collectionpara">Review your details and submit </p>
        <div className="submit-section">
          <div className="twice-imgs">
            <div className="profile-conent">
              <label>Profile Image</label>
              <div className="profile-img">
                {createcollection?.imageUrl ? (
                  <img
                    src={createcollection?.imageUrl}
                    alt="img"
                    className="img-fluid"
                  />
                ) : (
                  <img
                    src="assets/discovercollection/upload-img.png"
                    alt="img"
                    className="img-fluid"
                  />
                )}
              </div>
            </div>
            <div className="profile-conent cover-img">
              <label>Featured Image</label>
              <div className="profile-img">
                {createcollection?.featureImageUrl ? (
                  <img
                    src={createcollection?.featureImageUrl}
                    alt="img"
                    className="img-fluid"
                  />
                ) : (
                  <img
                    src="assets/discovercollection/upload-img.png"
                    alt="img"
                    className="img-fluid"
                  />
                )}
              </div>
            </div>
          </div>
          <div className="basic-data">
            <div className="single-text">
              <p>Collection Name</p>
              <h6>{createcollection?.name}</h6>
            </div>
            <div className="single-text">
              <p>Collection Description</p>
              <h6>{createcollection?.description}</h6>
            </div>
            <div className="twice-field-text">
              <div className="single-text">
                <p>Collection Symbol</p>
                <h6>{createcollection?.symbol}</h6>
              </div>
              <div className="single-text">
                <p>Twitter</p>
                <h6>{createcollection?.twitterUrl}</h6>
              </div>
            </div>
            <div className="twice-field-text">
              {/* <div className="single-text">
                                <p>Discord</p>
                                <h6>{createcollection?.discordUrl}</h6>
                            </div> */}
              <div className="single-text">
                <p>Website (URL)</p>
                <h6>{createcollection?.websiteUrl}</h6>
              </div>
            </div>
            <div className="single-text">
              <p>Total supply</p>
              <h6>{createcollection?.totalSupply}</h6>
            </div>
          </div>
        </div>
        <button onClick={CreateCollection} className="stepbtn">
          Submit
        </button>
      </section>
    </>
  );
};

export default StepMint;
