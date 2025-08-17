import React from "react";
import { FiShoppingCart } from "react-icons/fi";

const ProdutsDetails = ({ recentProducts, isOpen }) => {
  const detailsMedicine = recentProducts.find(
    (medicine) => medicine._id === isOpen
  );
  if (!detailsMedicine) return null;
  console.log(detailsMedicine);
  return (
    <div>
      <div>
        <div className="card  bg-base-100 font-open-sans shadow-md">
          <figure>
            <img
              src={detailsMedicine.image}
              className="h-[200px] w-full"
              alt="Shoes"
            />
          </figure>
          <div className="card-body bg-orange-50">
            <h2 className="card-title">{detailsMedicine.itemName}</h2>
            <p>
              <strong>Generic Name : </strong>
              {detailsMedicine.genericName}
            </p>
            <p>
              <strong>Category : </strong>
              {detailsMedicine.category}
            </p>
            <p>
              <strong>Company : </strong>
              {detailsMedicine.company}
            </p>
            <p>
              <strong>Mass Unit : </strong>
              {detailsMedicine.massUnit}
            </p>
            <p>
              <strong>Discount : </strong>
              {detailsMedicine.discount}
            </p>
            <p>
              <strong>Price : </strong>
              {detailsMedicine.price}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProdutsDetails;
