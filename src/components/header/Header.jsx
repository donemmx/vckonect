/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo/vc-logo.svg";
import userImg from "../../assets/icons/header-icons/user-icon.svg";
import hamburger from "../../assets/icons/header-icons/hamburger-icon.svg";
import language from "../../assets/icons/modal-icons/language-icon.svg";
import support from "../../assets/icons/modal-icons/support-icon.svg";
import userPic from "../../assets/icons/modal-icons/user-icon.svg";
import { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { user } from "../../atom/userAtom";
import { toast } from "react-toastify";
import { getNotification } from "../../utils/userApiService";
import { Badge } from "primereact/badge";
import { Avatar } from "primereact/avatar";
import Pusher from "pusher-js";

export default function Header({ bg }) {
  const location = useNavigate();

  const [open, setOpen] = useState(false);
  const [openNotify, setOpenNotify] = useState(false);
  const [openMessage, setOpenMessage] = useState(false);
  const [notification, setNotification] = useState([]);
  const [myData, setMyData] = useState();
  const userData = useRecoilValue(user);
  const [data, setData] = useRecoilState(user);
  const [newNotification, setNewNotification] = useState();
  const [noti, setNoti] = useState(false);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const pusher = new Pusher("c38d7afddec65408e4cd", {
      cluster: "mt1",
      encrypted: true,
    });
    const channel = pusher.subscribe("chatbox");
    channel.bind("App\\Events\\UserNotification", (data) => {
      if (data.user_id == userData?.id && data.role == userData?.role) {
        setNoti(true);
        let myData=[];
        myData.push(data)
        setNewNotification(myData);
      }
    });
    return () => {
      pusher.unsubscribe("App\\Events\\UserNotification");
    };
  }, []);

  useEffect(() => {
    if (noti) {
      setCounter(counter+1)
      setNotification([...newNotification, ...notification]);
      setNoti(false);
    }
  }, [newNotification, noti, notification, counter]);

  const openModal = () => {
    setOpen(!open);
  };
  const ref = useRef();
  const menuRef = useRef();

  const logOut = () => {
    setData(null);
    localStorage.clear();
    toast.success("Successfully logged out");
  };

  const openData = (data) => {
    setMyData(data);
    setOpenMessage(!openMessage);
  };

  const checker = (route) => {
    if (data?.role) {
      if (data?.role === "Veterinarian") {
        location(`/vet-${route}`);
      } else if (data?.role === "Animal Owner") {
        location(`/animal-owner-${route}`);
      } else {
        location(`/admin-${route}`);
      }
    } else {
      location("/login");
    }
  };

  const accountChecker = (route) => {
    if (data?.role) {
      if (data?.role === "Veterinarian") {
        location(`/vet-${route}/${userData?.id}`);
      } else if (data?.role === "Animal Owner") {
        location(`/animal-owner-${route}/${userData?.id}`);
      } else {
        location(`/admin-${route}`);
      }
    } else {
      location("/login");
    }
  };

  useEffect(() => {
    const payload = {
      user_id: userData?.id,
      role: userData?.role,
    };
    if (userData?.id) {
      getNotification(payload).then(({ data }) => {
        setNotification(data);
      });
      if (localStorage.getItem("user_notification")) {
        let formalCounter = localStorage.getItem("user_notification");
        setCounter(JSON.parse(notification.length - formalCounter));
      } else {
        setCounter(notification.length);
        localStorage.setItem(
          "user_notification",
          JSON.stringify(notification.length)
        );
      }
    }
  }, []);


  const closeNotify = () => {
    setOpenNotify(false);
  };

  const setNotify = () => {
    setOpenNotify(true);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  const openNotification = () => {
    setOpenNotify(!openNotify);
    setCounter(0);
    localStorage.setItem('user_notification', JSON.stringify(notification.length))
  };

  const openMenu = () => {
    setOpen(true);
  };

  // useEffect(() => {
  //   let isNotifyOpen = false;
  //   const checkIfClickedOutside = (e) => {
  //     const target = e.target;
  //     const notifyContainer = ref.current;

  //     if(notifyContainer !== target && !notifyContainer.contains(target)) {
  //       console.log('clicked', openNotify);
  //       setOpenNotify(false);
  //     }
  //     else{
  //       setOpenNotify(true);
  //     }
  //   };
  //   // the key is using the `true` option
  //   // `true` will enable the `capture` phase of event handling by browser
  //   document.addEventListener("click", checkIfClickedOutside);
  //   return () => {
  //     document.removeEventListener("click", checkIfClickedOutside);
  //   };
  // }, [closeNotify]);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        closeMenu();
      }
    };
    // the key is using the `true` option
    // `true` will enable the `capture` phase of event handling by browser
    document.addEventListener("click", checkIfClickedOutside);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, [closeMenu]);

  return (
    <>
      <div
        className={`${
          bg ? "bg-hero" : " bg-white"
        }  w-[100vw] h-[72px] lg:h-[80px] flex justify-center items-center fixed z-[100] `}
      >
        <div className="header flex items-center justify-between p-2 w-[90%] md:w-[85%] m-auto">
          <Link to="/" className="logo h-[25px] md:h-[30px] lg:h-[35px]">
            <img
              src={logo}
              alt=""
              className=" w-[100%] h-[100%] object-contain"
            />
          </Link>
          <div className="header__links  hidden lg:flex space-x-5 ">
            <Link to={"/about-us"}>About Us</Link>
            <div
              onClick={() => checker("feed-calculator")}
              className=" cursor-pointer"
            >
              Feed Calculator
            </div>
            <div
              onClick={() => checker("disease-prediction")}
              className=" cursor-pointer"
            >
              Disease Predictor
            </div>
            {/* <Link to={"/blog"}>Blog Post</Link> */}
            <div onClick={() => checker("forum")} className=" cursor-pointer">
              Chat Forum
            </div>
          </div>
          {!userData?.id ? (
            <div className="header__user">
              <div
                ref={menuRef}
                className="grouped__icons flex space-x-2 bg-white border p-2 border-gray-300 h-[40px] md:h-[45px] lg:h-[50px] cursor-pointer rounded-[16px]"
                onClick={openModal}
              >
                <img
                  src={hamburger}
                  alt=""
                  className="w-[100%] h-[100%] object-contain"
                />
                <img
                  src={userImg}
                  alt=""
                  className="w-[100%] h-[100%] object-contain"
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <i
                ref={ref}
                className="pi pi-bell p-overlay-badge p-3 !cursor-pointer bg-gray-50 rounded-full border"
                onClick={openNotification}
              >
                {counter > 0 ? (
                  <Badge
                    value={counter}
                    severity="danger"
                    className="w-[20px] h-[20px]  !flex !justify-center !items-center !rounded-full !text-[10px]"
                  ></Badge>
                ) : (
                  ''
                )}
              </i>
              {userData?.profile_picture?.length > 64 ? (
                <div
                  ref={menuRef}
                  className="w-[48px] h-[48px] "
                  onClick={openModal}
                >
                  <img
                    src={userData?.profile_picture}
                    alt=""
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              ) : (
                <Avatar
                  label={userData?.first_name?.split("")[0].toUpperCase()}
                  size="large"
                  className=" !bg-green-500 !text-white"
                  shape="circle"
                  ref={menuRef}
                  onClick={openModal}
                />
              )}
            </div>
          )}
        </div>
      </div>
      {open && !userData?.id ? (
        <div
          className="modal w-[220px]  h-[24vh] z-[100] bg-white fixed top-[9%] right-[8%] rounded-md shadow-sm"
          data-aos="fade"
        >
          <div className="modal__body flex  flex-col gap-2 p-4">
            <Link
              to="/login"
              onClick={openModal}
              className="group text-[15px] text-gray-600 p-2 flex items-center gap-3 hover:bg-gray-300 rounded-md cursor-pointer"
            >
              <img src={userPic} alt="" className="h-4" />
              Login / Signup
            </Link>
            <div className="group text-[15px] text-gray-600 p-2 flex items-center gap-3  hover:bg-gray-300 rounded-md cursor-pointer">
              <a
                href="mailto:info@vetkonect.com"
                target="_blank"
                rel="noReferrer"
                className="flex items-center gap-3"
              >
                <img src={support} alt="" className="h-4" />
                Customer Support
              </a>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {open && userData?.id ? (
        <div
          className="modal w-[220px] h-[22vh] z-[100] bg-white fixed top-[9%] right-[8%] rounded-md shadow-sm"
          data-aos="fade"
        >
          <div className="modal__body flex  flex-col gap-2 p-4">
            <button
              onClick={() => accountChecker("account")}
              className="group text-[15px] text-gray-600 p-2 flex items-center gap-3 hover:bg-gray-300 rounded-md cursor-pointer"
            >
              <img src={userPic} alt="" className="h-4" />
              Account
            </button>
            <button
              onClick={logOut}
              className="group text-[15px] text-gray-600 p-2 flex items-center gap-3 hover:bg-gray-300 rounded-md cursor-pointer"
            >
              <i className="pi pi-sign-out h-4"></i>
              Log out
            </button>

            <div className="group text-[15px] text-gray-600 p-2 flex items-center gap-3  hover:bg-gray-300 rounded-md cursor-pointer">
              <a
                href="mailto:info@vetkonect.com"
                rel="noReferrer"
                className="flex items-center gap-3"
              >
                <img src={support} alt="" className="h-4" />
                Customer Support
              </a>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="fixed right-[10vw] top-[10vh] overflow-y-scroll overflow-x-hidden z-[1000]   rounded-md">
        <div
          ref={ref}
          className={
            openNotify
              ? " h-[70vh] w-[70vw] lg:w-[22vw] transition-[height] ease-in-out duration-500     "
              : " h-[0] transition-[height] ease-in-out  "
          }
        >
          <div className=" bg-white  p-5  shadow-lg">
            {notification.map((res, i) => (
              <div
                className={
                  openMessage && myData?.id === res.id
                    ? " bg-gray-50 px-1 top-[10vh] z-20"
                    : "top-[10vh] transition-all ease-in-out 500ms z-20"
                }
                key={res.id}
                onClick={() => openData(res)}
              >
                <div className="flex items-center gap-2 shadow-sm cursor-pointer">
                  <i className="pi pi-inbox"></i>
                  <div className="p-3">
                    <p className="font-bold text-sm">{res.title}</p>
                    <p className="text-xs">
                    {res?.role  === 'Animal Owner' ? 'User': res?.role}
                    </p>
                  </div>
                </div>

                <div className=" ">
                  <div
                    className={
                      openMessage && myData?.id === res.id
                        ? "max-h-[1000px] transition-[max-height] ease-in-out 500ms overflow-hidden"
                        : "  max-h-[0] transition-[max-height] ease-in-out 500ms overflow-hidden"
                    }
                  >
                    <p
                      dangerouslySetInnerHTML={{ __html: myData?.content }}
                      className="p-4 text-xs w-full"
                    ></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
