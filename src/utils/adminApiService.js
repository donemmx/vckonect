import axios from "axios";

const baseURl = "https://vetkonect.com/backend/public/api/web/v2";

//   Admin

const activatePromotion = (payload) => {
  return axios
    .post(`${baseURl}/activatePromotion`, payload)
};

const deactivatePromotion = (payload) => {
  return axios
    .post(`${baseURl}/deactivatePromotion`, payload)
};

const activateAccount = (payload) => {
  return axios
    .post(`${baseURl}/activateAccount`, payload)
};

const deactivateAccount = (payload) => {
  return axios
    .post(`${baseURl}/deactivateAccount`, payload)
};

const verifyLicenseNumber = (payload) => {
  return axios
    .post(`${baseURl}/deactivateAccount`, payload)
};

// Get User

const adminGetAnimalOwner = (payload) => {
  return axios
    .post(`${baseURl}/adminGetAnimalOwner`, payload)
};

const adminGetVeterinarian = (payload) => {
  return axios
    .post(`${baseURl}/adminGetVeterinarian`, payload)
};

const adminGetClinic = (payload) => {
  return axios
    .post(`${baseURl}/adminGetClinic`, payload)
};

const adminGetFarm = (payload) => {
  return axios
    .post(`${baseURl}/adminGetFarm`, payload)
};

const adminGetPet = (payload) => {
  return axios
    .post(`${baseURl}/adminGetPet`, payload)
};

const adminGetProduct = (payload) => {
  return axios
    .post(`${baseURl}/adminGetProduct`, payload)
};

const adminGetPromotion = (payload) => {
  return axios
    .post(`${baseURl}/adminGetPromotion`, payload)

};
const getPromotionPlan = (payload) => {
  return axios
    .get(`${baseURl}/getPromotionPlan`, payload)

};
const adminGetPromotionPlan = (payload) => {
  return axios
    .get(`${baseURl}/adminGetPromotionPlan`, payload)

};

const addPromotionPlan = (payload) => {
  return axios
    .post(`${baseURl}/addPromotionPlan`, payload)

};
const deleteUserPromotionPlan = (payload) => {
  return axios
    .post(`${baseURl}/deleteUserPromotionPlan`, payload)

};

const addSubscriptionPlan = (payload) => {
  return axios
    .post(`${baseURl}/addSubscriptionPlan`, payload)

};
const adminGetSubscription = (payload) => {
  return axios
    .post(`${baseURl}/adminGetSubscription`, payload)

};
const getSubscriptionPlan = (payload) => {
  return axios
    .get(`${baseURl}/getSubscriptionPlan`, payload)

};
const adminGetSubscriptionPlan = (payload) => {
  return axios
    .get(`${baseURl}/adminGetSubscriptionPlan`, payload)

};
const deleteSubscriptionPlan = (payload) => {
  return axios
    .get(`${baseURl}/deleteSubscriptionPlan`, payload)

};

const getAdminActivityByFilter = (payload) => {
  return axios
    .post(`${baseURl}/getAdminActivityByFilter`, payload)

};

const usersCounter = () => {
  return axios
    .get(`${baseURl}/usersCounter`)

};
// Admin Activity

const getAdminActivity = (payload) => {
  // const { id } = payload;
  return axios
    .post(`${baseURl}/getAdminActivity`, payload)

};

// Admin Auth

const updateAdminProfile = (payload) => {
  return axios
    .post(`${baseURl}/updateAdminProfile`, payload)

};

const adminLogin = (payload) => {
  return axios
    .post(`${baseURl}/adminLogin`, payload)

};

const approveForumChat = (payload) => {
  return axios
    .post(`${baseURl}/approveForumChat`, payload)

};

const rejectForumChat = (payload) => {
  return axios
    .post(`${baseURl}/rejectForumChat`, payload)

};
const verifyVetNumber = (payload) => {
  return axios
    .post(`${baseURl}/verifyVetNumber`, payload)

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
