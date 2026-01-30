const CommonInput = ({
  id,
  label,
  error,
  type = "text",
  placeholder,
  name,
  required,
  ...props
}) => (
  <div className="flex flex-col">
    <label className="flex gap-1 items-center" htmlFor={id}>
      {label} {required ? <span className="text-red-500">*</span> : ""}
    </label>
    <input
      type={type}
      className="border border-[#9F9F9F] rounded-sm h-10 text-left placeholder:text-start p-5 leading-10 focus:outline-none"
      placeholder={placeholder}
      name={name}
      {...props}
    />
    <p className="text-sm mt-1 text-red-500"> {error}</p>
  </div>
);

export default CommonInput;
