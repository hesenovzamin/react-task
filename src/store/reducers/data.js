import { SET_DATA, GET_DATA, ADD_DATA, DELETE_DATA, UPDATE_DATA, FILTER_DATA } from '../actions/data';

const initialState = {
  data: [],
  currentData: [],
};


export default (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA:

      return {
        data: action.data,
        currentData: action.data,
      };
    case GET_DATA:
      return state;
    case DELETE_DATA:
      return {
        ...state,
        data: action.data
      };
    case ADD_DATA:
      console.log(action.data, 21324243)
      return {
        ...state,
        data: action.data
      };
    case UPDATE_DATA:
      return {
        ...state,
        data: action.data
      };
    case FILTER_DATA:
      return {
        ...state,
        currentData: action.currentData
      };
    default:
      return state;
  }
};