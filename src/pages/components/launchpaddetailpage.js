import React, { useEffect, useState } from 'react'
import Navbar from './navbar'
import Footer from './footer'
import ImageGallery from "react-image-gallery";
import { Nav, ProgressBar } from 'react-bootstrap';

const Launchpaddetailpage = () => {
  const images = [
    {
      original: "https://res.cloudinary.com/drt6vurtt/image/upload/v1705391002/cardone_bo0qnw.png",
      thumbnail: "https://res.cloudinary.com/drt6vurtt/image/upload/v1705391002/cardone_bo0qnw.png",
    },
    {
      original: "https://res.cloudinary.com/drt6vurtt/image/upload/v1705391002/cardtwo_mckchu.png",
      thumbnail: "https://res.cloudinary.com/drt6vurtt/image/upload/v1705391002/cardtwo_mckchu.png",
    },
    {
      original: "https://res.cloudinary.com/drt6vurtt/image/upload/v1705391002/cardthree_xmfiyh.png",
      thumbnail: "https://res.cloudinary.com/drt6vurtt/image/upload/v1705391002/cardthree_xmfiyh.png",
    },
    {
      original: "https://res.cloudinary.com/drt6vurtt/image/upload/v1705391002/cardfour_y7z3ti.png",
      thumbnail: "https://res.cloudinary.com/drt6vurtt/image/upload/v1705391002/cardfour_y7z3ti.png",
    },
  ];


  const [timeshow, setTimeshow] = useState(false);
  const [day, setDay] = useState(0);
  const [hour, setHour] = useState(0);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const time = new Date("jan 30, 2024 08:00:00");
      const diff = time.getTime() - now.getTime();
      if (diff <= 0) {
        clearInterval(interval);
        setTimeshow(true);
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);
      setDay(days);
      setHour(hours);
      setMin(mins);
      setSec(secs);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const [activeTab, setActiveTab] = useState('link-1');

  const handleSelect = (eventKey) => {
    setActiveTab(eventKey);
  };
  return (
    <>
      <Navbar />
      <section className="launchpaddetail">
        <span className="launchpaddetailshade"></span>
        <div className="launchpaddetail-container">
          <div className="topheadinglaunchpaddetail">
            <h5 className="topheadingtext">Azuki</h5>
            <img src="\assets\launchpaddetailassets\verify.svg" alt="tickimage" className="tickimage" />
          </div>
          <div className="launchpaddetailinner">
            <ImageGallery items={images} thumbnailPosition="bottom" />
            <div className="mintstages">
              <h6 className="minstageshead">Mint Stages</h6>
              <div className="guarantymain">
                <div className="guarantymainupper">
                  <div className="gurantyleft">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none" className="lockimg">
                      <path d="M16.5 9.85384C16.1242 9.85384 15.8125 9.54217 15.8125 9.16634V7.33301C15.8125 4.44551 14.9967 2.52051 11 2.52051C7.00333 2.52051 6.1875 4.44551 6.1875 7.33301V9.16634C6.1875 9.54217 5.87583 9.85384 5.5 9.85384C5.12417 9.85384 4.8125 9.54217 4.8125 9.16634V7.33301C4.8125 4.67467 5.45417 1.14551 11 1.14551C16.5458 1.14551 17.1875 4.67467 17.1875 7.33301V9.16634C17.1875 9.54217 16.8758 9.85384 16.5 9.85384Z" fill="#862FC0" />
                      <path d="M15.583 20.8545H6.41634C2.37384 20.8545 1.14551 19.6262 1.14551 15.5837V13.7503C1.14551 9.70783 2.37384 8.47949 6.41634 8.47949H15.583C19.6255 8.47949 20.8538 9.70783 20.8538 13.7503V15.5837C20.8538 19.6262 19.6255 20.8545 15.583 20.8545ZM6.41634 9.85449C3.13467 9.85449 2.52051 10.4778 2.52051 13.7503V15.5837C2.52051 18.8562 3.13467 19.4795 6.41634 19.4795H15.583C18.8647 19.4795 19.4788 18.8562 19.4788 15.5837V13.7503C19.4788 10.4778 18.8647 9.85449 15.583 9.85449H6.41634Z" fill="#862FC0" />
                      <path d="M7.33366 15.5833C7.21449 15.5833 7.09532 15.5558 6.98532 15.51C6.86615 15.4641 6.7745 15.4 6.68283 15.3175C6.51783 15.1433 6.41699 14.9141 6.41699 14.6666C6.41699 14.5475 6.44448 14.4283 6.49031 14.3183C6.53615 14.1991 6.60033 14.1075 6.68283 14.0158C6.7745 13.9333 6.86615 13.8691 6.98532 13.8233C7.31532 13.6766 7.72782 13.7591 7.98448 14.0158C8.06698 14.1075 8.13117 14.2083 8.177 14.3183C8.22284 14.4283 8.25033 14.5475 8.25033 14.6666C8.25033 14.905 8.14948 15.1433 7.98448 15.3175C7.81032 15.4825 7.57199 15.5833 7.33366 15.5833Z" fill="#862FC0" />
                      <path d="M10.9997 15.5832C10.7613 15.5832 10.523 15.4823 10.3488 15.3173C10.1838 15.1432 10.083 14.914 10.083 14.6665C10.083 14.5473 10.1013 14.4282 10.1563 14.3182C10.2022 14.2082 10.2663 14.1073 10.3488 14.0157C10.5597 13.8048 10.8805 13.704 11.1738 13.7682C11.238 13.7773 11.293 13.7957 11.348 13.8232C11.403 13.8415 11.458 13.869 11.513 13.9057C11.5588 13.9332 11.6047 13.979 11.6505 14.0157C11.733 14.1073 11.7972 14.2082 11.843 14.3182C11.8889 14.4282 11.9163 14.5473 11.9163 14.6665C11.9163 14.914 11.8155 15.1432 11.6505 15.3173C11.6047 15.354 11.5588 15.3907 11.513 15.4273C11.458 15.464 11.403 15.4915 11.348 15.5099C11.293 15.5374 11.238 15.5557 11.1738 15.5648C11.1188 15.574 11.0547 15.5832 10.9997 15.5832Z" fill="#862FC0" />
                      <path d="M14.6667 15.5832C14.4192 15.5832 14.19 15.4823 14.0158 15.3173C13.9333 15.2257 13.8692 15.1248 13.8233 15.0148C13.7775 14.9048 13.75 14.7857 13.75 14.6665C13.75 14.4282 13.8508 14.1898 14.0158 14.0157C14.0617 13.979 14.1075 13.9424 14.1533 13.9057C14.2083 13.869 14.2633 13.8415 14.3183 13.8232C14.3733 13.7957 14.4283 13.7773 14.4833 13.7682C14.7858 13.704 15.0975 13.8048 15.3175 14.0157C15.4825 14.1898 15.5833 14.419 15.5833 14.6665C15.5833 14.7857 15.5558 14.9048 15.51 15.0148C15.4642 15.134 15.4 15.2257 15.3175 15.3173C15.1433 15.4823 14.905 15.5832 14.6667 15.5832Z" fill="#862FC0" />
                    </svg>
                    <span className="gurantyspan">Guaranteed</span>
                  </div>
                  <div className="guarantyright">
                    <h6 className="startspara">Starts in</h6>
                    <span className='timermain'>
                      <span className="innertimertext">{day ? day : 0}d</span>
                      <span className="innertimertext">{hour ? hour : 0}h</span>
                      <span className="innertimertext">{min ? min : 0}m</span>
                      <span className="innertimertext">{sec ? sec : 0}s</span>
                    </span>
                  </div>
                </div>
                <p className="grantymainbottompara">
                  <span>
                    MAX 1 TOKEN
                  </span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6" fill="none" className='circleimg'>
                    <circle cx="3" cy="3" r="3" fill="#D9D9D9" />
                  </svg>
                  <span>
                    Price 1.50
                  </span>
                  <img src="\assets\launchpaddetailassets\clogo.svg" alt="clogo" className="clogo" />
                </p>
              </div>
              <div className="guarantymain">
                <div className="guarantymainupper">
                  <div className="gurantyleft">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none" className="lockimg">
                      <path d="M16.5 9.85384C16.1242 9.85384 15.8125 9.54217 15.8125 9.16634V7.33301C15.8125 4.44551 14.9967 2.52051 11 2.52051C7.00333 2.52051 6.1875 4.44551 6.1875 7.33301V9.16634C6.1875 9.54217 5.87583 9.85384 5.5 9.85384C5.12417 9.85384 4.8125 9.54217 4.8125 9.16634V7.33301C4.8125 4.67467 5.45417 1.14551 11 1.14551C16.5458 1.14551 17.1875 4.67467 17.1875 7.33301V9.16634C17.1875 9.54217 16.8758 9.85384 16.5 9.85384Z" fill="#862FC0" />
                      <path d="M15.583 20.8545H6.41634C2.37384 20.8545 1.14551 19.6262 1.14551 15.5837V13.7503C1.14551 9.70783 2.37384 8.47949 6.41634 8.47949H15.583C19.6255 8.47949 20.8538 9.70783 20.8538 13.7503V15.5837C20.8538 19.6262 19.6255 20.8545 15.583 20.8545ZM6.41634 9.85449C3.13467 9.85449 2.52051 10.4778 2.52051 13.7503V15.5837C2.52051 18.8562 3.13467 19.4795 6.41634 19.4795H15.583C18.8647 19.4795 19.4788 18.8562 19.4788 15.5837V13.7503C19.4788 10.4778 18.8647 9.85449 15.583 9.85449H6.41634Z" fill="#862FC0" />
                      <path d="M7.33366 15.5833C7.21449 15.5833 7.09532 15.5558 6.98532 15.51C6.86615 15.4641 6.7745 15.4 6.68283 15.3175C6.51783 15.1433 6.41699 14.9141 6.41699 14.6666C6.41699 14.5475 6.44448 14.4283 6.49031 14.3183C6.53615 14.1991 6.60033 14.1075 6.68283 14.0158C6.7745 13.9333 6.86615 13.8691 6.98532 13.8233C7.31532 13.6766 7.72782 13.7591 7.98448 14.0158C8.06698 14.1075 8.13117 14.2083 8.177 14.3183C8.22284 14.4283 8.25033 14.5475 8.25033 14.6666C8.25033 14.905 8.14948 15.1433 7.98448 15.3175C7.81032 15.4825 7.57199 15.5833 7.33366 15.5833Z" fill="#862FC0" />
                      <path d="M10.9997 15.5832C10.7613 15.5832 10.523 15.4823 10.3488 15.3173C10.1838 15.1432 10.083 14.914 10.083 14.6665C10.083 14.5473 10.1013 14.4282 10.1563 14.3182C10.2022 14.2082 10.2663 14.1073 10.3488 14.0157C10.5597 13.8048 10.8805 13.704 11.1738 13.7682C11.238 13.7773 11.293 13.7957 11.348 13.8232C11.403 13.8415 11.458 13.869 11.513 13.9057C11.5588 13.9332 11.6047 13.979 11.6505 14.0157C11.733 14.1073 11.7972 14.2082 11.843 14.3182C11.8889 14.4282 11.9163 14.5473 11.9163 14.6665C11.9163 14.914 11.8155 15.1432 11.6505 15.3173C11.6047 15.354 11.5588 15.3907 11.513 15.4273C11.458 15.464 11.403 15.4915 11.348 15.5099C11.293 15.5374 11.238 15.5557 11.1738 15.5648C11.1188 15.574 11.0547 15.5832 10.9997 15.5832Z" fill="#862FC0" />
                      <path d="M14.6667 15.5832C14.4192 15.5832 14.19 15.4823 14.0158 15.3173C13.9333 15.2257 13.8692 15.1248 13.8233 15.0148C13.7775 14.9048 13.75 14.7857 13.75 14.6665C13.75 14.4282 13.8508 14.1898 14.0158 14.0157C14.0617 13.979 14.1075 13.9424 14.1533 13.9057C14.2083 13.869 14.2633 13.8415 14.3183 13.8232C14.3733 13.7957 14.4283 13.7773 14.4833 13.7682C14.7858 13.704 15.0975 13.8048 15.3175 14.0157C15.4825 14.1898 15.5833 14.419 15.5833 14.6665C15.5833 14.7857 15.5558 14.9048 15.51 15.0148C15.4642 15.134 15.4 15.2257 15.3175 15.3173C15.1433 15.4823 14.905 15.5832 14.6667 15.5832Z" fill="#862FC0" />
                    </svg>
                    <span className="gurantyspan">Guaranteed</span>
                  </div>
                  <div className="guarantyright">
                    <h6 className="startspara">Starts in</h6>
                    <span className='timermain'>
                      <span className="innertimertext">{day ? day : 0}d</span>
                      <span className="innertimertext">{hour ? hour : 0}h</span>
                      <span className="innertimertext">{min ? min : 0}m</span>
                      <span className="innertimertext">{sec ? sec : 0}s</span>
                    </span>
                  </div>
                </div>
                <p className="grantymainbottompara">
                  <span>
                    MAX 1 TOKEN
                  </span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6" fill="none" className='circleimg'>
                    <circle cx="3" cy="3" r="3" fill="#D9D9D9" />
                  </svg>
                  <span>
                    Price 1.50
                  </span>
                  <img src="\assets\launchpaddetailassets\clogo.svg" alt="clogo" className="clogo" />
                </p>
              </div>
              <div className="guarantymain">
                <div className="guarantymainupper">
                  <div className="gurantyleft">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                      <path d="M16.5 9.85384C16.1242 9.85384 15.8125 9.54217 15.8125 9.16634V7.33301C15.8125 4.44551 14.9967 2.52051 11 2.52051C7.00333 2.52051 6.1875 4.44551 6.1875 7.33301V9.16634C6.1875 9.54217 5.87583 9.85384 5.5 9.85384C5.12417 9.85384 4.8125 9.54217 4.8125 9.16634V7.33301C4.8125 4.67467 5.45417 1.14551 11 1.14551C16.5458 1.14551 17.1875 4.67467 17.1875 7.33301V9.16634C17.1875 9.54217 16.8758 9.85384 16.5 9.85384Z" fill="#E84A4A" />
                      <path d="M15.583 20.8545H6.41634C2.37384 20.8545 1.14551 19.6262 1.14551 15.5837V13.7503C1.14551 9.70783 2.37384 8.47949 6.41634 8.47949H15.583C19.6255 8.47949 20.8538 9.70783 20.8538 13.7503V15.5837C20.8538 19.6262 19.6255 20.8545 15.583 20.8545ZM6.41634 9.85449C3.13467 9.85449 2.52051 10.4778 2.52051 13.7503V15.5837C2.52051 18.8562 3.13467 19.4795 6.41634 19.4795H15.583C18.8647 19.4795 19.4788 18.8562 19.4788 15.5837V13.7503C19.4788 10.4778 18.8647 9.85449 15.583 9.85449H6.41634Z" fill="#E84A4A" />
                      <path d="M7.33366 15.5833C7.21449 15.5833 7.09532 15.5558 6.98532 15.51C6.86615 15.4641 6.7745 15.4 6.68283 15.3175C6.51783 15.1433 6.41699 14.9141 6.41699 14.6666C6.41699 14.5475 6.44448 14.4283 6.49031 14.3183C6.53615 14.1991 6.60033 14.1075 6.68283 14.0158C6.7745 13.9333 6.86615 13.8691 6.98532 13.8233C7.31532 13.6766 7.72782 13.7591 7.98448 14.0158C8.06698 14.1075 8.13117 14.2083 8.177 14.3183C8.22284 14.4283 8.25033 14.5475 8.25033 14.6666C8.25033 14.905 8.14948 15.1433 7.98448 15.3175C7.81032 15.4825 7.57199 15.5833 7.33366 15.5833Z" fill="#E84A4A" />
                      <path d="M10.9997 15.5832C10.7613 15.5832 10.523 15.4823 10.3488 15.3173C10.1838 15.1432 10.083 14.914 10.083 14.6665C10.083 14.5473 10.1013 14.4282 10.1563 14.3182C10.2022 14.2082 10.2663 14.1073 10.3488 14.0157C10.5597 13.8048 10.8805 13.704 11.1738 13.7682C11.238 13.7773 11.293 13.7957 11.348 13.8232C11.403 13.8415 11.458 13.869 11.513 13.9057C11.5588 13.9332 11.6047 13.979 11.6505 14.0157C11.733 14.1073 11.7972 14.2082 11.843 14.3182C11.8889 14.4282 11.9163 14.5473 11.9163 14.6665C11.9163 14.914 11.8155 15.1432 11.6505 15.3173C11.6047 15.354 11.5588 15.3907 11.513 15.4273C11.458 15.464 11.403 15.4915 11.348 15.5099C11.293 15.5374 11.238 15.5557 11.1738 15.5648C11.1188 15.574 11.0547 15.5832 10.9997 15.5832Z" fill="#E84A4A" />
                      <path d="M14.6667 15.5832C14.4192 15.5832 14.19 15.4823 14.0158 15.3173C13.9333 15.2257 13.8692 15.1248 13.8233 15.0148C13.7775 14.9048 13.75 14.7857 13.75 14.6665C13.75 14.4282 13.8508 14.1898 14.0158 14.0157C14.0617 13.979 14.1075 13.9424 14.1533 13.9057C14.2083 13.869 14.2633 13.8415 14.3183 13.8232C14.3733 13.7957 14.4283 13.7773 14.4833 13.7682C14.7858 13.704 15.0975 13.8048 15.3175 14.0157C15.4825 14.1898 15.5833 14.419 15.5833 14.6665C15.5833 14.7857 15.5558 14.9048 15.51 15.0148C15.4642 15.134 15.4 15.2257 15.3175 15.3173C15.1433 15.4823 14.905 15.5832 14.6667 15.5832Z" fill="#E84A4A" />
                    </svg>
                    <span className="gurantyspan">Public</span>
                  </div>
                  <div className="guarantyright">
                    <h6 className="startspara">Starts in</h6>
                    <span className='timermain'>
                      <span className="innertimertext">{day ? day : 0}d</span>
                      <span className="innertimertext">{hour ? hour : 0}h</span>
                      <span className="innertimertext">{min ? min : 0}m</span>
                      <span className="innertimertext">{sec ? sec : 0}s</span>
                    </span>
                  </div>
                </div>
                <p className="grantymainbottompara">
                  <span>
                    MAX 1 TOKEN
                  </span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6" fill="none" className='circleimg'>
                    <circle cx="3" cy="3" r="3" fill="#D9D9D9" />
                  </svg>
                  <span>
                    Price 1.50
                  </span>
                  <img src="\assets\launchpaddetailassets\clogo.svg" alt="clogo" className="clogo" />
                </p>
              </div>
              <div className="startmid">
                <div className="guarantyright">
                  <h6 className="startspara">Starts in</h6>
                  <span className='timermain'>
                    <span className="innertimertext">{day ? day : 0}d</span>
                    <span className="innertimertext">{hour ? hour : 0}h</span>
                    <span className="innertimertext">{min ? min : 0}m</span>
                    <span className="innertimertext">{sec ? sec : 0}s</span>
                  </span>
                </div>
                <div className="calendarmain">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className='clanderimg'>
                    <path d="M8 5.75C7.59 5.75 7.25 5.41 7.25 5V2C7.25 1.59 7.59 1.25 8 1.25C8.41 1.25 8.75 1.59 8.75 2V5C8.75 5.41 8.41 5.75 8 5.75Z" fill="#862FC0" />
                    <path d="M16 5.75C15.59 5.75 15.25 5.41 15.25 5V2C15.25 1.59 15.59 1.25 16 1.25C16.41 1.25 16.75 1.59 16.75 2V5C16.75 5.41 16.41 5.75 16 5.75Z" fill="#862FC0" />
                    <path d="M8.5 14.5003C8.37 14.5003 8.24 14.4703 8.12 14.4203C7.99 14.3703 7.89 14.3003 7.79 14.2103C7.61 14.0203 7.5 13.7703 7.5 13.5003C7.5 13.3703 7.53 13.2403 7.58 13.1203C7.63 13.0003 7.7 12.8903 7.79 12.7903C7.89 12.7003 7.99 12.6303 8.12 12.5803C8.48 12.4303 8.93 12.5103 9.21 12.7903C9.39 12.9803 9.5 13.2403 9.5 13.5003C9.5 13.5603 9.49 13.6303 9.48 13.7003C9.47 13.7603 9.45 13.8203 9.42 13.8803C9.4 13.9403 9.37 14.0003 9.33 14.0603C9.3 14.1103 9.25 14.1603 9.21 14.2103C9.02 14.3903 8.76 14.5003 8.5 14.5003Z" fill="#862FC0" />
                    <path d="M12 14.4999C11.87 14.4999 11.74 14.4699 11.62 14.4199C11.49 14.3699 11.39 14.2999 11.29 14.2099C11.11 14.0199 11 13.7699 11 13.4999C11 13.3699 11.03 13.2399 11.08 13.1199C11.13 12.9999 11.2 12.8899 11.29 12.7899C11.39 12.6999 11.49 12.6299 11.62 12.5799C11.98 12.4199 12.43 12.5099 12.71 12.7899C12.89 12.9799 13 13.2399 13 13.4999C13 13.5599 12.99 13.6299 12.98 13.6999C12.97 13.7599 12.95 13.8199 12.92 13.8799C12.9 13.9399 12.87 13.9999 12.83 14.0599C12.8 14.1099 12.75 14.1599 12.71 14.2099C12.52 14.3899 12.26 14.4999 12 14.4999Z" fill="#862FC0" />
                    <path d="M15.5 14.4999C15.37 14.4999 15.24 14.4699 15.12 14.4199C14.99 14.3699 14.89 14.2999 14.79 14.2099C14.75 14.1599 14.71 14.1099 14.67 14.0599C14.63 13.9999 14.6 13.9399 14.58 13.8799C14.55 13.8199 14.53 13.7599 14.52 13.6999C14.51 13.6299 14.5 13.5599 14.5 13.4999C14.5 13.2399 14.61 12.9799 14.79 12.7899C14.89 12.6999 14.99 12.6299 15.12 12.5799C15.49 12.4199 15.93 12.5099 16.21 12.7899C16.39 12.9799 16.5 13.2399 16.5 13.4999C16.5 13.5599 16.49 13.6299 16.48 13.6999C16.47 13.7599 16.45 13.8199 16.42 13.8799C16.4 13.9399 16.37 13.9999 16.33 14.0599C16.3 14.1099 16.25 14.1599 16.21 14.2099C16.02 14.3899 15.76 14.4999 15.5 14.4999Z" fill="#862FC0" />
                    <path d="M8.5 18.0002C8.37 18.0002 8.24 17.9702 8.12 17.9202C8 17.8702 7.89 17.8002 7.79 17.7102C7.61 17.5202 7.5 17.2602 7.5 17.0002C7.5 16.8702 7.53 16.7402 7.58 16.6202C7.63 16.4902 7.7 16.3802 7.79 16.2902C8.16 15.9202 8.84 15.9202 9.21 16.2902C9.39 16.4802 9.5 16.7402 9.5 17.0002C9.5 17.2602 9.39 17.5202 9.21 17.7102C9.02 17.8902 8.76 18.0002 8.5 18.0002Z" fill="#862FC0" />
                    <path d="M12 18.0002C11.74 18.0002 11.48 17.8902 11.29 17.7102C11.11 17.5202 11 17.2602 11 17.0002C11 16.8702 11.03 16.7402 11.08 16.6202C11.13 16.4902 11.2 16.3802 11.29 16.2902C11.66 15.9202 12.34 15.9202 12.71 16.2902C12.8 16.3802 12.87 16.4902 12.92 16.6202C12.97 16.7402 13 16.8702 13 17.0002C13 17.2602 12.89 17.5202 12.71 17.7102C12.52 17.8902 12.26 18.0002 12 18.0002Z" fill="#862FC0" />
                    <path d="M15.5 17.9999C15.24 17.9999 14.98 17.8899 14.79 17.7099C14.7 17.6199 14.63 17.5099 14.58 17.3799C14.53 17.2599 14.5 17.1299 14.5 16.9999C14.5 16.8699 14.53 16.7399 14.58 16.6199C14.63 16.4899 14.7 16.3799 14.79 16.2899C15.02 16.0599 15.37 15.9499 15.69 16.0199C15.76 16.0299 15.82 16.0499 15.88 16.0799C15.94 16.0999 16 16.1299 16.06 16.1699C16.11 16.1999 16.16 16.2499 16.21 16.2899C16.39 16.4799 16.5 16.7399 16.5 16.9999C16.5 17.2599 16.39 17.5199 16.21 17.7099C16.02 17.8899 15.76 17.9999 15.5 17.9999Z" fill="#862FC0" />
                    <path d="M20.5 9.83984H3.5C3.09 9.83984 2.75 9.49984 2.75 9.08984C2.75 8.67984 3.09 8.33984 3.5 8.33984H20.5C20.91 8.33984 21.25 8.67984 21.25 9.08984C21.25 9.49984 20.91 9.83984 20.5 9.83984Z" fill="#862FC0" />
                    <path d="M16 22.75H8C4.35 22.75 2.25 20.65 2.25 17V8.5C2.25 4.85 4.35 2.75 8 2.75H16C19.65 2.75 21.75 4.85 21.75 8.5V17C21.75 20.65 19.65 22.75 16 22.75ZM8 4.25C5.14 4.25 3.75 5.64 3.75 8.5V17C3.75 19.86 5.14 21.25 8 21.25H16C18.86 21.25 20.25 19.86 20.25 17V8.5C20.25 5.64 18.86 4.25 16 4.25H8Z" fill="#862FC0" />
                  </svg>
                </div>
              </div>
              <div className="upcomingbottom">
                <div className="priceprogressmain">
                  <span className="upcomingtext">
                    Upcoming
                  </span>
                  <div className="progressupper">
                    <div className="progressuppertext">
                      <p className="pricepara">Price</p>
                      <h6 className="percentagepara">
                        0%
                        <span className="lighttext">
                          (0/969)
                        </span>
                      </h6>
                    </div>
                    <ProgressBar now={0} />
                  </div>
                </div>
                <p className="upcomingprice">Price</p>
                <p className="upcomingheadcore">1.50 CORE</p>
                <p className="uppricebottompara">$16,541</p>
              </div>
            </div>
          </div>
          <div className="launchpaddetailower">
            <Nav variant="pills" activeKey={activeTab} onSelect={handleSelect}>
              <Nav.Item>
                <Nav.Link eventKey="link-1">Overview</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-2">Team</Nav.Link>
              </Nav.Item>
            </Nav>

            {activeTab === 'link-1' && (
              <>
                <div className="overviewmain">
                  <div className="overvieewleft">
                    <div className="overviewhead">
                      <h6 className="overviewmainhead">Azuki</h6>
                      <img src="\assets\launchpaddetailassets\verify.svg" alt="tickimage" className="tickimage" />
                    </div>
                    <div className="contractmain">
                      <h6 className="contracthead">
                        Contract
                      </h6>
                      <div className="walletcopymain">
                        <p className="walletaddress">0x0F4Dc5c90b64437B9da458806cFb958404D6B5D8</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className='copyimg'>
                          <path d="M2.60938 1.875H1.67188V16H12.4531V15.0625H2.60938V1.875Z" fill="#745F8C" />
                          <path d="M12.5669 3.51609L10.8125 1.76172V3.51609H12.5669Z" fill="#745F8C" />
                          <path d="M12.9219 4.45312H9.875V1.40625C9.875 0.630844 9.24416 0 8.46875 0H3.54688V14.125H14.3281V5.85938C14.3281 5.08397 13.6973 4.45312 12.9219 4.45312Z" fill="#745F8C" />
                        </svg>
                      </div>
                    </div>
                    <div className="overviewparas">
                      <p className="overviewupperpara">A brand for the metaverse. Built by the community.</p>
                      <p className="overviewlowerpara">
                        Azuki starts with a collection of 10,000 avatars that give you membership access to The Garden: a corner of the internet where artists, builders, and web3 enthusiasts meet to create a decentralized future.
                      </p>
                      <ul>
                        <li className="overviewlist">
                          Azuki holders receive access to exclusive drops, experiences, and more. Visit azuki.com for more details.
                        </li>
                        <li className="overviewlist">
                          We rise together. We build together. We grow together.Ready to take the red bean?
                        </li>
                      </ul>
                    </div>
                    <h4 className="overviewinnerlisthead">Utility:</h4>
                    <div className="overviewparas">
                      <p className="overviewlowerpara">
                        Azuki starts with a collection of 10,000 avatars that give you membership access to The Garden: a corner of the internet where artists, builders, and web3 enthusiasts meet to create a decentralized future.
                      </p>
                      <ul>
                        <li className="overviewlist">
                          Azuki holders receive access to exclusive drops, experiences, and more. Visit azuki.com for more details.
                        </li>
                        <li className="overviewlist">
                          We rise together. We build together. We grow together.Ready to take the red bean?
                        </li>
                      </ul>
                    </div>
                    <h4 className="overviewinnerlisthead">Partnerships:</h4>
                    <div className="overviewparas">
                      <p className="overviewlowerpara">
                        Azuki starts with a collection of 10,000 avatars that give you membership access to The Garden: a corner of the internet where artists, builders, and web3 enthusiasts meet to create a decentralized future.
                      </p>
                      <ul>
                        <li className="overviewlist">
                          Azuki holders receive access to exclusive drops, experiences, and more. Visit azuki.com for more details.
                        </li>
                        <li className="overviewlist">
                          We rise together. We build together. We grow together.Ready to take the red bean?
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="overviewright">
                    <h4 className="visionhead">Vision</h4>
                    <div className="visionmain">
                      <img src="\assets\launchpaddetailassets\tickimages.png" alt="visionimg" className="visionimg" />
                      <div className="visiontexts">
                        <div className="visioninnertext">
                          <h6 className="visioninnerhead">A brand for the metaverse</h6>
                          <p className="visioninnerpara">Azuki starts with a collection of 100</p>
                        </div>
                        <div className="visioninnertext">
                          <h6 className="visioninnerhead">A brand for the metaverse</h6>
                          <p className="visioninnerpara">Azuki starts with a collection of 100</p>
                        </div>
                        <div className="visioninnertext">
                          <h6 className="visioninnerhead">A brand for the metaverse</h6>
                          <p className="visioninnerpara">Azuki starts with a collection of 100. Azuki starts with</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            {activeTab === 'link-2' && (
              <>
                <div className="teammain">
                  <h4 className="teamhead">
                    Meet the team
                  </h4>
                  <div className="teamscardsmain">
                    <div className="teamcard">
                      <div className="teamcardimg">
                        <img src="\assets\dummy-imgs\allcards\1.png" alt="teamcardinnerimg" className="teamcardinnerimg" />
                      </div>
                      <div className="teamcardtext">
                        <h6 className="teamcardhead">Ben</h6>
                        <p className="teamcardpara">Co-founder/ Host</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none" className='teamcardsocial'>
                          <g clip-path="url(#clip0_821_7197)">
                            <path d="M8.37345 6.06818L13.4732 0.140137H12.2647L7.83661 5.28737L4.29989 0.140137H0.220703L5.56892 7.92367L0.220703 14.1401H1.42925L6.10545 8.70448L9.84048 14.1401H13.9197L8.37315 6.06818H8.37345ZM6.71818 7.99225L6.17629 7.21718L1.8647 1.04991H3.72096L7.20046 6.0271L7.74235 6.80216L12.2653 13.2717H10.409L6.71818 7.99254V7.99225Z" fill="white" />
                          </g>
                          <defs>
                            <clipPath id="clip0_821_7197">
                              <rect width="14" height="14" fill="white" transform="translate(0.0703125 0.140137)" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                    </div>
                    <div className="teamcard">
                      <div className="teamcardimg">
                        <img src="\assets\dummy-imgs\allcards\2.png" alt="teamcardinnerimg" className="teamcardinnerimg" />
                      </div>
                      <div className="teamcardtext">
                        <h6 className="teamcardhead">Ben</h6>
                        <p className="teamcardpara">Co-founder/ Art</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none" className='teamcardsocial'>
                          <g clip-path="url(#clip0_821_7197)">
                            <path d="M8.37345 6.06818L13.4732 0.140137H12.2647L7.83661 5.28737L4.29989 0.140137H0.220703L5.56892 7.92367L0.220703 14.1401H1.42925L6.10545 8.70448L9.84048 14.1401H13.9197L8.37315 6.06818H8.37345ZM6.71818 7.99225L6.17629 7.21718L1.8647 1.04991H3.72096L7.20046 6.0271L7.74235 6.80216L12.2653 13.2717H10.409L6.71818 7.99254V7.99225Z" fill="white" />
                          </g>
                          <defs>
                            <clipPath id="clip0_821_7197">
                              <rect width="14" height="14" fill="white" transform="translate(0.0703125 0.140137)" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                    </div>
                    <div className="teamcard">
                      <div className="teamcardimg">
                        <img src="\assets\dummy-imgs\allcards\3.png" alt="teamcardinnerimg" className="teamcardinnerimg" />
                      </div>
                      <div className="teamcardtext">
                        <h6 className="teamcardhead">Ben</h6>
                        <p className="teamcardpara">Co-founder/ Host</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none" className='teamcardsocial'>
                          <g clip-path="url(#clip0_821_7197)">
                            <path d="M8.37345 6.06818L13.4732 0.140137H12.2647L7.83661 5.28737L4.29989 0.140137H0.220703L5.56892 7.92367L0.220703 14.1401H1.42925L6.10545 8.70448L9.84048 14.1401H13.9197L8.37315 6.06818H8.37345ZM6.71818 7.99225L6.17629 7.21718L1.8647 1.04991H3.72096L7.20046 6.0271L7.74235 6.80216L12.2653 13.2717H10.409L6.71818 7.99254V7.99225Z" fill="white" />
                          </g>
                          <defs>
                            <clipPath id="clip0_821_7197">
                              <rect width="14" height="14" fill="white" transform="translate(0.0703125 0.140137)" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                    </div>
                    <div className="teamcard">
                      <div className="teamcardimg">
                        <img src="\assets\dummy-imgs\allcards\4.png" alt="teamcardinnerimg" className="teamcardinnerimg" />
                      </div>
                      <div className="teamcardtext">
                        <h6 className="teamcardhead">Ben</h6>
                        <p className="teamcardpara">Co-founder/ Art</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none" className='teamcardsocial'>
                          <g clip-path="url(#clip0_821_7197)">
                            <path d="M8.37345 6.06818L13.4732 0.140137H12.2647L7.83661 5.28737L4.29989 0.140137H0.220703L5.56892 7.92367L0.220703 14.1401H1.42925L6.10545 8.70448L9.84048 14.1401H13.9197L8.37315 6.06818H8.37345ZM6.71818 7.99225L6.17629 7.21718L1.8647 1.04991H3.72096L7.20046 6.0271L7.74235 6.80216L12.2653 13.2717H10.409L6.71818 7.99254V7.99225Z" fill="white" />
                          </g>
                          <defs>
                            <clipPath id="clip0_821_7197">
                              <rect width="14" height="14" fill="white" transform="translate(0.0703125 0.140137)" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                    </div>
                    <div className="teamcard">
                      <div className="teamcardimg">
                        <img src="\assets\dummy-imgs\allcards\5.png" alt="teamcardinnerimg" className="teamcardinnerimg" />
                      </div>
                      <div className="teamcardtext">
                        <h6 className="teamcardhead">Ben</h6>
                        <p className="teamcardpara">Co-founder/ Host</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none" className='teamcardsocial'>
                          <g clip-path="url(#clip0_821_7197)">
                            <path d="M8.37345 6.06818L13.4732 0.140137H12.2647L7.83661 5.28737L4.29989 0.140137H0.220703L5.56892 7.92367L0.220703 14.1401H1.42925L6.10545 8.70448L9.84048 14.1401H13.9197L8.37315 6.06818H8.37345ZM6.71818 7.99225L6.17629 7.21718L1.8647 1.04991H3.72096L7.20046 6.0271L7.74235 6.80216L12.2653 13.2717H10.409L6.71818 7.99254V7.99225Z" fill="white" />
                          </g>
                          <defs>
                            <clipPath id="clip0_821_7197">
                              <rect width="14" height="14" fill="white" transform="translate(0.0703125 0.140137)" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                    </div>
                    <div className="teamcard">
                      <div className="teamcardimg">
                        <img src="\assets\dummy-imgs\allcards\3.png" alt="teamcardinnerimg" className="teamcardinnerimg" />
                      </div>
                      <div className="teamcardtext">
                        <h6 className="teamcardhead">Ben</h6>
                        <p className="teamcardpara">Co-founder/ Art</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none" className='teamcardsocial'>
                          <g clip-path="url(#clip0_821_7197)">
                            <path d="M8.37345 6.06818L13.4732 0.140137H12.2647L7.83661 5.28737L4.29989 0.140137H0.220703L5.56892 7.92367L0.220703 14.1401H1.42925L6.10545 8.70448L9.84048 14.1401H13.9197L8.37315 6.06818H8.37345ZM6.71818 7.99225L6.17629 7.21718L1.8647 1.04991H3.72096L7.20046 6.0271L7.74235 6.80216L12.2653 13.2717H10.409L6.71818 7.99254V7.99225Z" fill="white" />
                          </g>
                          <defs>
                            <clipPath id="clip0_821_7197">
                              <rect width="14" height="14" fill="white" transform="translate(0.0703125 0.140137)" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                    </div>
                    <div className="teamcard">
                      <div className="teamcardimg">
                        <img src="\assets\dummy-imgs\allcards\6.png" alt="teamcardinnerimg" className="teamcardinnerimg" />
                      </div>
                      <div className="teamcardtext">
                        <h6 className="teamcardhead">Ben</h6>
                        <p className="teamcardpara">Co-founder/ Host</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none" className='teamcardsocial'>
                          <g clip-path="url(#clip0_821_7197)">
                            <path d="M8.37345 6.06818L13.4732 0.140137H12.2647L7.83661 5.28737L4.29989 0.140137H0.220703L5.56892 7.92367L0.220703 14.1401H1.42925L6.10545 8.70448L9.84048 14.1401H13.9197L8.37315 6.06818H8.37345ZM6.71818 7.99225L6.17629 7.21718L1.8647 1.04991H3.72096L7.20046 6.0271L7.74235 6.80216L12.2653 13.2717H10.409L6.71818 7.99254V7.99225Z" fill="white" />
                          </g>
                          <defs>
                            <clipPath id="clip0_821_7197">
                              <rect width="14" height="14" fill="white" transform="translate(0.0703125 0.140137)" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                    </div>
                    <div className="teamcard">
                      <div className="teamcardimg">
                        <img src="\assets\dummy-imgs\allcards\7.png" alt="teamcardinnerimg" className="teamcardinnerimg" />
                      </div>
                      <div className="teamcardtext">
                        <h6 className="teamcardhead">Ben</h6>
                        <p className="teamcardpara">Co-founder/ Art</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none" className='teamcardsocial'>
                          <g clip-path="url(#clip0_821_7197)">
                            <path d="M8.37345 6.06818L13.4732 0.140137H12.2647L7.83661 5.28737L4.29989 0.140137H0.220703L5.56892 7.92367L0.220703 14.1401H1.42925L6.10545 8.70448L9.84048 14.1401H13.9197L8.37315 6.06818H8.37345ZM6.71818 7.99225L6.17629 7.21718L1.8647 1.04991H3.72096L7.20046 6.0271L7.74235 6.80216L12.2653 13.2717H10.409L6.71818 7.99254V7.99225Z" fill="white" />
                          </g>
                          <defs>
                            <clipPath id="clip0_821_7197">
                              <rect width="14" height="14" fill="white" transform="translate(0.0703125 0.140137)" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                    </div>
                    <div className="teamcard">
                      <div className="teamcardimg">
                        <img src="\assets\dummy-imgs\allcards\8.png" alt="teamcardinnerimg" className="teamcardinnerimg" />
                      </div>
                      <div className="teamcardtext">
                        <h6 className="teamcardhead">Ben</h6>
                        <p className="teamcardpara">Co-founder/ Host</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none" className='teamcardsocial'>
                          <g clip-path="url(#clip0_821_7197)">
                            <path d="M8.37345 6.06818L13.4732 0.140137H12.2647L7.83661 5.28737L4.29989 0.140137H0.220703L5.56892 7.92367L0.220703 14.1401H1.42925L6.10545 8.70448L9.84048 14.1401H13.9197L8.37315 6.06818H8.37345ZM6.71818 7.99225L6.17629 7.21718L1.8647 1.04991H3.72096L7.20046 6.0271L7.74235 6.80216L12.2653 13.2717H10.409L6.71818 7.99254V7.99225Z" fill="white" />
                          </g>
                          <defs>
                            <clipPath id="clip0_821_7197">
                              <rect width="14" height="14" fill="white" transform="translate(0.0703125 0.140137)" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                    </div>
                    <div className="teamcard">
                      <div className="teamcardimg">
                        <img src="\assets\dummy-imgs\allcards\1.png" alt="teamcardinnerimg" className="teamcardinnerimg" />
                      </div>
                      <div className="teamcardtext">
                        <h6 className="teamcardhead">Ben</h6>
                        <p className="teamcardpara">Co-founder/ Art</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none" className='teamcardsocial'>
                          <g clip-path="url(#clip0_821_7197)">
                            <path d="M8.37345 6.06818L13.4732 0.140137H12.2647L7.83661 5.28737L4.29989 0.140137H0.220703L5.56892 7.92367L0.220703 14.1401H1.42925L6.10545 8.70448L9.84048 14.1401H13.9197L8.37315 6.06818H8.37345ZM6.71818 7.99225L6.17629 7.21718L1.8647 1.04991H3.72096L7.20046 6.0271L7.74235 6.80216L12.2653 13.2717H10.409L6.71818 7.99254V7.99225Z" fill="white" />
                          </g>
                          <defs>
                            <clipPath id="clip0_821_7197">
                              <rect width="14" height="14" fill="white" transform="translate(0.0703125 0.140137)" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default Launchpaddetailpage