const JsonContentDisplay = ({ heading, content, icon }) => (
  <section className="space-y-2">
    <div className="flex gap-2">
      {icon && <span>{icon}</span>}
      <h3 className="text-lg font-semibold text-gray-900">{heading}</h3>
    </div>
    <p className="text-sm leading-6 text-gray-700">{content}</p>
  </section>
);

export default JsonContentDisplay;
