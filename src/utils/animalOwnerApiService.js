import axios from "axios";

const baseURl = "https://vetkonect.com/backend/public/api/web/v2";

// Farm

const addFarm = (payload) => {
  return axios
    .post(
      `${baseURl}/addFarm`, payload
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const getFarm = (payload) => {
  // const { userId, id } = payload;
  return axios
    .post(`${baseURl}/getFarm`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const getOneFarm = (payload) => {
  // const { userId, id } = payload;
  return axios
    .post(`${baseURl}/getOneFarm`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

//   Pets

const addPet = (payload) => {
  // const { userId, petName, specie, breed, sex, age } = payload;
  return axios
    .post(
      `${baseURl}/addPet`, payload
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const getOnePet = (payload) => {
  // const { userId, id } = payload;
  return axios
    .post(`${baseURl}/getOnePet`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const getPet = (payload) => {
  // const { userId, id } = payload;
  return axios
    .post(`${baseURl}/getOnePet`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const deletePet = (payload) => {
  // const { userId, id } = payload;
  return axios
    .post(`${baseURl}/deletePet`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

// Animal owner Activity

const getAnimalOwnerActivity = (payload) => {
  // const { role, id } = payload;
  return axios
    .post(`${baseURl}/getAnimalOwnerActivity`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

// Register Animal owner

const registerAnimalOwner1 = (payload) => {
  // const { stage, email, password } = payload;
  return axios
    .post(
      `${baseURl}/registerAnimalOwner`, payload
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const registerAnimalOwner2 = (payload) => {
  // const { stage, email, firstName, lastName, phone, address } = payload;
  return axios
    .post(
      `${baseURl}/registerAnimalOwner`, payload
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const registerAnimalOwner3 = (payload) => {
  // const { stage, email, code } = payload;
  return axios
    .post(
      `${baseURl}/registerAnimalOwner`, payload
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export  {
  addFarm,
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
