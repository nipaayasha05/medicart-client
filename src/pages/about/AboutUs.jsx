import React from "react";
import { Helmet } from "react-helmet";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import banner from "../../assets/Untitled design (5).png";

const AboutUs = () => {
  return (
    <div className="container text-black mx-auto">
      <Helmet>
        <meta charSet="utf-8" />
        <title>MediCart|About Us</title>
      </Helmet>

      {/* Hero / Story Section */}
      <div className="pt-5 m-5">
        <section className="rounded-xl shadow-md transform transition duration-300 hover:scale-105 bg-gray-100 text-gray-700 py-20 text-center  px-4">
          <h1 className="text-4xl font-bold mb-4 text-sky-500">
            About Medicart
          </h1>
          <p className="text-lg max-w-2xl mx-auto">
            Medicart is a multi-vendor medicine e-commerce platform dedicated to
            making healthcare products easily accessible. Our mission is to
            provide a seamless experience for buying medicines, connecting
            trusted sellers with customers, and ensuring quality, convenience,
            and reliability for everyone.
          </p>
        </section>
      </div>

      {/* Vision Section */}
      <div className="pt-5 m-5">
        {" "}
        <section className="py-16 rounded-xl shadow-md  px-4 md:px-20 text-center bg-orange-50 transform transition duration-300 hover:scale-105 ">
          <h2 className="text-3xl font-semibold mb-6 text-sky-500">
            Our Vision
          </h2>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto">
            To become the most trusted online platform for medicines and
            healthcare products, providing easy access, transparent pricing, and
            excellent customer support to improve the well-being of our users.
          </p>
        </section>
      </div>

      {/* Values Section */}
      <div className="pt-">
        <section className="py-16 px-4 md:px-20 b ">
          <h2 className="text-3xl font-semibold mb-10 text-center text-sky-500">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center text-sm sm:text-xl">
            <div className="p-6 bg-gray-100   rounded-xl shadow-md transform transition duration-300 hover:scale-105 ">
              <h3 className="text-2xl font-bold mb-2 text-sky-500">Trust</h3>
              <p>Reliable and verified medicines for all our customers.</p>
            </div>
            <div className="p-6   bg-gray-100  rounded-xl shadow-md transform transition duration-300 hover:scale-105">
              <h3 className="text-2xl font-bold mb-2 text-sky-500">
                Accessibility
              </h3>
              <p>Making healthcare products available at your fingertips.</p>
            </div>
            <div className="p-6 bg-gray-100  rounded-xl shadow-md transform transition duration-300 hover:scale-105">
              <h3 className="text-2xl font-bold mb-2 text-sky-500">
                Customer Satisfaction
              </h3>
              <p>Providing excellent service and support for all users.</p>
            </div>
            <div className="p-6   bg-gray-100  rounded-xl shadow-md transform transition duration-300 hover:scale-105">
              <h3 className="text-2xl font-bold mb-2 text-sky-500">
                Innovation
              </h3>
              <p>
                Using modern technology to improve the medicine shopping
                experience.
              </p>
            </div>
          </div>
        </section>
      </div>
      {/* Contact Section */}
      <section className="py-16 px-4 md:px-20  ">
        <h2 className="text-3xl font-semibold mb-10 text-center text-sky-500">
          Contact Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
          <div className="bg-gray-50 p-6 rounded-xl shadow-md transform transition duration-300 hover:scale-105 flex flex-col items-center">
            <FaEnvelope className="text-sky-500 text-3xl mb-3" />
            <h3 className="text-xl font-bold mb-1 text-sky-500">Email</h3>
            <p>support@medicart.com</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-xl shadow-md transform transition duration-300 hover:scale-105 flex flex-col items-center">
            <FaPhone className="text-sky-500 text-3xl mb-3" />
            <h3 className="text-xl font-bold mb-1 text-sky-500">Phone</h3>
            <p>+880 1234 567890</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-xl shadow-md transform transition duration-300 hover:scale-105 flex flex-col items-center">
            <FaMapMarkerAlt className="text-sky-500 text-3xl mb-3" />
            <h3 className="text-xl font-bold mb-1 text-sky-500">Location</h3>
            <p>Dhaka, Bangladesh</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
