import axios from "axios";

const baseURl = "https://vetkonect.com/backend/public/api/web/v2";
const publicBaseURl = "https://vetkonect.com/backend/public/api";

// Auth

const login = (payload) => {
  return axios
    .post(`${baseURl}/login`, payload)
};

const resetPassword = (payload) => {
  return axios
    .post(`${baseURl}/resetPassword`, payload)
};

const confirmResetPasswordCode = (payload) => {
  return axios
    .post(`${baseURl}/confirmResetPasswordCode`, payload)

};

const changePassword = (payload) => {
  return axios
    .post(`${baseURl}/changePassword`, payload)

};

const updateUserProfile = (payload) => {
  return axios
    .post(`${baseURl}/updateUserProfile`, payload)

};

const OtpResend = (payload) => {
  return axios
    .post(`${baseURl}/resendOtp`, payload)

};

const getClient = (payload) => {
  return axios
    .post(`${baseURl}/getClient`, payload)

};

const googleCallback = (token) => {
  const data = axios.get(`${publicBaseURl}/google/callback?token=${token}`);
  return data;
};

const linkedInCallback = () => {
  return axios.get(`${publicBaseURl}/linkedin/callback`);
};

// Store
const addStore = (payload) => {
  // const { role, userId, phone, email, id, location, picture, availability } =
  //   payload;
  return axios
    .post(`${baseURl}/addStore`, payload)

};

const getStoreByFilter = (payload) => {
  return axios
    .post(`${baseURl}/getStoreByFilter`, payload)

};

const getOneStore = (id) => {
  return axios
    .post(`${baseURl}/getOneStore`, id)

};

const getStore = (payload) => {
  return axios
    .post(`${baseURl}/getStore`, payload)

};

const deleteStore = (payload) => {
  return axios
    .post(`${baseURl}/deleteStore`, payload)

};

const addProduct = (payload) => {
  return axios
    .post(`${baseURl}/addProduct`, payload)

};

// Clinic

const getClinicByFilter = (payload) => {
  return axios
    .post(`${baseURl}/getClinicByFilter`, payload)

};

// Forum

const getOneForumChat = (id) => {
  return axios
    .post(`${baseURl}/getOneForumChat`, id)

};

const deleteresponseForumChat = (payload) => {
  return axios
    .post(`${baseURl}/deleteresponseForumChat`, payload)

};

const replyForumChatComment = (payload) => {
  // const { role, id, commentId, response, responseId } = payload;
  return axios
    .post(`${baseURl}/replyForumChatComment`, payload)

};

const deleteForumChat = (payload) => {
  // const { role, id, forumChatId } = payload;
  return axios
    .post(`${baseURl}/deleteForumChat`, payload)

};

const deleteForumChatComment = (payload) => {
  // const { role, id, forumChatId, commentId } = payload;
  return axios
    .post(`${baseURl}/deleteForumChatComment`, payload)

};

const commentForumChat = (payload) => {
  // const { role, id, forumChatId, comment } = payload;
  return axios
    .post(`${baseURl}/commentForumChat`, payload)

};

const likeForumChat = (payload) => {
  // const { role, id, forumChatId } = payload;
  return axios
    .post(`${baseURl}/likeForumChat`, payload)

};

const shareForumChat = (payload) => {
  // const { role, id, forumChatId } = payload;
  return axios
    .post(`${baseURl}/shareForumChat`, payload)

};

const createForumChat = (payload) => {
  // const { role, id, title, content, picture } = payload;
  return axios
    .post(`${baseURl}/createForumChat`, payload)

};

const getForumChat = () => {
  return axios
    .get(`${baseURl}/getForumChat`)

};

const getForumChatByFilter = (payload) => {
  return axios
    .post(`${baseURl}/getForumChatByFilter`, payload)

};

// Subscription

const getSubscriptionPlan = () => {
  return axios
    .get(`${baseURl}/getSubscriptionPlan`)

};

// Messaging

const viewDirectMessage = (payload) => {
  return axios
    .post(`${baseURl}/viewDirectMessage`, payload)

};

