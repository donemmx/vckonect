import axios from "axios";

const baseURl = "https://vetkonect.com/backend/public/api/web/v2/";

// Farm

const addFarm = (payload) => {
  const {
    userId,
    farmName,
    location,
    workers,
    livestockType,
    livestock,
    age,
    sex,
    farmId,
  } = payload;
  return axios
    .post(
      `${baseURl}/getFarm?user_id=${userId}&farm_name=${farmName}&location=${location}&no_of_worker=${workers}&livestock_type=${livestockType}&no_of_livestock=${livestock}&age=${age}&sex=${sex}&farm_id=${farmId}`
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const getFarm = (payload) => {
  const { userId, id } = payload;
  return axios
    .post(`${baseURl}/getFarm?user_id=${userId}&id=${id}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const getOneFarm = (payload) => {
  const { userId, id } = payload;
  return axios
    .post(`${baseURl}/getOneFarm?user_id=${userId}&id=${id}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

//   Pets

const addPet = (payload) => {
  const { userId, petName, specie, breed, sex, age } = payload;
  return axios
    .post(
      `${baseURl}/addPet?user_id=${userId}&pet_name=${petName}&specie=${specie}&breed=${breed}&sex=${sex}&age=${age}`
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const getOnePet = (payload) => {
  const { userId, id } = payload;
  return axios
    .post(`${baseURl}/getOnePet?user_id=${userId}&id=${id}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const getPet = (payload) => {
  const { userId, id } = payload;
  return axios
    .post(`${baseURl}/getOnePet?user_id=${userId}&id=${id}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const deletePet = (payload) => {
  const { userId, id } = payload;
  return axios
    .post(`${baseURl}/deletePet?user_id=${userId}&id=${id}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

// Animal owner Activity

const getAnimalOwnerActivity = (payload) => {
  const { role, id } = payload;
  return axios
    .post(`${baseURl}/getAnimalOwnerActivity?id=${id}&role=${role}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

// Register Animal owner

const registerAnimalOwner1 = (payload) => {
  const { stage, email, password } = payload;
  return axios
    .post(
      `${baseURl}/registerAnimalOwner?stage=${stage}&email=${email}&password=${password}`
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const registerAnimalOwner2 = (payload) => {
  const { stage, email, firstName, lastName, phone, address } = payload;
  return axios
    .post(
      `${baseURl}/registerAnimalOwner?stage=${stage}&email=${email}&first_name=${firstName}&last_name=${lastName}&phone_number=${phone}&address=${address}`
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const registerAnimalOwner3 = (payload) => {
  const { stage, email, code } = payload;
  return axios
    .post(
      `${baseURl}/registerAnimalOwner?stage=${stage}&email=${email}&activation_code=${code}`
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export {
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
