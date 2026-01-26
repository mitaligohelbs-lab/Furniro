const CommonInput = ({ label, value, onChange, type = "text" }) => (
  <div className="flex flex-col">
    <label>{label}</label>
    <input
      type={type}
      className="border border-[#9F9F9F] rounded-sm h-10"
      value={value}
      onChange={onChange}
    />
  </div>
);

export default CommonInput;