const getMyPromotionPlan = (payload) => {
  return axios
    .post(`${baseURl}/getMyPromotionPlan`, payload)

};

const getDirectMessage = (payload) => {
  return axios
    .post(`${baseURl}/getDirectMessage`, payload)

};

const directMessage = (payload) => {
  return axios
    .post(`${baseURl}/directMessage`, payload)

};

// Notification

const getOneNotification = (payload) => {
  // const { userId, id } = payload;
  return axios
    .post(`${baseURl}/getOneNotification`, payload)

};

const getNotification = (payload) => {
  // const { userId, role } = payload;
  return axios
    .post(`${baseURl}/getNotification`, payload)

};

// Client

const addClient = (payload) => {
  // const { userId, role, moduleType, clientId } = payload;
  return axios
    .post(`${baseURl}/addClient`, payload)

};

const deleteClient = (payload) => {
  // const { userId, id, clientId } = payload;
  return axios
    .post(`${baseURl}/deleteClient`, payload)

};
const getLivestockDiseases = async (payload) => {
  // const { userId, id, clientId } = payload;
  return await axios
    .post(`${baseURl}/getLivestockDiseases`, payload)

};

const diseasePredictor = async (payload) => {
  // const { userId, id, clientId } = payload;
  return await axios
    .post(`${baseURl}/diseasePredictor`, payload)

};

const feedCalculator = async (payload) => {
  return await axios
    .post(`${baseURl}/feedCalculator`, payload)

};

const getUserById = async (payload) => {
  return await axios
    .post(`${baseURl}/getUserById`, payload)

};

const getPromotionPlan = async () => {
  return await axios
    .get(`${baseURl}/getPromotionPlan`)

};

const subscribePromotionPlan = async (payload) => {
  return await axios
    .post(`${baseURl}/subscribePromotionPlan`, payload)

};

const getPromotion = async (payload) => {
  return await axios
    .post(`${baseURl}/getPromotion`, payload)

};
const deleteProduct = async (payload) => {
  return await axios
    .post(`${baseURl}/deleteProduct`, payload)

};
const getUserProduct = async (payload) => {
  return await axios
    .post(`${baseURl}/getUserProduct`, payload)

};
const addPromotion = async (payload) => {
  return await axios
    .post(`${baseURl}/addPromotion`, payload)

};
const deletePromotion = async (payload) => {
  return await axios
    .post(`${baseURl}/deletePromotion`, payload)

};
const getFarmByFilter = async (payload) => {
  return await axios
    .post(`${baseURl}/getFarmByFilter`, payload)

};
const getPetByFilter = async (payload) => {
  return await axios
    .post(`${baseURl}/getPetByFilter`, payload)

};
const rate = async (payload) => {
  return await axios
    .post(`${baseURl}/rate`, payload)

};

export {
  login,
  googleCallback,
  linkedInCallback,
  getStoreByFilter,
  getClinicByFilter,
  deleteStore,
  getOneStore,
  getStore,
  addProduct,
  addStore,
  getOneForumChat,
  getForumChat,
  deleteresponseForumChat,
  deleteForumChat,
  replyForumChatComment,
  deleteForumChatComment,
  commentForumChat,
  likeForumChat,
  createForumChat,
  viewDirectMessage,
  getDirectMessage,
  directMessage,
  getOneNotification,
  getNotification,
  addClient,
  getClient,
  deleteClient,
  getSubscriptionPlan,
  getLivestockDiseases,
  diseasePredictor,
  feedCalculator,
  OtpResend,
  resetPassword,
  changePassword,
  updateUserProfile,
  getPromotionPlan,
  subscribePromotionPlan,
  getUserById,
  shareForumChat,
  getForumChatByFilter,
  getPromotion,
  confirmResetPasswordCode,
  getMyPromotionPlan,
  deleteProduct,
  getUserProduct,
  addPromotion,
  deletePromotion,
  getFarmByFilter,
  getPetByFilter,
  rate
};
