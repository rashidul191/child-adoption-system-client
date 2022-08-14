import React from "react";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const MakeAdminRow = ({ user, index, refetch }) => {
  const { email, role } = user;

  // handle Make Admin
  const handleMakeAdmin = () => {
    Swal.fire({
      title: "Are you sure?",
      text: `User from make an admin, ${email}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, admin it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/users/admin/${email}`, {
          method: "PUT",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        })
          .then((res) => {
            if (res.status === 403) {
              toast.error("Failed To make Admin");
            }
            return res.json();
          })
          .then((data) => {
            if (data?.modifiedCount > 0) {
              //   console.log(data);
              toast.success(`Now ${email} admin successfully`);
              refetch();
            }
          });

        Swal.fire("Admin!", `Now, ${email} is admin`, "success");
      }
    });
  };

  // handle Delete User
  const handleDeleteUser = () => {
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
        text: `You won't be able to revert this! ${email}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          fetch(`http://localhost:5000/user/${email}`, {
            method: "DELETE",
            headers: {
              authorization: `Bearer ${localStorage.getItem("access-token")}`,
            },
          })
            .then((res) => res.json())
            .then((data) => {
              if (data?.deletedCount > 0) {
                
                toast.success(`${email} delete successfully`);
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
      <td className="font-bold">{index + 1}</td>
      <td className="font-bold">{email}</td>
      <td>
        {role === "admin" ? (
          <p className="text-green-500">Already Admin</p>
        ) : (
          <button
            onClick={handleMakeAdmin}
            className="btn btn-primary btn-sm text-white"
          >
            Make Admin
          </button>
        )}
      </td>
      <td>
        <button className="btn btn-info btn-sm text-white">
          Make Employer
        </button>
      </td>
      <td>
        <button
          onClick={handleDeleteUser}
          className="btn btn-error btn-sm text-white"
        >
          <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon>
        </button>
      </td>
    </tr>
  );
};

export default MakeAdminRow;
