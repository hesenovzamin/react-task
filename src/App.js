import './App.css';
import React, { useState, useRef } from 'react';
import { ReactTabulator, reactFormatter, } from "react-tabulator";
import { useSelector, useDispatch } from 'react-redux'
import * as datatAction from './store/actions/data';
import AppModal from './components/Modal';

import Map from 'ol/Map.js';
import View from 'ol/View.js';
import WKT from 'ol/format/WKT.js';
import { OSM, Vector as VectorSource } from 'ol/source.js';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';
import * as proj from "ol/proj";
import ChartSection from './components/chartSection';
import HeaderButton from './components/HeaderButton';
import Tabulator from './components/Tabulator';
import SimpleButton from './components/SimpleButton';
const xlsx = require("xlsx");


function App() {

  const inputRef = useRef(null);
  const mapRef = useRef(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mapStatus, setMapStatus] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null)
  const [showChart, setShowChart] = useState(false)
  const storage = useSelector(state => state.data.data);
  const [columns, setColumns] = useState([]);
  const dispatch = useDispatch();




  let btncolumn = [
    {
      title: "EDIT",
      field: "custom",
      hozAlign: "center",
      width: 150,
      formatter: reactFormatter(
        <SimpleButton
          name={'EDIT'}
        />
      )
    },
    {
      title: "DELETE",
      field: "custom",
      hozAlign: "center",
      width: 150,
      formatter: reactFormatter(
        <SimpleButton
          name={'DELETE'}
        />
      )
    },
    {
      title: "MAP",
      field: "custom",
      hozAlign: "center",
      width: 150,
      formatter: reactFormatter(
        <SimpleButton
          name={'MAP'}
        />
      )
    }
  ]

  function SimpleButton(props) {
    const rowData = props.cell._cell.row.data;
    const cellValue = props.name;
    return <button onClick={() =>
      props.name === 'EDIT' ? EditItemHandler(rowData) :
        props.name === 'DELETE' ? DeleteItemHandler(rowData) :
          props.name === 'MAP' ? mapsHandler(rowData) : null}>{cellValue}</button>;
  }

  const EditItemHandler = (rowData) => {
    setSelectedData(rowData)
    setShowModal(true)
  }
  const DeleteItemHandler = async (rowData) => {
    await dispatch(datatAction.deleteData(rowData))
  }

  const raster = new TileLayer({
    source: new OSM(),
  });


  const mapsHandler = (rowData) => {
    if (mapRef.current?.children.length > 0) {
      mapRef.current.removeChild(mapRef.current.children[0])
    }
    setMapStatus(false)
    let datawkt = rowData.wkt.substring(11, rowData.wkt.length - 1)

    let pos = rowData.wkt.split('(')[1].split(')')[0].split(',')[0]
    let centerPos = datawkt.split(',')[0].split(' ')
    const posBg = proj.fromLonLat([parseFloat(centerPos[0]), parseFloat(centerPos[1])]);

    const format = new WKT();
    const wkt =
      `POLYGON(( ${datawkt}))`;
    const feature = format.readFeature(wkt, {
      dataProjection: 'EPSG:4326',
      featureProjection: 'EPSG:3857',
    });

    const vector = new VectorLayer({
      source: new VectorSource({
        features: [feature],
      }),
    });

    const map = new Map({
      layers: [raster, vector],
      target: 'map',
      view: new View({
        center: posBg,
        zoom: 18,
      }),
    });

    setMapStatus(true)
  }


  return (
    <div>
      <div>
        <HeaderButton
          setFile={setFile}
          setLoading={setLoading}
          setColumns={setColumns}
          btncolumn={btncolumn}
          inputRef={inputRef}
          file={file}
          setShowModal={() => setShowModal(true)}
        />
        <div>
          <Tabulator
            setLoading={setLoading}
            loading={loading}
            columns={columns}
            storage={storage}
            setShowChart={setShowChart}
          />
          {mapStatus &&
            <div className='map-size'>
              <div style={{ height: '33vh', width: '100%' }} id="map" ref={mapRef} className="" />
            </div>
          }
          <ChartSection
            showChart={showChart}
            loading={loading}
            setShowChart={setShowChart}
          />
        </div>
      </div>
      <AppModal
        setSelectedData={setSelectedData}
        setShowModal={setShowModal}
        setLoading={setLoading}
        storage={storage}
        showModal={showModal}
        selectedData={selectedData}
      />
    </div>
  );
}




export default App;


// dispactlar yigilaracaq bir yere ;; state update deyisdilecek modalda // importlara update // custom hook . simple button elave component 