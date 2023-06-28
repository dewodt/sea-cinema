"use client";

interface Button {
  children: string | React.ReactNode;
  color: "red" | "trans-red";
  disabled: boolean;
  onClick: (e: React.MouseEvent) => void;
  fullWidth: boolean;
  type: "submit" | "button" | "reset";
  paddingX: string;
  paddingY: string;
  ariaLabel?: string;
}

const bgColorDefault = {
  red: "bg-custom-light-red text-custom-white xl:hover:bg-[#E0434D]",
  "trans-red":
    "border-2 border-solid border-custom-light-red text-custom-light-red bg-white bg-opacity-0 xl:hover:bg-opacity-20",
} as const;

const Button = ({
  children,
  color,
  disabled,
  onClick,
  fullWidth,
  type,
  paddingX,
  paddingY,
  ariaLabel,
}: Button) => {
  return (
    <button
      disabled={disabled}
      type={type}
      aria-label={ariaLabel}
      onClick={(e) => onClick(e)}
      style={{ padding: `${paddingY} ${paddingX}` }}
      className={`xl:transititon relative flex h-fit items-center justify-center rounded-md font-inter text-base font-bold shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] xl:duration-300 xl:ease-in-out ${
        fullWidth ? "w-full" : "w-fit"
      } ${
        !disabled
          ? bgColorDefault[color]
          : "cursor-not-allowed bg-custom-gray text-custom-white"
      }`}
    >
      {/* Content */}
      {children}
    </button>
  );
};

Button.defaultProps = {
  disabled: false,
  fullWidth: false,
  paddingX: "25px",
  paddingY: "15px",
  type: "button",
  onClick: () => {
    return;
  },
};

export default Button;
