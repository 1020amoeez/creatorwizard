import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { Dropdown, Offcanvas } from 'react-bootstrap'
import useAuth from '@/hooks/useAuth';
import { useWeb3React } from '@web3-react/core';
import { useRouter } from 'next/router';
import useWeb3 from '@/hooks/useWeb3';
import Web3 from 'web3';
import Environment from '@/utils/Enviroment';
import axios from 'axios';
import { toast } from 'react-toastify';


const Navbar = () => {

  const api_url = Environment.api_url;


  const [profile, setProfile] = useState([]);
  console.log(profile, 'dedede');
  const [clickedbtn, setclickedbtn] = useState(true);
  let { account } = useWeb3React();
  const [balance, setBalance] = useState();
  const router = useRouter();
  console.log(router, "router")
  const web3 = useWeb3();
  const web3a = new Web3();
  const [isCopied, setIsCopied] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  // const [profileData, setProfileData] = useState({});
  const [name, setName] = useState("");
  // const [imageprofile, setImageProfile] = useState("");



  useEffect(() => {
    let walletconn = localStorage.getItem("wallet");
    if (walletconn === "false") {
      setclickedbtn(false);
    }
  }, [])


  const [searchText, setSearchText] = useState('');

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show1, setShow1] = useState(false);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const [show2, setShow2] = useState(false);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const { login, logout } = useAuth();

  // useEffect(() => {
  //   const val = localStorage.getItem("accessToken");
  //   setAccessToken(val);
  //   const profile = JSON.parse(localStorage.getItem("profile")) || {};
  //   setProfileData(profile);
  //   setName(profile?.name || "");
  //   setImageProfile(profile?.profileImageUrl || "")
  // }, []);

  // useEffect(() => {
  //   const checkWalletAddress = () => {
  //     const profileString = localStorage.getItem("profile");
  //     if (!profileString) {
  //       return;
  //     }
  //     const profile = JSON.parse(profileString);
  //     const localStorageWalletAddress = profile.walletAddress;

  //     if (localStorageWalletAddress !== account) {
  //       toast.error("Wallet address from local storage does not match your account");
  //     }
  //   };
  //   checkWalletAddress();
  // }, [account]);


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


  const trustWallet = async (e) => {
    try {
      if (account) {
        await logout("walletconnect");
      } else {
        login("walletconnect", e);
        localStorage.setItem('connectorId', 'walletconnect');
        localStorage.setItem("flag", "true");
        setclickedbtn(false)
      }
    } catch (error) {
      console.error('Error during WalletConnect operation:', error);
      toast.error('An error occurred during WalletConnect operation');
    }
  };


  const disconnectWallet = async () => {
    const connectorId = window.localStorage.getItem("connectorId")
    logout(connectorId)
    localStorage.removeItem('connectorId')
    localStorage.removeItem('flag')
    localStorage.removeItem('chain')
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("profile");
      // localStorage.removeItem("profileData");
      // localStorage.clear();
      router.push("/")
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const checkBalance = async () => {
    try {
      if (account) {
        console.log();
        let balance = await web3.eth.getBalance(account);
        if (balance) {
          console.log("Balance:", balance);
          setBalance((balance?.toString() / 10 ** 18).toFixed(3));
        }
      }
    } catch (err) {
      console.error("Error checking balance:", err);
    }
  };

  useEffect(() => {
    if (account) {
      checkBalance();
    }
  }, [account, balance, web3]);

  const handleCopyClick = () => {
    const textToCopy = account;
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = textToCopy;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand('copy');
    document.body.removeChild(tempTextArea);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };




  const getProfile = async (accessToken) => {
    console.log("start in swdwww in navbarr");

    try {
      const config = {
        method: "get",
        url: `${api_url}/creators/profile`,
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      };
      let response = await axios(config);
      console.log(response?.data, "swdwww in navbarr");

      // Uncomment the lines below if you want to set the profile and save it to localStorage
      setProfile(response?.data?.data);
      // localStorage.setItem("profileData", JSON.stringify(response?.data?.data));
    } catch (error) {
      console.error("API Request Error: in navbarrrrr", error);
      if (error.response && error.response.status === 401) {
        router.push('/');
      }
    }
  };
  useEffect(() => {
    const val = localStorage.getItem("accessToken");
    setAccessToken(val);
  }, []);

  useEffect(() => {
    if (accessToken) {
      getProfile(accessToken);
    }
  }, [accessToken]);

  // useEffect(() => {
  //   if (accessToken) {
  //     const storedProfile = localStorage.getItem("profileData");
  //     if (storedProfile) {
  //       setProfile(JSON.parse(storedProfile));
  //     } else {
  //       getProfile(accessToken, setProfile);
  //     }
  //   }
  // }, [accessToken]);
  // useEffect(() => {
  //   console.log("accessToken:", accessToken);
  //   if (accessToken) {
  //     const storedProfile = localStorage.getItem("profileData");
  //     if (storedProfile) {
  //       setProfile(JSON.parse(storedProfile));
  //     } 
  //   }
  // }, [accessToken]);


  return (
    <>
      <section className="mainnavbar">
        <div className="custom-container">
          <div className="customnavbar">
            <Link href="/collectiondashbord">
              <img src="\assets\navbarassets\logo.svg" alt="logoimg" className="logoimg" />
            </Link>
            <div className="mid-links">
              <Link className={router.asPath === "/collectiondashbord" ?'active': ""} href="/collectiondashbord" >Launchpads</Link>
              <Link href="/mycollection" className={router.asPath === "/mycollection" ?'active': ""}>Collections</Link>
            </div>
            <div className="twice-items">
              {
                !account ?
                  <button onClick={handleShow} className="bluebtn">Connect Wallet</button>
                  :
                  <Dropdown className='profiledropdown' align='end'>
                    <Dropdown.Toggle id="dropdown-basic">
                      <div className="profilemainbtn">
                        <div className="profilemainimg">
                          <img src={profile?.profileImageUrl || '/assets/profile.png'} alt="profileinnerimg" className="profileinnerimg" />
                        </div>
                        <p className="profilemainwallet">
                          {account?.slice(0, 11)}...
                          {account?.slice(
                            account?.length - 3,
                            account?.length
                          )}
                        </p>
                        {/* <img src="\assets\navbarassets\arrow-down-profile.svg" alt="arrow" className="arrow" /> */}
                      </div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <h5 className="profilename">{profile?.name}</h5>
                      <div className="walletinner">
                        <p className="walletpara">

                          {account?.slice(0, 11)}...
                          {account?.slice(
                            account?.length - 3,
                            account?.length
                          )}
                        </p>
                        <img onClick={handleCopyClick} src="\assets\navbarassets\copy.svg" alt="copyimg" className="copyimg" />
                        {isCopied &&
                          <div className="copied text-white">Copied!</div>
                        }
                      </div>
                      <div className="balancemain">
                        <div className="balanceimg">
                          {/* <img src="\assets\navbarassets\ETHEREUM.png" alt="balanceinnerimg" className="balanceinnerimg" /> */}
                          <img src="\assets\launchpaddetailassets\clogo.svg" alt="balanceinnerimg" className="balanceinnerimg" />
                        </div>
                        <div className="balancetexts">
                          <p className="balancepara">Balance</p>
                          <h6 className="balancehead">{balance}ETH</h6>

                        </div>
                      </div>
                      <div className="profiledata" onClick={() => {
                        setclickedbtn(true);
                      }}>
                        <Link
                          href="/editprofile"
                          className="profiledatapara">Edit Profile
                        </Link>
                        {/* <Link href=""  className="profiledatapara">Disconnect</Link> */}
                      </div>
                      <div onClick={disconnectWallet} className="profiledata">
                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className='profiledataimg'>
                          <path d="M16.8 2H14.2C11 2 9 4 9 7.2V11.25H15.25C15.66 11.25 16 11.59 16 12C16 12.41 15.66 12.75 15.25 12.75H9V16.8C9 20 11 22 14.2 22H16.79C19.99 22 21.99 20 21.99 16.8V7.2C22 4 20 2 16.8 2Z" fill="#745F8C" />
                          <path d="M4.55945 11.2498L6.62945 9.17984C6.77945 9.02984 6.84945 8.83984 6.84945 8.64984C6.84945 8.45984 6.77945 8.25984 6.62945 8.11984C6.33945 7.82984 5.85945 7.82984 5.56945 8.11984L2.21945 11.4698C1.92945 11.7598 1.92945 12.2398 2.21945 12.5298L5.56945 15.8798C5.85945 16.1698 6.33945 16.1698 6.62945 15.8798C6.91945 15.5898 6.91945 15.1098 6.62945 14.8198L4.55945 12.7498H8.99945V11.2498H4.55945Z" fill="#745F8C" />
                        </svg> */}
                        <p className='profiledatapara'>Disconnect</p>
                      </div>


                    </Dropdown.Menu>
                  </Dropdown>
              }

              <div onClick={handleLogout} className="btn-logout">
                <a href="#">Log Out</a>
              </div>
            </div>

          </div>
          <div className="customnavbarmbl d-none">
            <Link href={'/collectiondashbord'}>
              <img src="\assets\navbarassets\mbllogo.svg" alt="mobilelogo" className="mobilelogo" />
            </Link>
            <div className="mobileicons">
              {/* <img onClick={handleShow2} src="\assets\navbarassets\search-normalmbl.svg" alt="searchimg" className="searchimgmbl" /> */}
              {/* {
                clickedbtn ?
                  null
                  :
                  <Dropdown className='profiledropdownmbl' align='center'>
                    <Dropdown.Toggle id="dropdown-basic">
                      <img src="\assets\navbarassets\user.svg" alt="profileimgmbl" className="profileimgmbl" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <h5 className="profilename">Michael Scott</h5>
                      <div className="walletinner">
                        <p className="walletpara">0x96A8E8165E2...A0B</p>
                        <img src="\assets\navbarassets\copy.svg" alt="copyimg" className="copyimg" />
                      </div>
                      <div className="balancemain">
                        <div className="balanceimg">
                          <img src="\assets\navbarassets\ETHEREUM.png" alt="balanceinnerimg" className="balanceinnerimg" />
                        </div>
                        <div className="balancetexts">
                          <p className="balancepara">Balance</p>
                          <h6 className="balancehead">2.54 ETH</h6>
                        </div>
                      </div>
                     
                      <div className="profiledata">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className='profiledataimg'>
                          <path d="M16.8 2H14.2C11 2 9 4 9 7.2V11.25H15.25C15.66 11.25 16 11.59 16 12C16 12.41 15.66 12.75 15.25 12.75H9V16.8C9 20 11 22 14.2 22H16.79C19.99 22 21.99 20 21.99 16.8V7.2C22 4 20 2 16.8 2Z" fill="#745F8C" />
                          <path d="M4.55945 11.2498L6.62945 9.17984C6.77945 9.02984 6.84945 8.83984 6.84945 8.64984C6.84945 8.45984 6.77945 8.25984 6.62945 8.11984C6.33945 7.82984 5.85945 7.82984 5.56945 8.11984L2.21945 11.4698C1.92945 11.7598 1.92945 12.2398 2.21945 12.5298L5.56945 15.8798C5.85945 16.1698 6.33945 16.1698 6.62945 15.8798C6.91945 15.5898 6.91945 15.1098 6.62945 14.8198L4.55945 12.7498H8.99945V11.2498H4.55945Z" fill="#745F8C" />
                        </svg>
                        <p onClick={() => {
                          setclickedbtn(true);
                        }} className="profiledatapara">Disconnect</p>
                      </div>
                    </Dropdown.Menu>
                  </Dropdown>
              } */}

              <img onClick={handleShow1} src="\assets\navbarassets\toggler.svg" alt="togglermbl" className="togglermbl" />
            </div>
          </div>
        </div>
      </section>

      <Offcanvas show={show} onHide={handleClose} placement='end' className="connectwalletsidebar">
        <Offcanvas.Body>
          <img src="\assets\navbarassets\closeimg.svg" alt="closeimg" className="closeimg" onClick={handleClose} />
          <h6 className="connectsidehead">Connect Wallet</h6>
          <p className="connectsidepara">By connecting your wallet, you agree to our <span className="bold">Terms of Service</span> and Our  <span className="bold">Privacy Policy.</span></p>
          <div className="connectmain" onClick={() => {
            // setclickedbtn(() => { (false), localStorage.setItem("wallet", false) });
            connectWallet('1115')
            handleClose();
          }}>
            <img src="\assets\navbarassets\metamask.svg" alt="connectimg" className="connectimg" />
            <p className="connectpara">Metamask</p>
          </div>
          <div className="connectmain-two" onClick={() => {
            // setclickedbtn(false);
            trustWallet("1115")
            handleClose();
          }}>
            <img src="\assets\navbarassets\walletconnect.svg" alt="connectimg" className="connectimg" />
            <p className="connectpara">WalletConnect</p>
          </div>
        </Offcanvas.Body>
      </Offcanvas>


      <Offcanvas show={show1} onHide={handleClose1} placement='end' className="mblnavside">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <Link href={'/collectiondashbord'}>
              <img src="\assets\navbarassets\mbllogo.svg" alt="mobilelogo" className="mobilelogo" />
            </Link>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {/* <div className="mblnavlinks">
            <Link href={'/discovercollection'}>
              <p className="dropitemmbl">Discover</p>
            </Link>
            <p className="dropitemmbl">Mint</p>
            <Link href="/createlaunchpadcollection" className="dropitemmbl marginleft">Launchpad</Link>
            <Link href="/launchpad?tab=edition" className="dropitemmbl marginleft">Open Editions</Link>
            <Link href="/collectiondashbord" className="dropitemmbl">Creator Dashboard</Link>
            <Link href="/applylaunchpad" className="dropitemmbl marginleft">Apply for launchpad</Link>
          </div> */}
          <div className="mblbtns">
            {
              !account ?
                <button className="connectbtn" onClick={() => {
                  handleClose1();
                  handleShow();

                }}>Connect Wallet</button>
                :
                <button className="disconnectbtn" onClick={() => {
                  setclickedbtn(true);
                  handleClose1();
                  disconnectWallet()
                }}>Disconnect Wallet</button>
            }
          </div>
        </Offcanvas.Body>
      </Offcanvas>

      <Offcanvas show={show2} onHide={handleClose2} placement='end' className="searchnavside">
        <Offcanvas.Body>
          <div className="searchlowermbl">
            <Dropdown show={searchText.trim() !== ''} className='dropdownsearchmbl'>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                <div className="custominput">
                  <input
                    type="search"
                    placeholder="Search"
                    className="innercustominput"
                    value={searchText}
                    onChange={handleInputChange}
                  />
                  <img
                    src="\assets\navbarassets\backimg.png"
                    alt="customsearchimg"
                    className="customsearchimg"
                    onClick={handleClose2}
                  />
                </div>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <div className="searchresultsmain">
                  <div className="collectionhead">
                    <h6 className="collectiontext">Collection</h6>
                  </div>
                  <Link href="/collections" onClick={handleClose2}>
                    <div className="collectionresult">
                      <div className="collectionresultleft">
                        <div className="collectionimg">
                          <img src="\assets\navbarassets\collectioncardone.png" alt="innercollectionimg" className="innercollectionimg" />
                        </div>
                        <div className="collectiontexts">
                          <h6 className="innercollectionhead">Kups by Raposa</h6>
                          <p className="innercollectionpara"><img src="\assets\navbarassets\itemimg.svg" alt="inneritemimg" className="inneritemimg" /> 10,000 items</p>
                        </div>
                      </div>
                      <p className="collectionrightpara">7.9 ETH</p>
                    </div>
                  </Link>
                  <Link href="/collections" onClick={handleClose2}>
                    <div className="collectionresult">
                      <div className="collectionresultleft">
                        <div className="collectionimg">
                          <img src="\assets\navbarassets\collectioncardtwo.png" alt="innercollectionimg" className="innercollectionimg" />
                        </div>
                        <div className="collectiontexts">
                          <h6 className="innercollectionhead">The Anon Club</h6>
                          <p className="innercollectionpara"><img src="\assets\navbarassets\itemimg.svg" alt="inneritemimg" className="inneritemimg" /> 10,000 items</p>
                        </div>
                      </div>
                      <p className="collectionrightpara">7.9 ETH</p>
                    </div>
                  </Link>
                  <Link href="/collections" onClick={handleClose2}>
                    <div className="collectionresult">
                      <div className="collectionresultleft">
                        <div className="collectionimg">
                          <img src="\assets\navbarassets\collectioncardthree.png" alt="innercollectionimg" className="innercollectionimg" />
                        </div>
                        <div className="collectiontexts">
                          <h6 className="innercollectionhead">Taiyo Infants</h6>
                          <p className="innercollectionpara"><img src="\assets\navbarassets\itemimg.svg" alt="inneritemimg" className="inneritemimg" /> 10,000 items</p>
                        </div>
                      </div>
                      <p className="collectionrightpara">7.9 ETH</p>
                    </div>
                  </Link>
                  <div className="accountmain">
                    <h6 className="accounthead">Accounts</h6>
                    <Link href="/authorprofile" onClick={handleClose2}>
                      <div className="accountinner">
                        <div className="accoutnimg">
                          <img src="\assets\navbarassets\accountcardone.png" alt="accountinnerimg" className="accountinnerimg" />
                        </div>
                        <p className="accounttext">Forganas</p>
                      </div>
                    </Link>
                    <Link href="/authorprofile" onClick={handleClose2}>
                      <div className="accountinner">
                        <div className="accoutnimg">
                          <img src="\assets\navbarassets\accountcardtwo.png" alt="accountinnerimg" className="accountinnerimg" />
                        </div>
                        <p className="accounttext">Forganas</p>
                      </div>
                    </Link>
                    <Link href="/authorprofile" onClick={handleClose2}>
                      <div className="accountinner">
                        <div className="accoutnimg">
                          <img src="\assets\navbarassets\accountcardthree.png" alt="accountinnerimg" className="accountinnerimg" />
                        </div>
                        <p className="accounttext">Forganas</p>
                      </div>
                    </Link>
                    <Link href="/authorprofile" onClick={handleClose2}>
                      <div className="accountinner">
                        <div className="accoutnimg">
                          <img src="\assets\navbarassets\accountcardone.png" alt="accountinnerimg" className="accountinnerimg" />
                        </div>
                        <p className="accounttext">Forganas</p>
                      </div>
                    </Link>
                    <Link href="/authorprofile" onClick={handleClose2}>
                      <div className="accountinner">
                        <div className="accoutnimg">
                          <img src="\assets\navbarassets\accountcardtwo.png" alt="accountinnerimg" className="accountinnerimg" />
                        </div>
                        <p className="accounttext">Forganas</p>
                      </div>
                    </Link>
                    <Link href="/authorprofile" onClick={handleClose2}>
                      <div className="accountinner">
                        <div className="accoutnimg">
                          <img src="\assets\navbarassets\accountcardthree.png" alt="accountinnerimg" className="accountinnerimg" />
                        </div>
                        <p className="accounttext">Forganas</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default Navbar
