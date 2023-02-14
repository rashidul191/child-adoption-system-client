import React from "react";

const Admin = ({ user }) => {
  // console.log(user);
  return (
    <>
      {user.role === "admin" && (
        <div className="card w-72 md:w-96 bg-base-100 border rounded-none mb-5 mx-auto">
          <figure>
            <img
              width={130}
              src={
                user?.photoURL
                  ? user?.photoURL
                  : `https://i.ibb.co/tmprR1w/profile-icon.webp`
              }
              alt={user?.name}
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{user.email}</h2>
            <p>
              Position:{" "}
              <span className="uppercase text-[#8EA246] font-semibold">
                {user.role}
              </span>
            </p>
            <p>Child Adoption System Ador</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Admin;
