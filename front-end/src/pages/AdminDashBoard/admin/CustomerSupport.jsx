import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const CustomerSupport = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: messages = [] } = useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const res = await axiosSecure.get("/messages");
      return res.data;
    },
  });
  return (
    <>
      {messages.map((message, index) => (
        <div
          key={index}
          className="card bg-gamboge  border-black border-[1px] text-primary-content w-full  sm:w-[calc(100%-100px)] md:min-h-[340px] p-1 rounded-3xl shadow-lg m-9"
        >
          <div className="card-body">
            <h4 className="card-title text-2xl font-semibold text-black">{message.name}</h4>
            <h4 className="card-title text-2xl font-semibold text-black">{message.email}</h4>
            <p className="line-clamp-6 text-white font-bold text-sm">{message.message}</p>
            <div className="flex flex-row justify-between">
              <div className="flex flex-row items-center btn bg-transparent hover:bg-white text-secondary">
                <label>
                  <input type="checkbox" name="markAsRead" id="markAsRead" className="bg-white" />
                  <span className="pl-2">Mark as Read</span>
                </label>
              </div>

              <div>
                <button className="btn bg-transparent hover:bg-white text-secondary">Add to Reviewbar</button>
              </div>
              <div>
                <button className="btn bg-transparent hover:bg-white text-secondary">Delete</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CustomerSupport;
