import Vector from "../../assets/Vector.png";

const ConfirmationDialog = ({ isOpen, isClose, onConfirm, name }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={isClose} />

      <div className="relative w-full max-w-md rounded-lg bg-white shadow-xl p-6">
        <img
          src={Vector}
          alt="remove"
          className="mx-auto cursor-pointer w-5 h-5 absolute top-2 right-3"
          onClick={isClose}
        />

        <h3 className="text-lg font-semibold text-gray-900">
          Remove <span className="font-bold">{name}</span> from Comparison
        </h3>

        <p className="mt-2 text-sm text-gray-600">
          Are you sure you want to remove{" "}
          <span className="font-bold">{name}</span> from the comparison list?
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={isClose}
            className="rounded-md border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="rounded-md bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-400"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
