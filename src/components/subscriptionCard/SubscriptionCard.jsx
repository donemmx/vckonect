import cancelled from "../../assets/sidebar/cancel.svg";
import approved from "../../assets/sidebar/verified.svg";
import CurrencyFormatter from "currency-formatter-react";

export default function SubscriptionCard({ data, selectedPlan }) {
  return (
    <>
      {selectedPlan === data.title ? (
        <div className="p-8 bg-white relative shadow-lg w-[90%] md:w-[300px] mx-auto flex items-center justify-center rounded-2xl">
          <div className="w-full">
            <div className="title text-[24px] font-black mb-10">
              {data.title}
            </div>
            <div className="">{data.title.split(" ")[0]} Price</div>
            <div className="price text-[35px] font-black">
              <div className=" text-[26px] font-black">
                <CurrencyFormatter
                  value={data.price.slice(3)}
                  thousandSeparator={true}
                  currency={data.price.slice(0, 3)}
                />
              </div>
            </div>
            <div className=" border-t  flex flex-col gap-4">
              <div className="flex pt-4 items-center gap-2">
                {data.vat !== "0%" ? (
                  <img src={approved} alt="" />
                ) : (
                  <img src={cancelled} alt="" />
                )}
                <div className="">
                  <h4 className=" text-[16px] font-bold">VAT</h4>
                  <p className=" text-[12px]">{data?.vat}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {data?.case?.includes("No") ? (
                  <img src={cancelled} alt="" />
                ) : (
                  <img src={approved} alt="" />
                )}
                <div className="">
                  <h4 className=" text-[16px] font-bold">Case Record</h4>
                  <p className=" text-[12px]">{data?.case}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {approved ? (
                  <img src={approved} alt="" />
                ) : (
                  <img src={cancelled} alt="" />
                )}
                <div className="">
                  <h4 className=" text-[16px] font-bold">Duration</h4>
                  <p className=" text-[12px]">{data?.duration} </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {approved ? (
                  <img src={approved} alt="" />
                ) : (
                  <img src={cancelled} alt="" />
                )}
                <div className="">
                  <h4 className=" text-[16px] font-bold">Products</h4>
                  <p className=" text-[12px]">{data?.no_of_products}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {approved ? (
                  <img src={approved} alt="" />
                ) : (
                  <img src={cancelled} alt="" />
                )}
                <div className="">
                  <h4 className=" text-[16px] font-bold">Feed Calculator</h4>
                  <p className=" text-[12px]">{data?.feed_calculator}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {approved ? (
                  <img src={approved} alt="" />
                ) : (
                  <img src={cancelled} alt="" />
                )}
                <div className="">
                  <h4 className=" text-[16px] font-bold">Disease Predictor</h4>
                  <p className=" text-[12px]">{data?.disease_predictor}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {approved ? (
                  <img src={approved} alt="" />
                ) : (
                  <img src={cancelled} alt="" />
                )}
                <div className="">
                  <h4 className=" text-[16px] font-bold">Store</h4>
                  <p className=" text-[12px]">{data?.store}</p>
                </div>
              </div>
              <div className="flex items-center mb-14 gap-2">
                {data?.customer_support?.includes("No") ? (
                  <img src={cancelled} alt="" />
                ) : (
                  <img src={approved} alt="" />
                )}
                <div className="">
                  <h4 className=" text-[16px] font-bold">Customer Support</h4>
                  <p className=" text-[12px]">{data?.customer_support}</p>
                </div>
              </div>
              <div className="p-6 cursor-pointer absolute bottom-0 w-full left-0 bg-green-800 text-center text-white text-sm font-bold rounded-b-lg">
                SELECT PLAN
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
