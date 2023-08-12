import axios from "axios";

const baseURl = "https://vetkonect.com/backend/public/api/web/v2";

//   Pets

const addClinic = (payload) => {
  // const {
  //   userId,
  //   licenseNumber,
  //   clinicName,
  //   speciality,
  //   email,
  //   phone,
  //   location,
  //   availability,
  //   picture,
  //   clinicId,
  // } = payload;
  return axios
    .post(
      `${baseURl}/addPet`, payload
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const getOneClinic = (payload) => {
  // const { userId, id } = payload;
  return axios
    .post(`${baseURl}/getOneClinic`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const getClinic = (payload) => {
  // const { userId } = payload;
  return axios
    .post(`${baseURl}/getClinic`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const deleteClinic = (payload) => {
  // const { userId, id } = payload;
  return axios
    .post(`${baseURl}/deleteClinic`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

// Cases

const addCase = (payload) => {
  // const {
  //   userId,
  //   role,
  //   caseTitle,
  //   clientName,
  //   phone,
  //   caseType,
  //   petName,
  //   petId,
  //   specie,
  //   breed,
  //   age,
  //   sex,
  //   dateOfOccurence,
  //   history,
  //   clinicalSign,
  //   tentativeDiagnoistic,
  //   differentialDiagnosis,
  //   diseaseDiagnostic,
  //   labConfirm,
  //   motality,
  //   treatment,
  //   address,
  //   vetMobile,
  //   caseId,
  // } = payload;
  return axios
    .post(
      `${baseURl}/addCase`, payload
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const getCase = (payload) => {
  // const { userId } = payload;
  return axios
    .post(`${baseURl}/getCase`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const getOneCase = (payload) => {
  // const { userId, id } = payload;
  return axios
    .post(`${baseURl}/getOneCase`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const deleteCase = (payload) => {
  // const { userId, id } = payload;
  return axios
    .post(`${baseURl}/deleteCase`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

// Set Availabilty

const setAvailabilty = (payload) => {
  // const { availability, id } = payload;
  return axios
    .post(`${baseURl}/setAvailabilty`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};
// Veterinarian Activity

const getVeterinarianActivity = (payload) => {
  // const { role, id } = payload;
  return axios
    .post(`${baseURl}/getVeterinarianActivity`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const getVeterinarianByLocation = (payload) => {
  // const { role, id } = payload;
  return axios
    .post(`${baseURl}/getVeterinarianByLocation`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const getVeterinarianByFilter = (payload) => {
  // const { role, id } = payload;
  return axios
    .post(`${baseURl}/getVeterinarianByFilter`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

// Register Animal owner

const registerVeterinarian1 = (payload) => {
  // const { stage, email, password } = payload;
  return axios
    .post(
      `${baseURl}/registerAnimalOwner`, payload
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const registerVeterinarian2 = (payload) => {
  // const { stage, email, firstName, lastName, phone, address, vetNumber, speciality } = payload;
  return axios
    .post(
      `${baseURl}/registerVeterinarian`, payload
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const registerVeterinarian3 = (payload) => {
  // const { stage, email, code } = payload;
  return axios
    .post(
      `${baseURl}/registerVeterinarian`, payload
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
  getVeterinarianByFilter
};
