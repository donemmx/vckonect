import Footer from "../components/footer/Footer";
import Vetcard from "../components/vetCard/Vetcard";

export default function Search() {
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
