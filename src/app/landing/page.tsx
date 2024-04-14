"use client";
import * as React from "react";
import { useEffect } from "react";
import { BASE_URL } from "@/utils/helper";
import axios from "axios";
import { useState } from "react";
import detailsIncomes from "@/components/Incomesdetail";
import DetailsIncomes from "@/components/Incomesdetail";
import DatePicker from "@/components/Datepicker";
import { useRouter } from "next/navigation";
import DetailsExpenses from "@/components/Expensesdetail";
import { GoFilter } from "react-icons/go";
import { IoPersonOutline } from "react-icons/io5";
import { start } from "repl";

interface ILandingProps {}

const Landing: React.FunctionComponent<ILandingProps> = (props) => {
  const date = new Date();
  const [income, setIncome] = useState<number>(0);
  const [expenses, setExpenses] = useState<number>(0);
  const [balance, setBalance] = useState<number>(0);
  const [activeDetail, setActiveDetail] = useState<Boolean>(false);
  const [incomeDetail, setIncomeDetail] = useState<any[]>();
  const [activeFil, setActiveFil] = React.useState<Boolean>(true);
  const [activeFilExpenses, setActiveFillExpenses] = useState<string>("");
  const [activeFilIncome, setActiveFillIncome] = useState<string>("");
  const [activePlus, setActivePlus] = useState<Boolean>(false);
  const [expensesDetail, setExpensesDetail] = useState<any[]>();
  const [filterCat, setFilterCat] = useState<any[]>();
  const [getDate, setgetdate] = useState<Object>({
    start: "",
    end: "",
  });
  const router = useRouter();

  useEffect(() => {
    onGetMoney();
  }, []);

  const onGetMoney = async () => {
    try {
      const incomeTotal = await axios.get(
        BASE_URL + `/incomestotal?userid=${localStorage.getItem("mainkey")}`
      );

      const expensesTotal = await axios.post(BASE_URL + `/expensestotal`, {
        userid: localStorage.getItem("mainkey"),
      });

      const getIncomesDetail = await axios.post(BASE_URL + `/incomesdetail`, {
        userid: localStorage.getItem("mainkey"),
      });

      const getExpensesDetail = await axios.get(
        BASE_URL + `/expensesdetail?userid=${localStorage.getItem("mainkey")}`
      );
      /////////////////
      const getFilterCategory = await axios.get(
        BASE_URL +
          `/getfiltercategories?userid=${localStorage.getItem("mainkey")}`
      );

      setIncomeDetail(getIncomesDetail.data.reverse());
      setExpensesDetail(getExpensesDetail.data.reverse());
      setFilterCat(getFilterCategory.data);

      setIncome(incomeTotal.data[0].sum);
      setExpenses(expensesTotal.data[0].sum);
      setBalance(incomeTotal.data[0].sum - expensesTotal.data[0].sum);
    } catch {}
  };

  console.log(incomeDetail);

  const mappingIncomeDetail = () => {
    const objDate = Object.values(getDate);
    const newArr = incomeDetail?.filter((val) => {
      return val.category === activeFilIncome;
    });
    const newDate = incomeDetail?.filter((val) => {
      return (
        new Date(val.date).getTime() > new Date(objDate[0]).getTime() &&
        new Date(val.date).getTime() < new Date(objDate[1]).getTime()
      );
    });
    if (activeFilIncome) {
      return newArr?.map((val, idx) => {
        return (
          <div key={idx}>
            <DetailsIncomes
              title={val.title}
              date={val.date}
              category={val.category}
            >
              {val.nominal.toLocaleString("id-ID")}
            </DetailsIncomes>
          </div>
        );
      });
    } else if (!Object.values(getDate).includes("")) {
      return newDate?.map((val, idx) => {
        return (
          <div key={idx}>
            <DetailsIncomes
              title={val.title}
              date={val.date}
              category={val.category}
            >
              {val.nominal.toLocaleString("id-ID")}
            </DetailsIncomes>
          </div>
        );
      });
    } else {
      return incomeDetail?.map((val, idx) => {
        return (
          <div key={idx}>
            <DetailsIncomes
              title={val.title}
              date={val.date}
              category={val.category}
            >
              {val.nominal.toLocaleString("id-ID")}
            </DetailsIncomes>
          </div>
        );
      });
    }
  };

  const mapCategoryUser = () => {
    return filterCat?.map((val: any, idx: number) => {
      return (
        <option key={idx} value={val.catid}>
          {val.category}
        </option>
      );
    });
  };

  const mappingExpenseDetail = () => {
    const newArr = expensesDetail?.filter((val) => {
      return val.catid === parseInt(activeFilExpenses);
    });
    /////////////////////////
    if (activeFilExpenses) {
      return newArr?.map((val, idx) => {
        return (
          <div key={idx}>
            <DetailsExpenses
              title={val.title}
              date={val.date}
              category={val.category}
            >
              {val.nominal.toLocaleString("id-ID")}
            </DetailsExpenses>
          </div>
        );
      });
    } else {
      return expensesDetail?.map((val, idx) => {
        return (
          <div key={idx}>
            <DetailsExpenses
              title={val.title}
              date={val.date}
              category={val.category}
            >
              {val.nominal.toLocaleString("id-ID")}
            </DetailsExpenses>
          </div>
        );
      });
    }
  };

  return (
    <main className="w-[390px] m-auto min-h-[860px] h-fit relative pb-10">
      {/* SECTION TOTAL BALANCE//////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
      <div className="w-[390px] h-fit bg-gray-50  m-auto">
        <div className="w-full m-auto">
          <div className="w-full h-[320px] rounded-b-3xl bg-[#D4C7BD] pt-[10px] shadow-lg">
            <div
              className="text-sm text-red-600 text-right flex justify-end"
              onClick={() => {
                router.push("/login");
                localStorage.removeItem("mainuser");
                localStorage.removeItem("mainkey");
              }}
            >
              <p className="mr-4 px-3 py-2 bg-gray-200 rounded-lg w-fit font-bold">
                Logout
              </p>
            </div>

            <h2 className="w-fit m-auto text-md font-normal">
              Account Balance
            </h2>
            <h2 className="w-fit m-auto text-3xl font-bold">
              {balance.toLocaleString("id-ID")}
            </h2>
            <div className="flex w-fit m-auto gap-5 mt-10">
              <div className="w-[180px] h-[100px] bg-green-600 rounded-xl flex flex-col items-center justify-center">
                <div className="text-white text-xs">income</div>
                <div className="text-xl text-white font-bold">
                  {Number(income).toLocaleString("id-ID")}
                </div>
              </div>
              <div className="w-[180px] h-[100px] bg-red-600 rounded-xl flex flex-col items-center justify-center ">
                <div className="text-white text-xs">expenses</div>
                <div className="text-xl text-white font-bold">
                  {Number(expenses).toLocaleString("id-ID")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FILTER RED GREEN//////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

      <div className="w-[320px] m-auto flex justify-center gap-10 mt-5 h-fit border-b-2 border-t-2 py-2">
        <div
          className={
            activeDetail === true
              ? "bg-green-600 text-white w-[120px] px-4 py-2 rounded-3xl font-bold"
              : "bg-gray-300 text-gray-500 w-[120px] px-4 py-2 rounded-3xl"
          }
          onClick={() => {
            setActiveDetail(true);
          }}
        >
          <p className="w-fit m-auto">income</p>
        </div>
        <div
          className={
            activeDetail === false
              ? "bg-red-600 text-white w-[120px] px-4 py-2 rounded-3xl font-bold"
              : " bg-gray-300 text-gray-500  w-[120px] px-4 py-2 rounded-3xl"
          }
          onClick={() => {
            setActiveDetail(false);
          }}
        >
          <p className="w-fit m-auto">expenses</p>
        </div>
      </div>
      {/* SECTION DETAILS RED GREEN//////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
      <button
        className="w-full m-auto text-right px-8 text-sm text-blue-500"
        onClick={() => {
          setActiveFillExpenses("");
          setActiveFillIncome("");
          setgetdate({ start: "", end: "" });
        }}
      >
        clear filter
      </button>

      {activeDetail ? (
        <div className="px-[10px]">{mappingIncomeDetail()}</div>
      ) : (
        <div className="px-[10px]">{mappingExpenseDetail()}</div>
      )}
      {/* SECTION NAVBAR/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
      {activePlus ? (
        <div className="fixed w-[340px] h-fit py-5 bg-gray-200 rounded-xl top-[50%] left-6">
          <div className="flex items-center w-fit m-auto gap-2">
            <button
              onClick={() => {
                router.push("/addincome");
              }}
              className="bg-green-600 text-white w-[120px] px-4 py-2 rounded-3xl font-bold"
            >
              Income
            </button>
            <p>-- or --</p>
            <button
              onClick={() => {
                router.push("/addexpense");
              }}
              className="bg-red-600 text-white w-[120px] px-4 py-2 rounded-3xl font-bold"
            >
              Expenses
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className="fixed bottom-0">
        {!activeFil ? (
          <div className="w-full h-[260px] bg-gray-100 rounded-t-2xl px-4 pt-2">
            <p className="text-sm">Filter Expenses </p>
            <select
              name="categories"
              id="categories"
              className="w-full px-2 py-2 border rounded-2xl border-gray-400  text-gray-400 mt-1"
              onChange={(e) => {
                setActiveFillExpenses(e.target.value);
              }}
            >
              {/* ////// */}
              {mapCategoryUser()}
            </select>
            <p className="text-sm mt-3">Filter Income</p>
            <select
              name="categories"
              id="categories"
              className="w-full px-2 py-2 border rounded-2xl border-gray-400  text-gray-400 mt-1"
              onChange={(e) => {
                setActiveFillIncome(e.target.value);
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
            <p className="text-sm mt-3">Filter Date</p>
            <div className="flex justify-between">
              <div>
                <div className="text-xs">stary date</div>
                {/* /////////////////////////////// */}
                <DatePicker
                  onChange={(e: any) => {
                    const newData = {
                      ...getDate,
                      start: e.target.value,
                    };
                    setgetdate(newData);
                  }}
                ></DatePicker>
              </div>
              <div>
                <div className="text-xs">end date</div>
                <DatePicker
                  onChange={(e: any) => {
                    const newData = {
                      ...getDate,
                      end: e.target.value,
                    };
                    setgetdate(newData);
                  }}
                ></DatePicker>
              </div>
            </div>
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
          <button
            onClick={() => setActivePlus(!activePlus)}
            className="w-[80px] h-[46px] bg-gray-100  border-l-[8px] border-r-red-600 border-l-green-600  border-r-[8px] border-[#EFE4D6] text-center flex items-center justify-center rounded-2xl"
          >
            <p className="text-2xl font-bold">+</p>
          </button>
          <div
            className="w-fit flex items-end gap-2"
            onClick={() => router.push("/editusers")}
          >
            <IoPersonOutline className=" m-auto w-[24px] h-[24px] " />

            <p className="text-sm">Profile</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Landing;
