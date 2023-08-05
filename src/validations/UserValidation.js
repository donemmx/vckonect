import * as yup from 'yup'

const passwordRule = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/

const userOne = yup.object().shape({
    email: yup.string().email("Please enter a valid email").required("Required"),
    password: yup.string().min(5).max(10).matches(passwordRule, {message: "Please create a stronger password"}).required("Required"),
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




export {
    userOne,
    userTwo,
    vetUser,
    loginUser
}