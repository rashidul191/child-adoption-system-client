import React from "react";

const ChildApplyDetails = ({ childApply }) => {
  console.log(childApply.data);

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
          <label
            htmlFor="child-apply-modal"
            className="btn btn-success btn-sm modal-button text-white font-bold"
          >
            View Application
          </label>
        </td>
        <th>
          <button className="btn btn-primary btn-sm">Download</button>
          <p className="text-error">Processing </p>
        </th>
      </tr>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="child-apply-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box w-full">
          <label
            htmlFor="child-apply-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="font-bold text-lg">
            Congratulations random Internet user!
          </h3>
          <p className="py-4">
            You've been selected for a chance to get one year of subscription to
            use Wikipedia for free!
          </p>
          <div className="modal-action">
            <label htmlFor="child-apply-modal" className="btn">
              Yay!
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChildApplyDetails;
