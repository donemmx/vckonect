import {atom} from 'recoil'
import {recoilPersist} from 'recoil-persist'

const {persistAtom} = recoilPersist({
    key: 'recoil-persist',
    Storage: localStorage

})

export const forumStore = atom({
    key: 'forum',
    default: [],
    effects_UNSTABLE: [persistAtom]
})