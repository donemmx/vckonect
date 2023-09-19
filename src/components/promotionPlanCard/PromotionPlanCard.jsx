import moment from "moment";
import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import { addPromotion, getUserProduct } from "../../utils/userApiService";
import { useRecoilValue } from "recoil";
import { user } from "../../atom/userAtom";
import { MultiSelect } from 'primereact/multiselect';
import { toast } from "react-toastify";
import useUpadateReload from "../../hooks/UpdateRelaod";
        
export default function PromotionPlanCard({ myPromotion , productsPromoted}) {
  const [visible, setVisible] = useState(false);
  const userData = useRecoilValue(user);
  const [allProducts, setAllProducts] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
const [updateReload] = useUpadateReload()

  const openModal = () => {
    setVisible(!visible);
    getAllProducts()
    console.log(allProducts);
  };

  const getAllProducts = () => {
    const payload = {
      user_id: userData?.id,
      role: userData?.role,
    };
    getUserProduct(payload).then(({data}) => {
      setAllProducts(data);
    });
  };

  const checkProducts = (e) => {
    if(e.length > myPromotion?.no_of_products ){
      setSelected(e.slice(0, myPromotion?.no_of_products))
    }
    else{
      setSelected(e)
    }
  }

  const submitProduct = () => {
    setLoading(true)
   selected?.forEach((res)=> {
    const {title, category, description, available_units,id, ...others} = res
    const payload = {
      product_title: title,
      product_category: category,
      product_description: description,
      units: available_units,
      id: userData?.id,
      ...others
    }
    addPromotion(payload).then(({data})=> {
      toast.success(data.detail)
      setLoading(false)
      setVisible(false)
      setSelected([])
      updateReload()
    })
   })
  }

  useEffect(()=> {
    console.log('Products promoted', productsPromoted.length, 'selected', selected);
  }, [])

  return (
    <div className=" border h-full lg:h-[10vh] rounded-md bg-gray-100  my-5">
      <div className="flex flex-wrap items-center justify-between h-full">
        <div className=" flex items-center gap-5 p-5 w-[90%] md:w-[50%] lg:w-[24%] [clip-path:polygon(0%_0%,75%_0%,100%_50%,75%_100%,0%_100%)] rounded-md bg-green-900 h-full text-white">
          <i className=" pi pi-cog  pi-spin !text-xl"></i>
          <div className="">
            <h3 className="font-black text-lg ">
              {myPromotion?.promotion_title}
            </h3>
            <p className="">{Number(myPromotion?.no_of_products) - productsPromoted?.length +' / '+ myPromotion?.no_of_products}    Slots left</p>
          </div>
        </div>
        <div className=" p-2">
          <p>Expires: {moment(myPromotion?.expiry_date).fromNow()}</p>
        </div>
        <div className=" flex items-center flex-wrap gap-4 p-5">
          {myPromotion?.subscription === "Active" ? (
            <div className=" bg-green-100 p-2 rounded text-sm text-green-600">
              {myPromotion?.subscription}
            </div>
          ) : (
            <div className="bg-red-100 p-2 rounded text-sm text-red-600">
              {myPromotion?.subscription}
            </div>
          )}
          <button
            className="p-3 border bg-[var(--primary)] text-white rounded-full"
            onClick={openModal}
          >
            Add products
          </button>
          <p className="p-2 bg-gray-50 text-xs rounded-full">
            {moment(myPromotion?.date).fromNow()}
          </p>
        </div>
        <Dialog
          visible={visible}
          className=" w-[95%] md:w-[70%] lg:w-[40%]"
          onHide={() => setVisible(false)}
          draggable={false}
        >
           <h3 className="font-black text-lg ">
              {myPromotion?.promotion_title}
            </h3>
          <div className=" font-bold mb-4">
            Available No. of Products for plan: {(Number(myPromotion?.no_of_products) - productsPromoted?.length ) - selected?.length }
          </div>
          <div className="flex items-center justify-between">
            
          <MultiSelect value={selected} onChange={(e) => checkProducts(e.value)} options={allProducts} optionLabel="title" filter 
    placeholder="Select a Product" className="w-full md:w-14rem mb-4" />
          </div>
          <div className="">
            <button disabled={selected?.length ==0 || loading} onClick={submitProduct} className="bg-green-800 p-3 w-full mt-2 rounded text-white flex items-center justify-center gap-4">
            { loading ?  <i className="pi pi-spin pi-spinner"></i>: ''}
              Add to Promotion
            </button>
          </div>
        </Dialog>
      </div>
    </div>
  );
}
