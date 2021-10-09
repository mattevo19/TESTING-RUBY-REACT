import { GET_CARS, GET_SINGLE_CAR } from "../actions";

export default function (state = [], action) {
  switch (action.type) {
    case GET_CARS: {
      return action.payload;
    }
    // returned in array as GET_CARS returns the results in array
    // meaning they all have to be return the same otherwise it breaks
    case GET_SINGLE_CAR: {
      return [action.payload];
    }
    default:
      return state;
  }
}
