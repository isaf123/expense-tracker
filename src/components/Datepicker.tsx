"use client";
import * as React from "react";
import { useState } from "react";

interface IDatePickerProps {
  onChange: any;
}

const DatePicker: React.FunctionComponent<IDatePickerProps> = (props) => {
  const [date, setDate] = useState<any>();
  return (
    <div>
      <input
        type="date"
        onChange={props.onChange}
        className="h-[42px] px-4 w-[160px] rounded-xl border-[1px] border-gray-400 "
      />
    </div>
  );
};

export default DatePicker;
