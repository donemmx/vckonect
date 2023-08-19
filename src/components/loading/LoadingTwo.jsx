export default function LoadingTwo() {
  return (
    <div className="border bg-white  border-gray-200 rounded-md p-5 w-full mx-auto ">
      <div className="animate-pulse ">
        <div className="flex items-center space-x-4">
          <div className="rounded-full bg-slate-200 h-24 w-24"></div>
          <div className="flex-1 space-y-2">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-3 bg-slate-200 rounded col-span-2"></div>
              <div className="h-3 bg-slate-200 rounded col-span-1"></div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="h-3 bg-slate-200 rounded col-span-1"></div>
            </div>
          </div>
        </div>
        <div className=" flex-1 space-y-6 py-5">
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-3 bg-slate-200 rounded col-span-2"></div>
              <div className="h-3 bg-slate-200 rounded col-span-1"></div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="h-3 bg-slate-200 rounded col-span-2"></div>
              <div className="h-3 bg-slate-200 rounded col-span-1"></div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="h-3 bg-slate-200 rounded col-span-2"></div>
              <div className="h-3 bg-slate-200 rounded col-span-1"></div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="h-3 bg-slate-200 rounded col-span-2"></div>
              <div className="h-3 bg-slate-200 rounded col-span-1"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
