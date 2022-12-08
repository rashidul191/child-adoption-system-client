import React from "react";
import { toast } from "react-toastify";

const ApplicationRowModal = ({ childApplicationData, }) => {
  // console.log("modal from: ", childApplicationData);
  const handleApplicationApprove = (id) => {
    // console.log(id);
    fetch(
      `https://child-adoption-system-server.onrender.com/application/${id}`,
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
          toast.error("Failed To approve");
        }
        return res.json();
      })
      .then((data) => {
        if (data?.modifiedCount > 0) {
          toast.success(`Application Approved Successful`);
          window.location.reload();
        }
      });
  };

  return (
    <div>
      <div className="text-center font-semibold">
        <h1 className="text-4xl ">Child Adoption System-Ador</h1>
        <p>Every Child Should Get A Quality Place and Education</p>
        <div>
          <p>Email: casa@gmail.com</p>
          <p>Call: 01629226069</p>
        </div>
        <div>
          <p>West Shewrapara, Mirpur-10, Dhaka, Bangladesh</p>
        </div>
      </div>
      <hr />
      {/* Child Information Here */}
      <div>
        <h1 className="text-2xl font-semibold">Child Information</h1>
        <img
          className="w-32"
          src={childApplicationData?.child?.img}
          alt={childApplicationData?.child?.name}
        />
        <div>
          <p>
            Name: <span>{childApplicationData?.child?.name}</span>
          </p>
          <p>
            Gender: <span>{childApplicationData?.child?.gender}</span>
          </p>
          <p>
            Age: <span>{childApplicationData?.child?.age}</span>
          </p>
        </div>
        <p>
          Religion: <span>{childApplicationData?.child?.religion}</span>
        </p>
        <p>
          Agency: <span>{childApplicationData?.child?.agency}</span>
        </p>
        <p>
          Child Type: <span>{childApplicationData?.child?.childType}</span>
        </p>
        <p>
          Disabilities: <span>{childApplicationData?.child?.disabilities}</span>
        </p>
        <p>
          Location: <span>{childApplicationData?.child?.location}</span>
        </p>
        <p>
          City: <span>{childApplicationData?.child?.city}</span>
        </p>
      </div>
      {/* Parent-1 Information Here */}
      <div>
        <h1 className="text-2xl font-semibold">Parent-1 Information</h1>
        <div>
          <p>
            Name: <span>{childApplicationData?.data?.displayName}</span>
          </p>
          <p>
            Gender: <span>{childApplicationData?.data?.gender}</span>
          </p>
        </div>
        <p>
          Citizenship: <span>{childApplicationData?.data?.citizenship}</span>
        </p>
        <p>
          Birth Date: <span>{childApplicationData?.data?.birthDate}</span>
        </p>
        <p>
          NID / Passport: <span>{childApplicationData?.data?.nidPassport}</span>
        </p>
      </div>

      {/* Parent-2 Information Here */}
      <div>
        <h1 className="text-2xl font-semibold">Parent-2 Information</h1>
        <div>
          <p>
            Name: <span>{childApplicationData?.data?.displayName2}</span>
          </p>
          <p>
            Gender: <span>{childApplicationData?.data?.gender2}</span>
          </p>
        </div>
        <p>
          Citizenship: <span>{childApplicationData?.data?.citizenship2}</span>
        </p>
        <p>
          Birth Date: <span>{childApplicationData?.data?.birthDate2}</span>
        </p>
        <p>
          NID / Passport:{" "}
          <span>{childApplicationData?.data?.nidPassport2}</span>
        </p>
      </div>

      {/* Contact Information */}
      <div>
        <h1 className="text-2xl font-semibold">Contact Information</h1>
        <p>
          Email: <span>{childApplicationData?.email}</span>
        </p>
        <p>
          Location: <span>{childApplicationData?.data?.address}</span>
        </p>
        <p>
          City: <span>{childApplicationData?.data?.city}</span>
        </p>
        <p>
          Zip Code: <span>{childApplicationData?.data?.zipCode}</span>
        </p>
        <p>
          Country: <span>{childApplicationData?.data?.country}</span>
        </p>
      </div>

      <div className="text-center">
        {childApplicationData?.role === "approved" ? (
          <p className="text-white font-bold w-96 uppercase bg-green-500 text-center">
            Already Approved
          </p>
        ) : (
          <label
            htmlFor="my-modal-15"
            className="btn btn-primary btn-sm text-white w-96"
            onClick={() => handleApplicationApprove(childApplicationData?._id)}
          >
            Approve
          </label>
        )}
      </div>
    </div>
  );
};

export default ApplicationRowModal;
