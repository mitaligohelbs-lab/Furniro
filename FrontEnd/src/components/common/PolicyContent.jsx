import { useTranslation } from "react-i18next";
import JsonContentDisplay from "./JsonContentDisplay";

const PolicyContent = ({ key, title, policyData }) => {
  const { t } = useTranslation([key]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-4xl font-bold text-gray-900 mb-6">{title}</h2>

      <div className="mb-8 rounded-lg border border-amber-900 bg-[#FFF3E3] px-4 py-3">
        <p className="text-xs font-medium text-yellow-900">{t("disclaimer")}</p>
      </div>

      <div className="space-y-8">
        {policyData.map(({ title, icon }) => (
          <JsonContentDisplay
            key={title}
            heading={t(`${title}.heading`)}
            content={t(`${title}.content`)}
          />
        ))}
      </div>
    </div>
  );
};

export default PolicyContent;
