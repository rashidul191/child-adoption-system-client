import React from "react";
import ChildApplyPDF from "./ChildApplyPDF";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ApplicationRowModal from "../Application/ApplicationRowModal";
import { useState } from "react";

const ChildApplyDetails = ({ childApply }) => {
  const { _id } = childApply;
  const [childApplicationData, setChildApplicationData] = useState({});
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

  return (
    <>
      <tr>
        <td>
          <div className="flex items-center space-x-3">
            <div>
              <div className="font-bold">
                Name P1: {childApply?.data?.displayName}
              </div>
              <div className="font-bold">
                Name P2: {childApply?.data?.displayName2}
              </div>
              <div className="text-sm opacity-50">
                {childApply?.data?.address}
              </div>
            </div>
          </div>
        </td>
        <td>
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={childApply?.child?.img} alt={childApply?.child?.name} />
            </div>
          </div>
          <br />
          {childApply?.child?.name}
          <br />
          <span className="badge badge-ghost badge-sm">
            {childApply?.child?.agency}
          </span>
        </td>
        <td>
          <div className="font-bold">{childApply?.applicationDate}</div>
        </td>
        <td>
          <label
            htmlFor={`my-modal-${_id}`}
            onClick={() => handleFindApplicationId(_id)}
            className="btn btn-success btn-sm modal-button text-white font-bold"
          >
            View apply
          </label>
        </td>
        <td>
          {childApply.role === "approved" ? (
            <div className="text-center">
              <PDFDownloadLink
                document={<ChildApplyPDF childApply={childApply} />}
                fileName={`apply-form`}
              >
                {({ loading }) =>
                  loading ? (
                    <p>Loading....</p>
                  ) : (
                    <button className="btn btn-primary btn-sm text-white font-bold">
                      Download
                    </button>
                  )
                }
              </PDFDownloadLink>
              <p className="text-success uppercase font-semibold text-sm">
                Approved
              </p>
            </div>
          ) : (
            <>
              <p className="text-error font-semibold">Processing... </p>
            </>
          )}
        </td>
      </tr>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id={`my-modal-${_id}`} className="modal-toggle" />
      {/* application form modal */}
      <div className="modal md:pt-16">
        <div className="modal-box md:w-3/4 md:ml-48  max-w-5xl">
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

export default ChildApplyDetails;
