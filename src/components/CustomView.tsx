import React, { useState, useEffect } from 'react';

const Chart: React.FC<{ type: string; onRemove: () => void }> = ({ type, onRemove }) => {
  const content = () => {
    switch (type) {
      case 'Stocks':
        return <div className="p-6 bg-gray-800/50 rounded-lg border border-cyan-400/50 shadow-lg shadow-cyan-400/20">Stocks Content</div>;
      case 'Spreads':
        return <div className="p-6 bg-gray-800/50 rounded-lg border border-pink-400/50 shadow-lg shadow-pink-400/20">Spreads Content</div>;
      case 'Float':
        return <div className="p-6 bg-gray-800/50 rounded-lg border border-yellow-400/50 shadow-lg shadow-yellow-400/20">Float Content</div>;
      case 'Crypto':
        return <div className="p-6 bg-gray-800/50 rounded-lg border-green-400/50 shadow-lg shadow-green-400/20">Crypto Content</div>;
      case 'Futures':
        return <div className="p-6 bg-gray-800/50 rounded-lg border-blue-400/50 shadow-lg shadow-blue-400/20">Futures Content</div>;
      default:
        return null;
    }
  };

  return (
    <div className="relative">
      {content()}
      <button onClick={onRemove} className="absolute top-2 right-2 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center">
        X
      </button>
    </div>
  );
};

const CustomView: React.FC = () => {
  const [charts, setCharts] = useState<{ id: number; type: string }[]>([]);
  const [nextId, setNextId] = useState(0);
  const [chartTypes, setChartTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChartTypes = async () => {
      try {
        // All API calls are automatically proxied by Firebase
        const response = await fetch('/api/chart-types'); 
        const data = await response.json();
        setChartTypes(data);
      } catch (error) {
        console.error('Error fetching chart types:', error);
        // Fallback to default charts if API fails
        setChartTypes(['Stocks', 'Spreads', 'Float', 'Crypto', 'Futures']);
      } finally {
        setLoading(false);
      }
    };

    fetchChartTypes();
  }, []);

  const addChart = (type: string) => {
    setCharts([...charts, { id: nextId, type }]);
    setNextId(nextId + 1);
  };

  const removeChart = (id: number) => {
    setCharts(charts.filter((chart) => chart.id !== id));
  };

  return (
    <div className="w-full">
      <div className="mb-6 flex space-x-2">
        {loading ? (
          <p>Loading chart types...</p>
        ) : (
          chartTypes.map((type) => (
            <button
              key={type}
              onClick={() => addChart(type)}
              className="px-6 py-2 rounded-lg font-semibold text-sm transition-all duration-300 shadow-lg transform hover:scale-105 bg-gray-900 text-cyan-300 border border-cyan-400/30 hover:bg-cyan-400/10 hover:border-cyan-400"
            >
              Add {type}
            </button>
          ))
        )}
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {charts.map((chart) => (
          <Chart key={chart.id} type={chart.type} onRemove={() => removeChart(chart.id)} />
        ))}
      </div>
    </div>
  );
};

export default CustomView;
