import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-base-200 py-5">
      <div className="footer grid grid-cols-2 md:grid-cols-3 px-10 py-5 text-base-content">
        <div>
          <p>
            child-Adoption-System-Ador
            <br />
            Providing reliable services since 2022
          </p>
        </div>
        <div>
          <span className="footer-title">Help</span>
          <Link
            to="/about"
            className="link link-hover hover:font-bold hover:text-base hover:text-blue-500"
          >
            About Us
          </Link>
          <Link
            to="/contact-us"
            className="link link-hover hover:font-bold hover:text-base hover:text-blue-500"
          >
            Contact Us
          </Link>
          <Link
            to="/members"
            className="link link-hover hover:font-bold hover:text-base hover:text-blue-500"
          >
            Members
          </Link>
        </div>
        <div>
          <span className="footer-title">Company</span>
          {/* <Link
            to="/our-project"
            className="link link-hover hover:font-bold hover:text-base hover:text-blue-500"
          >
            Our Project
          </Link> */}
          <Link
            to="/all-blogs"
            className="link link-hover hover:font-bold hover:text-base hover:text-blue-500"
          >
            Blog
          </Link>
          <Link
            to="/donation"
            className="link link-hover hover:font-bold hover:text-base hover:text-blue-500"
          >
            Donate
          </Link>
          <Link
            to="/terms-of-service"
            className="link link-hover hover:font-bold hover:text-base hover:text-blue-500"
          >
            Terms & Conditions
          </Link>
        </div>
        <div>
          <span className="footer-title">Payment Support</span>
          <img
            width={350}
            src="https://i.ibb.co/8YJ313G/payment.png"
            alt="payment method"
          />
        </div>
      </div>
      <div className="footer-center p-2 bg-white text-base-content text-sm">
        <p>copyright © {year} - all right child-Adoption-System-Ador</p>
      </div>
    </footer>
  );
};

export default Footer;
