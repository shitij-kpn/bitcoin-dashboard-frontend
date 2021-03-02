import { useEffect, useMemo } from "react";

import formatData from "../utils/formatData";

import { useTable } from "react-table";

const Table = ({ socket, initialData }) => {
  const data = useMemo(() => initialData, [initialData]);

  const columns = useMemo(
    () => [
      {
        Header: "#",
        accessor: "index",
      },
      {
        Header: "Platform",
        accessor: "platform",
      },
      {
        Header: "Last Trade Prices",
        accessor: "last",
      },
      {
        Header: "Buy / Sell Price",
        accessor: "buysell",
      },
      {
        Header: "Difference",
        accessor: "difference",
      },
      {
        Header: "Savings",
        accessor: "savings",
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  useEffect(() => {
    socket.on("newData", (res) => {
      console.log(formatData(res.data));
    });
  }, [socket]);

  return (
    <table
      {...getTableProps()}
      className=" border-separate border-spacing  font-semibold text-center rounded-t-lg m-5 mx-auto text-gray-50"
    >
      <thead className=" uppercase text-base lg:text-lg text-left border-b border-gray-300">
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                className=" px-12 py-3 text-gray-500"
                {...column.getHeaderProps()}
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>

      <tbody className="text-base lg:text-lg" {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);

          return (
            <tr
              className="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-50 rounded-md border-b border-gray-600"
              {...row.getRowProps()}
            >
              {row.cells.map((cell) => {
                return (
                  <td className="px-4 py-3" {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
