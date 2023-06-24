import { useState } from "react";
import Footer from "../components/footer/Footer";
import Vetcard from "../components/vetCard/Vetcard";
import { SelectButton } from 'primereact/selectbutton';
import vetClinic from '../assets/tab-icon/vet-clinic-tab.svg'
import vetStore from '../assets/tab-icon/vet-store-tab.svg'
import vet from '../assets/tab-icon/vet-icon-tab.svg'
        
export default function Search() {
    const [value, setValue] = useState(null);
    const items = [
        { name: 'Veterinarian', value: 'vet', image: {vet} },
        { name: 'Vet Vendor & Store', value: 'store', image: {vetStore} },
        { name: 'Vet Clinic', value: 'clinic', image: {vetClinic} }
    ];
  return (
    <>
      <div className="section flex pt-[10vh] pb-10 w-[100%] h-[100%] bg-cover bg-[#fff]">
        <div className="body flexBody hero__body w-[90%] md:w-[85%] h-[100%] m-auto">
          <div className="group pt-12  pb-10 grid md:grid-cols-2 grid-gap-2 lg:grid-cols-4 w-full">
            <Vetcard />
            <Vetcard />
            <Vetcard />
            <Vetcard />
            <Vetcard />
            <Vetcard />
            <Vetcard />
            <Vetcard />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
