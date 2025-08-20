import React from "react";

const DashboardFooter = () => {
  return (
    <div>
      <footer className="footer font-open-sans sm:footer-horizontal footer-center border-t-2 border-gray-300 text-gray-600   p-4">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by
            Medicart Industries Ltd
          </p>
        </aside>
      </footer>
      ;
    </div>
  );
};

export default DashboardFooter;
