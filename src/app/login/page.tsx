"use client";
import * as React from "react";
import { useState } from "react";
import { BASE_URL } from "@/utils/helper";
import axios from "axios";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
interface ILoginPageProps {}

const LoginPage: React.FunctionComponent<ILoginPageProps> = (props) => {
  const [active, setActive] = useState<Boolean>(false);
  const [activePass, setActivePass] = useState<Boolean>(false);
  const [dataLogin, setDataLogin] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();
  const onHandleLogin = async () => {
    try {
      if (!dataLogin.email || !dataLogin.password) {
        setActive(true);
        setActivePass(false);
        throw new Error("fill all data please");
      }

      const response = await axios.get(
        BASE_URL + `?email=${dataLogin.email}&pass=${dataLogin.password}`
      );
      console.log(response);
      console.log(dataLogin);
      if (response.data.length === 0) {
        setActive(false);
        setActivePass(true);
        throw new Error("not correct email or password");
      }
      setActive(false);
      setActivePass(false);

      alert(`Selamat Datang :` + response.data[0].name);
      //data respon disimpan ke global state redux
      localStorage.setItem("mainuser", response.data[0].name);
      localStorage.setItem("mainkey", response.data[0].id);
      router.push("/landing");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <div className="w-[340px] h-fit bg-gray-200 rounded-xl m-auto mt-[80px] py-10">
        <div className="flex flex-col gap-1">
          <div className="text-2xl font-bold text-purple-400 w-fit m-auto">
            Welcome
          </div>
          <input
            type="text"
            placeholder="email"
            className=" w-[280px] h-[40px] py-1 px-6 m-auto rounded-md mt-5"
            onChange={(element) => {
              const newData = {
                ...dataLogin,
                email: element.target.value,
              };
              setDataLogin(newData);
            }}
          />
          <input
            type="password"
            placeholder="password"
            className=" w-[280px] h-[40px] py-1 px-6 m-auto rounded-md mt-3"
            onChange={(element) => {
              const newData = {
                ...dataLogin,
                password: element.target.value,
              };
              setDataLogin(newData);
            }}
          />
          <p className="w-[280px] m-auto text-right text-md">
            or{" "}
            <span
              className="text-sm text-blue-400 cursor-pointer"
              onClick={() => {
                router.push("/");
              }}
            >
              Signup
            </span>
          </p>

          <button
            className="px-3 py-2 bg-purple-400 rounded-md w-[180px] m-auto"
            onClick={() => {
              onHandleLogin();
            }}
          >
            sign in
          </button>
          <div className="w-full h-[20px] text-red-400  ">
            {active ? (
              <p className="text-sm w-fit text-red-400 m-auto">
                Invalid fill all data
              </p>
            ) : (
              <></>
            )}
            {activePass ? (
              <p className="text-sm w-fit text-red-400 m-auto">
                Wrong Password
              </p>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
