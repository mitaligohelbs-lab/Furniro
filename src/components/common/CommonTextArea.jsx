const CommonTextArea = ({
  title,
  type = "text",
  placeholder,
  name,
  error,
  ...props
}) => (
  <div className="flex flex-col">
    <label>{title}</label>
    <textarea
      type={type}
      className="border border-[#9F9F9F] rounded-sm h-20 placeholder:text-start p-5 leading-10 focus:outline-none"
      placeholder={placeholder}
      name={name}
      {...props}
    />
    <p className="text-sm mt-1 text-red-500">{error}</p>
  </div>
);

export default CommonTextArea;
