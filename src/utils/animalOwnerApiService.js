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
  // const { userId, id } = payload;
  return axios
    .post(`${baseURl}/getFarm`, payload)
};

const getOneFarm = (payload) => {
  // const { userId, id } = payload;
  return axios
    .post(`${baseURl}/getOneFarm`, payload)
};

//   Pets

const addPet = (payload) => {
  // const { userId, petName, specie, breed, sex, age } = payload;
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
  // const { userId, id } = payload;
  return axios
    .post(`${baseURl}/getPet`, payload)
};

const deletePet = (payload) => {
  // const { userId, id } = payload;
  return axios
    .post(`${baseURl}/deletePet`, payload)
};

// Animal owner Activity

const getAnimalOwnerActivity = (payload) => {
  // const { role, id } = payload;
  return axios
    .post(`${baseURl}/getAnimalOwnerActivity`, payload)
};

// Register Animal owner

const registerAnimalOwner1 = (payload) => {
  // const { stage, email, password } = payload;
  return axios
    .post(
      `${baseURl}/registerAnimalOwner`, payload
    )
};

const registerAnimalOwner2 = (payload) => {
  // const { stage, email, firstName, lastName, phone, address } = payload;
  return axios
    .post(
      `${baseURl}/registerAnimalOwner`, payload
    )
};

const registerAnimalOwner3 = (payload) => {
  // const { stage, email, code } = payload;
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
