"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/helper";

export default function Home() {
  const [active, setActive] = useState<Boolean>(false);
  const [activePass, setActivePass] = useState<Boolean>(false);
  const router = useRouter();
  const [dataRegis, setDataRegis] = useState({
    name: "",
    email: "",
    password: "",
    repassword: "",
  });

  const onHandleRegis = async () => {
    try {
      console.log(dataRegis);
      //Validasi semua input harus terisi
      if (Object.values(dataRegis).includes("")) {
        setActive(true);
        setActivePass(false);
        throw new Error("fill in all form");
      }

      if (dataRegis.password !== dataRegis.repassword) {
        setActive(false);
        setActivePass(true);
        throw new Error("Password and Confirm Password not Equal");
      }
      const { name, email, password } = dataRegis;
      const response = await axios.post(BASE_URL + `/adduser`, {
        name: name,
        email: email,
        password: password,
      });
      setActive(false);
      setActivePass(false);
      console.log(JSON.stringify(response));
      console.log("RESPON REGIS : ", response.data);
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="">
      <div className="w-[340px] h-fit bg-gray-200 rounded-xl m-auto mt-[80px] py-10">
        <div className="flex flex-col gap-1">
          <input
            type="text"
            placeholder="username"
            className=" w-[280px] h-[40px] py-1 px-6 m-auto rounded-md"
            onChange={(element) => {
              const newData = {
                ...dataRegis,
                name: element.target.value,
              };
              setDataRegis(newData);
            }}
          />
          <input
            type="text"
            placeholder="email"
            className=" w-[280px] h-[40px] py-1 px-6 m-auto rounded-md mt-3"
            onChange={(element) => {
              const newData = {
                ...dataRegis,
                email: element.target.value,
              };
              setDataRegis(newData);
            }}
          />
          <input
            type="password"
            placeholder="password"
            className=" w-[280px] h-[40px] py-1 px-6 m-auto rounded-md mt-3"
            onChange={(element) => {
              const newData = {
                ...dataRegis,
                password: element.target.value,
              };
              setDataRegis(newData);
            }}
          />
          <input
            type="password"
            placeholder="confirm password"
            className=" w-[280px] h-[40px] py-1 px-6 m-auto rounded-md mt-3"
            onChange={(element) => {
              const newData = {
                ...dataRegis,
                repassword: element.target.value,
              };
              setDataRegis(newData);
            }}
          />

          <div className="text-sm  w-full h-[20px]  m-auto">
            <p className="w-fit m-auto mt-3 cursor-pointer text-gray-500">
              alredy have account?{" "}
              <span
                className="text-blue-500 "
                onClick={() => {
                  router.push("/login");
                }}
              >
                Sign in
              </span>
            </p>
          </div>

          <button
            className="px-3 py-2 bg-purple-400 text-white rounded-md w-[180px] m-auto mt-5"
            onClick={() => {
              onHandleRegis();
            }}
          >
            sign up
          </button>
          <div className="text-sm  w-full h-[20px] text-red-400 m-auto">
            {activePass ? (
              <p className="w-fit m-auto">Password didnt match. Try Again</p>
            ) : (
              <></>
            )}
            {active ? (
              <p className="w-fit m-auto">Invalid fill all data</p>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
