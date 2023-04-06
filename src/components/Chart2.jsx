import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';


const BarChart = ({historyData}) => {

  console.log("historyData2:", historyData)  

  const date = historyData?.map(weightObj => new Date(weightObj.created_at).toLocaleDateString())
  const weightHistory = historyData?.map(weightObj => weightObj.weight)

  const chartData = {
    // label: "Your Progress", //which is undefined??
    datasets:[{
    backgroundColor: 'rgba(247, 180, 92)',
    borderColor: 'rgba(0,0,0,1)',
    borderWidth: 2,
    data: weightHistory,
    label: "Your Progress" 
    }]
  }

  return (
    <div>
      <Line
        data={chartData}
        options={{
          maintainAspectRatio: true,
          scales: {
            x: {
                type: 'category',
                labels: date
            }
        }
        }}
      />
    </div>
  );
}


export default BarChart;