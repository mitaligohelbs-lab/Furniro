import { RETURN_SECTION } from "../../../constant";
import JsonContentDisplay from "../../../components/common/JsonContentDisplay";
import { useTranslation } from "react-i18next";

const ReturnContent = () => {
  const { t } = useTranslation(["return"]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-4xl font-bold text-gray-900 mb-6">{t("title")}</h2>

      <div className="space-y-8">
        {RETURN_SECTION.map(({ title, icon }) => (
          <JsonContentDisplay
            key={title}
            heading={t(`${title}.heading`)}
            content={t(`${title}.content`)}
            icon={icon}
          />
        ))}
      </div>
    </div>
  );
};

export default ReturnContent;
