import React from "react";
import useWindowDimensions from "../hooks/getDimensions"
import mainloader from "../assets/logo.svg";

const Loader = ({ text }) => {
  const { width } = useWindowDimensions();

  return (
    <>
      <div className="">
        <div
          className="position-fixed w-100"
          style={{
            zIndex: 1100,
            // marginTop: -200,
            top: 0,
            height: "135%",
            marginLeft: width > 992 ? 0 : 0,
            background: "rgba(0, 0, 0, 0.6)",
            webkitBackdropFilter: "blur(6px)",
            backdropFilter: "blur(6px)",
          }}
        >
          <div className="vh-100 d-flex align-items-center justify-content-center">
            <div className="d-flex flex-wrap align-items-center justify-content-center">
              {/* <img
                width={150}
                src="https://v.fastcdn.co/u/430e104e/57579327-0-Loaders-3.svg"
                alt="loader"
              /> */}
              <div className="image-container">
                <img src={mainloader} alt="Your Image" className="fade" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Loader;
