import React from "react";
import ChildApplyPDF from "./ChildApplyPDF";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";

const ChildApplyDetails = ({ childApply }) => {
  // console.log(childApply.data);

  return (
    <>
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
          {/* The button to open modal */}
          {/* <label
            htmlFor="child-apply-modal"
            className="btn btn-success btn-sm modal-button text-white font-bold"
          >
            View Application
          </label> */}
          <label
            htmlFor="child-apply-modal"
            className="btn btn-success btn-sm modal-button text-white font-bold"
          >
            View Application
          </label>
        </td>
        <th>
          <PDFDownloadLink
            document={<ChildApplyPDF childApply={childApply} />}
            fileName={`apply-form`}
          >
            {({ loading }) =>
              loading ? (
                <button>Loading....</button>
              ) : (
                <button className="btn btn-primary btn-sm">Download</button>
              )
            }
          </PDFDownloadLink> 
          <p className="text-error">Processing </p>
        </th>
      </tr>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="child-apply-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="h-full w-full mx-auto modal-box">
          <label
            htmlFor="child-apply-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          
          <PDFViewer>
            <ChildApplyPDF />
          </PDFViewer>

          {/* <div className="modal-action">
            <label htmlFor="child-apply-modal" className="btn">
              Yay!
            </label>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default ChildApplyDetails;
