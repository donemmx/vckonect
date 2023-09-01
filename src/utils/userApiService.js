import axios from "axios";

const baseURl = "https://vetkonect.com/backend/public/api/web/v2";
const publicBaseURl = "https://vetkonect.com/backend/public/api";

// Auth

const login = (payload) => {
  return axios
    .post(`${baseURl}/login`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const resetPassword = (payload) => {
  return axios
    .post(`${baseURl}/resetPassword`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const confirmResetPasswordCode = (payload) => {
  return axios
    .post(`${baseURl}/confirmResetPasswordCode`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const changePassword = (payload) => {
  return axios
    .post(`${baseURl}/changePassword`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const updateUserProfile = (payload) => {
  return axios
    .post(`${baseURl}/updateUserProfile`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const OtpResend = (payload) => {
  return axios
    .post(`${baseURl}/resendOtp`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const getClient = (payload) => {
  return axios
    .post(`${baseURl}/getClient`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
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
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const getStoreByFilter = (payload) => {
  return axios
    .post(`${baseURl}/getStoreByFilter`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const getOneStore = (id) => {
  return axios
    .post(`${baseURl}/getOneStore`, id)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const getStore = (payload) => {
  return axios
    .post(`${baseURl}/getStore`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const deleteStore = (payload) => {
  return axios
    .post(`${baseURl}/deleteStore`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const addProduct = (payload) => {
  return axios
    .post(`${baseURl}/addProduct`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

// Clinic

const getClinicByFilter = (name, specialty) => {
  return axios
    .get(`${baseURl}/getClinicByFilter?name=${name}&specialty=${specialty}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

// Forum

const getOneForumChat = (id) => {
  return axios
    .post(`${baseURl}/getOneForumChat`, id)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const deleteresponseForumChat = (payload) => {
  return axios
    .post(`${baseURl}/deleteresponseForumChat`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const replyForumChatComment = (payload) => {
  // const { role, id, commentId, response, responseId } = payload;
  return axios
    .post(`${baseURl}/replyForumChatComment`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const deleteForumChat = (payload) => {
  // const { role, id, forumChatId } = payload;
  return axios
    .post(`${baseURl}/deleteForumChat`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const deleteForumChatComment = (payload) => {
  // const { role, id, forumChatId, commentId } = payload;
  return axios
    .post(`${baseURl}/deleteForumChatComment`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const commentForumChat = (payload) => {
  // const { role, id, forumChatId, comment } = payload;
  return axios
    .post(`${baseURl}/commentForumChat`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const likeForumChat = (payload) => {
  // const { role, id, forumChatId } = payload;
  return axios
    .post(`${baseURl}/likeForumChat`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const shareForumChat = (payload) => {
  // const { role, id, forumChatId } = payload;
  return axios
    .post(`${baseURl}/shareForumChat`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const createForumChat = (payload) => {
  // const { role, id, title, content, picture } = payload;
  return axios
    .post(`${baseURl}/createForumChat`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const getForumChat = () => {
  return axios
    .get(`${baseURl}/getForumChat`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const getForumChatByFilter = (payload) => {
  return axios
    .post(`${baseURl}/getForumChatByFilter`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

// Subscription

const getSubscriptionPlan = () => {
  return axios
    .get(`${baseURl}/getSubscriptionPlan`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

// Messaging

const viewDirectMessage = (payload) => {
  return axios
    .post(`${baseURl}/viewDirectMessage`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const getDirectMessage = (payload) => {
  return axios
    .post(`${baseURl}/getDirectMessage`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const directMessage = (payload) => {
  return axios
    .post(`${baseURl}/directMessage`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

// Notification

const getOneNotification = (payload) => {
  // const { userId, id } = payload;
  return axios
    .post(`${baseURl}/getOneNotification`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const getNotification = (payload) => {
  // const { userId, role } = payload;
  return axios
    .post(`${baseURl}/getNotification`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

// Client

const addClient = (payload) => {
  // const { userId, role, moduleType, clientId } = payload;
  return axios
    .post(`${baseURl}/addClient`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const deleteClient = (payload) => {
  // const { userId, id, clientId } = payload;
  return axios
    .post(`${baseURl}/deleteClient`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};
const getLivestockDiseases = async (payload) => {
  // const { userId, id, clientId } = payload;
  return await axios
    .post(`${baseURl}/getLivestockDiseases`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const diseasePredictor = async (payload) => {
  // const { userId, id, clientId } = payload;
  return await axios
    .post(`${baseURl}/diseasePredictor`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const feedCalculator = async (payload) => {
  return await axios
    .post(`${baseURl}/feedCalculator`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const getUserById = async (payload) => {
  return await axios
    .post(`${baseURl}/getUserById`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const getPromotionPlan = async () => {
  return await axios
    .get(`${baseURl}/getPromotionPlan`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const subscribePromotionPlan = async (payload) => {
  return await axios
    .post(`${baseURl}/subscribePromotionPlan`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const getPromotion = async (payload) => {
  return await axios
    .post(`${baseURl}/getPromotion`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
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
  confirmResetPasswordCode
};
