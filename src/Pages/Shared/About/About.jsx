import React from "react";
import DynamicTitle from "../DynamicTitle/DynamicTitle";

const About = () => {
  DynamicTitle("About");
  return (
    <section>
      <div className="bg-info py-10">
        <h1 className="text-center text-2xl font-bold uppercase text-white">
          About Us
        </h1>
        <div className="border-dotted border-b-4 border-indigo-600 w-28 mx-auto mt-1"></div>
      </div>

      <div className="m-10 md:mx-28 text-justify">
        <div className="text-center">
          <h2 className="text-2xl sm:text-4xl font-bold uppercase mb-4">
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
            Adoptions Together builds healthy lifelong family connections for
            every child and advocates for continuous improvement of systems that
            promote the well being of children.
          </p>
        </div>
        <div className="my-8">
          <h2 className="text-xl sm:text-3xl font-semibold text-[#8EA246] ">
            Vision Statement:
          </h2>
          <p>
            A world where adoption is a celebrated choice, every child belongs,
            and all families are embraced.
          </p>
        </div>

        <div className="my-8">
          <h2 className="text-xl sm:text-3xl font-semibold text-[#8EA246] my-2">
            Guiding Principles
          </h2>
          <h3 className="font-bold my-3">Children and Families</h3>
          <ol className="list-disc list-inside">
            <li>The welfare of the children who need our help comes first.</li>
            <li>
              Children need to maintain connections with their birth families
              and cultures even when they cannot be safely raised in their birth
              families.
            </li>
            <li>Openness and honesty is healthy for children and families.</li>
            <li>
              The ability to be a good parent does not depend upon wealth, race,
              religion, marital status, sexual orientation, gender expression,
              or gender identity.
            </li>
            <li>
              Education, support, and guidance from qualified professionals
              before, during and after placement help children and their
              families succeed.
            </li>
          </ol>

          <h3 className="font-bold my-3">Lifelong Commitment and Connection</h3>
          <ol className="list-disc list-inside">
            <li>Permanency in a healthy family is best for children.</li>
            <li>
              Creating, strengthening, and sustaining healthy relationships is
              essential for achieving permanency.
            </li>
            <li>
              Parents should have the option to choose adoption when they
              believe it is best for their children.
            </li>
            <li>
              Foster care should be a temporary safe haven for children awaiting
              permanency.
            </li>
            <li>Stays in foster care should be as short as possible.</li>
          </ol>
        </div>
        <hr />
        <div className="text-center">
          <h2 className="text-2xl sm:text-4xl font-bold uppercase my-8">
            PROGRAMS AND SERVICES
          </h2>
          <h2 className="text-xl md:text-2xl font-bold mt-8 mb-3">
            Domestic Adoption
          </h2>
          <p>
            Find loving parents for children in need of adoption, and guide
            parents through every step of the adoption process.
          </p>
          <h2 className="text-xl md:text-2xl font-bold mt-8 mb-3">
            International Adoption
          </h2>
          <p>
            Our Hague-Accredited program connects children from South Africa,
            Colombia, and Bulgaria to their forever families.
          </p>
          <h2 className="text-xl md:text-2xl font-bold mt-8 mb-3">
            Special Needs Adoption
          </h2>
          <p>
            Placing children with severe medical challenges with loving adoptive
            families who are able to care for their ongoing needs.
          </p>
          <h2 className="text-xl md:text-2xl font-bold mt-8 mb-3">Granny Program</h2>
          <p>
            Pairing children living in long-term facilities with a caregiver who
            provides them with consistent, one-on-one care and attention.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
