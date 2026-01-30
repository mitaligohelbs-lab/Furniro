import LanguageSelector from "./LanguageSelector";

const PolicyLayout = ({ title, children }) => {
  return (
    <div className="px-10">
      <div className="flex flex-row w-full justify-between">
        <span className="uppercase">{title}</span>
        <LanguageSelector />
      </div>
      <div className="flex flex-col items-center mx-auto">{children}</div>
    </div>
  );
};

export default PolicyLayout;
