import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import useToken from "../../../hooks/useToken";

const SocialLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const [token] = useToken(user);
  let from = location.state?.from?.pathname || "/";
  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
    }
  }, [token, navigate, from]);

  if (loading) {
    return (
      <div className="text-center">
        <button class="btn btn-square loading "></button>
      </div>
    );
  }
  let errorElement;
  if (error) {
    errorElement = (
      <div className="alert alert-error shadow-lg">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current flex-shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              stroke-linejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-white">{error?.message}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center">
      <div className="divider">OR</div>
      <span>{errorElement}</span>
      <button onClick={() => signInWithGoogle()} className="btn btn-outline">
        Continue With Google
      </button>
    </div>
  );
};

export default SocialLogin;
