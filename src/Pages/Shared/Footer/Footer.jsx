import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-base-200 py-5">
      <div class="footer p-10 text-base-content">
        <div>
          <p>
            ACME Industries Ltd.
            <br />
            Providing reliable tech since 1992
          </p>
        </div>
        <div>
          <span class="footer-title">Services</span>
          <Link to="/" class="link link-hover">
            Branding
          </Link>
          <Link to="/" class="link link-hover">
            Design
          </Link>
          <Link to="/" class="link link-hover">
            Marketing
          </Link>
          <Link to="/" class="link link-hover">
            Advertisement
          </Link>
        </div>
        <div>
          <span class="footer-title">Company</span>
          <Link to="/" class="link link-hover">
            About us
          </Link>
          <Link to="/" class="link link-hover">
            Contact
          </Link>
          <Link to="/" class="link link-hover">
            Jobs
          </Link>
          <Link to="/" class="link link-hover">
            Press kit
          </Link>
        </div>
        <div>
          <span class="footer-title">Legal</span>
          <Link to="/" class="link link-hover">
            Terms of use
          </Link>
          <Link to="/" class="link link-hover">
            Privacy policy
          </Link>
          <Link to="/" class="link link-hover">
            Cookie policy
          </Link>
        </div>
      </div>
      <div className=" footer-center p-4 bg-white text-base-content">
        <p>Copyright © {year} - All right Child-Adoption-System</p>
      </div>
    </footer>
  );
};

export default Footer;
