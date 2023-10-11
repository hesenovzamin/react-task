export const SET_DATA = 'SET_DATA';
export const GET_DATA = 'GET_DATA';
export const ADD_DATA = 'ADD_DATA';
export const DELETE_DATA = 'DELETE_DATA';
export const UPDATE_DATA = 'UPDATE_DATA';
export const FILTER_DATA = 'FILTER_DATA';


export const fetchData = (data) => {
  return async (dispatch, getState) => {

    dispatch({
      type: SET_DATA,
      data: data,
    });

  };
};

export const addData = (NewData) => {
  return async (dispatch, getState) => {
    let state = getState()
    let storage = state.data.data
    storage.push(NewData);
    console.log(storage, 2323)
    dispatch({
      type: ADD_DATA,
      data: storage.sort((a, b) => b.id - a.id)
    });

  };
};
export const editData = (UpdatedData) => {
  return async (dispatch, getState) => {
    let state = getState()
    let storage = state.data.data
    let itemIndex = storage.findIndex(x => x.id === UpdatedData.id)
    storage[itemIndex] = UpdatedData
    dispatch({
      type: UPDATE_DATA,
      data: storage
    });

  };
};


export const deleteData = (rowData) => {
  return async (dispatch, getState) => {
    let state = getState()
    const result = state.data.data.filter((item) => item.id !== rowData.id);
    dispatch({
      type: SET_DATA,
      data: result,
    });

  };
};

export const filterData = (current_data) => {
  return async (dispatch, getState) => {
    dispatch({
      type: FILTER_DATA,
      currentData: current_data,
    });

  };
};