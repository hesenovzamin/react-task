import React, { useEffect } from 'react'
import '../App.css';
import { ReactTabulator, reactFormatter, } from "react-tabulator";
import { useSelector, useDispatch } from 'react-redux'
import * as datatAction from '../store/actions/data';
import 'react-tabulator/lib/styles.css'; // required styles
import 'react-tabulator/lib/css/tabulator.min.css'; // theme

function Tabulator({ loading, columns, setShowChart, setLoading }) {

  const storage = useSelector(state => state.data.data);
  const dispatch = useDispatch();

  useEffect(() => {
  }, [loading]);


  const dataChanged = async (filters, rows) => {
    setShowChart(false)
    setLoading(false)
    let FilteredData = []
    rows.forEach(element => {
      FilteredData.push(element._row.data)
    });
    await dispatch(datatAction.filterData(FilteredData))
    setLoading(true)
  }


  return (
    <div className='tabulator-div'>
      {loading &&

        <ReactTabulator
          columns={columns}
          data={storage}
          events={
            {
              dataFiltered: dataChanged,
            }
          }
          options={{

            pagination: "local",
            paginationSize: 5,
            paginationSizeSelector: [5, 10, 25, 50, 100, storage.length],
            movableColumns: true,
            paginationCounter: "rows",
          }}



        />
      }
    </div>
  )
}

export default Tabulator
