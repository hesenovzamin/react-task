import React from 'react'

function SimpleButton(props, { mapsHandler, setShowModal, setSelectedData }) {

    const EditItemHandler = (rowData) => {
        setSelectedData(rowData)
        setShowModal(true)
    }
    const DeleteItemHandler = async (rowData) => {
        console.log('123123123123')
    }

    const rowData = props.cell._cell.row.data;
    const cellValue = props.name;

    return <button onClick={() =>
        props.name === 'EDIT' ? EditItemHandler(rowData) :
            props.name === 'DELETE' ? DeleteItemHandler(rowData) :
                props.name === 'MAP' ? mapsHandler(rowData) : null}>{cellValue}</button>;
}

export default SimpleButton
