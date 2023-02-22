import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import Swal from "sweetalert2";
import auth from "../../../firebase.init";
import useAdmin from "../../../hooks/useAdmin";
import useEmployer from "../../../hooks/useEmployer";

const ApplicationRowModal = ({ childApplicationData }) => {
  const [user] = useAuthState(auth);
  const [admin] = useAdmin(user);
  const [employer] = useEmployer(user);
  const handleApplicationApprove = (id) => {
    fetch(
      `https://child-adoption-system-server.onrender.com/api/v1/childApply/${id}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      }
    )
      .then((res) => {
        if (res.status === 403 || res.status === 401) {
          Swal.fire({
            position: "top-center",
            icon: "error",
            title: `Failed to approved`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
        return res.json();
      })
      .then((data) => {
        if (data?.data?.modifiedCount > 0) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: `Application Approved Successfully`,
            showConfirmButton: false,
            timer: 1500,
          });

          window.location.reload();
        }
      });
  };

  return (
    <div>
      <div className="text-center font-bold">
        <h1 className="text-xl md:text-4xl ">Child Adoption System-Ador</h1>
        <p>Every Child Should Get A Quality Place and Education</p>
        <div>
          <p>Email: casa@gmail.com</p>
          <p>Call: 01629226069</p>
        </div>
        <div>
          <p>West Shewrapara, Mirpur-10, Dhaka, Bangladesh</p>
        </div>
      </div>
      <hr className="my-5" />
      <div className="md:mx-20">
        {/* Child Information Here */}
        <div>
          <h1 className="text-xl md:text-2xl font-bold">Child Information</h1>
          <div className="md:text-xl grid grid-cols-3 mb-2 items-start">
            <div className="col-span-2">
              <div className="md:text-xl grid grid-cols-3 md:mt-3">
                <p className="col-span-2">
                  Name:{" "}
                  <span className="underline font-semibold">
                    {childApplicationData?.child?.name}
                  </span>
                </p>
                <p>
                  Gender:{" "}
                  <span className="underline font-semibold">
                    {childApplicationData?.child?.gender}
                  </span>
                </p>
              </div>
              <div className="md:text-xl grid grid-cols-3 my-2">
                <p>
                  Age:{" "}
                  <span className="underline font-semibold">
                    {childApplicationData?.child?.age}
                  </span>
                </p>
                <p className="col-span-2">
                  Child Type:{" "}
                  <span className="underline font-semibold">
                    {childApplicationData?.child?.childType}
                  </span>
                </p>
              </div>
            </div>
            <img
              className="w-40 ml-auto"
              src={childApplicationData?.child?.img}
              alt={childApplicationData?.child?.name}
            />
          </div>
          <div className="md:text-xl grid grid-cols-3 my-2">
            <p>
              Agency:{" "}
              <span className="underline font-semibold">
                {childApplicationData?.child?.agency}
              </span>
            </p>
            <p>
              Disabilities:{" "}
              <span className="underline font-semibold">
                {childApplicationData?.child?.disabilities}
              </span>
            </p>
            <p>
              Religion:{" "}
              <span className="underline font-semibold">
                {childApplicationData?.child?.religion}
              </span>
            </p>
          </div>
          <div className="md:text-xl grid grid-cols-3">
            <p className="col-span-2">
              Location:{" "}
              <span className="underline font-semibold">
                {childApplicationData?.child?.location}
              </span>
            </p>
            <p>
              City:{" "}
              <span className="underline font-semibold">
                {childApplicationData?.child?.city}
              </span>
            </p>
          </div>
        </div>
        {/* Parent-1 Information Here */}
        <hr className="my-3 md:my-5" />
        <div>
          <h1 className="text-xl md:text-2xl font-bold">
            Parent-1 Information
          </h1>
          <div className="md:text-xl grid grid-cols-2 md:grid-cols-3 my-2">
            <p>
              Name:{" "}
              <span className="underline font-semibold">
                {childApplicationData?.data?.displayName}
              </span>
            </p>
            <p>
              Gender:{" "}
              <span className="underline font-semibold">
                {childApplicationData?.data?.gender}
              </span>
            </p>

            <p>
              Citizenship:{" "}
              <span className="underline font-semibold">
                {childApplicationData?.data?.citizenship}
              </span>
            </p>
            <p>
              Birth Date:{" "}
              <span className="underline font-semibold">
                {childApplicationData?.data?.birthDate}
              </span>
            </p>
            <p className="col-span-2">
              NID :{" "}
              <span className="underline font-semibold">
                {childApplicationData?.data?.nidPassport}
              </span>
            </p>
          </div>
        </div>
        <hr className="my-3 md:my-5" />
        {/* Parent-2 Information Here */}
        <div>
          <h1 className="text-xl md:text-2xl font-bold">
            Parent-2 Information
          </h1>
          <div className="md:text-xl grid grid-cols-2 md:grid-cols-3 my-2">
            <p>
              Name:{" "}
              <span className="underline font-semibold">
                {childApplicationData?.data?.displayName2}
              </span>
            </p>
            <p>
              Gender:{" "}
              <span className="underline font-semibold">
                {childApplicationData?.data?.gender2}
              </span>
            </p>
            <p>
              Citizenship:{" "}
              <span className="underline font-semibold">
                {childApplicationData?.data?.citizenship2}
              </span>
            </p>
            <p>
              Birth Date:{" "}
              <span className="underline font-semibold">
                {childApplicationData?.data?.birthDate2}
              </span>
            </p>
            <p className="col-span-2">
              NID :{" "}
              <span className="underline font-semibold">
                {childApplicationData?.data?.nidPassport2}
              </span>
            </p>
          </div>
        </div>
        <hr className="my-3 md:my-5" />
        {/* Contact Information */}
        <div className="mb-5">
          <h1 className="text-xl md:text-2xl font-bold">Contact Information</h1>
          <div className="md:text-xl grid grid-cols-2 md:grid-cols-3 my-2 mx-auto">
            <p className="col-span-2">
              Email:{" "}
              <span className="underline font-semibold">
                {childApplicationData?.email}
              </span>
            </p>

            <p className="md:mx-5">
              City:{" "}
              <span className="underline font-semibold">
                {childApplicationData?.data?.city}
              </span>
            </p>
            <p>
              Zip Code:{" "}
              <span className="underline font-semibold">
                {childApplicationData?.data?.zipCode}
              </span>
            </p>
            <p className="col-span-2">
              Location:{" "}
              <span className="underline font-semibold">
                {childApplicationData?.data?.address}
              </span>
            </p>
            <p className="">
              Country:{" "}
              <span className="underline font-semibold">
                {childApplicationData?.data?.country}
              </span>
            </p>
            <p className="col-span-2">
              Application Date:{" "}
              <span className="underline font-semibold">
                {childApplicationData?.applicationDate}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="text-center">
        {!admin && !employer ? (
          <>
            {childApplicationData?.role === "approved" ? (
              <>
                <p className="text-success font-bold">
                  " NOTE: Approved !!! Now You can download apply pdf file. "
                </p>
              </>
            ) : (
              <p className="text-error font-bold">
                " NOTE: You can't download apply pdf file before approved. "
              </p>
            )}
          </>
        ) : (
          <>
            {childApplicationData?.role === "approved" ? (
              <p className="btn btn-primary btn-sm text-white font-bold w-96 uppercase bg-green-500 text-center">
                Already Approved
              </p>
            ) : (
              <label
                htmlFor="my-modal-15"
                className="btn btn-primary btn-sm text-white w-96"
                onClick={() =>
                  handleApplicationApprove(childApplicationData?._id)
                }
              >
                Please Approve
              </label>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ApplicationRowModal;
