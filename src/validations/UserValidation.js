import * as yup from 'yup'

const passwordRule = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/

const userOne = yup.object().shape({
    email: yup.string().email("Please enter a valid email").required("Required"),
    password: yup.string().min(5).max(25).matches(passwordRule, {message: "Please create a stronger password"}).required("Required"),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], "Passwords must match").required("Required")
})

const userTwo = yup.object().shape({
    firstName: yup.string().required("Required"),
    lastName: yup.string().required("Required"),
    phone: yup.string().required("Required"),
    address: yup.string().required("Required")
})

const vetUser = yup.object().shape({
    firstName: yup.string().required("Required"),
    lastName: yup.string().required("Required"),
    phone: yup.string().required("Required"),
    address: yup.string().required("Required"),
    vetNumber: yup.string().required("Required"),
    speciality: yup.string().required("Required"),
})


const loginUser =  yup.object().shape({
    email: yup.string().email("Please enter a valid email").required("Required"),
    password: yup.string().required("Required"),
})

const forumChat = yup.object().shape({
    title: yup.string().required("Required"),
    content: yup.string().required("Required"),
})
const product = yup.object().shape({
    category: yup.string().required("Required"),
    description: yup.string().required("Required"),
    title: yup.string().required("Required"),
    tags: yup.string().required("Required"),
    location: yup.string().required("Required"),
    price: yup.string().required("Required"),
    availability: yup.string().required("Required"),
    unit: yup.string().required("Required"),
})

const store = yup.object().shape({
    phone: yup.string().required("Required"),
    email: yup.string().required("Required"),
    location: yup.string().required("Required"),
    availability: yup.string().required("Required"),
})

const farm = yup.object().shape({
    farmName: yup.string().required("Required"),
    workers: yup.string().required("Required"),
    location: yup.string().required("Required"),
    livestockType: yup.string().required("Required"),
    livestock: yup.string().required("Required"),
    age: yup.string().required("Required"),
    sex: yup.string().required("Required"),
})

const clinic = yup.object().shape({
    licenseNumber: yup.string().required("Required"),
    clinicName: yup.string().required("Required"),
    speciality: yup.string().required("Required"),
    email: yup.string().required("Required"),
    phone: yup.string().required("Required"),
    location: yup.string().required("Required"),
    availability: yup.string().required("Required"),
})

const addCase = yup.object().shape({
    clientName: yup.string().required("Required"),
    phone: yup.string().required("Required"),
    caseType: yup.string().required("Required"),
})

const addPetCase  =  yup.object().shape({
    clientName: yup.string().required("Required"),
    phone: yup.string().required("Required"),
    caseType: yup.string().required("Required"),
    petName: yup.string().required("Required"),
    specie: yup.string().required("Required"),
    breed: yup.string().required("Required"),
    age: yup.string().required("Required"),
    sex: yup.string().required("Required"),
    caseTitle: yup.string().required("Required"),
})

const addFarmCase  =  yup.object().shape({
    clientName: yup.string().required("Required"),
    phone: yup.string().required("Required"),
    caseType: yup.string().required("Required"),
    petName: yup.string().required("Required"),
    specie: yup.string().required("Required"),
    breed: yup.string().required("Required"),
    age: yup.string().required("Required"),
    sex: yup.string().required("Required"),
    caseTitle: yup.string().required("Required"),
})

export {
    userOne,
    userTwo,
    vetUser,
    loginUser,
    forumChat,
    product,
    store,
    farm,
    clinic,
    addCase,
    addPetCase,
    addFarmCase
}