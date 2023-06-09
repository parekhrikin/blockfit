import { useEffect, useState } from "react";
import "./WelcomePage.css";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const [isMetaMask, setIsMetaMask] = useState(false);
  const navigate = useNavigate();

  // Login with metamask https://docs.metamask.io/wallet/tutorials/react-dapp-local-state/
  const registerUserMetamask = async () => {};

  // handling the login with metamask button
  const loginUserMetaMask = async () => {

    if (window.ethereum) {
      await window.ethereum
        .request({
          // fetching account details from wallet

          method: "eth_requestAccounts",
        })
        .then((accounts) => {
          
          console.log("accounts", accounts);
          
          fetch(`/signin?walletId=${accounts[0]}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },            
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.error) {
                console.log("error signing in", data);
              } else {
                localStorage.setItem("userWalletId", accounts[0]); // storing public key in local storage
              }
            })
            .catch((err) => {
              console.log(err);
            });

          navigate("/dash"); // navigating to the dashboard
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      setIsMetaMask(window.ethereum.isMetaMask);
    }
  }, [window.ethereum]);

  return (
    <div className="container">
      <ul className="nav nav-tabs" id="account-tabs" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className="nav-link active"
            id="singin-tab"
            data-bs-toggle="tab"
            data-bs-target="#sing-in"
            type="button"
            role="tab"
            aria-controls="sign-in"
            aria-selected="true"
          >
            Sign In
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="register-tab"
            data-bs-toggle="tab"
            data-bs-target="#register"
            type="button"
            role="tab"
            aria-controls="register"
            aria-selected="false"
          >
            Register
          </button>
        </li>
      </ul>

      <div className="tab-content" id="myTabContent">
        <div
          className="tab-pane fade show active"
          id="sing-in"
          role="tabpanel"
          aria-labelledby="signin-tab"
        >
          <h1> Welcome to BlockFit </h1>
          {isMetaMask && (
            <button
              className="btn btn-outline-success"
              onClick={loginUserMetaMask}
              id="login-button"
            >
              Login with Metamask
            </button>
          )}
          {!isMetaMask && <h2>Download metamask to login</h2>}
        </div>
        <div
          className="tab-pane fade"
          id="register"
          role="tabpanel"
          aria-labelledby="register-tab"
        >
          <img src="./logo.png" alt="" width="72" height="72" id="logo-img" />
          <button
            className="btn btn-outline-primary"
            id="register-google-button"
            onClick={registerUserMetamask}
          >
            Register with Google
          </button>
          <button
            className="btn btn-outline-warning"
            id="register-metamask-button"
            onClick={registerUserMetamask}
          >
            Register with Metamask
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
