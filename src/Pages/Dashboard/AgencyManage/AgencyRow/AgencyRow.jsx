import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "firebase/auth";
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import auth from "../../../../firebase.init";
import { toast } from "react-toastify";

const AgencyRow = ({ index, agency, refetch }) => {
  const navigate = useNavigate();
  const { _id, agencyImg, agencyName, agencyLocation, agencyDirectorName } =
    agency;
  const handleAgencyEdit = (id) => {
    navigate(`/dashboard/agency-manage/${id}`);
  };

  const handleAgencyDelete = (id) => {
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
        text: `You won't be able to revert this! ${agencyName}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          fetch(
            `https://child-adoption-system-server.onrender.com/api/v1/agency/${id}`,
            {
              method: "DELETE",
              headers: {
                authorization: `Bearer ${localStorage.getItem("access-token")}`,
              },
            }
          )
            .then((res) => {
              if (res.status === 401 || res.status === 403) {
                signOut(auth);
                localStorage.removeItem("access-token");
                Navigate("/login");
              }
              return res.json();
            })
            .then((data) => {
              if (data?.data?.deletedCount > 0) {
                toast.success(`Delete ${agencyName} successfully`);
                refetch();
                window.location.reload();
              }
            });

          swalWithBootstrapButtons.fire(
            "Deleted!",
            "Your file has been deleted.",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your imaginary file is safe :)",
            "error"
          );
        }
      });
  };
  return (
    <tr>
      {/* <th>{index + 1}</th> */}
      {/* <th>#</th> */}
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-16 h-12">
              <img src={agencyImg} alt={agencyName} />
            </div>
          </div>
          <div>
            <div className="font-bold">{agencyName}</div>
            <div className="text-sm opacity-50">{agencyLocation}</div>
          </div>
        </div>
      </td>
      <td>By : {agencyDirectorName}</td>
      <th>
        <button
          onClick={() => handleAgencyEdit(_id)}
          className="rounded-lg bg-[#FF428D] btn-sm text-white"
        >
          Edit
        </button>
      </th>
      <th>
        <button
          onClick={() => handleAgencyDelete(_id)}
          className="btn btn-error btn-sm text-white"
        >
          <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon>
        </button>
      </th>
    </tr>
  );
};

export default AgencyRow;
