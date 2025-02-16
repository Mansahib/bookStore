import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader/Loader';
import { FaUser } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { FaAddressBook } from "react-icons/fa";
import { IoCloudDone } from "react-icons/io5";
import ViewUserData from './ViewUserData';

const AllOrders = () => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const [options, SetOptions] = useState(-1);
  const [Allorders, setAllOrders] = useState();
  const [values, setValues] = useState({ status: "" });
  const [userDiv, setuserDiv] = useState("hidden");
  const [userDivData, setuserDivData] = useState();

  const setOptionsbutton = (i) => {
    SetOptions(i);
  };

  const change = (e) => {
    const { value } = e.target;
    setValues({ status: value });
  };

  const submitChanges = async (i) => {
    const id = Allorders[i]._id;
    const response = await axios.put(
      `http://localhost:1000/api/v1/update-status/${id}`,
      values,
      { headers }
    );
    alert(response.data.message);
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("http://localhost:1000/api/v1/get-all-orders", { headers });
      setAllOrders(res.data.data);
    };
    fetch();
  }, [Allorders]);

  return (
    <>
      {!Allorders && (
        <div className='flex items-center justify-center h-screen bg-zinc-900'>
          <Loader />
        </div>
      )}

      {Allorders && Allorders.length === 0 && (
        <div className="h-[80vh] p-4 text-zinc-100">
          <div className='h-[100%] flex items-center justify-center flex-col'>
            <h1 className='text-5xl mb-8 font-semibold text-yellow-100'>
              No Orders;
            </h1>
          </div>
        </div>
      )}

      {Allorders && Allorders.length > 0 && (
        <div className="h-[100%] p-0 md:p-4 text-zinc-100">
          <h1 className=" text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            Orders History
          </h1>

          {/* Table Header */}
          <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2">
            <div className="w-[3%]">
              <h1 className="text-center">Sr.</h1>
            </div>
            <div className="w-[22%]">
              <h1 className="">Books</h1>
            </div>
            <div className="w-[45%]">
              <h1 className="">Description</h1>
            </div>
            <div className="w-[9%]">
              <h1 className="">Price</h1>
            </div>
            <div className="w-[16%]">
              <h1 className="">Status</h1>
            </div>
            <div className="w-none md:w-[5%] hidden md:block">
              <h1 className="pt-1">
                <FaUser />
              </h1>
            </div>
          </div>

          {/* Order List */}
          {Allorders.map((items, i) => (
            <div key={i} className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-4 hover:bg-zinc-900 hover:cursor-pointer">
              <div className="w-[3%]">
                <h1 className="text-center">{i + 1}</h1>
              </div>

              {/* Book Title */}
              <div className='w-[22%]'>
                {items.book ? (
                  <Link to={`/get-book-by-id/${items.book._id}`} className='hover:text-blue-300'>
                    {items.book.title}
                  </Link>
                ) : (
                  <span className='text-red-500'>Book Deleted</span>
                )}
              </div>

              {/* Book Description */}
              <div className='w-[45%]'>
                <h1>{items.book ? items.book.desc.slice(0, 50) + "..." : "No Description Available"}</h1>
              </div>

              {/* Book Price */}
              <div className='w-[9%]'>
                <h1>{items.book ? `₹ ${items.book.price}` : "N/A"}</h1>
              </div>

              {/* Order Status */}
              <div className='w-[16%]'>
                <h1 className='font-semibold'>
                  <button className='hover:scale-105 transition-all duration-300' onClick={() => setOptionsbutton(i)}>
                    {items.status === "order placed" ? (
                      <div className='text-yellow-500'>{items.status}</div>
                    ) : items.status === "cancelled" ? (
                      <div className='text-red-500'>{items.status}</div>
                    ) : (
                      <div className='text-green-500'>{items.status}</div>
                    )}
                  </button>

                  <div className={`${options === i ? "flex" : "hidden"}`}>
                    <select name='status' className='bg-zinc-800' onChange={change} value={values.status}>
                      {["out for delivery", "delivered", "cancelled"].map((status, index) => (
                        <option value={status} key={index}>
                          {status}
                        </option>
                      ))}
                    </select>
                    <button className='px-1' onClick={() => { SetOptions(-1); submitChanges(i); }}>
                      <IoCloudDone />
                    </button>
                  </div>
                </h1>
              </div>

              {/* User Info Button */}
              <div className='w-none md:w-[5%] hidden md:block'>
                <button className='text-xl mt-1'
                  onClick={() => {
                    setuserDiv("fixed");
                    setuserDivData(items.user);
                  }}>
                  <FaAddressBook />
                </button>
              </div>
            </div>
          ))}

          {/* View User Data Modal */}
          {userDivData && (
            <ViewUserData userDivData={userDivData} userDiv={userDiv} setuserDiv={setuserDiv} />
          )}
        </div>
      )}
    </>
  );
};

export default AllOrders;
