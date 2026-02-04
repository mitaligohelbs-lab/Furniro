import LanguageSelector from "./LanguageSelector";

const PolicyLayout = ({ title, children }) => {
  return (
    <div className="px-2 md:px-10">
      <div className="flex flex-row w-full justify-between px-3 md:px-0">
        <span className="uppercase">{title}</span>
        <LanguageSelector />
      </div>
      <div className="flex flex-col items-center mx-auto">{children}</div>
    </div>
  );
};

export default PolicyLayout;
