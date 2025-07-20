import React from "react";

const CatMedicineDetails = ({ categoryDetails, isOpen }) => {
  const detailsMedicine = categoryDetails.find(
    (medicine) => medicine._id === isOpen
  );
  // console.log(categoryDetails);
  const {
    itemName,
    genericName,
    description,
    image,
    category,
    company,
    massUnit,
    price,
    discount,
    name,
    email,
  } = detailsMedicine;
  return (
    <div>
      {" "}
      <div className="space-y-1">
        <img className="rounded-xl h-[320px] w-full" src={image} alt="" />
        <br />

        <p>
          <strong>Medicine Name</strong>: {itemName}
        </p>
        <p>
          <strong>Generic Name</strong>: {genericName}
        </p>
        <p>
          <strong>Short Description</strong>: {description}
        </p>
        <p>
          <strong>Category Type</strong>: {category}
        </p>
        <p>
          <strong>Manufacturing Company</strong>: {company}
        </p>
        <p>
          <strong>Measurement Unit</strong>: {massUnit}
        </p>
        <p>
          <strong>Price (per unit)</strong>: {price}
        </p>
        <p>
          <strong>Discount Applied</strong>: {discount}
        </p>
        <p>
          <strong>Added By(seller name)</strong>: {name}
        </p>
        <p>
          <strong>Seller Email</strong>: {email}
        </p>
      </div>
    </div>
  );
};

export default CatMedicineDetails;
