"use client";
import * as React from "react";
import { useState } from "react";
import { BASE_URL } from "@/utils/helper";
import axios from "axios";
interface IEditUsersProps {}

const EditUsers: React.FunctionComponent<IEditUsersProps> = (props) => {
  const [rename, setrename] = useState<string>("");
  const [changePass, setChangePass] = useState<string>("");

  const onHandleRename = async () => {
    try {
      await axios.get(
        BASE_URL +
          `/renameuser?name=${rename}&id=${localStorage.getItem("mainkey")}`
      );

      localStorage.removeItem("mainuser");
      localStorage.setItem("mainuser", rename);
    } catch (error) {
      console.log("error");
    }
  };

  const onHandleChangePass = async () => {
    try {
      await axios.post(BASE_URL + `/changepass`, {
        password: changePass,
        id: `'${localStorage.getItem("mainkey")}'`,
      });
    } catch (error) {
      console.log("error");
    }
  };
  return (
    <div>
      <input
        type="text"
        id=""
        placeholder="rename"
        className="w-full px-4 py-4 border rounded-2xl border-gray-400 mt-4"
        onChange={(e) => {
          setrename(e.target.value);
        }}
      />
      <button
        onClick={onHandleRename}
        className="w-full bg-purple-400 text-lg text-white py-2 mt-5 rounded-2xl"
      >
        Continue
      </button>
      {/* ///////////// */}
      <input
        type="password"
        id=""
        placeholder="change password"
        className="w-full px-4 py-4 border rounded-2xl border-gray-400 mt-10"
        onChange={(e) => {
          setChangePass(e.target.value);
        }}
      />
      <button
        onClick={onHandleChangePass}
        className="w-full bg-purple-400 text-lg text-white py-2 mt-5 rounded-2xl"
      >
        Continue
      </button>
    </div>
  );
};

export default EditUsers;
