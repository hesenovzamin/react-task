import React from 'react'
import '../App.css';
import BarChart from './BarChart';
import PieChart from './PieChart'

function chartSection({ loading, showChart, currentDataArray, setShowChart }) {


  const showChartHandler = () => {
    setShowChart(true)
  }

  return (
    <div>
      {loading &&
        <div className='chart-button'>
          <button onClick={showChartHandler}>Show Chart</button>
        </div>}

      <BarChart loading={loading} showChart={showChart} chartData={currentDataArray} />
      <PieChart loading={loading} showChart={showChart} chartData={currentDataArray} />
    </div>
  )
}

export default chartSection
