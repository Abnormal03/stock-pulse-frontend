import React, { useEffect, useState, useMemo } from "react";
import ReactApexChart from "react-apexcharts";

const Chart = ({ dashboard }) => {
  const { getChart, data, chartLoading, error, currentSymbol } = dashboard;
  const [displayError, setDisplayError] = useState(false);

  useEffect(() => {
    const symbolToFetch = currentSymbol;

    if (!symbolToFetch) return;
    getChart(symbolToFetch);
  }, [currentSymbol, getChart]);

  const series = useMemo(() => [{ data: data || [] }], [data]);

  useEffect(() => {
    let timeoutId;

    if (error) {
      setDisplayError(true);
      timeoutId = setTimeout(() => {
        setDisplayError(false);
      }, 5000);
    }

    return () => clearTimeout(timeoutId);
  }, [error])

  const options = {
    chart: {
      type: "candlestick",
      height: 350,
      background: "transparent",
      foreColor: "#ffff",
    },
    title: {
      text: `${currentSymbol || "Select a symbol"} Stock Price`,
      align: "left",
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
    tooltip: {
      enabled: true,
      theme: "dark",
      style: {
        fontSize: "12px",
        fontFamily: undefined,
      },
    },
    grid: {
      show: false,
    },
  };
  return (
    <div className="text-text-main items-center justify-center p-5 rounded-sm shadow-sm shadow-active-icon col-span-full min-w-90 min-h-50 lg:min-h-150 lg:min-w-270 overflow-hidden lg:col-span-2 m-0  h-fit lg:h-150 relative">
      <ReactApexChart
        options={options}
        series={series}
        type="candlestick"
        height={550}
      />
      {chartLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <p>Loading chart...</p>
        </div>
      )}
      {displayError && <div className="absolute bottom-5 right-5 bg-red-500 p-2 rounded">couldn't load the data</div>}
    </div>
  );
};

export default Chart;
