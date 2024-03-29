import {atom} from 'recoil'
import {recoilPersist} from 'recoil-persist'

const {persistAtom} = recoilPersist({
    key: 'recoil-persist',
    Storage: localStorage

})

export const registration = atom({
    key: 'registration',
    default: [],
    effects_UNSTABLE: [persistAtom]
})