import axios from "axios";

const baseURl = "https://vetkonect.com/backend/public/api/web/v2/";

//   Pets

const addClinic = (payload) => {
  const {
    userId,
    licenseNumber,
    clinicName,
    speciality,
    email,
    phone,
    location,
    availability,
    picture,
    clinicId,
  } = payload;
  return axios
    .post(
      `${baseURl}/addPet?user_id=${userId}&license_number=${licenseNumber}&clinic_name=${clinicName}&clinic_speciality=${speciality}&email=${email}&phone_number=${phone}&location=${location}&availability=${availability}&picture=${picture}&clinic_id=${clinicId}`
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const getOneClinic = (payload) => {
  const { userId, id } = payload;
  return axios
    .post(`${baseURl}/getOneClinic?user_id=${userId}&id=${id}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const getClinic = (payload) => {
  const { userId } = payload;
  return axios
    .post(`${baseURl}/getClinic?user_id=${userId}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const deleteClinic = (payload) => {
  const { userId, id } = payload;
  return axios
    .post(`${baseURl}/deleteClinic?user_id=${userId}&id=${id}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

// Cases

const addCase = (payload) => {
  const {
    userId,
    role,
    caseTitle,
    clientName,
    phone,
    caseType,
    petName,
    petId,
    specie,
    breed,
    age,
    sex,
    dateOfOccurence,
    history,
    clinicalSign,
    tentativeDiagnoistic,
    differentialDiagnosis,
    diseaseDiagnostic,
    labConfirm,
    motality,
    treatment,
    address,
    vetMobile,
    caseId,
  } = payload;
  return axios
    .post(
      `${baseURl}/addCase?user_id=${userId}&role=${role}&case_title=${caseTitle}&client_name=${clientName}&client_phone=${phone}&case_type=${caseType}&pet_name=${petName}&pet_id=${petId}&specie=${specie}&breed=${breed}&age=${age}&sex=${sex}&date_of_occurence=${dateOfOccurence}&history=${history}&clinical_sign=${clinicalSign}&tentative_diagnoistic=${tentativeDiagnoistic}&differential_diagnosis=${differentialDiagnosis}&disease_diagnostic=${diseaseDiagnostic}&lab_confirm=${labConfirm}&motality=${motality}&treatment_regiment=${treatment}&clinic_physical_address=${address}&mobile_veterinarian=${vetMobile}&case_id=${caseId}`
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const getCase = (payload) => {
  const { userId } = payload;
  return axios
    .post(`${baseURl}/getCase?user_id=${userId}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const getOneCase = (payload) => {
  const { userId, id } = payload;
  return axios
    .post(`${baseURl}/getOneCase?user_id=${userId}&id=${id}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const deleteCase = (payload) => {
  const { userId, id } = payload;
  return axios
    .post(`${baseURl}/deleteCase?user_id=${userId}&id=${id}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

// Set Availabilty

const setAvailabilty = (payload) => {
  const { availability, id } = payload;
  return axios
    .post(`${baseURl}/setAvailabilty?id=${id}&availability=${availability}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};
// Veterinarian Activity

const getVeterinarianActivity = (payload) => {
  const { role, id } = payload;
  return axios
    .post(`${baseURl}/getVeterinarianActivity?id=${id}&role=${role}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

// Register Animal owner

const registerVeterinarian1 = (payload) => {
  const { stage, email, password } = payload;
  return axios
    .post(
      `${baseURl}/registerAnimalOwner?stage=${stage}&email=${email}&password=${password}`
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const registerVeterinarian2 = (payload) => {
  const { stage, email, firstName, lastName, phone, address, vetNumber, speciality } = payload;
  return axios
    .post(
      `${baseURl}/registerVeterinarian?stage=${stage}&email=${email}&first_name=${firstName}&last_name=${lastName}&phone_number=${phone}&address=${address}&vet_number=${vetNumber}&speciality=${speciality}`
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const registerVeterinarian3 = (payload) => {
  const { stage, email, code } = payload;
  return axios
    .post(
      `${baseURl}/registerVeterinarian?stage=${stage}&email=${email}&activation_code=${code}`
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
  registerVeterinarian3
};
