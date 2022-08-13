import React from "react";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";

const MakeAdminRow = ({ user, index, refetch }) => {
  const { email, role } = user;

  const handleMakeAdmin = () => {
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
        <button className="btn btn-error btn-sm text-white">
          <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon>
        </button>
      </td>
    </tr>
  );
};

export default MakeAdminRow;
