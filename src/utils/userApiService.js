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

const loginWithGoogle = () => {
  const data = axios
    .get(`${publicBaseURl}/google/loginUsingGoogle`)
  return  data
};

const loginWithLinkedin = () => {
  return axios
    .get(`${publicBaseURl}/linkedin/loginUsingLinkedin`)
};

// Store
const addStore = (payload) => {
  // const { role, userId, phone, email, id, location, picture, availability } =
  //   payload;
  return axios
    .post(
      `${baseURl}/addStore`, payload
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const getStoreByFilter = (name, specialty) => {
  return axios
    .get(`${baseURl}/getStoreByFilter?name=${name}&specialty=${specialty}`)
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

const deleteStore = (id) => {
  return axios
    .post(`${baseURl}/deleteStore`, id)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const addProduct = (payload) => {
  // const {
  //   role,
  //   userId,
  //   category,
  //   description,
  //   title,
  //   id,
  //   tags,
  //   location,
  //   images,
  //   price,
  //   availability,
  //   unit,
  // } = payload;
  return axios
    .post(
      `${baseURl}/addProduct`, payload
    )
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
  // const { role, id, commentId, responseId } = payload;
  return axios
    .post(
      `${baseURl}/deleteresponseForumChat`, payload
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const replyForumChatComment = (payload) => {
  // const { role, id, commentId, response, responseId } = payload;
  return axios
    .post(
      `${baseURl}/replyForumChatComment`, payload
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const deleteForumChat = (payload) => {
  // const { role, id, forumChatId } = payload;
  return axios
    .post(
      `${baseURl}/deleteForumChat`, payload
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const deleteForumChatComment = (payload) => {
  // const { role, id, forumChatId, commentId } = payload;
  return axios
    .post(
      `${baseURl}/deleteForumChatComment`, payload
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const commentForumChat = (payload) => {
  // const { role, id, forumChatId, comment } = payload;
  return axios
    .post(
      `${baseURl}/commentForumChat`, payload
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const likeForumChat = (payload) => {
  // const { role, id, forumChatId } = payload;
  return axios
    .post(
      `${baseURl}/likeForumChat`, payload
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const createForumChat = (payload) => {
  // const { role, id, title, content, picture } = payload;
  return axios
    .post(
      `${baseURl}/createForumChat`, payload
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const getForumChat = () => {
  return axios
    .get(`${baseURl}/getForumChat`)
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
  // const { role, id } = payload;
  return axios
    .post(`${baseURl}/viewDirectMessage`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const getDirectMessage = (payload) => {
  // const { role, id } = payload;
  return axios
    .post(`${baseURl}/getDirectMessage`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const directMessage = (payload) => {
  // const {
  //   role,
  //   id,
  //   type,
  //   senderId,
  //   senderRole,
  //   receiverId,
  //   receiverRole,
  //   content,
  // } = payload;
  return axios
    .post(
      `${baseURl}/directMessage`, payload
    )
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
    .post(
      `${baseURl}/addClient`, payload
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const getClient = (payload) => {
  // const { userId } = payload;
  return axios
    .post(`${baseURl}/getClient`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const deleteClient = (payload) => {
  // const { userId, id, clientId } = payload;
  return axios
    .post(
      `${baseURl}/deleteClient`, payload
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export {
  login,
  loginWithGoogle,
  loginWithLinkedin,
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
};