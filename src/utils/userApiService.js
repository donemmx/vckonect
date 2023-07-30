import axios from "axios";

const baseURl = "https://vetkonect.com/backend/public/api/web/v2/";
const publicBaseURl = "https://vetkonect.com/backend/public/api/";

// Auth

const login = (email, password) => {
  return axios
    .post(`${baseURl}/login/email=${email}&password=${password}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const loginWithGoogle = () => {
  return axios
    .get(`${publicBaseURl}/google/loginUsingGoogle`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const loginWithLinkedin = () => {
  return axios
    .get(`${publicBaseURl}/linkedin/loginUsingLinkedin`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

// Store
const addStore = (payload) => {
  const { role, userId, phone, email, id, location, picture, availability } =
    payload;
  return axios
    .post(
      `${baseURl}/addStore?user_id=${userId}&user_role=${role}&store_name=${id}&email=${email}&phone_number=${phone}&&location=${location}&availability=${availability}&picture=${picture}&store_id=${id}`
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
    .post(`${baseURl}/getOneStore?store_id=${id}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const getStore = (id, role) => {
  return axios
    .post(`${baseURl}/getStore?id=${id}&role=${role}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const deleteStore = (id) => {
  return axios
    .post(`${baseURl}/deleteStore?store_id=${id}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const addProduct = (payload) => {
  const {
    role,
    userId,
    category,
    description,
    title,
    id,
    tags,
    location,
    images,
    price,
    availability,
    unit,
  } = payload;
  return axios
    .post(
      `${baseURl}/addProduct?user_id=${userId}&user_role=${role}&store_id=${id}&title=${title}&category=${category}&description=${description}&tags=${tags}&location=${location}&images=${images}&price=${price}&availability=${availability}}&available_units=${unit}`
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
    .post(`${baseURl}/getOneForumChat?forum_chat_id=${id}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const deleteresponseForumChat = (payload) => {
  const { role, id, commentId, responseId } = payload;
  return axios
    .post(
      `${baseURl}/deleteresponseForumChat?user_id=${id}&user_role=${role}&comment_id=${commentId}&response_id=${responseId}`
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const replyForumChatComment = (payload) => {
  const { role, id, commentId, response, responseId } = payload;
  return axios
    .post(
      `${baseURl}/replyForumChatComment?user_id=${id}&user_role=${role}&comment_id=${commentId}&response=${response}&response_id=${responseId}`
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const deleteForumChat = (payload) => {
  const { role, id, forumChatId } = payload;
  return axios
    .post(
      `${baseURl}/deleteForumChat?user_id=${id}&user_role=${role}&forum_chat_id=${forumChatId}`
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const deleteForumChatComment = (payload) => {
  const { role, id, forumChatId, commentId } = payload;
  return axios
    .post(
      `${baseURl}/deleteForumChatComment?forum_chat_id=${forumChatId}&user_id=${id}&user_role=${role}&comment_id=${commentId}`
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const commentForumChat = (payload) => {
  const { role, id, forumChatId, comment } = payload;
  return axios
    .post(
      `${baseURl}/commentForumChat?forum_chat_id=${forumChatId}&user_id=${id}&user_role=${role}&comment=${comment}`
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const likeForumChat = (payload) => {
  const { role, id, forumChatId } = payload;
  return axios
    .post(
      `${baseURl}/likeForumChat?forum_chat_id=${forumChatId}&user_id=${id}&user_role=${role}`
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const createForumChat = (payload) => {
  const { role, id, title, content, picture } = payload;
  return axios
    .post(
      `${baseURl}/createForumChat?id=${id}&role=${role}&title=${title}&content=${content}&picture=${picture}`
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
  const { role, id } = payload;
  return axios
    .post(`${baseURl}/viewDirectMessage?id=${id}&role=${role}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const getDirectMessage = (payload) => {
  const { role, id } = payload;
  return axios
    .post(`${baseURl}/getDirectMessage?id=${id}&role=${role}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const directMessage = (payload) => {
  const {
    role,
    id,
    type,
    senderId,
    senderRole,
    receiverId,
    receiverRole,
    content,
  } = payload;
  return axios
    .post(
      `${baseURl}/directMessage?id=${id}&role=${role}&type=${type}&sender_id=${senderId}&sender_role=${senderRole}&receiver_id=${receiverId}&receiver_role=${receiverRole}&content=${content}`
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

// Notification

const getOneNotification = (payload) => {
  const { userId, id } = payload;
  return axios
    .post(`${baseURl}/getOneNotification?user_id=${userId}&id=${id}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const getNotification = (payload) => {
  const { userId, role } = payload;
  return axios
    .post(`${baseURl}/getNotification?user_id=${userId}&role=${role}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

// Client

const addClient = (payload) => {
  const { userId, role, moduleType, clientId } = payload;
  return axios
    .post(
      `${baseURl}/addClient?user_id=${userId}&role=${role}&module_type=${moduleType}&client_id=${clientId}`
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const getClient = (payload) => {
  const { userId } = payload;
  return axios
    .post(`${baseURl}/getClient?user_id=${userId}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const deleteClient = (payload) => {
  const { userId, id, clientId } = payload;
  return axios
    .post(
      `${baseURl}/deleteClient?user_id=${userId}&id=${id}&client_id=${clientId}`
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
