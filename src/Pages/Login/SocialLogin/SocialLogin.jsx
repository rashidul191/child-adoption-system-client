import React from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";

const SocialLogin = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  if (error) {
    return <p className="text-error">Error</p>;
  }
  if (loading) {
    return <p>Loading.....</p>;
  }

  if (user) {
    console.log(user);
  }

  return (
    <div className="text-center">
      <div class="divider">OR</div>
      <button onClick={() => signInWithGoogle()} className="btn btn-outline">
        Continue With Google
      </button>
    </div>
  );
};

export default SocialLogin;
