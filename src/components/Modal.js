import React, { useState } from 'react'
import Modal from "react-overlays/Modal";
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import * as datatAction from '../store/actions/data';
import '../App.css';

function AppModal({ setLoading, showModal, setLen, setStatus, selectedData, setShowModal, setSelectedData }) {


  const dispatch = useDispatch();
  const storage = useSelector(state => state.data.data);

  const [newData, setNewData] = useState({})

  const AddData = async () => {

    let maxId = Math.max(...storage.map(o => o.id)) + 1

    let NewData = { id: maxId, len: newData.len, status: newData.status }
    setLoading(false)
    await dispatch(datatAction.addData(NewData))
    setLoading(true)
    setShowModal(false)

  };

  const UpdateData = async () => {
    setLoading(false)
    await dispatch(datatAction.editData(selectedData))
    setLoading(true)
    setShowModal(false)
    setSelectedData(null)
  }

  const handleClose = () => {

    setSelectedData(null)
    setShowModal(false);

  }

  return (
    <Modal
      className="modal"
      show={showModal}
      onHide={handleClose}
    //  renderBackdrop={renderBackdrop}
    >
      <div>
        <div className="modal-header">
          <div className="modal-title">Heading</div>
          <div>
            <span className="close-button" onClick={handleClose}>
              x
            </span>
          </div>
        </div>
        <div className="modal-desc">
          <p className='modal-p'>Enter len information</p>
          {selectedData ?
            <input className='modal-input' type='number' value={selectedData.len} onChange={e => {
              setSelectedData(data => {
                return {
                  ...data,
                  len: e.target.value
                }
              })
            }} />
            :
            <input className='modal-input' type='number' value={newData.len} onChange={e => {
              setNewData(data => {
                return {
                  ...data,
                  len: e.target.value
                }
              })
            }} />
          }
          <p className='modal-p'>Select Status</p>
          {selectedData ?
            <select value={selectedData.status} onChange={e => {
              setSelectedData(data => {
                return {
                  ...data,
                  status: e.target.value
                }
              })
            }} className='modal-input'>
              {[0, 1, 2].map(status => {
                return (<option key={status}>{status}</option>)
              })}
            </select>
            :
            <select value={newData.status} onChange={e => {
              setNewData(data => {
                return {
                  ...data,
                  status: e.target.value
                }
              })
            }} className='modal-input'>
              {[0, 1, 2].map(status => {
                return (<option key={status}>{status}</option>)
              })}
            </select>
          }

        </div>
        <div className="modal-footer">
          <button className="secondary-button" onClick={handleClose}>
            Close
          </button>
          {selectedData ?
            <button className="primary-button" onClick={UpdateData}>
              Save Changes
            </button>
            :
            <button className="primary-button" onClick={AddData}>
              Create Data
            </button>
          }
        </div>
      </div>
    </Modal>
  )
}

export default AppModal
