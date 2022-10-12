import React from "react";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import auth from "../../../../firebase.init";

const MakeAdminRow = ({ user, index, refetch }) => {
  // console.log(user);
  const navigate = useNavigate();
  const { email, role } = user;

  // handle Make Admin
  const handleMakeAdmin = () => {
    Swal.fire({
      title: "Are you sure?",
      text: `User from make an Admin, ${email}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Admin it!",
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
            if (res.status === 403 || res.status === 401) {
              signOut(auth);
              localStorage.removeItem("access-token");
              navigate("/login");
              toast.error("Failed To make Admin");
            }
            return res.json();
          })
          .then((data) => {
            if (data?.modifiedCount > 0) {
              toast.success(`Now ${email} Admin successfully`);
              refetch();
            }
          });

        Swal.fire("Admin!", `Now, ${email} is admin`, "success");
      }
    });
  };
  // handle Make Employer
  const handleMakeEmployer = () => {
    Swal.fire({
      title: "Are you sure?",
      text: `User from make an Employer, ${email}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Employer it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/users/employer/${email}`, {
          method: "PUT",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        })
          .then((res) => {
            if (res.status === 403 || res.status === 401) {
              signOut(auth);
              localStorage.removeItem("access-token");
              navigate("/login");
              toast.error("Failed To make Employer");
            }
            return res.json();
          })
          .then((data) => {
            if (data?.modifiedCount > 0) {
              toast.success(`Now ${email} Employer successfully`);
              refetch();
            }
          });

        Swal.fire("Employer!", `Now, ${email} is employer`, "success");
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
          <p className="text-green-500 font-bold uppercase">Already Admin</p>
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
        {role === "employer" ? (
          <p className="text-green-500 font-bold uppercase">Already Employer</p>
        ) : (
          <button
            onClick={handleMakeEmployer}
            className={`btn btn-info btn-sm text-white ${
              role === "admin" && "hidden"
            }`}
          >
            Make Employer
          </button>
        )}
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
