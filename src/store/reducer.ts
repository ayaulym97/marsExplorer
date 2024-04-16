import {SET_PHOTOS, SET_VALUE} from './types';

interface State {
  camera: any;
  date: any;
  data: any;
  loading: boolean;
  error: string | null;
  selectedId: any;
  selectedLink: string | any;
}

const initialState: State = {
  camera: null,
  date: new Date(),
  data: null,
  loading: false,
  error: null,
  selectedId: null,
  selectedLink: null,
};

const dataReducer = (state = initialState, action: any): State => {
  switch (action.type) {
    case SET_PHOTOS:
      return {
        ...state,
        data: action.payload,
      };
    case SET_VALUE:
      const serializedDate = state.date.toISOString();
      var payload = action.payload;
      if (action.name === 'date') {
        payload = serializedDate;
      }
      return {
        ...state,
        [action.name]: payload,
      };
    default:
      return state;
  }
};

export default dataReducer;
