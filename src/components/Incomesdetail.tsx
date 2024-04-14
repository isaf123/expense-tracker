import * as React from "react";

interface IDetailsIncomesProps {
  title: string;
  children: string;
  date: string;
  category: string;
}

const DetailsIncomes: React.FunctionComponent<IDetailsIncomesProps> = (
  props
) => {
  return (
    <div className="mt-5 h-fit">
      <div className=" py-4 w-full px-10 rounded-xl bg-[#EFE4D6] flex justify-between">
        <div>
          <p className="font-bold text-xl">{props.category}</p>
          <p className="text-sm text-gray-600"> {props.title}</p>
        </div>
        <div className="text-right">
          <p className="text-green-600 text-lg font-bold">+ {props.children}</p>
          <p className="text-sm text-gray-500">{props.date}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailsIncomes;
