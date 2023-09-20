/* eslint-disable no-unused-vars */
import { LoginSocialGoogle, LoginSocialLinkedin } from "reactjs-social-login";
import linkedIn from "../../assets/icons/linkedin.svg";
import google from "../../assets/icons/google.svg";
import {
    getUserById,
    googleCallback,
    linkedInCallback,
    login,
  } from "../../utils/userApiService";
import { useSetRecoilState } from "recoil";
import { user } from "../../atom/userAtom";
export default function SocialLogin() {
    const googleClientId =
    "905736705694-be5othcfreqgko6km4qce2sci8od92ki.apps.googleusercontent.com";
  const linkedinClientId = "77c5cdjvez8wof";
  const linkedinSecretId = "jM6eGS3zA6HgKbKN";
  const state = "1234567890";
  const [userData, setUserData] = useSetRecoilState(user)
  return (
    <div>
         <div className=" flex items-center justify-center mt-5 gap-4">
          {/* <LoginSocialLinkedin
            isOnlyGetToken
            client_id={linkedinClientId}
            state="1234567890"
            client_secret={linkedinSecretId}
            redirect_uri="https://vetkonect.com/backend/public/api/linkedin/callback"
            onResolve={({ data }) => {
              linkedInCallback().then((res) => {
                console.log(data);
              });
            }}
            onReject={(err) => {
              console.log(err);
            }}
          >
            <img
              src={linkedIn}
              alt=""
              className="h-[35px] w-[35px] object-contain cursor-pointer"
            />
          </LoginSocialLinkedin> */}
          <LoginSocialGoogle
            isOnlyGetToken
            client_id={googleClientId}
            redirect_uri={
              "https://vetkonect.com/backend/public/api/google/callback/"
            }
            onResolve={({ data }) => {
              // setData(data)
              googleCallback(data.access_token).then(({data}) => {
                setUserData(data)
              });
            }}
            onReject={(err) => {
              console.log(err);
            }}
          >
            <img
              src={google}
              alt=""
              className="h-[35px] w-[35px] object-contain cursor-pointer"
            />
          </LoginSocialGoogle>
        </div>
    </div>
  )
}
