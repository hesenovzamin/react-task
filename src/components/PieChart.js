import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import '../App.css';
import { Chart as ChartJS } from "chart.js/auto";
import { useSelector } from 'react-redux'


function BarChart({ loading, showChart }) {


  const chartData = useSelector(state => state.data.currentData);

  const [userData, setUserData] = useState({});

  const Data = [{ status: 0, count: 0, percentage: 0 }, { status: 1, count: 0, percentage: 0 }, { status: 2, count: 0, percentage: 0 }]
  const Count = chartData.length
  chartData.forEach(element => {
    Data[element.status].count++
  });
  Data.forEach(element => {

    element.percentage = element.count * 100 / Count
  });

  useEffect(() => {
    setUserData({
      labels: Data.map((data) => 'Status Code ---' + data.status + '   ' + data.percentage + '%'),
      datasets: [
        {
          label: "Count",
          data: Data.map((data) => data.count),
          backgroundColor: [
            "rgba(75,192,192,1)",
            "#ecf0f1",
            "#50AF95",
            "#f3ba2f",
            "#2a71d0",
          ],
          borderColor: "black",
          borderWidth: 2,
        },
      ],
    })
  }, [showChart]);
  return (

    <div className="BarChart">
      {loading && showChart &&
        <Pie data={userData} />}
    </div>
  )
}

export default BarChart;