import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { user } from "../atom/userAtom";

export default function useRouteChecker() {
  const location = useNavigate();
  const userData = useRecoilValue(user);
  function routeChecker(route) {
    if (userData?.role === "Veterinarian") {
      location(`/vet-${route}`);
    } else {
      location(`/animal-owner-${route}`);
    }
  }

  return [routeChecker];
}
