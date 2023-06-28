"use client";

import { Dispatch, SetStateAction } from "react";

const TextField = ({
  type,
  disabled,
  placeholder,
  value,
  setValue,
  ...props
}: {
  type: "text" | "password" | "email";
  disabled: boolean;
  placeholder: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <input
      type={type}
      disabled={disabled}
      placeholder={placeholder}
      className="h-10 w-full rounded-md border border-custom-gray bg-custom-white px-3 py-2 font-inter text-sm font-medium focus-visible:outline-none focus-visible:outline-custom-green disabled:cursor-not-allowed disabled:opacity-50"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      {...props}
    />
  );
};

export default TextField;

TextField.defaultProps = {
  disabled: false,
  type: "text",
};
