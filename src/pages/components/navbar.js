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
              <Link className={router.pathname === "/components/collectiondashbord" ?'active': ""} href="/collectiondashbord" >Launchpads</Link>
              <Link href="/mycollection" className={router.pathname === "/components/mycollection" ?'active': ""}>Collections</Link>
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
                          <h6 className="balancehead">{balance}CORE</h6>

                        </div>
                      </div>
                      <div className="profiledata" onClick={() => {
                        setclickedbtn(true);
                      }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className='profiledataimg'>
                        <path d="M21 22H3C2.59 22 2.25 21.66 2.25 21.25C2.25 20.84 2.59 20.5 3 20.5H21C21.41 20.5 21.75 20.84 21.75 21.25C21.75 21.66 21.41 22 21 22Z" fill="#745F8C" />
                        <path d="M19.0206 3.47967C17.0806 1.53967 15.1806 1.48967 13.1906 3.47967L11.9806 4.68967C11.8806 4.78967 11.8406 4.94967 11.8806 5.08967C12.6406 7.73967 14.7606 9.85967 17.4106 10.6197C17.4506 10.6297 17.4906 10.6397 17.5306 10.6397C17.6406 10.6397 17.7406 10.5997 17.8206 10.5197L19.0206 9.30967C20.0106 8.32967 20.4906 7.37967 20.4906 6.41967C20.5006 5.42967 20.0206 4.46967 19.0206 3.47967Z" fill="#745F8C" />
                        <path d="M15.6103 11.5298C15.3203 11.3898 15.0403 11.2498 14.7703 11.0898C14.5503 10.9598 14.3403 10.8198 14.1303 10.6698C13.9603 10.5598 13.7603 10.3998 13.5703 10.2398C13.5503 10.2298 13.4803 10.1698 13.4003 10.0898C13.0703 9.8098 12.7003 9.4498 12.3703 9.0498C12.3403 9.0298 12.2903 8.9598 12.2203 8.8698C12.1203 8.7498 11.9503 8.5498 11.8003 8.3198C11.6803 8.1698 11.5403 7.9498 11.4103 7.7298C11.2503 7.4598 11.1103 7.1898 10.9703 6.9098C10.9491 6.86441 10.9286 6.81924 10.9088 6.77434C10.7612 6.44102 10.3265 6.34358 10.0688 6.60133L4.34032 12.3298C4.21032 12.4598 4.09032 12.7098 4.06032 12.8798L3.52032 16.7098C3.42032 17.3898 3.61032 18.0298 4.03032 18.4598C4.39032 18.8098 4.89032 18.9998 5.43032 18.9998C5.55032 18.9998 5.67032 18.9898 5.79032 18.9698L9.63032 18.4298C9.81032 18.3998 10.0603 18.2798 10.1803 18.1498L15.9016 12.4285C16.1612 12.1689 16.0633 11.7235 15.7257 11.5794C15.6877 11.5632 15.6492 11.5467 15.6103 11.5298Z" fill="#745F8C" />
                      </svg>
                        <Link
                          href="/editprofile"
                          className="profiledatapara">Edit Profile
                        </Link>
                        {/* <Link href=""  className="profiledatapara">Disconnect</Link> */}
                      </div>
                      <div onClick={disconnectWallet} className="profiledata">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className='profiledataimg'>
                          <path d="M16.8 2H14.2C11 2 9 4 9 7.2V11.25H15.25C15.66 11.25 16 11.59 16 12C16 12.41 15.66 12.75 15.25 12.75H9V16.8C9 20 11 22 14.2 22H16.79C19.99 22 21.99 20 21.99 16.8V7.2C22 4 20 2 16.8 2Z" fill="#745F8C" />
                          <path d="M4.55945 11.2498L6.62945 9.17984C6.77945 9.02984 6.84945 8.83984 6.84945 8.64984C6.84945 8.45984 6.77945 8.25984 6.62945 8.11984C6.33945 7.82984 5.85945 7.82984 5.56945 8.11984L2.21945 11.4698C1.92945 11.7598 1.92945 12.2398 2.21945 12.5298L5.56945 15.8798C5.85945 16.1698 6.33945 16.1698 6.62945 15.8798C6.91945 15.5898 6.91945 15.1098 6.62945 14.8198L4.55945 12.7498H8.99945V11.2498H4.55945Z" fill="#745F8C" />
                        </svg>
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
            connectWallet('1116')
            handleClose();
          }}>
            <img src="\assets\navbarassets\metamask.svg" alt="connectimg" className="connectimg" />
            <p className="connectpara">Metamask</p>
          </div>
          <div className="connectmain-two" onClick={() => {
            // setclickedbtn(false);
            trustWallet("1116")
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
          <div className="mblnavlinks">
          <Link className={router.pathname === "/components/collectiondashbord" ?'dropitemmbl active': "dropitemmbl"} href="/collectiondashbord" >Launchpads</Link>
              <Link href="/mycollection" className={router.pathname === "/components/mycollection" ?'dropitemmbl active': "dropitemmbl"}>Collections</Link>
            
          </div>
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
