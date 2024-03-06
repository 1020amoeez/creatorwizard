import useWindowDimensions from '@/hooks/getDimensions';
import React from 'react';
// import mainloader from '../Assets/img/mainloader.svg';
function Loadertwo({ text, text2 }) {
    const { width } = useWindowDimensions();
    return (
        <>
            <div className=''>
                <div
                    className='position-fixed w-100'
                    style={{
                        zIndex: 1100,
                        height: '10%',
                        marginLeft: width > 992 ? 0 : -100,
                    }}
                >
                    <div className='h-100 d-flex align-items-center justify-content-center'>
                        <div className='d-flex flex-wrap align-items-center justify-content-center'>
                            <img
                                width={50}
                                style={{
                                    filter:
                                        'invert(99%) sepia(1%) saturate(2%) hue-rotate(168deg) brightness(120%) contrast(100%)',
                                }}
                                src='https://v.fastcdn.co/u/430e104e/57579327-0-Loaders-3.svg'
                                alt='loader'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Loadertwo;