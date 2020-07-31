import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api";
import { Line, Bar } from "react-chartjs-2";

import styles from "./Chart.module.css";

const Chart = ({
  dataFromAppjs: { confirmed, deaths, recovered },
  countryFromAppjs,
}) => {
  const [dailyData, setDailyData] = new useState([]);

  useEffect(() => {
    const fetchDailyDataAsyncCall = async () => {
      setDailyData(await fetchDailyData());
    };
    fetchDailyDataAsyncCall();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const lineChart = dailyData.length ? (
    <Line
      data={{
        labels: dailyData.map(({ reportDate }) => reportDate),
        datasets: [
          {
            data: dailyData.map(({ confirmed }) => confirmed),
            label: "Infected",
            borderColor: "#3333ff",
            fill: true,
          },
          {
            data: dailyData.map(({ deaths }) => deaths),
            label: "Deaths",
            borderColor: "red",
            backgroundColor: "rgba(255, 0, 0, 0.5)",
            fill: true,
          },
        ],
      }}
    />
  ) : null;

  const barChar = confirmed ? (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: [
              "rgba(0, 0, 255, 0.5)",
              "rgba(0, 255, 0, 0.5)",
              "rgba(255, 0, 0, 0.5)",
            ],
            data: [confirmed.value, recovered.value, deaths.value],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Current state in ${countryFromAppjs}` },
      }}
    />
  ) : null;

  return (
    <div className={styles.container}>
      {countryFromAppjs ? barChar : lineChart}
    </div>
  );
};

export default Chart;
