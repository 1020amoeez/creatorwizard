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
              <p className="rightreservepara">© 2024 Wizard NFT Marketplace. All Rights Reserved.</p>
            </div>
            <div className='parent-right'>
              <div className="footerlinks">
                <div className="footerlinksinner">
                  <h6 className="footerhead">Company</h6>
                  <Link href="https://wizard-nft.vercel.app/aboutus" className="footerpara">About Us</Link>
                </div>
                <div className="footerlinksinner">
                <h6 className="footerhead">Marketplace</h6>
                <Link href="https://wizard-nft.vercel.app/discovercollection" className="footerpara">Explore Collections</Link>
                <Link href="https://wizard-nft.vercel.app/launchpad" className="footerpara">Launchpad</Link>
                <Link href="/createnewcollections" className="footerpara">Create Collection</Link>
              </div>
                <div className="footerlinksinner">
                  <h6 className="footerhead">Resources</h6>
                  <Link href="/termsandcondition" className="footerpara">Terms of Service</Link>
                  <Link href="/privacypolicy" className="footerpara">Privacy Policy</Link>
                </div>
                <div className="footerlinksinner">
                  <h6 className="footerhead">follow</h6>
                  <p className="footerpara">Twitter</p>
                  <p className="footerpara">Discord</p>
                  <p className="footerpara">Youtube</p>
                  <p className="footerpara">Instagram</p>
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
