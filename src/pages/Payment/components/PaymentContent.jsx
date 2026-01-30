import { useTranslation } from "react-i18next";
import JsonContentDisplay from "../../../components/common/JsonContentDisplay";
import { PAYMENT_SECTION } from "../../../constant";

const PaymentContent = () => {
  const { t } = useTranslation("payment");

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-4xl font-bold text-gray-900 mb-6">{t("title")}</h2>

      <div className="space-y-8">
        {PAYMENT_SECTION.map(({ title }) => (
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

export default PaymentContent;
