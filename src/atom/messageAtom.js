import {atom} from 'recoil'
import {recoilPersist} from 'recoil-persist'

const {persistAtom} = recoilPersist({
    key: 'recoil-persist',
    Storage: localStorage

})

export const message = atom({
    key: 'message',
    default: [],
    effects_UNSTABLE: [persistAtom]
})