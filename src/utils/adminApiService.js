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
  return axios
    .post(`${baseURl}/adminGetAnimalOwner`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const adminGetVeterinarian = (payload) => {
  return axios
    .post(`${baseURl}/adminGetVeterinarian`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const adminGetClinic = (payload) => {
  return axios
    .post(`${baseURl}/adminGetClinic`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const adminGetFarm = (payload) => {
  return axios
    .post(`${baseURl}/adminGetFarm`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const adminGetPet = (payload) => {
  return axios
    .post(`${baseURl}/adminGetPet`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const adminGetProduct = (payload) => {
  return axios
    .post(`${baseURl}/adminGetProduct`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const adminGetPromotion = (payload) => {
  return axios
    .post(`${baseURl}/adminGetPromotion`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};
const getPromotionPlan = (payload) => {
  return axios
    .get(`${baseURl}/getPromotionPlan`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};
const adminGetPromotionPlan = (payload) => {
  return axios
    .get(`${baseURl}/adminGetPromotionPlan`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const addPromotionPlan = (payload) => {
  return axios
    .post(`${baseURl}/addPromotionPlan`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};
const deleteUserPromotionPlan = (payload) => {
  return axios
    .post(`${baseURl}/deleteUserPromotionPlan`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const addSubscriptionPlan = (payload) => {
  return axios
    .post(`${baseURl}/addSubscriptionPlan`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};
const adminGetSubscription = (payload) => {
  return axios
    .post(`${baseURl}/adminGetSubscription`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};
const getSubscriptionPlan = (payload) => {
  return axios
    .get(`${baseURl}/getSubscriptionPlan`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};
const adminGetSubscriptionPlan = (payload) => {
  return axios
    .get(`${baseURl}/adminGetSubscriptionPlan`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};
const deleteSubscriptionPlan = (payload) => {
  return axios
    .get(`${baseURl}/deleteSubscriptionPlan`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const getAdminActivityByFilter = (payload) => {
  return axios
    .post(`${baseURl}/getAdminActivityByFilter`, payload)
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
  return axios
    .post(`${baseURl}/updateAdminProfile`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const adminLogin = (payload) => {
  return axios
    .post(`${baseURl}/adminLogin`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const approveForumChat = (payload) => {
  return axios
    .post(`${baseURl}/approveForumChat`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const rejectForumChat = (payload) => {
  return axios
    .post(`${baseURl}/rejectForumChat`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};
const verifyVetNumber = (payload) => {
  return axios
    .post(`${baseURl}/verifyVetNumber`, payload)
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
  addSubscriptionPlan,
  usersCounter,
  rejectForumChat,
  approveForumChat,
  activateAccount,
  adminGetClinic,
  adminGetVeterinarian,
  activatePromotion,
  deactivatePromotion,
  deactivateAccount,
  verifyLicenseNumber,
  getAdminActivityByFilter,
  addPromotionPlan,
  getSubscriptionPlan,
  adminGetSubscriptionPlan,
  getPromotionPlan,
  deleteSubscriptionPlan,
  deleteUserPromotionPlan,
  adminGetPromotionPlan,
  verifyVetNumber,
};
