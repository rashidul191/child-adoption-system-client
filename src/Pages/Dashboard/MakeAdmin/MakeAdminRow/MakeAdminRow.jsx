import React from "react";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import auth from "../../../../firebase.init";

const MakeAdminRow = ({ user, index, refetch }) => {
  const navigate = useNavigate();
  const { email, role } = user;

  // handle Make Admin
  const handleMakeAdmin = (email) => {
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
        fetch(
          // `https://child-adoption-system-server.onrender.com/api/v1/user/admin/${email}`,
          `http://localhost:5000/api/v1/user/admin/${email}`,
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
              signOut(auth);
              localStorage.removeItem("access-token");
              navigate("/login");
            }
            return res.json();
          })
          .then((data) => {
            if (data?.data?.modifiedCount > 0) {
              Swal.fire({
                position: "top-center",
                icon: "success",
                title: `Now ${email} is Admin successfully`,
                showConfirmButton: false,
                timer: 1500,
              });
              Swal.fire("Admin!", `Now, ${email} is admin`, "success");
              refetch();
              window.location.reload();
            } else {
              Swal.fire({
                position: "top-center",
                icon: "error",
                title: `error!! some think wrong!! try again`,
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
      }
    });
  };
  // handle Make Employer
  const handleMakeEmployer = (email) => {
    console.log(email);
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
        fetch(
          // `https://child-adoption-system-server.onrender.com/api/v1/user/employer/${email}`,
          `http://localhost:5000/api/v1/user/employer/${email}`,
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
              signOut(auth);
              localStorage.removeItem("access-token");
              navigate("/login");
            }
            return res.json();
          })
          .then((data) => {
            if (data?.data?.modifiedCount > 0) {
              Swal.fire({
                position: "top-center",
                icon: "success",
                title: `Now ${email} is Employer successfully`,
                showConfirmButton: false,
                timer: 1500,
              });
              Swal.fire("Employer!", `Now, ${email} is employer`, "success");
              refetch();
              window.location.reload();
            } else {
              Swal.fire({
                position: "top-center",
                icon: "error",
                title: `error!! some think wrong!! try again`,
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
      }
    });
  };

  // handle Delete User
  const handleDeleteUser = (email) => {
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
          fetch(
            `https://child-adoption-system-server.onrender.com/api/v1/user/${email}`,
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
                toast.success(`${email} delete successfully`);
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
    <tr>
      {/* <td className="font-bold">{index + 1}</td> */}
      <td className="font-bold">#</td>
      <td className="font-bold">{email}</td>
      <td>
        {role === "admin" ? (
          <p className="text-green-500 font-bold uppercase">Already Admin</p>
        ) : (
          <button
            onClick={() => handleMakeAdmin(email)}
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
            onClick={() => handleMakeEmployer(email)}
            className={`btn btn-info btn-sm text-white ${
              role === "admin" && "hidden"
            }`}
          >
            <span> Make Employer</span>
          </button>
        )}
      </td>
      <td>
        <button
          onClick={() => handleDeleteUser(email)}
          className="btn btn-error btn-sm text-white"
        >
          <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon>
        </button>
      </td>
    </tr>
  );
};

export default MakeAdminRow;
