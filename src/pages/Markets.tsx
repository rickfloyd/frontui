import VegasButton from "../components/VegasButton";
import { useNavigate } from "react-router-dom";

export default function Markets() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-gray-900 text-white p-10">
      <h1 className="text-3xl font-bold mb-6 text-pink-400">Markets</h1>

      <VegasButton
        videoSrc="/assets/vegas.mp4"
        onClick={() => navigate("/sports")}
      />
    </div>
  );
}
