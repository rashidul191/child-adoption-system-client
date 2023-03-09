import { faHandHoldingDollar } from "@fortawesome/free-solid-svg-icons";
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
          <h2 className="text-xl md:text-2xl font-bold">SADAQA</h2>
          <div className="font-semibold">
            <p> BANK ACCOUNT</p>
            <p>Dutch-Bangla Bank Limited.</p>
            <p>Acc Name: MD RASHIUDL ISLAM</p>
            <p>Acc No: 1641050101941</p>
            <p>Mirpur 10 Branch</p>
            <p>SWIFT Code: DBBLBDDH</p>
            <p>Routing Number: 90263136</p>
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
          <h2 className="text-xl md:text-2xl font-bold">ZAKAT</h2>
          <div className="font-semibold">
            <p> BANK ACCOUNT</p>
            <p>Dutch-Bangla Bank Limited.</p>
            <p>Acc Name: MD RASHIUDL ISLAM</p>
            <p>Acc No: 1641050101941</p>
            <p>Mirpur 10 Branch</p>
            <p>SWIFT Code: DBBLBDDH</p>
            <p>Routing Number: 90263136</p>
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
          <h2 className="text-xl md:text-2xl font-bold">OTHER OPTIONS</h2>
          <div className="font-semibold">
            <p> PAY ONLINE</p>
            <p>BKASH (Send Money) 01629226069</p>
            <p>NAGAD (Send Money) 01629226069</p>
            <p>Roket (Send Money) 016292260696</p>
            <p>Call us on: +880-9696 860 878</p>
            <a href="mailto:childadoptionsystemador@gmail.com">
              <p className="text-info">
                Email: childadoptionsystemador@gmail.com
              </p>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default DonationFirstPage;
