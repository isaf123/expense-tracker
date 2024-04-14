"use client";
import * as React from "react";
import { GoFilter } from "react-icons/go";
import { IoPersonOutline } from "react-icons/io5";
import axios from "axios";
import { BASE_URL } from "@/utils/helper";
import { useState, useEffect } from "react";
interface INavbarProps {
  children: any;
}

const Navbar: React.FunctionComponent<INavbarProps> = (props) => {
  const [incomeDetail, setIncomeDetail] = useState<any[]>();
  const [expensesDetail, setExpensesDetail] = useState<any[]>();

  const [activeFil, setActiveFil] = React.useState<Boolean>(true);
  useEffect(() => {
    onGetMoney();
  }, []);

  const onGetMoney = async () => {
    try {
      const getIncomesDetail = await axios.post(BASE_URL + `/incomesdetail`, {
        userid: localStorage.getItem("mainkey"),
      });

      const getExpensesDetail = await axios.get(
        BASE_URL + `/expensesdetail?userid=${localStorage.getItem("mainkey")}`
      );
      console.log(getIncomesDetail.data);
      setIncomeDetail(getIncomesDetail.data.reverse());
      setExpensesDetail(getExpensesDetail.data.reverse());
    } catch {}
  };
  console.log("dari navbar", incomeDetail);
  return (
    <div>
      {!activeFil ? (
        <div className="w-full h-[260px] bg-gray-100 rounded-t-md">
          <p>Filter By </p>
        </div>
      ) : (
        <></>
      )}
      <div className="w-[390px] h-[60px] bg-gray-100 flex items-center justify-center gap-5 drop-shadow">
        <div
          className="w-fit flex items-end gap-2"
          onClick={() => {
            setActiveFil(!activeFil);
          }}
        >
          <GoFilter className=" m-auto w-[26px] h-[26px] " />
          <p className="text-sm">Filter</p>
        </div>
        <button className="w-[80px] h-[46px] bg-gray-100  border-l-[8px] border-r-red-600 border-l-green-600  border-r-[8px] border-[#EFE4D6] text-center flex items-center justify-center rounded-2xl">
          <p className="text-2xl font-bold">+</p>
        </button>
        <div className="w-fit flex items-end gap-2">
          <IoPersonOutline className=" m-auto w-[24px] h-[24px] " />

          <p className="text-sm">Profile</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
