import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { useState } from "react";

export default function AddForumPost() {
  const [file, setFile] = useState(null);
  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <div>
      <div className="">Forum Chat / Add to Forum</div>
      <div className=" bg-white h-full p-5 flex flex-col gap-8 rounded-md border-[1px] border-[#EBEBEB]">
        <div className=" font-black text-2xl">Add to Forum Chat</div>
        <span className="p-float-label">
          <InputText id="username" />
          <label htmlFor="username">Title</label>
        </span>

        <span className="p-float-label">
          <InputTextarea autoResize id="username" rows={50} cols={30} />
          <label htmlFor="username">Contents</label>
        </span>
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
          <input type="file" onChange={handleChange} />
        )}
      </div>
    </div>
  );
}
