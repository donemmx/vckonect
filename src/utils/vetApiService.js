import axios from "axios";

const baseURl = "https://vetkonect.com/backend/public/api/web/v2";

//   Pets

const addClinic = (payload) => {
  return axios
    .post(
      `${baseURl}/addClinic`, payload
    )

};

const getOneClinic = (payload) => {
  return axios
    .post(`${baseURl}/getOneClinic`, payload)

};

const getClinic = (payload) => {
  return axios
    .post(`${baseURl}/getClinic`, payload)

};

const deleteClinic = (payload) => {
  return axios
    .post(`${baseURl}/deleteClinic`, payload)

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
};

const getOneCase = (payload) => {
  return axios
    .post(`${baseURl}/getOneCase`, payload)
};

const deleteCase = (payload) => {
  return axios
    .post(`${baseURl}/deleteCase`, payload)
};

// Set Availabilty

const setAvailabilty = (payload) => {
  return axios
    .post(`${baseURl}/setAvailabilty`, payload)

};
// Veterinarian Activity

const getVeterinarianActivity = (payload) => {
  return axios
    .post(`${baseURl}/getVeterinarianActivity`, payload)
};

const getVeterinarianByLocation = (payload) => {
  return axios
    .post(`${baseURl}/getVeterinarianByLocation`, payload)
   
};

const getVeterinarianByFilter = (payload) => {
  return axios
    .post(`${baseURl}/getVeterinarianByFilter`, payload)

};

// Register Animal owner

const registerVeterinarian1 = (payload) => {
  return axios
    .post(
      `${baseURl}/registerVeterinarian`, payload
    )

};

const registerVeterinarian2 = (payload) => {
  return axios
    .post(
      `${baseURl}/registerVeterinarian`, payload
    )

};

const registerVeterinarian3 = (payload) => {
  return axios
    .post(
      `${baseURl}/registerVeterinarian`, payload
    )

};

const vetPlan = (payload) => {
  return axios
    .post(
      `${baseURl}/vetPlan`, payload
    )

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
