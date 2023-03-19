import {
  faEnvelope,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-base-200 py-5">
      <div className="footer grid grid-cols-2 md:grid-cols-4 px-10 py-5 text-base-content">
        <div className="col-span-2">
          <p className="font-bold">child-Adoption-System-Ador</p>
          <p>Providing reliable services since 2023</p>
          <a href="tel:+8809696860878">
            <p>
              <FontAwesomeIcon className="font-bold mr-3" icon={faPhone} />
              <span className="link link-hover hover:font-bold hover:text-blue-500">
                +880-9696 860 878
              </span>
            </p>
          </a>
          <a href="mailto:childadoptionsystemador@gmail.com">
            <p>
              <FontAwesomeIcon className="font-bold mr-3" icon={faEnvelope} />
              <span className="link link-hover hover:font-bold hover:text-blue-500">
                childadoptionsystemador@gmail.com
              </span>
            </p>
          </a>
          <a
            target="_blank"
            href="https://www.google.com/maps/place/%E0%A6%AC%E0%A6%BE%E0%A6%B8%E0%A6%A8%E0%A6%BE+%E0%A6%A8%E0%A7%80%E0%A6%A1%E0%A6%BC+(Bashna+Nir)/@23.7880058,90.374184,45m/data=!3m1!1e3!4m6!3m5!1s0x3755c1bae422e91d:0xb437e5d06e95c142!8m2!3d23.7881005!4d90.374196!16s%2Fg%2F11rz2yxwch"
          >
            <p>
              <FontAwesomeIcon
                className="font-bold mr-3"
                icon={faLocationDot}
              />
              <span className="link link-hover hover:font-bold hover:text-blue-500">
                West Shewrapara, Dhaka, Bangladesh
              </span>
            </p>
          </a>
        </div>

        <div>
          <span className="footer-title">Help</span>
          <Link
            to="/about"
            className="link link-hover hover:font-bold hover:text-blue-500"
          >
            About
          </Link>
          <Link
            to="/contact-us"
            className="link link-hover hover:font-bold hover:text-blue-500"
          >
            Contact Us
          </Link>
          <Link
            to="/members"
            className="link link-hover hover:font-bold hover:text-blue-500"
          >
            Members
          </Link>
        </div>
        <div>
          <span className="footer-title">Company</span>
          {/* <Link
            to="/our-project"
            className="link link-hover hover:font-bold hover:text-blue-500"
          >
            Our Project
          </Link> */}
          <Link
            to="/all-blogs"
            className="link link-hover hover:font-bold hover:text-blue-500"
          >
            Blogs
          </Link>
          <Link
            to="/donation"
            className="link link-hover hover:font-bold hover:text-blue-500"
          >
            Donate
          </Link>
          <Link
            to="/terms-of-service"
            className="link link-hover hover:font-bold hover:text-blue-500"
          >
            Terms & Conditions
          </Link>
        </div>

        <div>
          <span className="footer-title">Payment Support</span>
          <img
            className="w-full md:w-72"
            src="https://i.ibb.co/8YJ313G/payment.png"
            alt="payment method"
          />
        </div>
      </div>
      <div className="footer-center p-2 bg-white text-base-content text-sm font-semibold">
        <p>© copyright {year} - all rights child-Adoption-System-Ador</p>
      </div>
    </footer>
  );
};

export default Footer;
