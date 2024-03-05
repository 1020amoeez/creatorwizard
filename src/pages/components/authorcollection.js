import React from 'react'

const Authorcollection = () => {
    const mainCardData = [
        {
            imageUrl: "/assets/dummy-imgs/allcards/5.png",
            title: "Scream Society OG",
        },
        {
            imageUrl: "/assets/dummy-imgs/allcards/6.png",
            title: "Bullish Monkeys",
        },
        {
            imageUrl: "/assets/dummy-imgs/allcards/7.png",
            title: "Kinzoku",
        },
        {
            imageUrl: "/assets/dummy-imgs/allcards/8.png",
            title: "Pixel Mob",
        },
        {
            imageUrl: "/assets/dummy-imgs/allcards/5.png",
            title: "Scream Society OG",
        },
        {
            imageUrl: "/assets/dummy-imgs/allcards/6.png",
            title: "Bullish Monkeys",
        },
        {
            imageUrl: "/assets/dummy-imgs/allcards/7.png",
            title: "Kinzoku",
        },
        {
            imageUrl: "/assets/dummy-imgs/allcards/8.png",
            title: "Pixel Mob",
        },


    ];
    return (
        <>
            <section className="author-collection-tab">
                <div className="bottom-cards">
                            {mainCardData.map((card, index) => (
                                <div className="main-card" key={index}>
                                    <div className="main-img">
                                        <img src={card.imageUrl} alt="img" className='img-fluid' />
                                    </div>
                                    <div className="bottom-text">
                                        <h5>{card.title}</h5>
                                    </div>
                                </div>
                            ))}
                    </div>
            </section>
        </>
    )
}

export default Authorcollection
