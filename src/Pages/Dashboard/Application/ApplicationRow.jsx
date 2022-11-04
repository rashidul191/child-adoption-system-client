import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ApplicationRow = ({ index, application, refetch }) => {
  const { _id } = application;
  // const {displayName  } = application?.parentData;
  // const { } = application?.child;

  console.log(application);

  const handleChildDelete = (_id) => {
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
        text: `You won't be able to revert this! ${application?.parentData?.displayName}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          fetch(`http://localhost:5000/-allChilds/${_id}`, {
            method: "DELETE",
            headers: {
              authorization: `Bearer ${localStorage.getItem("access-token")}`,
            },
          })
            .then((res) => res.json())
            .then((data) => {
              if (data?.deletedCount > 0) {
                toast.success(
                  `${application?.parentData?.displayName} is delete successfully`
                );
                refetch();
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
      <th>
{index + 1}
      </th>

      <td>
        P1: <span className="font-bold">{application?.parentData?.displayName}</span>
        <br />
        P2: <span className="font-bold ">{application?.parentData?.displayName2}</span>
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
            <div className="text-sm opacity-50">
             Agency: {application?.child?.agency}
            </div>
          </div>
        </div>
      </td>

      <th>
        <button className="btn btn-success btn-sm text-white">Approve</button>
      </th>
      <th>
        <button
          onClick={() => handleChildDelete(_id)}
          className="btn btn-error btn-sm text-white"
        >
          <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon>
        </button>
        <button
        
          className="btn btn-info btn-sm text-white"
        >
         cancel
        </button>
      </th>
    </tr>
  );
};

export default ApplicationRow;
