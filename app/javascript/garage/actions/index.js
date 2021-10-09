// TODO: add and export your own actions
export const GET_CARS = 'GET_CARS';
export const GET_SINGLE_CAR = 'GET_SINGLE_CAR';
export const CAR_CREATED = 'CAR_CREATED';
export const REMOVE_CAR = 'CAR_CREATED';

// get all cars from garage
export function getCars(garage) {
  const url = `https://wagon-garage-api.herokuapp.com/${garage}/cars`;
  const promise = fetch(url).then(r => r.json());
  return {
    type: GET_CARS,
    payload: promise
  };
}

// get single car with id
export function getSingleCar(id) {
  const url = `https://wagon-garage-api.herokuapp.com/cars/${id}`;
  const promise = fetch(url).then(r => r.json());
  return {
    type: GET_SINGLE_CAR,
    payload: promise
  };
}

// adding a new car to the garage
// with callback which directs to the index page
export function postCar(garage, car, callback) {
  const url = `https://wagon-garage-api.herokuapp.com/${garage}/cars`;
  const request = fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(car)
  }).then(r => r.json())
    .then(() => callback());
  return {
    type: CAR_CREATED,
    payload: request
  };
}


// remove car from garage
// history redirects to the show page
export function removeCar(history, car) {
  const url = `https://wagon-garage-api.herokuapp.com/cars/${car.id}`;
  fetch(url, { method: 'DELETE' })
    .then(r => r.json())
    .then(() => history.push(""));
  return {
    type: REMOVE_CAR,
    payload: car
  };
}
