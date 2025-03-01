import { useNavigate } from "react-router-dom";

const GoBackButton = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <button
        onClick={() => navigate(-1)}
        className="px-4 py-2 text-white rounded-lg bg-sky-400 hover:bg-sky-700"
      >
        ← Back to Previous Page
      </button>
    </div>
  );
};

export default GoBackButton;
