import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Verification() {
  const location = useLocation();
  const { email } = location.state;
  const navigate = useNavigate();
 
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [verified, setVerified] = useState("");
 
  function handleOtp(event) {
    setOtp(event.target.value);
  }
 
  function verify() {
    axios({
      url: "http://localhost:7000/verifyUser",
      method: "post",
      data: {
        email: email,
        code: otp,
      },
    })
      .then((response) => {
        if (response.data.message === "User Verified successfully") {
          setVerified(" Verification Successful! You can now login and will be redirected to login page in 5 seconds");
          setTimeout(()=>{
            navigate("/login");
          },5000);
         
        } else {
          setError("Invalid verification code");
        }
      })
      .catch((error) => {
        setError("An error occurred while verifying the user.");
        console.error("Error verifying user:", error);
      });
  }
 
  return (
    <div className="container">
      <div>
        <div></div>
        <div ></div>
      </div>
      <div >
        <div >
          <h6>Please enter the one-time password to verify your account</h6>
          {error && (
            <div className="alert"> {error} </div>
          )}
          {verified && (
            <div className="alert-success">
              {" "}
              {verified}
            </div>
          )}
          <div id="otp" >
            <input
              onChange={handleOtp}
              type="text"
              className="otp-input"
            />
          </div>
          <div >
            <button className="verifyButton" onClick={verify}>
              Validate
            </button>
          </div>
        </div>
        <div >
          <div >
            <span>Didn't get the code?</span>
            <a href="#" >
              Resend(1/3)
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default Verification;