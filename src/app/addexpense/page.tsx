"use client";
import * as React from "react";
import DatePicker from "@/components/Datepicker";
import { useState } from "react";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/utils/helper";
import axios from "axios";
import { title } from "process";

interface IAddIncomePageProps {}

const AddExpensePage: React.FunctionComponent<IAddIncomePageProps> = (
  props
) => {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [defaultCategories, setDefaultCategories] = useState<any[]>([]);
  const [addcategory, setAddCategory] = useState<string>();
  const [activeNewCat, setActiveNewCat] = useState<Boolean>(false);
  const [activeFill, setActiveFill] = useState<Boolean>(false);
  const [activeNan, setActiveNan] = useState<Boolean>(false);
  const [addExpense, setAddExpense] = useState<any>({
    title: "",
    nominal: 0,
    catid: 0,
    date: "",
  });

  React.useEffect(() => {
    onHandleData();
  }, []);

  const onHandleaddExpense = async () => {
    try {
      if (Object.values(addExpense).includes("")) {
        setActiveFill(true);
        setActiveNan(false);
        throw new Error("Please fill all data");
      }

      if (isNaN(addExpense.nominal)) {
        setActiveFill(false);
        setActiveNan(true);
        throw new Error("not valid amount");
      }
      const { title, nominal, catid, date } = addExpense;
      await axios.post(BASE_URL + `/addexpenses`, {
        title: title,
        nominal: nominal,
        catid: catid,
        date: date,
        userid: localStorage.getItem("mainkey"),
      });
      setActiveFill(false);
      setActiveNan(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onHandleData = async () => {
    try {
      const default1 = await axios.get(BASE_URL + `/getdefaultcategories`);
      const categoryuser = await axios.get(
        BASE_URL + `/getcategoryuser?userid=${localStorage.getItem("mainkey")}`
      );

      // console.log(response.data);
      setDefaultCategories(default1.data);
      setCategories(categoryuser.data);
    } catch (error) {}
  };
  console.log(categories.length);

  const onHandleAddCategories = async () => {
    try {
      await axios.post(BASE_URL + `/addcategory`, {
        category: addcategory,
        userid: localStorage.getItem("mainkey"),
      });
    } catch (error) {
      console.log("salaaaaah");
    }
  };

  const mapCategoryDefault = () => {
    return defaultCategories.map((val: any, idx: number) => {
      return (
        <option key={idx} value={val.id}>
          {val.category}
        </option>
      );
    });
  };
  const mapCategoryUser = () => {
    return categories.map((val: any, idx: number) => {
      return (
        <option key={idx} value={val.id}>
          {val.category}
        </option>
      );
    });
  };

  return (
    <main className="w-[390px] m-auto min-h-[670px] h-fit  bg-[#FD3C4A] flex flex-col justify-end">
      <div className="px-6 h-full mb-5">
        <div className="flex items-center mb-32 gap-[120px]">
          <HiArrowNarrowLeft
            className="text-gray-50 w-[24px] h-[24px]"
            onClick={() => {
              router.push("/landing");
            }}
          />
          <p className="text-gray-50 text-lg">expenses</p>
        </div>
        <p className="text-gray-100 opacity-60">How much ?</p>
        <input
          type="text"
          placeholder="0"
          className=" bg-transparent w-[340px] border-none font-medium text-5xl outline-none placeholder-purple-50 text-purple-50"
          onChange={(e) => {
            const newData = {
              ...addExpense,
              nominal: parseInt(e.target.value),
            };
            setAddExpense(newData);
          }}
        />
      </div>

      <div className="w-full bg-gray-50 h-[380px] rounded-t-3xl px-6 pt-10">
        <div className="w-full text-right">
          <p
            className="text-xs text-blue-500"
            onClick={() => {
              setActiveNewCat(!activeNewCat);
            }}
          >
            + new categories
          </p>
        </div>
        {activeNewCat ? (
          <div className=" absolute w-[340px] h-[220px] px-5 bg-[#EFE4D6] rounded-xl">
            <div className="w-full h-full relative">
              <p
                className="absolute text-sm font-bold top-0 right-0"
                onClick={() => {
                  setActiveNewCat(!activeNewCat);
                }}
              >
                X
              </p>
              <p className="text-sm my-5">Input New Category</p>
              <input
                type="text"
                id=""
                placeholder="new category"
                className="w-full px-4 py-4 border rounded-2xl border-gray-400 mt-2"
                onChange={(e) => {
                  setAddCategory(e.target.value);
                }}
              />
              <button
                className="w-full bg-purple-400 text-lg text-white py-2 mt-2 rounded-2xl"
                onClick={onHandleAddCategories}
              >
                Continue
              </button>
            </div>
          </div>
        ) : (
          <></>
        )}
        <select
          name="categories"
          id="categories"
          className="w-full px-4 py-4 border rounded-2xl border-gray-400  text-gray-400"
          onChange={(e) => {
            const newData = {
              ...addExpense,
              catid: e.target.value,
            };
            setAddExpense(newData);
          }}
        >
          <option value="" hidden className="text-gray-200 ">
            Category
          </option>

          {mapCategoryDefault()}
          {categories.length ? <>{mapCategoryUser()}</> : <></>}
        </select>
        <input
          type="text"
          id=""
          placeholder="Description"
          className="w-full px-4 py-4 border rounded-2xl border-gray-400 mt-4"
          onChange={(e) => {
            const newData = {
              ...addExpense,
              title: e.target.value,
            };
            setAddExpense(newData);
          }}
        />

        <div className="flex items-center gap-4 text-sm text-gray-400 mt-4">
          <DatePicker
            onChange={(e: any) => {
              const newData = {
                ...addExpense,
                date: e.target.value,
              };
              setAddExpense(newData);
            }}
          />
          <div className="text-gray-600">pick a date</div>
        </div>
        <div className="w-full h-[20px] text-red-400 mt-6">
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
          className="w-full bg-purple-400 text-lg text-white py-2 mt-6 rounded-2xl"
          onClick={() => {
            onHandleaddExpense();
          }}
        >
          Continue
        </button>
      </div>
    </main>
  );
};

export default AddExpensePage;
