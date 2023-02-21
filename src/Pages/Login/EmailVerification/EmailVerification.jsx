import React from "react";
import { useSendEmailVerification } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import Swal from "sweetalert2";

const EmailVerification = () => {
  const [sendEmailVerification] = useSendEmailVerification(auth);

  const handleEmailVerification = async () => {
    await sendEmailVerification();
    Swal.fire({
      position: "top-center",
      icon: "success",
      title: `sent an email, Please check your inbox/spam folder`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <section className="md:pt-16">
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
    </section>
  );
};

export default EmailVerification;
