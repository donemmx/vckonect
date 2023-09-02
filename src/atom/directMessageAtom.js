import { atom, useRecoilCallback } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "recoil-persist",
  Storage: localStorage,
});

export const directMessages = atom({
  key: "directMessages",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export function MyMessages() {
  const getDirectMessages = useRecoilCallback(
    ({ snapshot }) =>
      async () => {
        const numItemsInCart = await snapshot.getPromise(directMessages);
        console.log("Items in cart: ", numItemsInCart);
      },
    []
  );
  return getDirectMessages
}
