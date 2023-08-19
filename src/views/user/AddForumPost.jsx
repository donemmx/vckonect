import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { useEffect, useState } from "react";
import { createForumChat } from "../../utils/userApiService";
import { useRecoilState, useRecoilValue } from "recoil";
import { user } from "../../atom/userAtom";
import { useFormik } from "formik";
import { forumChat } from "../../validations/UserValidation";
import { toast } from "react-toastify";
import { storeData } from "../../atom/storeAtom";
import { actionState } from "../../atom/actionAtom";

export default function AddForumPost() {
  const [fileDataURL, setFileDataURL] = useState(null);
  const [file, setFile] = useState(null);
  const [picture, setPicture] = useState(null)
  const store = useRecoilValue(storeData);
  const action = useRecoilValue(actionState);
  const userData = useRecoilValue(user);


  const getImage = (e) => {
    const fileData = e.target.files[0];
    setFile(fileData);
    console.log(fileData);
  };

  useEffect(() => {
    let fileReader,
      isCancel = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result);
        }
      };
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);

  const initialValues = {
    title: "",
    content: "",
  };

  const loadedData = {
    title: store?.title,
    content: store?.content,
  };

  const onSubmit = async (values) => {
    const formData = new FormData();
    let payload;

    if (action && action === "edit") {
      payload = {
        role: userData.role,
        id: userData.id,
        picture: file ?? store?.picture,
        forum_id: store?.id,
        ...values,
      };
    } else {
      payload = {
        role: userData?.role,
        id: userData?.id,
        picture: file,
        ...values,
    }
  }
    Object.entries(payload).forEach(([key, value]) => {
      formData.append(key, value);
    });
    await createForumChat(formData)
      .then(() => {
        toast.success("Post added successfully");
        window.history.back();
      })
      .catch((err) => console.log(err));
  };

  const {
    values,
    errors,
    isValid,
    isSubmitting,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    validateOnMount: true,
    initialValues: action === 'add' ?  initialValues : loadedData,
    validationSchema: forumChat,
    onSubmit,
  });

  useEffect(() => {
    if (action && action == "edit") {
      setPicture(store?.picture)
    }
  }, []);
  return (
    <div>
      <div className="pb-4">
        <span className="underline">Forum Chat</span> / Add to Forum
      </div>
      <form
        onSubmit={handleSubmit}
        className=" bg-white h-full p-5 flex flex-col gap-8 rounded-md border-[1px] border-[#EBEBEB]"
      >
        <div className=" font-black text-2xl">Add to Forum Chat</div>
        <span className="p-float-label">
          <InputText
            id="username"
            name="title"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <label htmlFor="username">Title</label>
        </span>
        {errors.title && touched.title && (
          <p className="error">{errors.title}</p>
        )}
        <span className="p-float-label">
          <InputTextarea
            name="content"
            value={values.content}
            onChange={handleChange}
            onBlur={handleBlur}
            autoResize
            rows={50}
            cols={30}
          />
          <label htmlFor="username">Contents</label>
        </span>
        {errors.content && touched.content && (
          <p className="error">{errors.content}</p>
        )}
        {fileDataURL !== null || picture !== null  ? (
          <>
            <img
              src={fileDataURL ?? picture}
              className="h-[200px] w-full object-cover border-[1px] rounded-md"
            />
            <div
              className="underline cursor-pointer"
              onClick={() => {setFileDataURL(null), setPicture(null)}}
            >
              Remove Image
            </div>
          </>
        ) : (
          <input
            type="file"
            id="image"
            accept=".png, .jpg, .jpeg"
            onChange={(e) => getImage(e)}
          />
        )}
        <button className="green__btn" disabled={!isValid || isSubmitting}>
          {isSubmitting ? (
            <i className="pi pi-spin pi-spinner !text-[20px]"></i>
          ) : (
            ""
          )}
          Submit
        </button>
      </form>
    </div>
  );
}
