import Link from 'next/link'
import React from 'react'

const Footer = () => {

  return (
    <>
      <section className="mainfooter">
        <div className="custom-container">
          <div className="footer">
            <div className="footerdetail">
              <Link href="/collectiondashbord"><img src="\assets\footerassets\footerlogo.svg" alt="footerlogo" className="footerlogo" /></Link>
              <p className="footerpara">Buy, own and sell NFTs in the Wizard Gallery NFT marketplace</p>
              <div className="socialicons">
                {/* <a href='#' className="socialicon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none" className='innersocialicon'>
                    <path d="M1.00195 12.8136C1.00312 17.7633 4.58036 21.9777 9.43895 22.7534V15.7214H6.90195V12.8136H9.44195V10.6001C9.32841 9.55118 9.68447 8.50583 10.4136 7.74753C11.1427 6.98923 12.1693 6.59657 13.215 6.67605C13.9655 6.68824 14.7141 6.7555 15.455 6.87728V9.35141H14.191C13.7558 9.29407 13.3183 9.43867 13.0017 9.74449C12.6851 10.0503 12.5237 10.4842 12.563 10.924V12.8136H15.334L14.891 15.7224H12.563V22.7534C17.8174 21.9179 21.502 17.0895 20.9475 11.7663C20.3929 6.44299 15.7932 2.48835 10.4808 2.76731C5.16831 3.04626 1.0028 7.46116 1.00195 12.8136Z" fill="#862FC0" />
                  </svg>
                </a> */}
                <a href='https://twitter.com/wizardgalleryio' className="socialicon" target='_blank'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none" className='innersocialicon'>
                    <path d="M19.6441 6.93054C20.5012 6.39436 21.1425 5.55009 21.4483 4.55535C20.6429 5.05541 19.7618 5.40766 18.8429 5.59687C17.569 4.1867 15.5505 3.84352 13.9155 4.75911C12.2804 5.6747 11.4335 7.62238 11.848 9.51384C8.54901 9.34052 5.47544 7.70985 3.3921 5.02759C2.30485 6.98999 2.86046 9.49861 4.66182 10.7605C4.01043 10.7385 3.37348 10.554 2.80409 10.2222C2.80409 10.2402 2.80409 10.2582 2.80409 10.2762C2.80447 12.3204 4.18125 14.0812 6.09599 14.4863C5.49179 14.6583 4.85802 14.6837 4.24304 14.5604C4.78153 16.3085 6.32121 17.5061 8.07611 17.5419C6.62265 18.7356 4.82769 19.3829 2.98002 19.3798C2.65252 19.3803 2.32528 19.3606 2 19.3207C3.87627 20.5824 6.06002 21.2521 8.29028 21.2497C11.3931 21.272 14.375 19.992 16.569 17.696C18.763 15.3999 19.986 12.2795 19.9644 9.0326C19.9644 8.8465 19.9603 8.66141 19.952 8.47732C20.7556 7.86961 21.4491 7.11679 22 6.2542C21.2514 6.60144 20.4573 6.82941 19.6441 6.93054Z" fill="#862FC0" />
                  </svg>
                </a>
                {/* <a href='#' className="socialicon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none" className='innersocialicon'>
                    <path d="M12.2093 11.1081V14.5865H17.1483C16.6887 16.7969 14.7644 18.067 12.2093 18.067C9.2333 18.0269 6.84224 15.6562 6.84224 12.7455C6.84224 9.83482 9.2333 7.4641 12.2093 7.42404C13.4464 7.42259 14.6453 7.84241 15.6003 8.6114L18.28 5.99074C15.2061 3.34797 10.7169 3.00806 7.26368 5.15661C3.81044 7.30516 2.22311 11.4258 3.36842 15.2685C4.51374 19.1112 8.11645 21.7524 12.2093 21.75C16.8134 21.75 21 18.4752 21 12.745C20.9929 12.1933 20.9238 11.644 20.7939 11.1071L12.2093 11.1081Z" fill="#862FC0" />
                  </svg>
                </a>
                <a href='#' className="socialicon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none" className='innersocialicon'>
                    <path d="M21 3.25V15.1256L16.304 19.8749H12.391L9.954 22.25H6.913V19.8749H3V6.41616L4.227 3.25H21ZM19.435 4.83308H6.13V16.7087H9.26V19.0828L11.609 16.7077H16.304L19.434 13.5415V4.83308H19.435ZM16.305 7.99924V12.7495H14.739V8.00025H16.304L16.305 7.99924ZM12.391 7.99924V12.7495H10.826V8.00025H12.391V7.99924Z" fill="#862FC0" />
                  </svg>
                </a> */}
                <a href='https://t.me/the_wizz' target='_blank' className="socialicon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="41" viewBox="0 0 40 41" fill="none">
                    <rect y="0.75" width="40" height="40" rx="8" fill="#D0B8EB" />
                    <path d="M10.5124 19.749C16.418 17.2088 20.3559 15.5341 22.3263 14.725C27.9521 12.4148 29.1211 12.0135 29.883 12.0001C30.0506 11.9974 30.4253 12.0384 30.668 12.2328C30.873 12.397 30.9294 12.6188 30.9563 12.7744C30.9833 12.9301 31.0169 13.2847 30.9902 13.5617C30.6854 16.7242 29.3662 24.3986 28.6951 27.9406C28.4111 29.4394 27.852 29.9419 27.3107 29.9911C26.1343 30.098 25.2409 29.2235 24.1015 28.4861C22.3186 27.3323 21.3113 26.614 19.5807 25.488C17.5806 24.1868 18.8772 23.4716 20.017 22.3028C20.3153 21.9969 25.4986 17.3423 25.5989 16.9201C25.6115 16.8673 25.6231 16.6705 25.5046 16.5665C25.3862 16.4626 25.2114 16.4981 25.0852 16.5264C24.9064 16.5665 22.0581 18.4251 16.5404 22.1023C15.7319 22.6504 14.9996 22.9174 14.3435 22.9035C13.6202 22.888 12.2288 22.4997 11.1945 22.1678C9.92583 21.7606 8.91753 21.5454 9.00533 20.8539C9.05106 20.4938 9.55341 20.1255 10.5124 19.749Z" fill="#862FC0" />
                  </svg>
                </a>
              </div>
            </div>
            <div className='parent-right'>
              <div className="footerlinks">
                <div className="footerlinksinner">
                  <h6 className="footerhead">My Account</h6>
                  {/* <Link href="/authorprofile" className="footerpara">Authors</Link>
                  <Link href="/collections" className="footerpara">Collection</Link> */}
                  <Link href="/authorprofile" className="footerpara">My Profile</Link>
                  <Link href="/collectiondetail" className="footerpara">Create Collection</Link>
                </div>
                {/* <div className="footerlinksinner">
                  <h6 className="footerhead">Resources</h6>
                  <p className="footerpara">Help & Support</p>
                  <p className="footerpara">Live Auctions</p>
                  <Link href="/nftdetail" className="footerpara">Item Details</Link>
                  <Link href="/collections?tab=activity" className="footerpara" passHref>Activity</Link>
                </div> */}
                <div className="footerlinksinner">
                  <h6 className="footerhead">Company</h6>
                  <Link href="/aboutus" className="footerpara">About Us</Link>
                  <Link href="/contactus" className="footerpara">Contact Us</Link>
                  {/* <p className="footerpara">Our Blog</p> */}
                  <Link href="/discovercollection" className="footerpara">Discover</Link>
                </div>
              </div>
              <div className="subscribemain">
                <h6 className="subscribehead">Subscribe Us</h6>
                <div className="subscribeinput">
                  <input type="text" className="innersubscribeinput" placeholder='info@yourgmail.com' />
                  <button className="subscribebtn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M3.91533 2.18876C4.23957 1.95506 4.67182 1.93688 5.01454 2.14251L20.0145 11.1425C20.3157 11.3232 20.5 11.6487 20.5 12C20.5 12.3513 20.3157 12.6768 20.0145 12.8575L5.01454 21.8575C4.67182 22.0631 4.23957 22.0449 3.91533 21.8112C3.5911 21.5775 3.43715 21.1732 3.52386 20.7831L5.25343 13L10.5 13C11.0523 13 11.5 12.5523 11.5 12C11.5 11.4477 11.0523 11 10.5 11L5.25343 11L3.52386 3.21693C3.43715 2.82677 3.5911 2.42246 3.91533 2.18876Z" fill="white" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Footer
