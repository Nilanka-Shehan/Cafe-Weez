import React from "react";

const OrderTable = () => {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-black rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 text-black">
              <th className="border-r border-black">Tasks</th>
              <th className="border-r border-black">Address</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody className="text-black">
            <tr className="border-t border-black">
              <td className="border-r border-black">Task 1</td>
              <td className="border-r border-black">
                123 Main St, Springfield
              </td>
              <td className="flex items-center justify-center px-4 py-2">
                <button className="px-3 py-1 bg-activeGreen text-white text-sm font-medium rounded-md shadow-sm hover:bg-blue-700 active:scale-95 transition-transform duration-150">
                  Start
                </button>
              </td>
            </tr>
            <tr className="border-t border-black">
              <td className="border-r border-black">Task 2</td>
              <td className="border-r border-black">456 Elm St, Springfield</td>
              <td className="flex items-center justify-center px-4 py-2">
                <button className="px-3 py-1 bg-activeGreen text-white text-sm font-medium rounded-md shadow-sm hover:bg-blue-700 active:scale-95 transition-transform duration-150">
                  Start
                </button>
              </td>
            </tr>
            <tr className="border-t border-black">
              <td className="border-r border-black">Task 3</td>
              <td className="border-r border-black">789 Oak St, Springfield</td>
              <td className="flex items-center justify-center px-4 py-2">
                <button className="px-3 py-1 bg-activeGreen text-white text-sm font-medium rounded-md shadow-sm hover:bg-blue-700 active:scale-95 transition-transform duration-150">
                  Start
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>

      </div>
    </>
  );
};

export default OrderTable;
