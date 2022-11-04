import React from "react";
import ChildApplyPDF from "./ChildApplyPDF";
import { PDFDownloadLink } from "@react-pdf/renderer";

const ChildApplyDetails = ({ childApply }) => {
  // console.log(childApply.data);

  return (
      <tr>
        <td>
          <div className="flex items-center space-x-3">
            <div>
              <div className="font-bold">{childApply?.data?.displayName}</div>
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
          <label
            htmlFor="child-apply-modal"
            className="btn btn-success btn-sm modal-button text-white font-bold"
          >
            View Application
          </label>
        </td>
        <td>
          <PDFDownloadLink
            document={<ChildApplyPDF childApply={childApply} />}
            fileName={`apply-form`}
          >
            {({ loading }) =>
              loading ? (
                <p>Loading....</p>
              ) : (
                <button className="btn btn-primary btn-sm">Download</button>
              )
            }
          </PDFDownloadLink> 
          <p className="text-error">Processing </p>
        </td>
      </tr>

  );
};

export default ChildApplyDetails;
