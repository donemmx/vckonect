import axios from "axios";

const baseURl = "https://vetkonect.com/backend/public/api/web/v2/";

//   Admin

const activatePromotion = (payload) => {
  const { userId, role } = payload;
  return axios
    .post(`${baseURl}/activatePromotion?user_id=${userId}&user_role=${role}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const deactivatePromotion = (payload) => {
  const { userId, role } = payload;
  return axios
    .post(`${baseURl}/deactivatePromotion?user_id=${userId}&user_role=${role}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const activateAccount = (payload) => {
  const { id, role } = payload;
  return axios
    .post(`${baseURl}/activateAccount?id=${id}&role=${role}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const deactivateAccount = (payload) => {
  const { id, role } = payload;
  return axios
    .post(`${baseURl}/deactivateAccount?id=${id}&role=${role}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const verifyLicenseNumber = (payload) => {
  const { id, userId } = payload;
  return axios
    .post(`${baseURl}/deactivateAccount?id=${id}&user_id=${userId}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

// Get User

const adminGetAnimalOwner = (payload) => {
  const { name } = payload;
  return axios
    .post(`${baseURl}/adminGetAnimalOwner?name=${name}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const adminGetVeterinarian = (payload) => {
  const { name } = payload;
  return axios
    .post(`${baseURl}/adminGetVeterinarian?name=${name}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const adminGetClinic = (payload) => {
  const { name } = payload;
  return axios
    .post(`${baseURl}/adminGetClinic?name=${name}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};


const adminGetFarm = (payload) => {
  const { name } = payload;
  return axios
    .post(`${baseURl}/adminGetFarm?name=${name}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const adminGetPet = (payload) => {
  const { name } = payload;
  return axios
    .post(`${baseURl}/adminGetPet?name=${name}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const adminGetProduct = (payload) => {
  const { name } = payload;
  return axios
    .post(`${baseURl}/adminGetProduct?name=${name}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const adminGetPromotion = (payload) => {
  const { name } = payload;
  return axios
    .post(`${baseURl}/adminGetPromotion?name=${name}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const adminGetSubscription = (payload) => {
  const { name } = payload;
  return axios
    .post(`${baseURl}/adminGetSubscription?name=${name}`)
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
  const { id } = payload;
  return axios
    .post(`${baseURl}/getAdminActivity?staff_id=${id}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

// Admin Auth


const updateAdminProfile = (payload) => {
  const { id, email, firstName, lastName, phone, location, password, newPassword, picture } = payload;
  return axios
    .post(
      `${baseURl}/registerVeterinarian?staff_id=${id}&email=${email}&phone_number=${phone}&profile_picture=${picture}&first_name=${firstName}&last_name=${lastName}&location=${location}&password=${password}&new_password=${newPassword}`
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const adminLogin = (payload) => {
  const { id, password } = payload;
  return axios
    .post(
      `${baseURl}/adminLogin?staff_id=${id}&password=${password}`
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const approveForumChat = (payload) => {
  const { forumChatId, role, userId } = payload;
  return axios
    .post(
      `${baseURl}/approveForumChat?forum_chat_id=${forumChatId}&user_id=${userId}&user_role=${role}`
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const rejectForumChat = (payload) => {
  const { reason ,forumChatId, role, userId } = payload;
  return axios
    .post(
      `${baseURl}/rejectForumChat?forum_chat_id=${forumChatId}&user_id=${userId}&user_role=${role}&reason=${reason}`
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
