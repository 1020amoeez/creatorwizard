import useWindowDimensions from '@/hooks/getDimensions';
import React from 'react';
// import mainloader from '../Assets/img/mainloader.svg';
function Loader({ text, text2 }) {
  const { width } = useWindowDimensions();
  return (
    <>
      <div className=''>
        <div
          className='position-fixed w-100'
          style={{
            zIndex: 1100,
            marginTop: -200,
            height: '135%',
            marginLeft: width > 992 ? 0 : 0,
            // background: 'rgba(0, 0, 0, 0.6)',
            background: 'rgba(8, 5, 10, 0.5)',
            backdropFilter: 'blur(20px)'
          }}
        >
          <div className='h-100 d-flex align-items-center justify-content-center'>
            <div className='d-flex flex-wrap align-items-center justify-content-center'>
              <img
                width={150}
                style={{
                  filter:
                    'invert(99%) sepia(1%) saturate(2%) hue-rotate(168deg) brightness(120%) contrast(100%)',
                }}
                src='https://v.fastcdn.co/u/430e104e/57579327-0-Loaders-3.svg'
                alt='loader'
              />
              {/* <h2 className='text-white w-100 text-center mt-5'>{text}</h2> */}
            </div>
          </div>
          {/* {text && ( */}
          <p className="text-white text-center mr-5 new-loaderrr" style={{
            position: 'absolute',
            left: '47%',
            top: '59%',
          }}>{text}</p>
          {/* )} */}
          {/* {text2 && (
            <p className="text-white text-center mr-5 new-loaderrr" style={{
              position: 'absolute',
              left: '40%',
              top: '59%',
            }}>{text2}</p>
          )} */}

        </div>
      </div>
    </>
  );
}
export default Loader;