import React, { useEffect, useState } from "react";

const Partners = () => {
  const [partners, setPartners] = useState([]);
  useEffect(() => {
    fetch("/partners.json")
      .then((res) => res.json())
      .then((data) => {
        setPartners(data);
      });
  }, []);
  return (
    <div className="m-5">
      <p className="text-3xl font-montserrat text-sky-500 font-bold text-center py-5  ">
        Reliable Partnerships, Trusted Quality
      </p>
      <div className="pt-5">
        <section className="py-16 bg-gray-50 rounded-xl font-open-sans">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center  md:items-start gap-10 px-4">
            {/* Left: Title + Tagline */}
            <div className="md:w-1/2 text-center   md:text-left">
              <h2 className="text-3xl font-bold text-sky-500 mb-4">
                Our Partners
              </h2>
              <p className="text-gray-600 text-lg">
                Trusted by Bangladesh's top pharmaceutical companies, MediCart
                ensures that every medicine you purchase is 100% authentic and
                safe. Our platform collaborates with leading pharma brands to
                provide high-quality products and prompt delivery.
              </p>
            </div>

            {/* Right: Logo Grid */}
            <div className="md:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6">
              {partners.map((partner) => (
                <div
                  key={partner.id}
                  className="flex items-center justify-center bg-white p-5 rounded-xl shadow-md  transform transition duration-300 hover:scale-105"
                >
                  <a href={partner.website} target="_blank">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="h-16 object-contain"
                    />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Partners;
