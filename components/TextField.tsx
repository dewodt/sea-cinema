const TextField = ({
  name,
  type,
  disabled,
  placeholder,
}: {
  name: string;
  type: "text" | "password" | "email" | "number";
  disabled: boolean;
  placeholder: string;
}) => {
  return (
    <input
      name={name}
      type={type}
      disabled={disabled}
      placeholder={placeholder}
      className="border-custom-gray h-10 w-full rounded-md border bg-custom-white px-3 py-2 font-inter text-sm font-medium text-custom-soft-black focus-visible:outline-none focus-visible:outline-custom-green disabled:cursor-not-allowed disabled:opacity-50"
    />
  );
};

export default TextField;

TextField.defaultProps = {
  disabled: false,
  type: "text",
};
