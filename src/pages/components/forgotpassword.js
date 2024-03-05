import Link from 'next/link'
import { useState } from 'react'
import axios from 'axios'
import Environment from '@/utils/Enviroment'
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';

const ForgotPassword = () => {

  const [email, setEmail] = useState("");
  const api_url = Environment.api_url;
  const router = useRouter();
  const [error, setError] = useState(null);
  const [emailerrorregister, setEmailErrorRegister] = useState("");


  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const ForgetPassword = (e) => {
    if (email.length === 0) {
      setEmailErrorRegister("Email is Required");
    } else if (!isValidEmail(email)) {
      setEmailErrorRegister("Email is invalid");
    } else {
      var data = JSON.stringify({
        email: email,
      });
      var config = {
        method: "post",
        url: `${api_url}/auth/creators/forget-password`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      axios(config)
        .then(function (response) {
          toast.info("Email sent check Your Gmail")

          // router.push("/createnewpassword")
          // const resData = response?.data?.data;
          // router.push("/collectiondashbord")
        })
        .catch(function (error) {
          if (
            email.length > 0 &&
            isValidEmail(email)
          ) {
            toast.error("Incorrect email");
          }
        });
    }
  };

  return (
    <>
      <section className="login-section">
        <span className='gradient-linear'></span>
        <div className="parent">
          <img src="\login-logo.svg" alt="img" className='img-fluid login-logo' />
          <div className="main-card">
            <div className="main-heading">
              <h6>Forgot your Password?</h6>
              <p>Enter your registered email to receive password reset instructions.</p>
            </div>
            <div className="option-field">
              <label>Email</label>
              <input value={email} onChange={(e) => { setEmail(e.target.value); setEmailErrorRegister("") }} type="text" placeholder='Your email...' />
              {/* {error ? (
                <p className="text-danger mt-2">{error}</p>
              ) : null} */}
              {emailerrorregister ? (
                <p className="text-danger mt-2">{emailerrorregister}</p>
              ) : null}
            </div>
            <button
              //  href="/createnewpassword" 
              onClick={ForgetPassword}
              className='btn-sign mb-0'>Send</button>
          </div>
        </div>
      </section>
    </>
  )
}

export default ForgotPassword
