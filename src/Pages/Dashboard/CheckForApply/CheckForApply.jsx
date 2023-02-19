import React from "react";
import DynamicTitle from "../../Shared/DynamicTitle/DynamicTitle";
import { useForm } from "react-hook-form";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import { toast } from "react-toastify";

const CheckForApply = () => {
  DynamicTitle("Check Eligibility");
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
          toast.error("Failed submit eligibility score!!! please try again");
        } else {
          toast.success("Submit eligibility score");
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
                <h2>Q1: বিবাহিত কিন্তু স্বামী/স্ত্রী মারা গেছে? </h2>
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
                <h2>Q2: দ্বিতীয় বিবাহে কি আগ্রহ আছে? </h2>
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
                <h2>Q3:আর্থিক সচ্ছলতা ও সামাজিক স্বাচ্ছন্দ্য আছে ? </h2>
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
                <h2>Q4: আপনারা কি নিঃসন্তান? </h2>
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
                <h2>
                  Q5: পিতা ও মাতা দুজনই কি মানসিক ও শারীরিক দিক থেকে সুস্থ ?{" "}
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
                <h2>
                  Q6: পালক সন্তানকে নিজ সন্তান হিসেবে লালন-পালন করতে পারবেন ?{" "}
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
                <h2>Q7: আপনাদের কি নিজের সন্তান রয়েছে? </h2>
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
                <h2>
                  Q8: আপনাদের সন্তান কি বড় হয়ে গেছে কিন্তু আপনাদের সাথে থাকে না?{" "}
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
                <h2>Q9: আপনাদের সন্তান জন্মদানে অক্ষমতা রয়েছে?, </h2>
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
                <h2>Q10: আপনারা কি বিবাহ বিচ্ছেদে আগ্রহী ? </h2>
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
              className="btn btn-secondary md:w-96 mt-5 rounded-none"
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
