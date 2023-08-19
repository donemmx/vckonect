import { useRecoilState } from "recoil";
import { reloadStore } from "../atom/reloadAtom";

export default function useUpadateReload() {
    const [reload, setReload] = useRecoilState(reloadStore);
    function updateReload(){
        setReload(!reload);
    }

    return [updateReload];
}
