import moment from 'moment'

export default function PromotionPlanCard({myPromotion}) {
  return (
    <div className=" border h-[10vh] rounded-md bg-gray-100  my-5">
    <div className="flex items-center justify-between h-full">
      <div className=" flex items-center gap-5 p-5 w-[24%] [clip-path:polygon(0%_0%,75%_0%,100%_50%,75%_100%,0%_100%)] rounded-md bg-green-900 h-full text-white">
        <i className=" pi pi-cog  pi-spin !text-xl"></i>
        <div className="">
          <h3 className="font-black text-lg ">
            {myPromotion?.promotion_title}
          </h3>
          <p className="">{myPromotion?.no_of_products} Products</p>
        </div>
      </div>
      <div className="">
        <p>Expires: {moment(myPromotion?.expiry_date).fromNow()}</p>
      </div>
      <div className=" flex items-center gap-4 p-5">
        {myPromotion?.subscription === "Active" ? (
          <div className=" bg-green-100 p-2 rounded text-sm text-green-600">
            {myPromotion?.subscription}
          </div>
        ) : (
          <div className="bg-red-100 p-2 rounded text-sm text-red-600">
            {myPromotion?.subscription}
          </div>
        )}
        <button className="p-3 border bg-[var(--primary)] text-white rounded-full">
          Add products
        </button>
        <p className="p-2 bg-gray-50 text-xs rounded-full">
          {moment(myPromotion?.date).fromNow()}
        </p>
      </div>
    </div>
  </div>
  )
}
