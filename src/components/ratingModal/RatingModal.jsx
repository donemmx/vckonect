import { Dialog } from "primereact/dialog";
import { useState } from "react";
import { Rating } from "primereact/rating";

export default function RatingModal() {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState(0);

  const getValue =(data) => {
    console.log(data);
    setValue(data)
  }
  return (
    <>
      <Dialog
        visible={visible}
        draggable={false}
        className=" w-[95%] md:w-[50%] lg:w-[30%]  "
        onHide={() => setVisible(false)}
        headerClassName="!bg-green-50"
        contentClassName="!bg-green-50"
      >
        <div className=" flex items-center flex-col justify-center p-4 py-4">
         <h3 className=" text-lg font-bold">
            Rate 
         </h3>
         <p>Micheals Clinic</p>
        <Rating
          value={value}
          onChange={(e) => getValue(e.target.value)}
          cancel={false}
          stars={5}
          className="h-20"
        />
        </div>
      </Dialog>
      <div
          className="flex flex-col items-center justify-center"
          onClick={() => setVisible(!visible)}
        >
         <i className="pi pi-star pi-spin !p-2 mb-2 h-[40px] w-[40px] bg-white !flex !items-center !justify-center !text-center rounded-full border-[1px] border-[#828282] hover:border-green-400 hover:bg-green-100 cursor-pointer"></i>
          Rating
        </div>
    </>
  );
}
