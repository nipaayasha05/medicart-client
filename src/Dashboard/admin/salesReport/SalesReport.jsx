import React, { useEffect, useMemo, useRef, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
// import MUIDataTable from "mui-datatables";
// import { createColumnHelper } from "@tanstack/react-table";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { DownloadTableExcel } from "react-export-table-to-excel";
import Loader from "../../../components/Loader";
import { Helmet } from "react-helmet";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const SalesReport = () => {
  const axiosSecure = useAxiosSecure();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("Low to High");

  const [currentPage, setCurrentPage] = useState(0);
  const [lastClicked, setLastClicked] = useState("");
  const itemsPerPage = 10;

  const tableRef = useRef(null);

  const { data: reports = [], isLoading } = useQuery({
    queryKey: ["reports", search, sortOrder, currentPage, itemsPerPage],

    queryFn: async () => {
      const { data } = await axiosSecure(
        `/admin-sales-report?search=${search}&sort=${sortOrder}&page=${currentPage}&size=${itemsPerPage}`
      );
      // console.log(data);

      return data;
    },
  });

  const { data: adminSalesReportCount = {} } = useQuery({
    queryKey: ["adminSalesReportCount", search],
    queryFn: async () => {
      const { data } = await axiosSecure(
        `/admin-sales-report-count?search=${search}`
      );
      // console.log(data.count);
      return data;
    },
  });

  useEffect(() => {
    setCurrentPage(0);
  }, [search, sortOrder]);

  const numberOfPages = adminSalesReportCount?.count
    ? Math.ceil(adminSalesReportCount?.count / itemsPerPage)
    : 0;
  const pages = [...Array(numberOfPages).keys()];

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setLastClicked("previous");
    }
  };

  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
      setLastClicked("next");
    }
  };

  const dateRange = useMemo(() => {
    return reports.filter((report) => {
      if (!report.orderDate) return false;

      const orderDate = new Date(report.orderDate);
      if (isNaN(orderDate)) return false;

      if (startDate && endDate) {
        return (
          orderDate >= new Date(startDate) && orderDate <= new Date(endDate)
        );
      }
      if (startDate) {
        return orderDate >= new Date(startDate);
      }

      if (endDate) {
        return orderDate <= new Date(endDate);
      }
      return true;
    });
  }, [reports, startDate, endDate]);

  const columns = [
    { accessorKey: "medicineName", header: "Medicine Name" },
    { accessorKey: "sellerName", header: "Seller Name" },
    { accessorKey: "buyerName", header: "Buyer Name" },
    { accessorKey: "quantity", header: "Quantity" },
    {
      accessorKey: "totalPrice",
      header: "Total Price",
      cell: ({ row }) => <span>{row.original.totalPrice?.toFixed(2)}$</span>,
    },
    {
      accessorKey: "orderDate",
      header: "Order Date",
      cell: ({ row }) => (
        <span>{new Date(row.original.orderDate).toLocaleString()}</span>
      ),
    },
    { accessorKey: "transaction", header: "Transaction ID" },
    { accessorKey: "status", header: "Status" },
  ];
  const table = useReactTable({
    data: dateRange,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return <Loader />;
  }

  if (!reports.length) return <div>No sales report</div>;

  return (
    <div className="container   mx-auto pb-5">
      <Helmet>
        <meta charSet="utf-8" />
        <title>MediCart|Sales Report</title>
      </Helmet>
      <p className="text-3xl font-montserrat font-bold pt-4 text-sky-500 p-2">
        Sales Report
      </p>

      <div className="pt-5 flex items-center  gap-5 p-2">
        <div className="flex flex-col space-y-1 sm:flex-row">
          <label>
            <strong className="text-sky-500"> Start Date :</strong>{" "}
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border border-gray-300 rounded-sm py-1 px-2"
            />
          </label>
          <label>
            <strong className="text-sky-500"> End Date :</strong>{" "}
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border border-gray-300 rounded-sm py-1 px-2"
            />
          </label>
        </div>

        <div className=" ">
          {tableRef.current ? (
            <DownloadTableExcel
              filename="users table"
              sheet="users"
              currentTableRef={tableRef.current}
            >
              <button className="btn bg-sky-500  text-white">
                {" "}
                Export excel{" "}
              </button>
            </DownloadTableExcel>
          ) : (
            <p className="text-sky-500 font-semibold">
              Please select start and end dates to enable export.
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row   items-center justify-start gap-2">
        <button
          onClick={() =>
            setSortOrder(
              sortOrder === "Low to High" ? "High to Low" : "Low to High"
            )
          }
          className="btn text-white bg-sky-500"
        >
          Sort by price(
          {sortOrder})
        </button>

        <label className="input m-1  ">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="text"
            onBlur={(e) => setSearch(e.target.value)}
            className="grow  "
            placeholder="Search"
          />
        </label>
      </div>
      <div className="py-5 overflow-x-auto text-black">
        <table ref={tableRef}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="border border-sky-300 p-5 bg-sky-200"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-orange-100 bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="border border-gray-300 px-4 py-2"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="py-5 text-center space-x-3  ">
        {/* <p>{currentPage}</p> */}
        {currentPage > 0 && (
          <button
            onClick={handlePreviousPage}
            className={`btn ${
              lastClicked === "previous"
                ? "bg-gray-100 text-sky-500 border-2 border-sky-500"
                : "bg-sky-500 text-white"
            }`}
          >
            <FaArrowLeft /> Previous
          </button>
        )}

        {currentPage < pages.length - 1 && (
          <button
            onClick={handleNextPage}
            className={`btn ${
              lastClicked === "next"
                ? "bg-gray-100 text-sky-500 border-2 border-sky-500"
                : "bg-sky-500 text-white"
            }`}
          >
            Next <FaArrowRight />
          </button>
        )}
      </div>
    </div>
  );
};

export default SalesReport;
