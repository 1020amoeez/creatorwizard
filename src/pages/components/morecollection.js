import dynamic from 'next/dynamic';
import React from 'react';

var $ = require('jquery');
if (typeof window !== 'undefined') {
    window.$ = window.jQuery = require('jquery');
}
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Link from 'next/link';

const OwlCarousel = dynamic(() => import('react-owl-carousel'), { ssr: false });

const MoreCollection = () => {
    const owl_option = {
        nav: true,
        dots: false,
        dotsEach: true,
        loop: true,
        autoplay: false,
        navText: [
            "<img src='/assets/landing/static/carousel-arrow-back.svg' alt='img' />",
            "<img src='/assets/landing/static/carousel-arrow-next.svg' alt='img' />",
        ],
        responsive: {
            0: {
                items: 1,
                margin: 10,
            },
            361: {
                items: 1.2,
                margin: 10,
                loop: true,
                nav: false,
                dots: true,
                dotsEach: true
            },
            600: {
                items: 1.2,
                margin: 10,
                loop: true,
                nav: false,
                dots: true,
                dotsEach: true
            },
            700: {
                items: 3.5,
                margin: 10,
            },
            1000: {
                items: 4,
                margin: 10,
            },
            1200: {
                items: 4,
                margin: 10,
            },
            1900: {
                items: 6,
                margin: 10,
            },
            2000: {
                items: 7,
                margin: 10,
            },
            2250: {
                items: 8,
                margin: 10,
            },
        },
    };
    const cardData = [
        {
            id: 1,
            imageSrc: '/assets/dummy-imgs/allcards/l1.png',
            artist: 'Azuki',
            cardNumber: '#2682',
            price: 276.45,
        },
        {
            id: 2,
            imageSrc: '/assets/dummy-imgs/allcards/l2.png',
            artist: 'Azuki',
            cardNumber: '#2682',
            price: 276.45,
        },
        {
            id: 3,
            imageSrc: '/assets/dummy-imgs/allcards/l3.png',
            artist: 'Azuki',
            cardNumber: '#2682',
            price: 276.45,
        },
        {
            id: 4,
            imageSrc: '/assets/dummy-imgs/allcards/l4.png',
            artist: 'Azuki',
            cardNumber: '#2682',
            price: 276.45,
        },

    ];

    return (
        <>
            <section className="live-auction">
                <div className="custom-container">
                    <div className="bottom-cards displaynoneinmobile">
                        {cardData.map((card) => (
                            <div key={card.id} className="main-card">
                                <div className="main-img">
                                    <img
                                        src={card.imageSrc}
                                        alt="img"
                                        className="img-fluid main-img-card"
                                    />
                                    <img
                                        src="/assets/landing/static/live-auction-abs.svg"
                                        alt="img"
                                        className="img-fluid abs-img"
                                    />
                                </div>
                                <div className="bottom-text">
                                    <div className="twice-text">
                                        <div className="left-text">
                                            <h6>
                                                {card.artist}{' '}
                                                <img
                                                    src="/assets/landing/static/verify-icon.svg"
                                                    alt="img"
                                                    className="img-fluid"
                                                />
                                            </h6>
                                            <h5>{card.cardNumber}</h5>
                                        </div>
                                    </div>
                                    <div className="twice-pricebid">
                                        <div className="left-side">
                                            <h6>Price</h6>
                                            <h5>
                                                <img
                                                    src="/assets/landing/static/price-icon.svg"
                                                    alt="img"
                                                    className="img-fluid"
                                                />
                                                {card.price} <span>Core</span>
                                            </h5>
                                        </div>
                                        <div className="left-side">
                                            <h6>Highest bid</h6>
                                            <h5>
                                                {card.price} <span>Core</span>
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                                <Link href="/nftdetail" className='btn-forbid'>Place a bid</Link>
                            </div>
                        ))}
                    </div>
                    <div className="bottom-cards d-none displayblockinmobile">
                        <div className="owl_option">
                            <OwlCarousel
                                className="owl-theme"
                                {...owl_option}
                            >
                                {cardData.map((card) => (
                                    <div key={card.id} className="main-card">
                                        <div className="main-img">
                                            <img
                                                src={card.imageSrc}
                                                alt="img"
                                                className="img-fluid main-img-card"
                                            />
                                            <img
                                                src="/assets/landing/static/live-auction-abs.svg"
                                                alt="img"
                                                className="img-fluid abs-img"
                                            />
                                        </div>
                                        <div className="bottom-text">
                                            <div className="twice-text">
                                                <div className="left-text">
                                                    <h6>
                                                        {card.artist}{' '}
                                                        <img
                                                            src="/assets/landing/static/verify-icon.svg"
                                                            alt="img"
                                                            className="img-fluid"
                                                        />
                                                    </h6>
                                                    <h5>{card.cardNumber}</h5>
                                                </div>
                                            </div>
                                            <div className="twice-pricebid">
                                                <div className="left-side">
                                                    <h6>Price</h6>
                                                    <h5>
                                                        <img
                                                            src="/assets/landing/static/price-icon.svg"
                                                            alt="img"
                                                            className="img-fluid"
                                                        />
                                                        {card.price} <span>Core</span>
                                                    </h5>
                                                </div>
                                                <div className="left-side">
                                                    <h6>Highest bid</h6>
                                                    <h5>
                                                        {card.price} <span>Core</span>
                                                    </h5>
                                                </div>
                                            </div>
                                        </div>
                                        <Link href="/nftdetail" className='btn-forbid'>Place a bid</Link>
                                    </div>
                                ))}
                            </OwlCarousel>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default MoreCollection;
