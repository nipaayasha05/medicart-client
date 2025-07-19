import React, { useMemo, useRef, useState } from "react";
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

const SalesReport = () => {
  const axiosSecure = useAxiosSecure();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const tableRef = useRef(null);

  const { data: reports = [], isLoading } = useQuery({
    queryKey: ["reports"],

    queryFn: async () => {
      const { data } = await axiosSecure(`/admin-sales-report`);
      console.log(data);

      return data;
    },
  });

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
    <div className="container mx-auto pb-5">
      <p className="text-3xl font-bold pt-4 text-sky-600 p-2">Sales Report</p>

      <div className="pt-5 flex items-center  gap-5 p-2">
        <label>
          <strong className="text-sky-600"> Start Date :</strong>{" "}
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border border-gray-300 rounded-sm py-1 px-2"
          />
        </label>
        <label>
          <strong className="text-sky-600"> End Date :</strong>{" "}
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border border-gray-300 rounded-sm py-1 px-2"
          />
        </label>
        <div>
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
            <p className="text-blue-500 font-semibold">
              Please select start and end dates to enable export.
            </p>
          )}
        </div>
      </div>
      <div className="py-5 overflow-x-auto">
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
              <tr key={row.id} className=" bg-gray-50">
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
    </div>
  );
};

export default SalesReport;
