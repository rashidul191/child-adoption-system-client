import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import ApplicationRowModal from "./ApplicationRowModal";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useState } from "react";

const ApplicationRow = ({ index, application, refetch }) => {
  const { _id } = application;
  const [childApplicationData, setChildApplicationData] = useState({});

  // handle Find Application Id
  const handleFindApplicationId = (id) => {
    fetch(
      `https://child-adoption-system-server.onrender.com/api/v1/childApply/${id}`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setChildApplicationData(data?.data);
      });
  };

  // handleApplicationDelete
  const handleApplicationDelete = (_id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: `You won't be able to revert this! ${application?.data?.displayName}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          fetch(
            `https://child-adoption-system-server.onrender.com/api/v1/childApply/${_id}`,
            {
              method: "DELETE",
              headers: {
                authorization: `Bearer ${localStorage.getItem("access-token")}`,
              },
            }
          )
            .then((res) => res.json())
            .then((data) => {
              if (data?.data?.deletedCount > 0) {
                toast.success(
                  `${application?.data?.displayName} is delete successfully`
                );
                refetch();
              }
            });
          swalWithBootstrapButtons.fire(
            "Deleted!",
            "Your data has been deleted.",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your imaginary data is safe :)",
            "error"
          );
        }
      });
  };
  return (
    <>
      <tr>
        {/* <th>{index + 1}</th> */}
        {/* <th>#</th> */}
        <td>
          Name P1:{" "}
          <span className="font-bold">{application?.data?.displayName}</span>
          <br />
          Name P2:{" "}
          <span className="font-bold ">{application?.data?.displayName2}</span>
        </td>

        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img
                  src={application?.child?.img}
                  alt={application?.child?.name}
                />
              </div>
            </div>
            <div>
              <div className="font-bold">{application?.child?.name}</div>
              <div className="p-sm opacity-50">
                Agency: {application?.child?.agency}
              </div>
            </div>
          </div>
        </td>
        <td>
          <div className="font-bold">{application?.applicationDate}</div>
        </td>
        <th>
          {/* The button to open modal */}
          <label
            onClick={() => handleFindApplicationId(_id)}
            htmlFor={`my-modal-${_id}`}
            className="btn btn-primary btn-sm text-white text-sm"
          >
            View Application
          </label>

          {application?.role && (
            <p className="text-success">Already Approved</p>
          )}
        </th>
        <th>
          <button
            onClick={() => handleApplicationDelete(_id)}
            className="btn btn-error btn-sm text-white"
          >
            {" "}
            <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon>
          </button>
        </th>
      </tr>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id={`my-modal-${_id}`} className="modal-toggle" />
      {/* application form modal */}
      <div className="modal md:pt-16">
        <div className="modal-box md:w-3/4 md:ml-48 max-w-5xl">
          <label
            htmlFor={`my-modal-${_id}`}
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <ApplicationRowModal
            childApplicationData={childApplicationData}
          ></ApplicationRowModal>
        </div>
      </div>
    </>
  );
};

export default ApplicationRow;
