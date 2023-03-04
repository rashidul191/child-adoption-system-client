import React from "react";
import DynamicTitle from "../DynamicTitle/DynamicTitle";

const About = () => {
  DynamicTitle("About");
  return (
    <section className="md:pt-16">
      <div className="bg-info py-10">
        <h1 className="text-center text-2xl font-bold uppercase text-white">
          About Us
        </h1>
        <div className="border-dotted border-b-4 border-indigo-600 w-28 mx-auto mt-1"></div>
      </div>

      <div className="m-10 md:mx-28 text-justify">
        <div>
          <p>
            At Ador, we believe that every child deserves a loving and
            supportive home. We are committed to connecting children in need of
            adoption with caring and responsible parents who can provide them
            with a safe and nurturing environment.
          </p>
        </div>

        <div className="text-center">
          <h2 className="text-2xl sm:text-4xl font-bold uppercase my-4">
            Mission & Vision
          </h2>
          <p className="text-xl font-semibold text-blue-500 mb-6">
            Our mission is driven by the simple belief that every child deserves
            a family.
          </p>
        </div>
        <hr />

        <div>
          <h2 className="text-xl sm:text-3xl font-semibold text-[#8EA246] mb-2">
            Mission Statement:
          </h2>
          <p>
            Our mission is to facilitate the adoption process for children who
            have been abandoned, orphaned, or unable to live with their birth
            families. We strive to provide prospective adoptive parents with the
            resources, support, and guidance they need to create a happy and
            healthy family.
          </p>
        </div>
        <div className="my-8">
          <h2 className="text-xl sm:text-3xl font-semibold text-[#8EA246] ">
            Vision Statement:
          </h2>
          <p>
            Our vision is to create a world where every child has the
            opportunity to grow up in a loving and stable home. We believe that
            adoption is a powerful tool for building strong families and
            strengthening communities, and we are dedicated to making this
            option accessible and welcoming to all.
          </p>
        </div>

        <div className="my-8">
          <h2 className="text-xl sm:text-3xl font-semibold text-[#8EA246] my-2">
            Our Approach:
          </h2>
          <p>
            At Ador, we believe that adoption is a lifelong journey that
            requires compassion, sensitivity, and expertise. We work with
            experienced adoption professionals who are committed to providing
            personalized support and guidance to each family we serve.
          </p>
        </div>
        <div>
          <p className="mb-5">
            We understand that adoption can be a complex and emotional process,
            and we are here to help every step of the way. Whether you are a
            birth parent considering adoption, a prospective adoptive parent
            looking to build your family, or an adoptee searching for your
            roots, we are here to support you and guide you towards a positive
            and successful outcome.
          </p>

          <h2 className="text-xl sm:text-3xl font-semibold text-[#8EA246] my-2">
            Join Us:
          </h2>
          <p>
            We invite you to join us in our mission to create loving families
            and bright futures for children in need. Contact us today to learn
            more about our adoption services and how we can help you on your
            adoption journey.
          </p>
        </div>
        <hr className="mt-5" />
        <div className="">
          <h2 className="text-2xl sm:text-4xl font-bold uppercase my-8 text-center">
            PROGRAMS AND SERVICES
          </h2>
          <div>
            <h2 className="text-xl md:text-2xl font-bold mt-8 mb-3">
              Adoption Services:
            </h2>
            <p>
              Ador offers a full range of adoption services to help prospective
              adoptive parents navigate the adoption process and build their
              families. Our adoption services include:
            </p>

            <ul className="list-disc ml-6 md:ml-12">
              <li className="mt-5">
                Domestic Adoption: We work with birth parents and adoptive
                parents across the United States to facilitate domestic
                adoptions of newborns, infants, and older children.
              </li>
              <li className="mt-5">
                International Adoption: We assist families in adopting children
                from countries around the world, including China, Ethiopia,
                Korea, and more.
              </li>
              <li className="mt-5">
                Foster Care Adoption: We help families adopt children who are in
                the foster care system and in need of permanent homes.
              </li>
              <li className="mt-5">
                Special Needs Adoption: We support families who are interested
                in adopting children with special needs, including physical,
                emotional, or developmental disabilities.
              </li>
              <li className="mt-5">
                Open Adoption: We offer guidance and support for families
                interested in open adoption, which allows birth parents and
                adoptive families to maintain ongoing communication and contact.
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold mt-8 mb-3">
              Post-Adoption Services:
            </h2>
            <p>
              At Ador, we understand that adoption is a lifelong journey that
              requires ongoing support and resources. We offer a range of
              post-adoption services to help adoptive families thrive,
              including:
            </p>

            <ul className="list-disc ml-6 md:ml-12">
              <li className="mt-5">
                Counseling Services: We provide counseling services to help
                adoptive families navigate the challenges of adoption and
                address any issues that arise.
              </li>
              <li className="mt-5">
                Support Groups: We offer support groups for adoptive families to
                connect with others who have similar experiences and share
                resources and advice.
              </li>
              <li className="mt-5">
                Educational Resources: We provide educational resources to help
                adoptive families understand the unique needs of adopted
                children and navigate the complexities of adoption.
              </li>
              <li className="mt-5">
                Search and Reunion Services: We assist adoptees and birth
                families in searching for and reuniting with one another, if
                desired.
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold mt-8 mb-3">
              Outreach and Education:
            </h2>
            <p>
              At Ador, we are committed to raising awareness about the benefits
              of adoption and the needs of children in the adoption system. We
              offer a range of outreach and education services, including:
            </p>

            <ul className="list-disc ml-6 md:ml-12">
              <li className="mt-5">
                Community Events: We participate in community events and
                activities to raise awareness about adoption and connect with
                families who are interested in adoption.
              </li>
              <li className="mt-5">
                Educational Workshops: We offer educational workshops to help
                families learn more about the adoption process and prepare for
                adoption.
              </li>
              <li className="mt-5">
                Public Speaking: We offer public speaking services to share our
                expertise and experience in adoption with a wider audience.
              </li>
            </ul>
          </div>
          <p className="mt-8">
            The programs and services offered by Ador aim to support adoptive
            families throughout the adoption process and beyond. From adoption
            services to post-adoption support and education, Ador is dedicated
            to creating loving and stable homes for children in need.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
