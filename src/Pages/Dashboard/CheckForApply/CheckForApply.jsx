import React from "react";
import DynamicTitle from "../../Shared/DynamicTitle/DynamicTitle";
import { useForm } from "react-hook-form";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckForApply = () => {
  DynamicTitle("Check Eligibility");
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const { register: checkForApply, handleSubmit } = useForm();
  const onSubmit = (data) => {
    let allowValue = [];
    let notAllowValue = [];

    for (let i = 1; i <= 10; i++) {
      if (data.q[i] === "yes") {
        allowValue.push(data.q[i]);
      } else {
        notAllowValue.push(data.q[i]);
      }
    }
    const finalAllowResult = {
      email: user?.email,
      allowValue,
      notAllowValue,
    };

    fetch(
      `https://child-adoption-system-server.onrender.com/api/v1/checkEligibility/${user?.email}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
        body: JSON.stringify(finalAllowResult),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data?.data?.acknowledged) {
          Swal.fire({
            position: "top-center",
            icon: "error",
            title: `Failed submit eligibility score!!! please try again`,
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: `Submit Eligible Score`,
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/dashboard/eligibility-score");
        }
        window.location.reload();
      });
  };

  return (
    <section>
      <div className="">
        <h1 className="md:text-xl font-bold uppercase">Check Eligibility</h1>
      </div>
      <hr />

      <div className="card bg-base-100 shadow-xl ">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="">
                <h2 className="font-bold">
                  Q1: আপনি কি নিঃসন্তান দম্পতি ? <br />
                  <span>Are you a childless couple ?</span>{" "}
                </h2>
                <label htmlFor="q1-yes">Yes</label>
                <input
                  id="q1-yes"
                  className="radio"
                  required
                  {...checkForApply("q[1]")}
                  type="radio"
                  value="yes"
                />
                <br />
                <label htmlFor="q1-no">No</label>
                <input
                  id="q1-no"
                  className="radio"
                  required
                  {...checkForApply("q[1]")}
                  type="radio"
                  value="no"
                />
              </div>

              <div className="">
                <h2 className="font-bold">
                  Q2: আপনি কি একজন পালক সন্তানকে নিজের মতো করে গড়ে তুলতে
                  শারীরিকভাবে সক্ষম? <br />{" "}
                  <span>
                    Are you physically capable of raising a foster child as your
                    own ?
                  </span>{" "}
                </h2>
                <label htmlFor="q2-yes">Yes</label>
                <input
                  type="radio"
                  name="q-2"
                  id="q2-yes"
                  className="radio"
                  required
                  {...checkForApply("q[2]")}
                  value="yes"
                />
                <br />
                <label htmlFor="setQ3Yesq2-no">No</label>
                <input
                  type="radio"
                  id="q2-no"
                  className="radio"
                  required
                  {...checkForApply("q[2]")}
                  value="no"
                />
              </div>

              <div className="">
                <h2 className="font-bold">
                  Q3: আর্থিক সচ্ছলতা ও সামাজিক স্বাচ্ছন্দ্য আছে ? <br />{" "}
                  <span>
                    Are you a woman who is married, but whose husband has died
                    and is not interested in a second marriage ?
                  </span>{" "}
                </h2>
                <label htmlFor="q3-yes">Yes</label>
                <input
                  type="radio"
                  id="q3-yes"
                  className="radio"
                  required
                  {...checkForApply("q[3]")}
                  value="yes"
                />
                <br />
                <label htmlFor="q3-no">No</label>
                <input
                  type="radio"
                  id="q3-no"
                  className="radio"
                  required
                  {...checkForApply("q[3]")}
                  value="yes"
                />
              </div>

              <div className="">
                <h2 className="font-bold">
                  Q4: পালক সন্তান দত্তক নেওয়ার জন্য আপনার কি আর্থিক উপায় এবং
                  সামাজিক স্বাচ্ছন্দ্য আছে ? <br />{" "}
                  <span>
                    Do you have financial means and social comfort to adopt a
                    foster child ?
                  </span>{" "}
                </h2>
                <label htmlFor="q4-yes">Yes</label>
                <input
                  type="radio"
                  id="q4-yes"
                  className="radio"
                  required
                  {...checkForApply("q[4]")}
                  value="yes"
                />
                <br />
                <label htmlFor="q4-no">No</label>
                <input
                  type="radio"
                  id="q4-no"
                  className="radio"
                  required
                  {...checkForApply("q[4]")}
                  value="no"
                />
              </div>

              <div className="">
                <h2 className="font-bold">
                  Q5: আপনি কি এমন একজন দম্পতি যাদের নিজের সন্তান বড় হয়েছে
                  কিন্তু আপনার সাথে থাকেন না? <br />
                  <span>
                    Are you a couple whose own children are grown but do not
                    live with you ?
                  </span>
                </h2>
                <label htmlFor="q5-yes">Yes</label>
                <input
                  type="radio"
                  id="q5-yes"
                  className="radio"
                  required
                  {...checkForApply("q[5]")}
                  value="yes"
                />
                <br />
                <label htmlFor="q5-no">No</label>
                <input
                  type="radio"
                  id="q5-no"
                  className="radio"
                  required
                  {...checkForApply("q[5]")}
                  value="no"
                />
              </div>

              <div className="">
                <h2 className="font-bold">
                  Q6: আপনি কি একজন অবিবাহিত মহিলা যিনি বিয়ে না করার সিদ্ধান্ত
                  নিয়েছেন বা বিবাহযোগ্য বয়স হয়নি ? <br />
                  <span>
                    Are you an unmarried woman who has decided not to marry or
                    is not of marriageable age ?
                  </span>
                </h2>
                <label htmlFor="q6-yes">Yes</label>
                <input
                  type="radio"
                  required
                  {...checkForApply("q[6]")}
                  value="yes"
                  id="q6-yes"
                  className="radio"
                />
                <br />
                <label htmlFor="q6-no">No</label>
                <input
                  type="radio"
                  required
                  {...checkForApply("q[6]")}
                  value="no"
                  id="q6-no"
                  className="radio"
                />
              </div>

              <div className="">
                <h2 className="font-bold">
                  Q7: আপনি কি আর্থিকভাবে সুস্থ ? <br />
                  <span>Are you financially sound ?</span>{" "}
                </h2>
                <label htmlFor="q7-yes">Yes</label>
                <input
                  type="radio"
                  required
                  {...checkForApply("q[7]")}
                  value="yes"
                  id="q7-yes"
                  className="radio"
                />
                <br />
                <label htmlFor="q7-no">No</label>
                <input
                  type="radio"
                  required
                  {...checkForApply("q[7]")}
                  value="no"
                  id="q7-no"
                  className="radio"
                />
              </div>

              <div className="">
                <h2 className="font-bold">
                  Q8: আপনি কি একজন বন্ধ্যা দম্পতি যারা সন্তান ধারণ করতে সক্ষম কিন্তু বিবাহবিচ্ছেদ বা দ্বিতীয় বিয়েতে আগ্রহী নন
                  ? <br />{" "}
                  <span>
                    {" "}
                    Are you an infertile couple who is capable of bearing
                    children but not interested in divorce or second marriage ?
                  </span>
                </h2>
                <label htmlFor="q8-yes">Yes</label>
                <input
                  type="radio"
                  required
                  {...checkForApply("q[8]")}
                  value="yes"
                  id="q8-yes"
                  className="radio"
                />
                <br />
                <label htmlFor="q8-no">No</label>
                <input
                  type="radio"
                  required
                  {...checkForApply("q[8]")}
                  value="no"
                  id="q8-no"
                  className="radio"
                />
              </div>

              <div className="">
                <h2 className="font-bold">
                  Q9: আপনার বয়স কি কমপক্ষে 18 বছর ? <br />
                  <span>Are you at least 18 years old ?</span>
                </h2>
                <label htmlFor="q9-yes">Yes</label>
                <input
                  type="radio"
                  required
                  {...checkForApply("q[9]")}
                  value="yes"
                  id="q9-yes"
                  className="radio"
                />
                <br />
                <label htmlFor="q9-no">No</label>
                <input
                  type="radio"
                  required
                  {...checkForApply("q[9]")}
                  value="no"
                  id="q9-no"
                  className="radio"
                />
              </div>

              <div className="">
                <h2 className="font-bold">
                  Q10: আপনার বয়স কি 35-45 বছরের মধ্যে ? <br />{" "}
                  <span>Are you aged between 35-45 years ?</span>{" "}
                </h2>
                <label htmlFor="q10-yes">Yes</label>
                <input
                  type="radio"
                  required
                  {...checkForApply("q[10]")}
                  value="yes"
                  id="q10-yes"
                  className="radio"
                />
                <br />
                <label htmlFor="q10-no">No</label>
                <input
                  type="radio"
                  required
                  {...checkForApply("q[10]")}
                  value="no"
                  id="q10-no"
                  className="radio"
                />
              </div>
            </div>
            <input
              className="btn btn-primary md:w-96 mt-5 rounded-none text-white font-bold"
              type="submit"
              value="Submit"
            />
          </form>
        </div>
      </div>
    </section>
  );
};

export default CheckForApply;
