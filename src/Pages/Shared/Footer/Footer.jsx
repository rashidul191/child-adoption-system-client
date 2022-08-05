import React from "react";

const Footer = () => {

    const year = new Date().getFullYear()
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
          <a class="link link-hover">Branding</a>
          <a class="link link-hover">Design</a>
          <a class="link link-hover">Marketing</a>
          <a class="link link-hover">Advertisement</a>
        </div>
        <div>
          <span class="footer-title">Company</span>
          <a class="link link-hover">About us</a>
          <a class="link link-hover">Contact</a>
          <a class="link link-hover">Jobs</a>
          <a class="link link-hover">Press kit</a>
        </div>
        <div>
          <span class="footer-title">Legal</span>
          <a class="link link-hover">Terms of use</a>
          <a class="link link-hover">Privacy policy</a>
          <a class="link link-hover">Cookie policy</a>
        </div>
      </div>
      <div className=" footer-center p-4 bg-white text-base-content">
        <p>Copyright © {year} - All right Child-Adoption-System</p>
      </div>
    </footer>
  );
};

export default Footer;
