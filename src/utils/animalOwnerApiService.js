import axios from "axios";

const baseURl = "https://vetkonect.com/backend/public/api/web/v2";

// Farm

const addFarm = (payload) => {
  return axios
    .post(
      `${baseURl}/addFarm`, payload
    )
};
const deleteFarm = (payload) => {
  return axios
    .post(
      `${baseURl}/deleteFarm`, payload
    )
};

const getFarm = (payload) => {
  return axios
    .post(`${baseURl}/getFarm`, payload)
};

const getOneFarm = (payload) => {
  return axios
    .post(`${baseURl}/getOneFarm`, payload)
};

//   Pets

const addPet = (payload) => {
  return axios
    .post(
      `${baseURl}/addPet`, payload
    )
};

const getOnePet = (payload) => {
  // const { userId, id } = payload;
  return axios
    .post(`${baseURl}/getOnePet`, payload)
};

const getPet = (payload) => {
  return axios
    .post(`${baseURl}/getPet`, payload)
};

const deletePet = (payload) => {
  return axios
    .post(`${baseURl}/deletePet`, payload)
};

// Animal owner Activity

const getAnimalOwnerActivity = (payload) => {
  return axios
    .post(`${baseURl}/getAnimalOwnerActivity`, payload)
};

// Register Animal owner

const registerAnimalOwner1 = (payload) => {
  return axios
    .post(
      `${baseURl}/registerAnimalOwner`, payload
    )
};

const registerAnimalOwner2 = (payload) => {
  return axios
    .post(
      `${baseURl}/registerAnimalOwner`, payload
    )
};

const registerAnimalOwner3 = (payload) => {
  return axios
    .post(
      `${baseURl}/registerAnimalOwner`, payload
    )
};

export  {
  addFarm,
  deleteFarm,
  getOneFarm,
  getFarm,
  getPet,
  addPet,
  getOnePet,
  deletePet,
  getAnimalOwnerActivity,
  registerAnimalOwner1,
  registerAnimalOwner2,
  registerAnimalOwner3,
};
