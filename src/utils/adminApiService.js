import axios from "axios";

const baseURl = "https://vetkonect.com/backend/public/api/web/v2";

//   Admin

const activatePromotion = (payload) => {
  // const { userId, role } = payload;
  return axios
    .post(`${baseURl}/activatePromotion`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const deactivatePromotion = (payload) => {
  // const { userId, role } = payload;
  return axios
    .post(`${baseURl}/deactivatePromotion`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const activateAccount = (payload) => {
  // const { id, role } = payload;
  return axios
    .post(`${baseURl}/activateAccount`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const deactivateAccount = (payload) => {
  // const { id, role } = payload;
  return axios
    .post(`${baseURl}/deactivateAccount`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const verifyLicenseNumber = (payload) => {
  // const { id, userId } = payload;
  return axios
    .post(`${baseURl}/deactivateAccount`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

// Get User

const adminGetAnimalOwner = (payload) => {
  // const { name } = payload;
  return axios
    .post(`${baseURl}/adminGetAnimalOwner`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const adminGetVeterinarian = (payload) => {
  // const { name } = payload;
  return axios
    .post(`${baseURl}/adminGetVeterinarian`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const adminGetClinic = (payload) => {
  // const { name } = payload;
  return axios
    .post(`${baseURl}/adminGetClinic`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};


const adminGetFarm = (payload) => {
  // const { name } = payload;
  return axios
    .post(`${baseURl}/adminGetFarm`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const adminGetPet = (payload) => {
  // const { name } = payload;
  return axios
    .post(`${baseURl}/adminGetPet`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const adminGetProduct = (payload) => {
  // const { name } = payload;
  return axios
    .post(`${baseURl}/adminGetProduct`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const adminGetPromotion = (payload) => {
  // const { name } = payload;
  return axios
    .post(`${baseURl}/adminGetPromotion`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const adminGetSubscription = (payload) => {
  // const { name } = payload;
  return axios
    .post(`${baseURl}/adminGetSubscription`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};


const usersCounter = () => {
  return axios
    .get(`${baseURl}/usersCounter`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};
// Admin Activity

const getAdminActivity = (payload) => {
  // const { id } = payload;
  return axios
    .post(`${baseURl}/getAdminActivity`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

// Admin Auth


const updateAdminProfile = (payload) => {
  // const { id, email, firstName, lastName, phone, location, password, newPassword, picture } = payload;
  return axios
    .post(
      `${baseURl}/registerVeterinarian`, payload
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const adminLogin = (payload) => {
  // const { id, password } = payload;
  return axios
    .post(
      `${baseURl}/adminLogin`, payload
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const approveForumChat = (payload) => {
  // const { forumChatId, role, userId } = payload;
  return axios
    .post(
      `${baseURl}/approveForumChat`, payload
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const rejectForumChat = (payload) => {
  // const { reason ,forumChatId, role, userId } = payload;
  return axios
    .post(
      `${baseURl}/rejectForumChat`, payload
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export {
  adminLogin,
  updateAdminProfile,
  adminGetAnimalOwner,
  adminGetFarm,
  adminGetProduct,
  adminGetPet,
  adminGetSubscription,
  adminGetPromotion,
  getAdminActivity,
  usersCounter,
  rejectForumChat,
  approveForumChat,
  activateAccount,
  adminGetClinic,
  adminGetVeterinarian,
  activatePromotion,
  deactivatePromotion,
  deactivateAccount,
  verifyLicenseNumber
};
