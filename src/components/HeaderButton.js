import React from 'react'
import { useDispatch } from 'react-redux'
import * as datatAction from '../store/actions/data';
const xlsx = require("xlsx");

function HeaderButton({ inputRef, file, setShowModal, setFile, setLoading, setColumns, btncolumn }) {


  const dispatch = useDispatch();



  const handleFileChange = (e) => {

    e.preventDefault();
    const files = e.target.files;
    if (files.length > 0) {
      const file = files[0];

      setFile(file);
      setLoading(false)
      const reader = new FileReader();
      reader.onload = async (e) => {
        const data = e.target.result;
        const workbook = xlsx.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = xlsx.utils.sheet_to_json(worksheet);
        json.sort((a, b) => b.id - a.id);
        await dispatch(datatAction.fetchData(json))
        const columns = Object.keys(json[0])
        let columnsarray = [];
        columns.forEach((element) => {
          columnsarray.push({
            title: element,
            field: element,
            width: 100,
            headerFilter: "input"
          })
        });
        columnsarray = [...columnsarray, ...btncolumn];
        setColumns(columnsarray)
        setLoading(true)
        inputRef.current.value = null;
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    } else {
      setFile(null);
    }
  };

  const handleButtonClick = () => {
    inputRef.current?.click();  // simulates clicking on file input element and opens dialog box
  };


  return (
    <div>
      <input ref={inputRef} style={{ display: 'none' }} type="file" onChange={handleFileChange} />
      <button onClick={handleButtonClick}>Load Excel File</button>
      {file && <button type="button" onClick={setShowModal}>Add New Data</button>}
    </div>
  )
}

export default HeaderButton
