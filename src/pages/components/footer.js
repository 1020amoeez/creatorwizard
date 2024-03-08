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
                  <a href="https://wizard-user-mainnet.vercel.app/aboutus" target='_blank' className="footerpara">About Us</a>
                </div>
                <div className="footerlinksinner">
                <h6 className="footerhead">Marketplace</h6>
                <a target='_blank' href="https://wizard-user-mainnet.vercel.app/discovercollection" className="footerpara">Explore Collections</a>
                <a target='_blank' href="https://wizard-user-mainnet.vercel.app/launchpad" className="footerpara">Launchpad</a>
                <Link href="/mycollection" className="footerpara">Create Collection</Link>
              </div>
                <div className="footerlinksinner">
                  <h6 className="footerhead">Resources</h6>
                  <a href="https://wizard-user-mainnet.vercel.app/faqs" target='_blank' className="footerpara">FAQS</a>
                  <a href="https://wizard-user-mainnet.vercel.app/walletguide" target='_blank' className="footerpara">Wallet Guide</a>
                  <a href="https://wizard-user-mainnet.vercel.app/termsandcondition" target='_blank' className="footerpara">Terms of Service</a>
                  <a href="https://wizard-user-mainnet.vercel.app/privacypolicy" target='_blank' className="footerpara">Privacy Policy</a>
                </div>
                <div className="footerlinksinner">
                  <h6 className="footerhead">follow</h6>
                  <a href='https://twitter.com/wizardgallery_' target='_blank' className="footerpara">Twitter</a>
                  <a href='https://t.me/+i7xcJ-EBosFjYjVk' target='_blank' className="footerpara">TG Announcement</a>
                  <a href='https://t.me/+76DP_bkMEUpjMzNk' target='_blank' className="footerpara">Telegram</a>
                  <a href='https://medium.com/@wizardgallery.xyz' target='_blank' className="footerpara">Medium</a>
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
