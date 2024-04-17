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
  camera: 'fhaz',
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
      if (action.name === 'date') {
        // If the action targets the 'date' field, serialize the date value
        const serializedDate = action.payload.toISOString();
        return {
          ...state,
          [action.name]: serializedDate,
        };
      } else {
        // For other fields, directly update the state without serialization
        return {
          ...state,
          [action.name]: action.payload,
        };
      }
    default:
      return state;
  }
};

export default dataReducer;
