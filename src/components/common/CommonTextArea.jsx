const CommonTextArea = ({ title, value, type = "text", onChange }) => {
  return (
    <div className="flex flex-col">
      <label>{title}</label>
      <textarea
        type={type}
        className="border border-[#9F9F9F] rounded-sm h-20"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default CommonTextArea;
