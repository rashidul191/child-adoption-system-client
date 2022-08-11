import React from "react";
import { useSendEmailVerification } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import { toast } from "react-toastify";

const EmailVerification = () => {
  const [sendEmailVerification] = useSendEmailVerification(auth);

  const handleEmailVerification = async () => {
    await sendEmailVerification();
    toast.success("sent email, Please check spam folder");
    // alert("Sent email");
  };

  return (
    <div className=" text-center border-dotted border-2 border-indigo-600 my-10 md:m-28">
      <div className="m-5 md:my-10">
        <h4 className="md:text-xl ">Your Email is not verify</h4>
        <h2 className="md:text-3xl text-success md:mb-5">
          Please Verify you email
        </h2>
        <button
          className="btn btn-primary mt-md-4 text-white"
          onClick={handleEmailVerification}
        >
          Send Verification again email
        </button>
      </div>
    </div>
  );
};

export default EmailVerification;
