import {
  faHandHoldingDollar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const DonationFirstPage = () => {
  return (
    <>
      <div className="card h-[300px] w-11/12 bg-base-100 rounded-none mx-auto my-5">
        <div className="avatar">
          <div className="w-16 mx-auto rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <FontAwesomeIcon
              className="text-5xl mr-4"
              icon={faHandHoldingDollar}
            ></FontAwesomeIcon>
          </div>
        </div>
        <div className="items-center text-center m-4">
          <h2 className="text-xl font-bold">SADAQA</h2>
          <div className="">
            <p className="font-bold text-secondary"></p>
            <p> BANK ACCOUNT</p>
            <p>The City Bank Ltd.</p>
            <p>Acc Name: Child Adoption System Ador</p>
            <p>Acc No: 14018737****</p>
            <p>New Market Branch</p>
            <p>SWIFT Code: CIBLBDDH</p>
            <p>Routing Number: 2252****</p>
          </div>
        </div>
      </div>
      <div className="card h-[300px] w-11/12 bg-base-100 rounded-none mx-auto my-5">
        <div className="avatar">
          <div className="w-16 mx-auto rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <FontAwesomeIcon
              className="text-5xl mr-4"
              icon={faHandHoldingDollar}
            ></FontAwesomeIcon>
          </div>
        </div>
        <div className="items-center text-center m-4">
          <h2 className="text-xl font-bold">ZAKAT</h2>
          <div className="">
            <p className="font-bold text-secondary"></p>
            <p> BANK ACCOUNT</p>
            <p>The City Bank Ltd.</p>
            <p>Acc Name: Child Adoption System Ador</p>
            <p>Acc No: 14018737****</p>
            <p>New Market Branch</p>
            <p>SWIFT Code: CIBLBDDH</p>
            <p>Routing Number: 2252****</p>
          </div>
        </div>
      </div>
      <div className="card h-[300px] w-11/12 bg-base-100 rounded-none mx-auto my-5">
        <div className="avatar">
          <div className="w-16 mx-auto rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <FontAwesomeIcon
              className="text-5xl mr-4"
              icon={faHandHoldingDollar}
            ></FontAwesomeIcon>
          </div>
        </div>
        <div className="items-center text-center m-4">
          <h2 className="text-xl font-bold">OTHER OPTIONS</h2>
          <div className="">
            <p className="font-bold text-secondary"></p>
            <p> PAY ONLINE</p>
            <p>BKASH(Send Money) 017304*****</p>
            <p>NAGAD(Send Money) 017304*****</p>
            <p>Roket(Send Money) 017304*****</p>
            <p>Call us on: 017304*****</p>
            <p>Email: casa@gmail.com</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DonationFirstPage;
