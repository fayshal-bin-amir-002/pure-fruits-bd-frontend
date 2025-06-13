import React from "react";

const TableSkeleton = () => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border border-gray-200">
        <thead>
          <tr className="bg-gray-300 h-10">
            <th className="px-4 py-2" />
            <th className="px-4 py-2" />
            <th className="px-4 py-2" />
            <th className="px-4 py-2" />
          </tr>
        </thead>
        <tbody>
          {[...Array(5)].map((_, idx) => (
            <tr key={idx} className="bg-gray-100 border-t border-gray-200">
              <td className="px-4 py-3">
                <div className="h-4 w-4 bg-gray-300 rounded animate-pulse" />
              </td>
              <td className="px-4 py-3">
                <div className="h-4 w-32 bg-gray-300 rounded animate-pulse" />
              </td>
              <td className="px-4 py-3">
                <div className="h-4 w-48 bg-gray-300 rounded animate-pulse" />
              </td>
              <td className="px-4 py-3">
                <div className="h-4 w-20 bg-gray-300 rounded animate-pulse" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableSkeleton;
