import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import Environment from "@/utils/Enviroment";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useWeb3React } from "@web3-react/core";
import useAuth from "@/hooks/useAuth";
import { Modal } from "react-bootstrap";
import { browserName, isBrowser } from "react-device-detect";

const Signup = () => {
  const api_url = Environment.api_url;
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [otp, setOtp] = useState("");
  const [addresserror, setAddressError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showPass, setShowPass] = useState("password");
  const [showCon, setShowCon] = useState("password");
  let { account } = useWeb3React();
  const { login, logout } = useAuth();

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
  console.log(isBrowser, "vv");
  const userRegister = () => {
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setAddressError("");
    const trimmedAddress = address.trim();
    if (email.length === 0) {
      setEmailError("Email is required");
      return;
    } else if (!isValidEmail(email)) {
      setEmailError("Email is invalid");
      return;
    }

    if (!account && trimmedAddress.length === 0) {
      setAddressError("Address is required");
      return;
    } else if (!account && trimmedAddress.length !== 42) {
      setAddressError("Invalid wallet address");
      return;
    }
    if (password.length === 0) {
      setPasswordError("Password is required");
      return;
    } else if (
      password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/\d/.test(password) ||
      !/[^A-Za-z0-9]/.test(password)
    ) {
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }
    // if (otp.length === 0) {
    //   setOtpError("Otp is Required");
    //   return;
    // }

    if (!account) {
      toast.error("Connect Wallet to Signup");
      return;
    }

    var data = JSON.stringify({
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      walletAddress: account || address,
      // otpCode: otp,
    });
    var config = {
      method: "post",
      url: `${api_url}/auth/creators/signup`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        router.push("/login");
        toast.success("Sign up successful. Please login.");
      })
      .catch(function (error) {
        toast.error(error.response?.data?.message);
      });
  };

  const VerifyEmail = () => {
    const payload = {
      email: email,
    };
    axios
      .post(`${api_url}/genrateOtp/create-email-verification-code`, payload)
      .then((response) => {
        toast.info("Otp Sent To Your Email");
        handleClose();
        // window.location.href = "https://mail.google.com";
        console.log("Email verification code sent successfully.");
      })
      .catch((error) => {
        console.error("Error sending email verification code:", error);
      });
  };

  //   const connectWallet = async (e) => {
  //     if (account) {
  //       const connectorId = window.localStorage.getItem("connectorId");
  //       await logout(connectorId);
  //       localStorage.removeItem("connectorId");
  //       localStorage.removeItem("flag");
  //     } else {
  //       await login("injected", e);
  //       localStorage.setItem("connectorId", "injected");
  //       localStorage.setItem("flag", "true");
  //       localStorage.setItem("chain", e);
  //     }
  //   };

  //   const disconnectWallet = async () => {
  //     const connectorId = window.localStorage.getItem("connectorId");
  //     logout(connectorId);
  //     localStorage.removeItem("connectorId");
  //     localStorage.removeItem("flag");
  //     localStorage.removeItem("chain");
  //   };

  const connectWallet = async (e) => {
    console.log("connector");
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

  const disconnectWallet = async () => {
    const connectorId = window.localStorage.getItem("connectorId");
    logout(connectorId);
    localStorage.removeItem("connectorId");
    localStorage.removeItem("flag");
    localStorage.removeItem("chain");
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <section className="login-section">
        <span className="gradient-linear"></span>
        <div className="parent">
          <img
            src="\login-logo.svg"
            alt="img"
            className="img-fluid login-logo"
          />
          <div className="main-card">
            <div className="main-heading">
              <h6>Sign up</h6>
              <p>Enter your credentials to access your account</p>
            </div>
            <div className="option-field">
              <label>Email</label>
              <div className="twice-inputeye">
                <input
                  style={{ paddingRight: "22px" }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Your email..."
                />
                {/* <a onClick={handleShow} className="eye verify-text">
                  Verify
                </a> */}
              </div>
              {emailError && <p className="text-danger">{emailError}</p>}
            </div>
            <div className="option-field wallletaddress-field">
              <label>Wallet Address</label>
              <div className="twice-elem">
                <input
                  value={account || address}
                  onChange={(e) => setAddress(e.target.value)}
                  style={{ paddingRight: "22px" }}
                  type="text"
                  placeholder="Your Wallet Address..."
                />
                {account ? (
                  <a
                    onClick={() => disconnectWallet()}
                    className="connect-btn ifdisconnect "
                  >
                    Disconnect
                  </a>
                ) : (
                  <a
                    onClick={() => connectWallet("1116")}
                    className="connect-btn "
                  >
                    Connect Wallet
                  </a>
                )}

                {/* {isBrowser ? (
                  <div
                    className="connect-btn  d-flex "
                    onClick={() => {
                      connectWallet("1116");
                      handleClose();
                    }}
                  >
                    <img
                      src="\assets\navbarassets\metamask.svg"
                      alt="connectimg"
                      className="connectimg"
                    />
                    <p className="connectpara">Metamask</p>
                  </div>
                ) : (
                  <>
                    {browserName === "Safari" ||
                    browserName === "Mobile Safari" ||
                    browserName === "Brave" ||
                    browserName === "Firefox" ||
                    browserName === "Chrome" ? (
                      <a
                        id="speicalAZ213"
                        href="https://metamask.app.link/dapp/creator.wizardgallery.xyz//"
                        className="hideBTN"
                      >
                        <div className="connect-btn d-sm-none d-flex ">
                          <img
                            src="\assets\navbarassets\metamask.svg"
                            alt="connectimg"
                            className="connectimg"
                          />
                          <p className="connectpara">Metamask22</p>
                        </div>
                      </a>
                    ) : (
                      <div
                        className="connect-btn d-sm-none d-flex "
                        onClick={() => {
                          connectWallet("1116");
                          handleClose();
                        }}
                      >
                        <img
                          src="\assets\navbarassets\metamask.svg"
                          alt="connectimg"
                          className="connectimg"
                        />
                        <p className="connectpara">Metamask</p>
                      </div>
                    )}
                  </>
                )} */}
              </div>
              {addresserror && <p className="text-danger">{addresserror}</p>}
            </div>
            <div className="option-field">
              <label>Password</label>
              <div className="twice-inputeye">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPass}
                  placeholder="Your password..."
                />
                <svg
                  onClick={() => {
                    showPass === "password"
                      ? setShowPass("text")
                      : setShowPass("password");
                  }}
                  className="eye"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                >
                  {showPass === "password" ? (
                    <>
                      <path
                        d="M15.5799 12.9765C15.5799 14.9565 13.9799 16.5565 11.9999 16.5565C10.0199 16.5565 8.41992 14.9565 8.41992 12.9765C8.41992 10.9965 10.0199 9.39648 11.9999 9.39648C13.9799 9.39648 15.5799 10.9965 15.5799 12.9765Z"
                        stroke="#745F8C"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M11.9998 21.2463C15.5298 21.2463 18.8198 19.1663 21.1098 15.5663C22.0098 14.1563 22.0098 11.7863 21.1098 10.3763C18.8198 6.77629 15.5298 4.69629 11.9998 4.69629C8.46984 4.69629 5.17984 6.77629 2.88984 10.3763C1.98984 11.7863 1.98984 14.1563 2.88984 15.5663C5.17984 19.1663 8.46984 21.2463 11.9998 21.2463Z"
                        stroke="#745F8C"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </>
                  ) : (
                    <>
                      <path
                        d="M15.0299 10.446L9.96992 15.506C9.31992 14.856 8.91992 13.966 8.91992 12.976C8.91992 10.996 10.5199 9.396 12.4999 9.396C13.4899 9.396 14.3799 9.796 15.0299 10.446Z"
                        stroke="#862FC0"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M18.3198 6.74605C16.5698 5.42605 14.5698 4.70605 12.4998 4.70605C8.96984 4.70605 5.67984 6.78605 3.38984 10.3861C2.48984 11.7961 2.48984 14.1661 3.38984 15.5761C4.17984 16.8161 5.09984 17.8861 6.09984 18.7461"
                        stroke="#862FC0"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8.91992 20.5063C10.0599 20.9863 11.2699 21.2463 12.4999 21.2463C16.0299 21.2463 19.3199 19.1663 21.6099 15.5663C22.5099 14.1563 22.5099 11.7862 21.6099 10.3762C21.2799 9.85625 20.9199 9.36625 20.5499 8.90625"
                        stroke="#862FC0"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16.0099 13.6763C15.7499 15.0863 14.5999 16.2363 13.1899 16.4963"
                        stroke="#862FC0"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9.97 15.5059L2.5 22.9759"
                        stroke="#862FC0"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M22.4998 2.97607L15.0298 10.4461"
                        stroke="#862FC0"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </>
                  )}
                </svg>
              </div>
              {/* <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                viewBox="0 0 25 25"
                                fill="none"
                            >
                            </svg> */}
            </div>
            {/* {passwordError && <p className="text-danger mb-5">{passwordError}</p>} */}
            {/* <div className="password-must">
                            <h5>Password Must:</h5>
                            <ul className={passwordError ? "valid" : "invalid"}>
                                <li className={password.length >= 8 ? "valid" : "invalid"}>Be at least 8 characters long</li>
                                <li className={/[A-Z]/.test(password) ? "valid" : "invalid"}>Have at least one uppercase letter</li>
                                <li className={/[!@#$%^&*]/.test(password) ? "valid" : "invalid"}>Contain at least one special character</li>
                            </ul>
                        </div> */}
            <div className="password-must">
              <h5>Password Must:</h5>
              <ul className={passwordError ? "invalid" : "valid"}>
                <li className={password.length >= 8 ? "valid" : "invalid"}>
                  Be at least 8 characters long
                </li>
                <li className={/[A-Z]/.test(password) ? "valid" : "invalid"}>
                  Have at least one uppercase letter
                </li>
                <li className={/[a-z]/.test(password) ? "valid" : "invalid"}>
                  Have at least one lowercase letter
                </li>
                <li className={/\d/.test(password) ? "valid" : "invalid"}>
                  Contain at least one digit
                </li>
                <li
                  className={/[!@#$%^&*]/.test(password) ? "valid" : "invalid"}
                >
                  Contain at least one special character
                </li>
              </ul>
            </div>
            <div className="option-field">
              <label>Confirm password</label>
              <div className="twice-inputeye">
                <input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type={showCon}
                  placeholder="Confirm password..."
                />
                <svg
                  onClick={() => {
                    showCon === "password"
                      ? setShowCon("text")
                      : setShowCon("password");
                  }}
                  className="eye"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                >
                  {showCon === "password" ? (
                    <>
                      <path
                        d="M15.5799 12.9765C15.5799 14.9565 13.9799 16.5565 11.9999 16.5565C10.0199 16.5565 8.41992 14.9565 8.41992 12.9765C8.41992 10.9965 10.0199 9.39648 11.9999 9.39648C13.9799 9.39648 15.5799 10.9965 15.5799 12.9765Z"
                        stroke="#745F8C"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M11.9998 21.2463C15.5298 21.2463 18.8198 19.1663 21.1098 15.5663C22.0098 14.1563 22.0098 11.7863 21.1098 10.3763C18.8198 6.77629 15.5298 4.69629 11.9998 4.69629C8.46984 4.69629 5.17984 6.77629 2.88984 10.3763C1.98984 11.7863 1.98984 14.1563 2.88984 15.5663C5.17984 19.1663 8.46984 21.2463 11.9998 21.2463Z"
                        stroke="#745F8C"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </>
                  ) : (
                    <>
                      <path
                        d="M15.0299 10.446L9.96992 15.506C9.31992 14.856 8.91992 13.966 8.91992 12.976C8.91992 10.996 10.5199 9.396 12.4999 9.396C13.4899 9.396 14.3799 9.796 15.0299 10.446Z"
                        stroke="#862FC0"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M18.3198 6.74605C16.5698 5.42605 14.5698 4.70605 12.4998 4.70605C8.96984 4.70605 5.67984 6.78605 3.38984 10.3861C2.48984 11.7961 2.48984 14.1661 3.38984 15.5761C4.17984 16.8161 5.09984 17.8861 6.09984 18.7461"
                        stroke="#862FC0"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8.91992 20.5063C10.0599 20.9863 11.2699 21.2463 12.4999 21.2463C16.0299 21.2463 19.3199 19.1663 21.6099 15.5663C22.5099 14.1563 22.5099 11.7862 21.6099 10.3762C21.2799 9.85625 20.9199 9.36625 20.5499 8.90625"
                        stroke="#862FC0"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16.0099 13.6763C15.7499 15.0863 14.5999 16.2363 13.1899 16.4963"
                        stroke="#862FC0"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9.97 15.5059L2.5 22.9759"
                        stroke="#862FC0"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M22.4998 2.97607L15.0298 10.4461"
                        stroke="#862FC0"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </>
                  )}
                </svg>
              </div>
              {/* <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                viewBox="0 0 25 25"
                                fill="none"
                            >
                            </svg> */}
            </div>
            {confirmPasswordError && (
              <p className="text-danger mb-5">{confirmPasswordError}</p>
            )}
            {/* <div className="option-field">
              <label>Enter Otp</label>
              <div className="twice-inputeye">
                <input
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value);
                    setOtpError("");
                  }}
                  placeholder="Enter Otp"
                />
              </div>
              {otpError && <p className="text-danger mb-5">{otpError}</p>}
            </div> */}
            <button onClick={userRegister} className="btn-sign">
              Sign Up
            </button>
            <Link href="/login" className="btn-forgot">
              <span style={{ color: "#fff" }}>
                Already have an account? &nbsp;
              </span>{" "}
              Sign in{" "}
            </Link>
          </div>
        </div>
      </section>

      <Modal className="buymodal" show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Verify Email</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="confirmemail-address">
            <p>You’re just one step away from unlocking a magical journey.</p>
            <p>
              To complete your signup and start your journey with us, please
              confirm your email address by clicking the link below:
            </p>
          </div>
          <div className="buymodalbtns">
            <button onClick={VerifyEmail} className="bluebtn">
              Verify Email Address
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Signup;
