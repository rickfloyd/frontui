import QuantumDashboardGrid from "./components/DashboardPanels/QuantumDashboardGrid";
import QuantumGameHub from "./components/GameSystems/QuantumGameHub";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#111] text-gray-100">
      <QuantumDashboardGrid />
      <QuantumGameHub />
    </div>
  );
}
