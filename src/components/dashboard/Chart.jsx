import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const Chart = ({ dashboard }) => {
  const { getChart, data, chartLoading, error } = dashboard;
  useEffect(() => {
    getChart("AAPL");
  }, []);

  const series = [
    {
      data: data,
    },
  ];

  const options = {
    chart: {
      type: "candlestick",
      height: 350,
      background: "transparent", // Looks great with Glassmorphism
      foreColor: "#ffff",
    },
    title: {
      text: "AAPL Stock Price",
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
      theme: "dark", // This will turn the background dark and text white
      style: {
        fontSize: "12px",
        fontFamily: undefined,
      },
    },
    grid: {
      show: false,
    },
  };
  if (error && !data)
    return (
      <p className="text-red-500 flex justify-center items-center">
        Error: {error}
      </p>
    );
  return (
    <div className="text-text-main items-center justify-center p-5 rounded-sm shadow-sm shadow-text-dim col-span-2 m-0  h-fit lg:h-150 ">
      {chartLoading ? (
        <p>
          Loading chart... <data value=""></data>
        </p>
      ) : (
        <ReactApexChart
          options={options}
          series={series}
          type="candlestick"
          height={550}
        />
      )}
    </div>
  );
};

export default Chart;
