import React from "react";
import { useState } from "react";
import DynamicTitle from "../../Shared/DynamicTitle/DynamicTitle";

const CheckForApply = () => {
  DynamicTitle("Check Eligibility");
  const [q1Yes, setQ1Yes] = useState(0);
  const [q1No, setQ1No] = useState(0);
  const [q2Yes, setQ2Yes] = useState(0);
  const [q2No, setQ2No] = useState(0);
  const [q3Yes, setQ3Yes] = useState(0);
  const [q3No, setQ3No] = useState(0);
  const [q4Yes, setQ4Yes] = useState(0);
  const [q4No, setQ4No] = useState(0);
  const [q5Yes, setQ5Yes] = useState(0);
  const [q5No, setQ5No] = useState(0);
  const [q6Yes, setQ6Yes] = useState(0);
  const [q6No, setQ6No] = useState(0);
  const [q7Yes, setQ7Yes] = useState(0);
  const [q7No, setQ7No] = useState(0);
  const [q8Yes, setQ8Yes] = useState(0);
  const [q8No, setQ8No] = useState(0);
  const [q9Yes, setQ9Yes] = useState(0);
  const [q9No, setQ9No] = useState(0);
  const [q10Yes, setQ10Yes] = useState(0);
  const [q10No, setQ10No] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();

    const eligible = {
      yes:
        q1Yes +
        q2Yes +
        q3Yes +
        q4Yes +
        q5Yes +
        q6Yes +
        q7Yes +
        q8Yes +
        q9Yes +
        q10Yes,
      no: q1No + q2No + q3No + q4No + q5No + q6No + q7No + q8No + q9No + q10No,
    };

    console.log(eligible);
  };

  return (
    <section>
      <div className="">
        <h1 className=" md:text-xl font-bold uppercase">Check Eligibility</h1>
      </div>
      <hr />

      <div className="card bg-base-100 shadow-xl ">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="">
                <h2>Q1: বিবাহিত কিন্তু স্বামী/স্ত্রী মারা গেছে? </h2>
                <label htmlFor="q1-yes">Yes</label>
                <input
                  onClick={() => setQ1Yes(10)}
                  type="radio"
                  name="q-1"
                  id="q1-yes"
                  className="radio"
                />
                <br />
                <label htmlFor="q1-no">No</label>
                <input
                  onClick={() => setQ1No(10)}
                  type="radio"
                  name="q-1"
                  id="q1-no"
                  className="radio"
                />
              </div>

              <div className="">
                <h2>Q2: দ্বিতীয় বিবাহে কি আগ্রহ আছে? </h2>
                <label htmlFor="q2-yes">Yes</label>
                <input
                  onClick={() => setQ2Yes(10)}
                  type="radio"
                  name="q-2"
                  id="q2-yes"
                  className="radio"
                />
                <br />
                <label htmlFor="q2-no">No</label>
                <input
                  onClick={() => setQ2No(10)}
                  type="radio"
                  name="q-2"
                  id="q2-no"
                  className="radio"
                />
              </div>

              <div className="">
                <h2>Q3:আর্থিক সচ্ছলতা ও সামাজিক স্বাচ্ছন্দ্য আছে ? </h2>
                <label htmlFor="q3-yes">Yes</label>
                <input
                  onClick={() => setQ3Yes(10)}
                  type="radio"
                  name="q-3"
                  id="q3-yes"
                  className="radio"
                />
                <br />
                <label htmlFor="q3-no">No</label>
                <input
                  onClick={() => setQ3No(10)}
                  type="radio"
                  name="q-3"
                  id="q3-no"
                  className="radio"
                />
              </div>

              <div className="">
                <h2>Q4: আপনারা কি নিঃসন্তান? </h2>
                <label htmlFor="q4-yes">Yes</label>
                <input
                  onClick={() => setQ4Yes(10)}
                  type="radio"
                  name="q-4"
                  id="q4-yes"
                  className="radio"
                />
                <br />
                <label htmlFor="q4-no">No</label>
                <input
                  onClick={() => setQ4No(10)}
                  type="radio"
                  name="q-4"
                  id="q4-no"
                  className="radio"
                />
              </div>

              <div className="">
                <h2>
                  Q5: পিতা ও মাতা দুজনই কি মানসিক ও শারীরিক দিক থেকে সুস্থ ?{" "}
                </h2>
                <label htmlFor="q5-yes">Yes</label>
                <input
                  onClick={() => setQ5Yes(10)}
                  type="radio"
                  name="q-5"
                  id="q5-yes"
                  className="radio"
                />
                <br />
                <label htmlFor="q5-no">No</label>
                <input
                  onClick={() => setQ5No(10)}
                  type="radio"
                  name="q-5"
                  id="q5-no"
                  className="radio"
                />
              </div>

              <div className="">
                <h2>
                  Q6: পালক সন্তানকে নিজ সন্তান হিসেবে লালন-পালন করতে পারবেন ?{" "}
                </h2>
                <label htmlFor="q6-yes">Yes</label>
                <input
                  onClick={() => setQ6Yes(10)}
                  type="radio"
                  name="q-6"
                  id="q6-yes"
                  className="radio"
                />
                <br />
                <label htmlFor="q6-no">No</label>
                <input
                  onClick={() => setQ6No(10)}
                  type="radio"
                  name="q-6"
                  id="q6-no"
                  className="radio"
                />
              </div>

              <div className="">
                <h2>Q7: আপনাদের কি নিজের সন্তান রয়েছে? </h2>
                <label htmlFor="q7-yes">Yes</label>
                <input
                  onClick={() => setQ7Yes(10)}
                  type="radio"
                  name="q-7"
                  id="q7-yes"
                  className="radio"
                />
                <br />
                <label htmlFor="q7-no">No</label>
                <input
                  onClick={() => setQ7No(10)}
                  type="radio"
                  name="q-7"
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
                  onClick={() => setQ8Yes(10)}
                  type="radio"
                  name="q-8"
                  id="q8-yes"
                  className="radio"
                />
                <br />
                <label htmlFor="q8-no">No</label>
                <input
                  onClick={() => setQ8No(10)}
                  type="radio"
                  name="q-8"
                  id="q8-no"
                  className="radio"
                />
              </div>

              <div className="">
                <h2>Q9: আপনাদের সন্তান জন্মদানে অক্ষমতা রয়েছে?, </h2>
                <label htmlFor="q9-yes">Yes</label>
                <input
                  onClick={() => setQ9Yes(10)}
                  type="radio"
                  name="q-9"
                  id="q9-yes"
                  className="radio"
                />
                <br />
                <label htmlFor="q9-no">No</label>
                <input
                  onClick={() => setQ9No(10)}
                  type="radio"
                  name="q-9"
                  id="q9-no"
                  className="radio"
                />
              </div>

              <div className="">
                <h2>Q10: আপনারা কি বিবাহ বিচ্ছেদে আগ্রহী ? </h2>
                <label htmlFor="q10-yes">Yes</label>
                <input
                  onClick={() => setQ10Yes(10)}
                  type="radio"
                  name="q-10"
                  id="q10-yes"
                  className="radio"
                />
                <br />
                <label htmlFor="q10-no">No</label>
                <input
                  onClick={() => setQ10No(10)}
                  type="radio"
                  name="q-10"
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
