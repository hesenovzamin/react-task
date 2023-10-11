import React, { useState } from 'react'
import Modal from "react-overlays/Modal";
import { useDispatch } from 'react-redux'
import * as datatAction from '../store/actions/data';
import '../App.css';

function AppModal({ setLoading, showModal, setUpdatelen, setLen, setUpdatestatus, setStatus, selectedData, Updatelen, len, Updatestatus, status, storage, setShowModal, setSelectedData }) {


  const dispatch = useDispatch();

  const AddData = async () => {

    let maxId = Math.max(...storage.map(o => o.id)) + 1
    let NewData = { id: maxId, len: len, status: status }
    setLoading(false)
    await dispatch(datatAction.addData(NewData))
    setLoading(true)
    setShowModal(false)

  };

  const UpdateData = async () => {
    let CurrentUpdateData = selectedData
    CurrentUpdateData.status = Updatestatus
    CurrentUpdateData.len = Updatelen
    setLoading(false)
    await dispatch(datatAction.editData(CurrentUpdateData))
    setLoading(true)
    setShowModal(false)
  }

  const handleClose = () => {

    setLen(0);
    setStatus(0);
    setUpdatelen(0);
    setUpdatestatus(0)
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
            <input className='modal-input' type='number' value={Updatelen} onChange={e => setUpdatelen(e.target.value)} />
            :
            <input className='modal-input' type='number' value={len} onChange={e => setLen(e.target.value)} />
          }
          <p className='modal-p'>Select Status</p>
          {selectedData ?
            <select value={data} onChange={e => {
              setUpdatestatus(e.target.value)
              // setData(data => {
              //   return {
              //     ...data,
              //     status: e.target.value
              //   }
              // })
            }} className='modal-input'>
              {[0, 1, 2].map(status => {
                return (<option key={status}>{status}</option>)
              })}
              <option>0</option>
              <option>1</option>
              <option>2</option>
            </select>
            :
            <select value={status} onChange={e => setStatus(e.target.value)} className='modal-input'>
              <option>0</option>
              <option>1</option>
              <option>2</option>
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
import React, { useState } from 'react'
import Modal from "react-overlays/Modal";
import { useDispatch } from 'react-redux'
import * as datatAction from '../store/actions/data';
import '../App.css';

function AppModal({ setLoading, showModal, setUpdatelen, setLen, setUpdatestatus, setStatus, selectedData, Updatelen, len, Updatestatus, status, storage, setShowModal, setSelectedData }) {


  const dispatch = useDispatch();

  const AddData = async () => {

    let maxId = Math.max(...storage.map(o => o.id)) + 1
    let NewData = { id: maxId, len: len, status: status }
    setLoading(false)
    await dispatch(datatAction.addData(NewData))
    setLoading(true)
    setShowModal(false)

  };

  const UpdateData = async () => {
    let CurrentUpdateData = selectedData
    CurrentUpdateData.status = Updatestatus
    CurrentUpdateData.len = Updatelen
    setLoading(false)
    await dispatch(datatAction.editData(CurrentUpdateData))
    setLoading(true)
    setShowModal(false)
  }

  const handleClose = () => {

    setLen(0);
    setStatus(0);
    setUpdatelen(0);
    setUpdatestatus(0)
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
            <input className='modal-input' type='number' value={Updatelen} onChange={e => setUpdatelen(e.target.value)} />
            :
            <input className='modal-input' type='number' value={len} onChange={e => setLen(e.target.value)} />
          }
          <p className='modal-p'>Select Status</p>
          {selectedData ?
            <select value={data} onChange={e => {
              setUpdatestatus(e.target.value)
              // setData(data => {
              //   return {
              //     ...data,
              //     status: e.target.value
              //   }
              // })
            }} className='modal-input'>
              {[0, 1, 2].map(status => {
                return (<option key={status}>{status}</option>)
              })}
              <option>0</option>
              <option>1</option>
              <option>2</option>
            </select>
            :
            <select value={status} onChange={e => setStatus(e.target.value)} className='modal-input'>
              <option>0</option>
              <option>1</option>
              <option>2</option>
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
