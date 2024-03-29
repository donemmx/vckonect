import * as yup from 'yup'

const passwordRule = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/

const userOne = yup.object().shape({
    email: yup.string().email("Please enter a valid email").required("Required"),
    password: yup.string().min(5).max(25).matches(passwordRule, {message: "Please create a stronger password"}).required("Required"),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], "Passwords must match").required("Required")
})

const userResetPassword = yup.object().shape({
    password: yup.string().min(5).max(25).matches(passwordRule, {message: "Please create a stronger password"}).required("Required"),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], "Passwords must match").required("Required")
})

const resetUser = yup.object().shape({
    email: yup.string().email("Please enter a valid email").required("Required")
})

const resetPin = yup.object().shape({
    pin_code: yup.string().required("Required")
})


const userTwo = yup.object().shape({
    firstName: yup.string().required("Required"),
    lastName: yup.string().required("Required"),
    phone_number: yup.string().required("Required"),
    address: yup.string().required("Required"),
})

const verify = yup.object().shape({
    activation_code: yup.string().required("Required")
})

const vetUser = yup.object().shape({
    firstName: yup.string().required("Required"),
    lastName: yup.string().required("Required"),
    country: yup.string().required("Required"),
    state: yup.string().required("Required"),
    phone_number: yup.string().required("Required"),
    address: yup.string().required("Required"),
    vetNumber: yup.string().required("Required"),
})
const subscription = yup.object().shape({
    title: yup.string().required("Required"),
    currency: yup.string().required("Required"),
    price: yup.string().required("Required"),
    vat: yup.string().required("Required"),
    date_option: yup.string().required("Required"),
    duration: yup.string().required("Required"),
    case: yup.string().required("Required"),
    store: yup.string().required("Required"),
    no_of_product: yup.string().required("Required"),
})
const promotion = yup.object().shape({
    title: yup.string().required("Required"),
    currency: yup.string().required("Required"),
    price: yup.string().required("Required"),
    vat: yup.string().required("Required"),
    date_option: yup.string().required("Required"),
    duration: yup.string().required("Required"),
    no_of_product: yup.string().required("Required"),
})

const updateUser = yup.object().shape({
    firstName: yup.string().required("Required"),
    lastName: yup.string().required("Required"),
    phone_number: yup.string().required("Required"),
    address: yup.string().required("Required"),
    password: yup.string().min(5).max(25).matches(passwordRule, {message: "Please create a stronger password"}),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], "Passwords must match")
})

const loginUser =  yup.object().shape({
    email: yup.string().email("Please enter a valid email").required("Required"),
    password: yup.string().required("Required"),
})

const loginAdmin =  yup.object().shape({
    staff_id: yup.string().required("Required"),
    password: yup.string().required("Required"),
})

const forumChat = yup.object().shape({
    title: yup.string().required("Required"),
    content: yup.string().required("Required"),
})

const product = yup.object().shape({
    description: yup.string().required("Required"),
    title: yup.string().required("Required"),
    location: yup.string().required("Required"),
    price: yup.string().required("Required"),
    available_units: yup.string().required("Required"),
})

const storeValidation = yup.object().shape({
    phone: yup.string().required("Required"),
    storeName: yup.string().required("Required"),
    email: yup.string().email("Please enter a valid email").required("Required"),
    location: yup.string().required("Required"),
})

const farm = yup.object().shape({
    farmName: yup.string().required("Required"),
    workers: yup.string().required("Required"),
    location: yup.string().required("Required"),
    livestockNumber: yup.string().required("Required"),
    age: yup.string().required("Required"),
})

const clinic = yup.object().shape({
    clinicName: yup.string().required("Required"),
    license_number: yup.string().required("Required"),
    email: yup.string().required("Required"),
    phone: yup.string().required("Required"),
    location: yup.string().required("Required"),
})


const addCaseValidation  =  yup.object().shape({
    client_name: yup.string(),
    client_phone: yup.string(),
    case_title: yup.string().required("Required"),
    details: yup.string(),
    date_of_occurence: yup.string(),
    history: yup.string(),
    clinical_sign: yup.string(),
    motality: yup.string(),
    mobile_veterinarian: yup.string(),
    treatment_regiment: yup.string(),
    clinic_physical_address: yup.string(),
    lab_confirm: yup.string(),
    disease_diagnostic: yup.string(),
    differential_diagnosis: yup.string(),
    tentative_diagnoistic: yup.string()
})

const pet  =  yup.object().shape({
    petName: yup.string().required("Required"),
    breed: yup.string().required("Required"),
    age: yup.string().required("Required"),
})

export {
    userOne,
    userTwo,
    vetUser,
    loginUser,
    loginAdmin,
    forumChat,
    product,
    storeValidation,
    farm,
    clinic,
    addCaseValidation,
    verify,
    updateUser,
    pet,
    subscription,
    promotion,
    resetUser,
    resetPin,
    userResetPassword
}