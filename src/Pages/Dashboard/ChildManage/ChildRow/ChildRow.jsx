import React from "react";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import ChildEdit from "../ChildEdit";
import { useState } from "react";

const ChildRow = ({ index, child, refetch }) => {
  const [editChild, setEditChild] = useState(false);
  const [childWithId, setChildWithId] = useState({});
  const { _id, img, name, location, childType } = child;

  const handleChildEdit = (id) => {
    //fetch(`https://child-adoption-system-server.onrender.com/api/v1/child/${id}`, {
    fetch(`http://localhost:5000/api/v1/child/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setChildWithId(data?.data);
          setEditChild(true);
        } else {
          toast.error("something is wrong!! can't edit child");
        }
      });
  };

  const handleChildDelete = (id) => {
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
        text: `You won't be able to revert this! ${name}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          fetch(
            `https://child-adoption-system-server.onrender.com/api/v1/child/${id}`,
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
                toast.success(`${name} is delete successfully`);
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
    <>
      {/* <tr className={`${editChild && "hidden"}`}> */}
      <tr>
        {/* <th>{index + 1}</th> */}
        <th>#</th>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-16 h-12">
                <img src={img} alt={name} />
              </div>
            </div>
            <div>
              <div className="font-bold">{name}</div>
              <div className="text-sm opacity-50">{location}</div>
            </div>
          </div>
        </td>
        <td>{childType}</td>
        {/* <th>
          <button
            onClick={() => handleChildEdit(_id)}
            className="rounded-lg bg-[#FF428D] btn-sm text-white"
          >
            Edit
          </button>
        </th> */}
        <th>
          <button
            onClick={() => handleChildDelete(_id)}
            className="btn btn-error btn-sm text-white"
          >
            <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon>
          </button>
        </th>
      </tr>

      {/* <div>
        <ChildEdit childWithId={childWithId}></ChildEdit>
      </div> */}
    </>
  );
};

export default ChildRow;
