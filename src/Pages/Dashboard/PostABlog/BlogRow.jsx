import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const BlogRow = ({ blog, index, refetch }) => {
  const { _id, blogTitle, displayName, postDate } = blog;
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
        text: `You won't be able to revert this! ${blogTitle}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          fetch(
            `https://child-adoption-system-server.onrender.com/api/v1/blog/${_id}`,
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
                toast.success(`"${blogTitle}" is delete successfully`);
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
      {/* <th>{index + 1}</th> */}
      {/* <th>#</th> */}
      <td>
        <div className="flex items-center space-x-3">
          <div>
            <p className="font-bold">
              {blogTitle.length >= 30 ? blogTitle?.slice(0, 30) : blogTitle}{" "}
              {blogTitle.length >= 30 && `....`}
            </p>
          </div>
        </div>
      </td>
      <td>{displayName}</td>
      <th>{postDate}</th>
      <th>
        <button
          onClick={() => handleChildDelete(_id)}
          className="btn btn-error btn-sm text-white"
        >
          <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon>
        </button>
      </th>
    </tr>
  );
};

export default BlogRow;
