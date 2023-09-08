import {atom} from 'recoil'
import {recoilPersist} from 'recoil-persist'

const {persistAtom} = recoilPersist({
    key: 'recoil-persist',
    Storage: localStorage

})

export const loadingState = atom({
    key: 'loading',
    default: false,
    effects_UNSTABLE: [persistAtom]
})