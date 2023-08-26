import axios from "axios";

const baseURl = "https://vetkonect.com/backend/public/api/web/v2";

//   Pets

const addClinic = (payload) => {
  return axios
    .post(
      `${baseURl}/addPet`, payload
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const getOneClinic = (payload) => {
  return axios
    .post(`${baseURl}/getOneClinic`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const getClinic = (payload) => {
  return axios
    .post(`${baseURl}/getClinic`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const deleteClinic = (payload) => {
  return axios
    .post(`${baseURl}/deleteClinic`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

// Cases

const addCase = (payload) => {
  return axios
    .post(
      `${baseURl}/addCase`, payload
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const getCase = (payload) => {
  return axios
    .post(`${baseURl}/getCase`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const getOneCase = (payload) => {
  return axios
    .post(`${baseURl}/getOneCase`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const deleteCase = (payload) => {
  return axios
    .post(`${baseURl}/deleteCase`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

// Set Availabilty

const setAvailabilty = (payload) => {
  return axios
    .post(`${baseURl}/setAvailabilty`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};
// Veterinarian Activity

const getVeterinarianActivity = (payload) => {
  return axios
    .post(`${baseURl}/getVeterinarianActivity`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const getVeterinarianByLocation = (payload) => {
  return axios
    .post(`${baseURl}/getVeterinarianByLocation`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const getVeterinarianByFilter = (payload) => {
  return axios
    .post(`${baseURl}/getVeterinarianByFilter`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

// Register Animal owner

const registerVeterinarian1 = (payload) => {
  return axios
    .post(
      `${baseURl}/registerVeterinarian`, payload
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const registerVeterinarian2 = (payload) => {
  return axios
    .post(
      `${baseURl}/registerVeterinarian`, payload
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const registerVeterinarian3 = (payload) => {
  return axios
    .post(
      `${baseURl}/registerVeterinarian`, payload
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const vetPlan = (payload) => {
  return axios
    .post(
      `${baseURl}/vetPlan`, payload
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export {
  addClinic,
  getOneCase,
  getCase,
  getOneClinic,
  getClinic,
  deleteCase,
  deleteClinic,
  addCase,
  setAvailabilty,
  getVeterinarianActivity,
  registerVeterinarian1,
  registerVeterinarian2,
  registerVeterinarian3,
  getVeterinarianByLocation,
  getVeterinarianByFilter,
  vetPlan
};
