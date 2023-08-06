import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { useState } from "react";
import { createForumChat } from "../../utils/userApiService";
import { useRecoilValue } from "recoil";
import { user } from "../../atom/userAtom";
import { useFormik } from "formik";
import { forumChat } from "../../validations/UserValidation";
import { v4 } from "uuid";
import { toast } from "react-toastify";

export default function AddForumPost() {
  const userData = useRecoilValue(user);
  const [file, setFile] = useState(null);
  function getImage(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  const onSubmit = async (values) => {
    const payload = {
      role: userData.role,
      id: v4(),
      picture: file,
      ...values,
    };
    await createForumChat(payload)
      .then(() => {
       toast.success('Post added successfully')
       window.history.back()
      })
      .catch((err) => console.log(err));
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        title: "",
        content: "",
      },
      validationSchema: forumChat,
      onSubmit,
    });

  return (
    <div>
      <div className="pb-4">
        {" "}
        <span className="underline">Forum Chat</span> / Add to Forum
      </div>
      <form onSubmit={handleSubmit} className=" bg-white h-full p-5 flex flex-col gap-8 rounded-md border-[1px] border-[#EBEBEB]">
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
        {file !== null ? (
          <>
            <img
              src={file}
              className="h-[200px] w-full object-cover border-[1px] rounded-md"
            />
            <div
              className="underline cursor-pointer"
              onClick={() => setFile(null)}
            >
              Remove Image
            </div>
          </>
        ) : (
          <input type="file" onChange={getImage} />
        )}
        <button className="green__btn">Submit</button>
      </form>
    </div>
  );
}
