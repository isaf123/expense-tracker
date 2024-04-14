"use client";
import * as React from "react";
import DatePicker from "@/components/Datepicker";
import { useState } from "react";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BASE_URL, category } from "@/utils/helper";
import { title } from "process";
import { error } from "console";

interface IAddIncomePageProps {}

const AddIncomePage: React.FunctionComponent<IAddIncomePageProps> = (props) => {
  const [activeFill, setActiveFill] = useState<Boolean>(false);
  const [activeNan, setActiveNan] = useState<Boolean>(false);
  const [addIncome, setAddIncome] = useState<any>({
    title: "",
    nominal: 0,
    category: "",
    date: "",
    userid: localStorage.getItem("mainkey"),
  });
  const onHandleaddIncome = async () => {
    try {
      if (Object.values(addIncome).includes("")) {
        setActiveFill(true);
        setActiveNan(false);
        throw new Error("Please fill all data");
      }

      if (isNaN(addIncome.nominal)) {
        setActiveFill(false);
        setActiveNan(true);
        throw new Error("not valid amount");
      }
      const { title, nominal, category, date, userid } = addIncome;
      await axios.post(BASE_URL + `/addincomes`, {
        title: title,
        nominal: nominal,
        category: category,
        date: date,
        userid: userid,
      });
      setActiveFill(false);
      setActiveNan(false);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(addIncome.nominal);

  const router = useRouter();
  return (
    <main className="w-[390px] m-auto min-h-[670px] h-fit  bg-[#00A86B] flex flex-col justify-end">
      <div className="px-6 h-full mb-5">
        <div className="flex items-center mb-32 gap-[120px]">
          <HiArrowNarrowLeft
            className="text-gray-50 w-[24px] h-[24px]"
            onClick={() => {
              router.push("/landing");
            }}
          />
          <p className="text-gray-50 text-lg">income</p>
        </div>
        <p className="text-gray-100 opacity-60">How much ?</p>
        <input
          type="text"
          placeholder="0"
          className=" bg-transparent w-[340px] border-none font-medium text-5xl outline-none placeholder-purple-50 text-purple-50"
          onChange={(e) => {
            const newData = {
              ...addIncome,
              nominal: parseInt(e.target.value),
            };
            setAddIncome(newData);
          }}
        />
      </div>
      <div className="w-full bg-gray-50 h-[380px] rounded-t-3xl px-6 pt-10">
        <div>
          <select
            name="categories"
            id="categories"
            className="w-full px-4 py-4 border rounded-2xl border-gray-400  text-gray-400"
            onChange={(e) => {
              const newData = {
                ...addIncome,
                category: e.target.value,
              };
              setAddIncome(newData);
            }}
          >
            <option
              value=""
              disabled
              selected
              hidden
              className="text-gray-200 "
            >
              Category
            </option>
            <option value="Salary">Salary</option>
            <option value="Freelance">Freelance</option>
            <option value="Loan">Loan</option>
            <option value="Investment">Investment</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="text"
            id=""
            placeholder="Description"
            className="w-full px-4 py-4 border rounded-2xl border-gray-400 mt-4"
            onChange={(e) => {
              const newData = {
                ...addIncome,
                title: e.target.value,
              };
              setAddIncome(newData);
            }}
          />

          <div className="flex items-center gap-4 text-sm text-gray-400 mt-4">
            <DatePicker
              onChange={(e: any) => {
                const newData = {
                  ...addIncome,
                  date: e.target.value,
                };
                setAddIncome(newData);
              }}
            />
            <div className="text-gray-600">pick a date</div>
          </div>
          <div className="w-full h-[20px] text-red-400 mt-10">
            {activeFill ? (
              <p className="text-sm w-fit text-red-400 m-auto">
                Invalid fill all data
              </p>
            ) : (
              <></>
            )}
            {activeNan ? (
              <p className="text-sm w-fit text-red-400 m-auto">
                Not valid amount
              </p>
            ) : (
              <></>
            )}
          </div>
          <button
            className="w-full bg-purple-400 text-lg text-white py-2 mt-5 rounded-2xl"
            onClick={() => {
              onHandleaddIncome();
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </main>
  );
};

export default AddIncomePage;
